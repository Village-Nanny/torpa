import { TutorialSegmentingProblem } from './segmenting';

export interface SegmentingTutorialProps {
  problem1: TutorialSegmentingProblem;
  problem2: TutorialSegmentingProblem;
}

export class SegmentingTutorial {
  public problem1: TutorialSegmentingProblem;
  public problem2: TutorialSegmentingProblem;

  constructor(props: SegmentingTutorialProps) {
    this.problem1 = props.problem1;
    this.problem2 = props.problem2;
  }

  getProblemForStep(step: 1 | 2): TutorialSegmentingProblem {
    return step === 1 ? this.problem1 : this.problem2;
  }
}
