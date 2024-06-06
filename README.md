# Policy Reporter - Finite State Machine

A Node.js application implementing a Modulo Three Finite State Machine for processing input strings efficiently.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Linting](#linting)

## Description

This project implements a Finite State Machine (FSM) in TypeScript for processing input strings according to a Modulo Three logic. The FSM transitions between states based on input characters, ultimately determining the remainder when dividing the input by three.

## Installation

To use this project, you'll need Node.js and npm installed on your machine. Here's how to get started:

1. Clone the repository:

   ```bash
   git clone https://github.com/username/policyreporter-finitestatemachine.git
   ```

2. Navigate to the project directory:
    ```bash
    cd policyreporter-finitestatemachine
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

The main functionality of the project is encapsulated in the modThree function, which takes a binary input string and returns the remainder when dividing by three.

Example usage:

    import { modThree } from './modThree';

    const result = modThree('1101'); // Returns 1

## Testing

This project includes unit tests to ensure the correctness of the Finite State Machine implementation and the modThree function. To run the tests, use the following command:
```bash
npm test
```

You can also generate a test coverage report by running:
```bash
npm run test:coverage
```

## Linting
Linting ensures consistent code style and helps catch potential issues early. This project uses ESLint and Prettier for linting.

To lint your code, run:
```bash
npm run lint
```

To automatically fix linting issues, run:
```bash
npm run lint:fix
```