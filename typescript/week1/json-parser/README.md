# JSON-Parser

A simple TypeScript CLI program that reads a JSON file containing user's information and filters them.

## Requirements 

- Node.js v24.18.0
- pnpm v11.24.0

## Dependencies

- typescript v7.0.2
- @types/node v26.1.2

```bash
pnpm add typescript @types/node
```

## Run

```bash
pnpm exec tsc
node dist/index.js <filter> <value>
```

Replace `<filter>` with the filtering command and `<value>` with the value you want to search for.

### Filtering Commands :
- all : no value
- firstname : name
- lastname : name
- age : minimum, maximum 
- premium : true/false
- purchased : productID

### Example

```bash
node dist/index.js age 18 30
```

```bash
node dist/index.js premium true
```






