import { BlendingProblem, TutorialBlendingProblem } from './blending';

export interface BlendingTutorialProps {
  problem1: TutorialBlendingProblem;
  problem2: TutorialBlendingProblem;
}

// Define the BlendingTutorial class
export class BlendingTutorial {
  public problem1: TutorialBlendingProblem;
  public problem2: TutorialBlendingProblem;

  constructor(props: BlendingTutorialProps) {
    this.problem1 = props.problem1;
    this.problem2 = props.problem2;
  }

  // You could add methods here later if needed,
  // e.g., to get the problem for a specific step
  getProblemForStep(step: 1 | 2): TutorialBlendingProblem {
    return step === 1 ? this.problem1 : this.problem2;
  }
}
