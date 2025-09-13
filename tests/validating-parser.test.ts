import { parseCSV } from "../src/validating-parser";
import * as path from "path";
import { z } from "zod";

const USERS_VALID_CSV_PATH = path.join(__dirname, "../data/users_valid.csv");
const USERS_INVALID_CSV_PATH = path.join(__dirname, "../data/users_invalid.csv");
const USERS_COERCE_CSV_PATH = path.join(__dirname, "../data/users_coerce.csv");
const USERS_BASIC_CSV_PATH = path.join(__dirname, "../data/users_basic.csv");

  test("type validation", async () => {
    const userSchema = z.tuple([
      z.string(),
      z.number(),
      z.string().email(),
    ]);
    const result = await parseCSV(USERS_VALID_CSV_PATH, userSchema);
    expect(result).toEqual({
      validated: true,
      data: [
        ["Alice", 25, "alice@example.com"],
        ["Bob", 30, "bob@example.com"],
      ],
      errors: [],
    });
  });

  test("undefined schema returns string[][]", async () => {
    const result = await parseCSV(USERS_BASIC_CSV_PATH);
    expect(result).toEqual([
      ["Alice", "25", "alice@example.com"],
      ["Bob", "30", "bob@example.com"],
    ]);
  });

  test("invalid result is found", async () => {
    const userSchema = z.tuple([
      z.string(),
      z.number(),
      z.string().email(),
    ]);
    const result = await parseCSV(USERS_INVALID_CSV_PATH, userSchema);
    if (!Array.isArray(result)) {
      expect(result.validated).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.errors[0].rowNumber).toBe(1);
      expect(result.errors[1].rowNumber).toBe(2);
    }
  
  });

  test("proper row arrays are returned for errors", async () => {
    const userSchema = z.tuple([
      z.string(),
      z.number(),
      z.string().email(),
    ]);
    const result = await parseCSV(USERS_INVALID_CSV_PATH, userSchema);

    if (!Array.isArray(result)) {
      expect(result.errors[0].row).toEqual(["Alice", "notanumber", "alice@example.com"]);
      expect(result.errors[1].row).toEqual(["Bob", "30", "notanemail"]);
    }

  });

  test("coercion: schema with z.coerce.number() vs strict z.number()", async () => {
    const coercionSchema = z.tuple([
      z.string(),
      z.coerce.number(),
      z.string().email(),
    ]);

    const resultCoerce = await parseCSV(USERS_COERCE_CSV_PATH, coercionSchema);
    if (!Array.isArray(resultCoerce)){
      expect(resultCoerce.validated).toBe(true);
    }
    

  });
