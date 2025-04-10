import { BlendingProblem } from './blending';

// Define the properties needed for a BlendingTutorial
export interface BlendingTutorialProps {
  problem1: BlendingProblem;
  problem2: BlendingProblem;
}

// Define the BlendingTutorial class
export class BlendingTutorial {
  public problem1: BlendingProblem;
  public problem2: BlendingProblem;

  constructor(props: BlendingTutorialProps) {
    this.problem1 = props.problem1;
    this.problem2 = props.problem2;
  }

  // You could add methods here later if needed,
  // e.g., to get the problem for a specific step
  getProblemForStep(step: 1 | 2): BlendingProblem {
    return step === 1 ? this.problem1 : this.problem2;
  }
}
