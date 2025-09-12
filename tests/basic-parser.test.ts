import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/emptyCols.csv");
const COMMAS_CSV_PATH = path.join(__dirname, "../data/commasPresent.csv");
const LABELS_CSV_PATH = path.join(__dirname, "../data/noLabels.csv");



test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});


// Test when the first row is not a label
test("CSV has no labels",  async () => {
  const results = await parseCSV(COMMAS_CSV_PATH)
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["Alice", "22", "New York"]);
  expect(results[1]).toEqual(["Ben", "25", "Boston"]);
  expect(results[2]).toEqual(["Clara", "28", "Chicago"]);
  expect(results[3]).toEqual(["David", "30", "San Francisco"]);
  expect(results[5]).toEqual(["Ella", "27", "Seattle"]);
  
});

// Test when eleemnts themselves contain commas
test("CSV contains commas",  async () => {
  const results = await parseCSV(COMMAS_CSV_PATH)
  expect(results).toHaveLength(6);
  expect(results[0]).toEqual(["Age", "Name", "Hobbies"]);
  expect(results[1]).toEqual(["21", "John Doe" ,"Reading, Swimming, Hiking"]);
  expect(results[2]).toEqual(["25", "Jane Smith" , "Cooking, Traveling"]);
  expect(results[3]).toEqual(["30", "Bob Lee","Gaming, Coding, Chess"]);
  expect(results[4]).toEqual(["28", "Alice Green","Running, Painting"]);
  expect(results[5]).toEqual(["35", "Michael Brown","Photography, Cycling, Gardening"]);
  
});

// Test when there are empty columns
test("CSV contains empty cols",  async () => {
  const results = await parseCSV(EMPTY_CSV_PATH)
  expect(results).toHaveLength(6);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]);
  expect(results[3]).toEqual(["Charlie", ""]);
  expect(results[4]).toEqual(["Nim", "22"]);
  expect(results[5]).toEqual(["Sam", ""]);
  
});