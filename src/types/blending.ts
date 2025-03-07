export interface BlendingProblemProps {
  correctImagePath: string;
  wrongImagePath: string;
  audioPath: string;
}

export class BlendingProblem {
  public correctImagePath: string;
  public wrongImagePath: string;
  public audioPath: string;

  constructor(props: BlendingProblemProps) {
    this.correctImagePath = props.correctImagePath;
    this.wrongImagePath = props.wrongImagePath;
    this.audioPath = props.audioPath;
  }

  isCorrect = (imagePath: string): boolean => {
    return imagePath === this.correctImagePath;
  };
}
