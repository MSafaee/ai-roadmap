
# Model-Cost-Calculator

A simple TypeScript CLI program that tokenize the input text and calculate the cost of processing it by 3 different LLM models.

## Requirements 

- Node.js v24.18.0
- pnpm v11.24.0

## Dependencies

- typescript v7.0.2
- @types/node v26.1.2
- tiktoken v1.0.22

## Installation

```bash
pnpm install
```

## Run

```bash
pnpm exec tsc
node dist/index.js
```

## Test

The program reads from a .txt file in path : "files/sample.txt"
Change the text for your desired one.
