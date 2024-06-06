// fsm.ts

type State = string;
type Input = string;
type TransitionFunction = (state: State, input: Input) => State;
class FSM {
  private states: Set<State>;
  private alphabet: Set<Input>;
  private initialState: State;
  private finalStates: Set<State>;
  private transitionFunction: TransitionFunction;
  private currentState: State;
  private maxLength: number;

  constructor(
    states: Set<State>,
    alphabet: Set<Input>,
    initialState: State,
    finalStates: Set<State>,
    transitionFunction: TransitionFunction,
    maxLength: number,
  ) {
    this.states = states;
    this.alphabet = alphabet;
    this.initialState = initialState;
    this.finalStates = finalStates;
    this.transitionFunction = transitionFunction;
    this.currentState = initialState;
    this.maxLength = maxLength;

    this.validateInitializations();
  }

  private validateInitializations(): void {
    // Validate maxLength
    if (!this.maxLength || this.maxLength <= 0) {
      throw new Error(`maxLength "${this.maxLength}" is invalid.`);
    }

    // Validate initial state
    if (!this.states.has(this.initialState)) {
      throw new Error(
        `Initial state "${this.initialState}" is not a valid state.`,
      );
    }

    // Validate final states
    this.finalStates.forEach((finalState) => {
      if (!this.states.has(finalState)) {
        throw new Error(`Final state "${finalState}" is not a valid state.`);
      }
    });
  }

  public reset(): void {
    this.currentState = this.initialState;
  }

  public process(input: Input): void {
    if (!this.alphabet.has(input)) {
      throw new Error(`Invalid input: ${input}`);
    }

    // Validate transition to prevent transitioning to invalid states
    const nextState = this.transitionFunction(this.currentState, input);
    if (!this.states.has(nextState)) {
      throw new Error(`Invalid transition to state "${nextState}".`);
    }

    this.currentState = nextState;
  }

  public processString(inputString: string): void {
    if (this.maxLength !== null && inputString.length > this.maxLength) {
      throw new Error(
        `Input string exceeds maximum length of ${this.maxLength}`,
      );
    }
    for (const char of inputString) {
      this.process(char);
    }
  }

  public getCurrentState(): State {
    return this.currentState;
  }

  public isFinalState(): boolean {
    return this.finalStates.has(this.currentState);
  }
}

export default FSM;
