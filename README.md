# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

## Functionality

### Handle Embedded Commas and Quotes
**User Story:** As a developer, I want the parser to correctly handle commas, quotes, and escaped quotes inside fields (e.g., `"New York, NY"`) so that data containing punctuation is parsed accurately without breaking column structure.

### Line Breaks Inside Fields
**User Story:** As a developer, I want the parser to support multi-line text inside quoted fields so that datasets with long descriptions, addresses, or notes are preserved correctly across rows.

### Row Shape Consistency
**User Story:** As a developer, I want the parser to detect when a row has too many or too few columns so that I can quickly identify malformed data and maintain schema consistency across the file.

## Extensibility

### Data Type Consistency
**User Story:** As a developer, I want the parser to validate that values in each column are consistent with an expected type (e.g., all numbers in a numeric column, all dates in a date column) so that I can trust the integrity of the dataset and avoid runtime errors caused by mixed types.

## Reflections

- **Initial ideas (Me):** Focused on handling quoted fields with commas, configuring how empty fields should be treated, and addressing header ambiguity.
- **Additional insights (LLM):** Added considerations like trimming whitespace and managing row shape inconsistencies when rows have too many or too few columns.
- **What worked well:** Rephrasing the prompt to ask about developer perspectives helped organize results into clearer categories (e.g., data integrity, performance).
- **What resonated most:** The distinction between **common features** (what most CSV parsers do) versus **best-case features** (what makes a great parser).
- **What resonated less:** Over-engineering solutions that might improve rare cases but reduce overall simplicity and developer experience.


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
