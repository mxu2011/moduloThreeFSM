// modThree.ts

import FSM from './fsm';

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
export const MAX_LENGTH = 15;

const fsm = new FSM(
  states,
  alphabet,
  initialState,
  finalStates,
  transitionFunction,
  MAX_LENGTH,
);

const modThree = (input: string): number => {
  fsm.reset();
  fsm.processString(input);
  const finalState = fsm.getCurrentState();
  const stateToRemainder: { [key: string]: number } = {
    S0: 0,
    S1: 1,
    S2: 2,
  };
  return stateToRemainder[finalState];
};

export { modThree };
