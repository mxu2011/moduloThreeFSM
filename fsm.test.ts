// fsm.test.ts

import FSM from './fsm';

describe('FSM Class', () => {
  let fsm: FSM;
  const states = new Set(['S0', 'S1', 'S2']);
  const alphabet = new Set(['0', '1']);
  const initialState = 'S0';
  const finalStates = new Set(['S0', 'S1', 'S2']);
  const transitionFunction = (state: string, input: string): string => {
    const transitions: { [key: string]: { [key: string]: string } } = {
      S0: { '0': 'S0', '1': 'S1' },
      S1: { '0': 'S2', '1': 'S0' },
      S2: { '0': 'S1', '1': 'S2' },
    };
    return transitions[state][input];
  };

  beforeEach(() => {
    fsm = new FSM(
      states,
      alphabet,
      initialState,
      finalStates,
      transitionFunction,
      10,
    );
  });

  it('should initialize to the initial state', () => {
    expect(fsm.getCurrentState()).toBe('S0');
  });

  it('should transition correctly based on input', () => {
    fsm.processString('1010');
    expect(fsm.getCurrentState()).toBe('S1');
  });

  it('should reset to the initial state', () => {
    fsm.processString('1');
    expect(fsm.getCurrentState()).toBe('S1');

    fsm.reset();
    expect(fsm.getCurrentState()).toBe('S0');
  });

  it('should transition to correct state for input string with leading "0"s', () => {
    fsm.processString('0011');
    expect(fsm.getCurrentState()).toBe('S0');
  });

  it('should process empty string and remain in initial state', () => {
    fsm.processString('');
    expect(fsm.getCurrentState()).toBe('S0');
  });

  it('should throw an error if string contains invalid characters', () => {
    expect(() => fsm.processString('1a0')).toThrow('Invalid input: a');
    expect(() => fsm.processString('102')).toThrow('Invalid input: 2');
    expect(() => fsm.processString('-101')).toThrow('Invalid input: -');
  });

  it('should throw an error if input string exceeds maximum length', () => {
    const longInput = '10101010101'; // 11 characters
    expect(() => fsm.processString(longInput)).toThrow(
      'Input string exceeds maximum length of 10',
    );
  });

  it('should initialize with valid maxLength', () => {
    const fsm = new FSM(
      states,
      alphabet,
      initialState,
      finalStates,
      transitionFunction,
      20,
    );
    expect(fsm).toBeDefined();
  });

  it('should throw error if maxLength is negative', () => {
    expect(() => {
      new FSM(
        states,
        alphabet,
        initialState,
        finalStates,
        transitionFunction,
        -1,
      );
    }).toThrow('maxLength "-1" is invalid.');
  });

  it('should throw error if maxLength is zero', () => {
    expect(() => {
      new FSM(
        states,
        alphabet,
        initialState,
        finalStates,
        transitionFunction,
        0,
      );
    }).toThrow('maxLength "0" is invalid.');
  });

  it('should process a string exactly at the maximum length', () => {
    const maxLengthInput = '1010101010'; // 10 characters
    fsm.processString(maxLengthInput);
    expect(fsm.getCurrentState()).toBe('S1');
  });

  it('should check if current state is a final state', () => {
    expect(fsm.isFinalState()).toBe(true); // Initial state is a final state
    fsm.process('0'); // Transition to S0
    expect(fsm.isFinalState()).toBe(true); // S0 is a final state
    fsm.process('1'); // Transition to S1
    expect(fsm.isFinalState()).toBe(true); // S1 is a final state
    fsm.process('0'); // Transition to S2
    expect(fsm.isFinalState()).toBe(true); // S2 is a final state
  });

  it('should throw an error if initial state is not in states set', () => {
    const invalidInitialState = 'S3';
    expect(
      () =>
        new FSM(
          new Set(['S0', 'S1', 'S2']),
          alphabet,
          invalidInitialState,
          finalStates,
          transitionFunction,
          10,
        ),
    ).toThrow(`Initial state "${invalidInitialState}" is not a valid state.`);
  });

  it('should throw an error if final state is not in states set', () => {
    const invalidFinalStates = new Set(['S3']);
    expect(
      () =>
        new FSM(
          states,
          alphabet,
          initialState,
          invalidFinalStates,
          transitionFunction,
          10,
        ),
    ).toThrow(`Final state "S3" is not a valid state.`);
  });

  it('should throw an error if transition function results in invalid state', () => {
    const invalidTransitionFunction = (
      state: string,
      input: string,
    ): string => {
      const transitions: { [key: string]: { [key: string]: string } } = {
        S0: { '0': 'S0', '1': 'S3' }, // Invalid transition to S3
        S1: { '0': 'S2', '1': 'S0' },
        S2: { '0': 'S1', '1': 'S2' },
      };
      return transitions[state][input];
    };
    const invalidTransitionFsm = new FSM(
      states,
      alphabet,
      initialState,
      finalStates,
      invalidTransitionFunction,
      10,
    );
    expect(() => invalidTransitionFsm.process('1')).toThrow(
      'Invalid transition to state "S3".',
    );
  });
});
