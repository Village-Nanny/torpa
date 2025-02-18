export interface BlendingProblemProps {
  imagePath: string;
  correctAudioPath: string;
  wrongAudioPath: string;
}

export class BlendingProblem {
  public imagePath: string;
  public correctAudioPath: string;
  public wrongAudioPath: string;

  constructor(props: BlendingProblemProps) {
    this.imagePath = props.imagePath;
    this.correctAudioPath = props.correctAudioPath;
    this.wrongAudioPath = props.wrongAudioPath;
  }

  isCorrect = (audioPath: string): boolean => {
    return audioPath === this.correctAudioPath;
  };
}
