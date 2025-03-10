import { Problems } from '@/src/types/enums/problems.enum';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { PROBLEMS_CONFIG, BlendingProblemConfig, SegmentingProblemConfig } from '@/src/config/problems-config';

export class ProblemGenerator {
  private usedIndices: Map<Problems, Set<number>> = new Map();

  constructor() {
    this.resetUsedProblems();
  }

  private getRandomUnusedIndex(type: Problems): number {
    const problems = PROBLEMS_CONFIG[type];

    if (!this.usedIndices.has(type)) {
      this.usedIndices.set(type, new Set());
    }

    const usedSet = this.usedIndices.get(type)!;

    if (usedSet.size >= problems.length) {
      usedSet.clear();
    }

    const availableIndices = Array.from({ length: problems.length }, (_, i) => i).filter(i => !usedSet.has(i));

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    usedSet.add(randomIndex);

    return randomIndex;
  }

  public generateProblem(type: Problems): BlendingProblem | SegmentingProblem {
    try {
      const problemConfig = PROBLEMS_CONFIG[type];
      if (!problemConfig || !problemConfig.length) {
        throw new Error(`No problems configured for type: ${type}`);
      }

      const selectedIndex = this.getRandomUnusedIndex(type);

      switch (type) {
        case Problems.TUTORIAL_BLENDING:
        case Problems.INITIAL_BLENDING:
        case Problems.FINAL_BLENDING: {
          const config = problemConfig[selectedIndex] as BlendingProblemConfig;
          return new BlendingProblem({
            correctImagePath: config.correctImagePath,
            wrongImagePath: config.wrongImagePath,
            audioPath: config.audioPath,
          });
        }
        case Problems.TUTORIAL_SEGMENTING:
        case Problems.INITIAL_SEGMENTING:
        case Problems.FINAL_SEGMENTING: {
          const config = problemConfig[selectedIndex] as SegmentingProblemConfig;
          return new SegmentingProblem({
            imagePath: config.imagePath,
            correctAudioPath: config.correctAudioPath,
            wrongAudioPath: config.wrongAudioPath,
          });
        }
        default:
          throw new Error(`Unknown problem type: ${type}`);
      }
    } catch (error) {
      console.error('Error generating problem:', error);
      throw error;
    }
  }

  public resetUsedProblems(): void {
    this.usedIndices.clear();
  }
}
