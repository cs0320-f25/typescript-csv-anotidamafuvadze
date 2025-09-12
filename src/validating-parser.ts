import * as fs from "fs";
import * as readline from "readline";
import { z, ZodError } from "zod";

/**
 * Asynchronously parses a CSV file and (optionally) validates each row with a Zod schema.
 * 
 * This function demonstrates asynchronous file I/O in Node.js. Because reading
 * files is asynchronous, we mark the function `async` and use `await` so that
 * the program processes rows one at a time instead of rushing ahead.
 * 
 * If a schema is provided, each row of values is checked with Zod. Valid rows
 * are collected into the `data` array, while invalid rows are stored in `errors`
 * with details about what went wrong. If no schema is provided, the function
 * simply returns all rows as raw string arrays.
 *
 * @param path   The path to the CSV file being read.
 * @param schema An optional Zod schema used to validate each row.
 * @returns      A promise resolving to either:
 *                 - raw string[][] if no schema is passed, or
 *                 - an object containing parsed data and validation errors
 *                   if a schema is used.
 */

type RowError = {
  rowNumber: number;
  row: string[];
  issues: ZodError["issues"];
};

type ParseCSVResult<T extends z.ZodTypeAny> =
  | { validated: true; data: z.infer<T>[]; errors: [] }
  | { validated: false; data: z.infer<T>[]; errors: RowError[] };

export async function parseCSV<T extends z.ZodTypeAny>(
  path: string,
  schema?: T
): Promise<ParseCSVResult<T> | string[][]> {
  // Open the file as a stream and use readline so we can
  // process the file line by line instead of loading it all into memory.
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // normalize line endings (\n vs \r\n)
  });

  // Case 1: no schema provided → just return raw values
  if (!schema) {
    const results: string[][] = [];
    for await (const line of rl) {
      const values = line.split(",").map(v => v.trim());
      results.push(values);
    }
    return results;
  }

  // Case 2: schema provided → store valid rows and any errors
  const results: Array<z.infer<T>> = [];
  const rowErrors: RowError[] = [];
  let rowNumber = 0;

  // `for await ... of` makes sure we wait for each line before moving on
  for await (const line of rl) {
    rowNumber++;
    if (!line.trim()) continue;

    const values = line.split(",").map(v => v.trim());
    const parsed = schema.safeParse(values);

    if (parsed.success) {
      results.push(parsed.data as z.infer<T>);
    } else {
      rowErrors.push({
        rowNumber,
        row: values,
        issues: parsed.error.issues,
      });
    }
  }

  // If we found errors, mark validated=false. Otherwise, return validated=true.
  if (rowErrors.length > 0) {
    return { validated: false, data: results, errors: rowErrors };
  }
  return { validated: true, data: results, errors: [] };
}
