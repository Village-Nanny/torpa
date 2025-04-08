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
