# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

### Functionality

#### 1. Handle Embedded Commas and Quotes (Me + LLM)
**- User Story:** As a developer, I want the parser to correctly handle commas, quotes, and escaped quotes inside fields (e.g., `"New York, NY"`) so that data containing punctuation is parsed accurately without breaking column structure.

#### 2. Line Breaks Inside Fields (LLM)
**- User Story:** As a developer, I want the parser to support multi-line text inside quoted fields so that datasets with long descriptions, addresses, or notes are preserved correctly across rows.

#### 3. Row Shape Consistency (LLM)
**- User Story:** As a developer, I want the parser to detect when a row has too many or too few columns so that I can quickly identify malformed data and maintain schema consistency across the file.

### Extensibility

#### 4. Data Type Consistency (Me)
**- User Story:** As a developer, I want the parser to validate that values in each column are consistent with an expected type (e.g., all numbers in a numeric column, all dates in a date column) so that I can trust the integrity of the dataset and avoid runtime errors caused by mixed types.

### Reflection

**- Initial ideas (Me):** I focused on handling quoted fields with commas, configuring how empty fields should be treated, and addressing header ambiguity.  

**- Additional insights (LLM):** I hadn’t considered issues like trimming whitespace or managing row shape inconsistencies when rows have too many or too few columns, which the LLM highlighted.  

**- What worked well:** I found that rephrasing the prompt to ask about what makes for an efficient CSV parser organized the results into clearer categories such as data integrity and performance.  

**- What resonated with me:** The distinction between what is common and average versus what represents the best possible experience.  

**- What didn’t resonate as much:** The idea of making changes that might improve some edge cases but reduce the overall experience.  


### Design Choices

### 1340 Supplement

- #### 1. Correctness

A correct CSV parser should anticipate the usual as well as the edge conditions found in real data. This includes dividing rows containing commas inside quoted fields, properly handling quotes inside quotes (like escaped quotes), and avoiding nested or bracketed text from being mistakenly treated as part of a field or as a delimiter. It should always deliver the desired fields even when data contains commas or quotes.

As for validation, a correct parser should also consider that CSV only stores strings. If a schema or validation rule expects a number or some other type, the parser should validate whether the string holds that type in some useful form. This allows validation against user-supplied expectations without being caught out by the string-only nature of CSV.

Finally, a proper CSV parser should deal with row shape inconsistencies well (e.g., missing or extra columns). Instead of crashing or silently failing, it should provide useful, helpful errors that tell the user how something went wrong and where. The goal is not just to validate correctly but to provide feedback in a way that allows users to easily identify and fix issues in their data.

- #### 2. Random, On-Demand Generation

I would mainly use the random data generation function to test the scalability and efficiency of my code. Right now, my focus has been on making sure the parser works correctly according to the rules I’ve defined. But in a real-world context, correctness is usually assumed—the real challenge is whether the solution can handle data efficiently.

Since real-world use typically concerns hugely large datasets with hundreds of millions of rows, I'd like to utilize random CSV generation to stress test under load. This way, I can measure the time and space complexity of the parser and see if it will scale or not without being too slow or memory-intensive. Essentially, I'd be using random data not just to stress test for correctness, but to verify the parser will scale with the size and volatility of real datasets.

- #### 3. Overall experience, Bugs encountered and resolved  

This sprint differed from my prior programming assignments mainly because it introduced Zod schemas, which I had never used before. Learning how to work with them, while also navigating TypeScript’s type system, was challenging. Even when I knew what the program should do, TypeScript still required me to explicitly define types for variables and outputs, which could change depending on the CSV data and the schema provided. Understanding how to satisfy the compiler in those cases took some time.

What surprised me most were the design questions I found myself asking. In past assignments, I usually thought in terms of straightforward code correctness, but here I had to really think about what responsibilities belonged to the parser itself versus what should be left to the user through their schema. I realized that there isn’t always a single “right” answer, and it was harder than expected to balance flexibility with sensible defaults while avoiding unnecessary assumptions.

#### Errors/Bugs  

I also ran into several bugs. One was figuring out how to pass the schema as a parameter, especially when the schema was undefined. My initial syntax for handling undefined didn’t work, so I had to add guard clauses with if-statements.  

Another bug came up when deciding how to return errors. I didn’t want the entire function to crash on invalid rows. I solved this by returning both data and errors together in one output object, so users could see what succeeded and what failed.  

Finally, I struggled with coercion because CSVs only store strings, validation against schemas that expected numbers would fail unless I explicitly applied coercion. Handling that edge case forced me to think carefully about how much the parser itself should assume versus what the schema should handle.  

#### Tests  

I implemented multiple test suites to check correctness and error handling:  

- **Undefined schema**: Confirmed that calling `parseCSV` without a schema returns raw `string[][]`.  
- **Invalid rows**: Ensured the parser returns `validated: false` and includes error objects with row numbers and issues.  
- **Error details**: Verified that the parser attaches both the row contents and error information for failed validations.  
- **Coercion vs. strict**:  Tested a schema using `z.coerce.number()` to ensure that numeric strings from the CSV (like `"30"`) were successfully converted into numbers and passed validation. This confirmed that coercion can handle CSV’s string-only values without causing unnecessary validation errors.  

These tests ensure the parser works with valid input, fails gracefully with invalid input, and handles type coercion properly.  

#### How To…

#### Team members and contributions (include cs logins): 

None.

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 

I used AI to help design error-return templates, polish JSDoc/comments, and fix syntax issues when handling undefined schemas. Initially, I tried a union type but shifted to a clearer results structure with arrays for data and row-level errors.

AI also helped me brainstorm edge cases (empty files, missing/extra columns, malformed CSV, schema mismatches, large files) and clarify which concerns belong to schema validation itself (type checking, constraints, coercion, error clarity) versus parser functionality.


#### Total estimated time it took to complete project: 5 hours
#### Link to GitHub Repo: 
https://github.com/cs0320-f25/typescript-csv-anotidamafuvadze

