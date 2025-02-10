import { Problems } from '@/src/types/enums/problems.enum';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';

export class ProblemGenerator {
  private static readonly ASSET_PATHS = {
    images: '/assets/images',
    audio: '/assets/audio',
  } as const;

  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static getRandomExcept<T>(array: T[], except: T): T {
    const filtered = array.filter(item => item !== except);
    return this.getRandomItem(filtered);
  }

  public static async generateProblem(type: Problems): Promise<BlendingProblem | SegmentingProblem> {
    try {
      const { availableItems } = await this.fetchAssets();

      switch (type) {
        case Problems.TUTORIAL_BLENDING:
          return this.generateTutorialBlendingProblem(availableItems);
        case Problems.BLENDING:
          return this.generateBlendingProblem(availableItems);
        case Problems.SEGMENTING:
          return this.generateSegmentingProblem(availableItems);
        default:
          throw new Error(`Unknown problem type: ${type}`);
      }
    } catch (error) {
      console.error('Error generating problem:', error);
      throw error;
    }
  }

  private static async fetchAssets(): Promise<{ availableItems: string[] }> {
    const imagesResponse = await fetch('/api/assets/images');
    const audioResponse = await fetch('/api/assets/audio');

    const images: string[] = await imagesResponse.json();
    const audio: string[] = await audioResponse.json();

    // Remove file extensions from asset names for matching
    const imageNames = images.map(img => img.split('.')[0]);
    const audioNames = audio.map(aud => aud.split('.')[0]);

    return {
      availableItems: imageNames.filter(name => audioNames.includes(name)),
    };
  }

  private static generateTutorialBlendingProblem(availableItems: string[]): BlendingProblem {
    const correctItem = 'pot';
    const wrongItem = this.getRandomExcept(availableItems, correctItem);

    return new BlendingProblem({
      imagePath: `${this.ASSET_PATHS.images}/${correctItem}.png`,
      correctAudioPath: `${this.ASSET_PATHS.audio}/${correctItem}.wav`,
      wrongAudioPath: `${this.ASSET_PATHS.audio}/${wrongItem}.wav`,
    });
  }

  private static generateBlendingProblem(availableItems: string[]): BlendingProblem {
    const correctItem = this.getRandomItem(availableItems);
    const wrongItem = this.getRandomExcept(availableItems, correctItem);

    return new BlendingProblem({
      imagePath: `${this.ASSET_PATHS.images}/${correctItem}.png`,
      correctAudioPath: `${this.ASSET_PATHS.audio}/${correctItem}.wav`,
      wrongAudioPath: `${this.ASSET_PATHS.audio}/${wrongItem}.wav`,
    });
  }

  private static generateSegmentingProblem(availableItems: string[]): SegmentingProblem {
    const correctItem = this.getRandomItem(availableItems);
    const wrongItem = this.getRandomExcept(availableItems, correctItem);

    return new SegmentingProblem({
      correctImagePath: `${this.ASSET_PATHS.images}/${correctItem}.png`,
      wrongImagePath: `${this.ASSET_PATHS.images}/${wrongItem}.png`,
      audioPath: `${this.ASSET_PATHS.audio}/${correctItem}.wav`,
    });
  }
}
