export interface SegmentingProblemProps {
  correctImagePath: string;
  wrongImagePath: string;
  audioPath: string;
}

export class SegmentingProblem {
  public correctImagePath: string;
  public wrongImagePath: string;
  public audioPath: string;

  constructor(props: SegmentingProblemProps) {
    this.correctImagePath = props.correctImagePath;
    this.wrongImagePath = props.wrongImagePath;
    this.audioPath = props.audioPath;
  }

  isCorrect = (imagePath: string): boolean => {
    return imagePath === this.correctImagePath;
  };
}
