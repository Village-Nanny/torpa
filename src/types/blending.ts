import { Character } from './enums/characters.enum';

export interface BlendingProblemProps {
  correctImagePath: string;
  wrongImagePath: string;
  audioPath: string;
  visibleCharacter: Character;
}

export class BlendingProblem {
  public correctImagePath: string;
  public wrongImagePath: string;
  public audioPath: string;
  public visibleCharacter: Character;

  constructor(props: BlendingProblemProps) {
    this.correctImagePath = props.correctImagePath;
    this.wrongImagePath = props.wrongImagePath;
    this.audioPath = props.audioPath;
    this.visibleCharacter = props.visibleCharacter;
  }

  isCorrect = (imagePath: string): boolean => {
    return imagePath === this.correctImagePath;
  };
}

export interface TutorialBlendingProblemProps extends BlendingProblemProps {
  correctImageNarration: string;
  wrongImageNarration: string;
  tapCharacterNarration: string;
  instructUserNarration: string;
  retryAudioPath?: string;
  correctNextNarration?: string;
  wrongNextNarration?: string;
  correctImageAudio?: string;
  wrongImageAudio?: string;
}

export class TutorialBlendingProblem extends BlendingProblem {
  public correctImageNarration: string;
  public wrongImageNarration: string;
  public tapCharacterNarration: string;
  public instructUserNarration: string;
  public retryAudioPath?: string;
  public correctNextNarration?: string;
  public wrongNextNarration?: string;
  public correctImageAudio?: string;
  public wrongImageAudio?: string;

  constructor(props: TutorialBlendingProblemProps) {
    super(props);

    this.correctImageNarration = props.correctImageNarration;
    this.wrongImageNarration = props.wrongImageNarration;
    this.tapCharacterNarration = props.tapCharacterNarration;
    this.instructUserNarration = props.instructUserNarration;
    this.retryAudioPath = props.retryAudioPath;
    this.correctNextNarration = props.correctNextNarration;
    this.wrongNextNarration = props.wrongNextNarration;
    this.correctImageAudio = props.correctImageAudio;
    this.wrongImageAudio = props.wrongImageAudio;
  }
}
