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

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
