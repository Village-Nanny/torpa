import { Character } from './enums/characters.enum';

export interface SegmentingProblemProps {
  imagePath: string;
  correctAudioPath: string;
  wrongAudioPath: string;
  correctCharacter: Character;
}

export class SegmentingProblem {
  public imagePath: string;
  public correctAudioPath: string;
  public wrongAudioPath: string;
  public correctCharacter: Character;

  constructor(props: SegmentingProblemProps) {
    this.imagePath = props.imagePath;
    this.correctAudioPath = props.correctAudioPath;
    this.wrongAudioPath = props.wrongAudioPath;
    this.correctCharacter = props.correctCharacter;
  }

  isCorrect = (audioPath: string): boolean => {
    return audioPath === this.correctAudioPath;
  };
}

export interface TutorialSegmentingProblemProps extends SegmentingProblemProps {
  imageNarration: string;
  tapCharacterNarration: string;
  instructUserNarration: string;
  correctChoiceNarration: string;
  retryNarration: string;
  wrongInstructUserNarration: string;
  correctChoiceNextNarration: string;
}

export class TutorialSegmentingProblem extends SegmentingProblem {
  public imageNarration: string;
  public tapCharacterNarration: string;
  public instructUserNarration: string;
  public correctChoiceNarration: string;
  public retryNarration: string;
  public wrongInstructUserNarration: string;
  public correctChoiceNextNarration: string;

  constructor(props: TutorialSegmentingProblemProps) {
    super(props);

    this.imageNarration = props.imageNarration;
    this.tapCharacterNarration = props.tapCharacterNarration;
    this.instructUserNarration = props.instructUserNarration;
    this.correctChoiceNarration = props.correctChoiceNarration;
    this.retryNarration = props.retryNarration;
    this.wrongInstructUserNarration = props.wrongInstructUserNarration;
    this.correctChoiceNextNarration = props.correctChoiceNextNarration;
  }
}
