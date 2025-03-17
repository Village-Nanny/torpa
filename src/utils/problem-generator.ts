import { Problems } from '@/src/types/enums/problems.enum';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { PROBLEMS_CONFIG, BlendingProblemConfig, SegmentingProblemConfig } from '@/src/config/problems-config';

const isBlendingProblemType = (type: Problems): boolean => {
  return [Problems.TUTORIAL_BLENDING, Problems.INITIAL_BLENDING, Problems.FINAL_BLENDING].includes(type);
};

const isSegmentingProblemType = (type: Problems): boolean => {
  return [Problems.TUTORIAL_SEGMENTING, Problems.INITIAL_SEGMENTING, Problems.FINAL_SEGMENTING].includes(type);
};

export class ProblemGenerator {
  private usedIndices: Map<Problems, Set<number>> = new Map();

  constructor() {
    this.resetUsedProblems();
  }

  private getRandomUnusedIndex(type: Problems): number {
    const problems = PROBLEMS_CONFIG[type];

    if (!problems || !Array.isArray(problems) || problems.length === 0) {
      throw new Error(`No problems configured for type: ${type}`);
    }

    if (!this.usedIndices.has(type)) {
      this.usedIndices.set(type, new Set());
    }

    const usedSet = this.usedIndices.get(type)!;

    if (usedSet.size >= problems.length) {
      usedSet.clear();
    }

    const availableIndices = Array.from({ length: problems.length }, (_, i) => i).filter(i => !usedSet.has(i));

    if (availableIndices.length === 0) {
      throw new Error(`No available problems for type: ${type}`);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedSet.add(randomIndex);

    return randomIndex;
  }

  public generateProblem(type: Problems): BlendingProblem | SegmentingProblem {
    try {
      const selectedIndex = this.getRandomUnusedIndex(type);

      const problemConfig = PROBLEMS_CONFIG[type][selectedIndex];

      if (!problemConfig) {
        throw new Error(`Problem config not found for type ${type} at index ${selectedIndex}`);
      }

      if (isBlendingProblemType(type)) {
        const config = problemConfig as BlendingProblemConfig;

        if (!config.correctImagePath || !config.wrongImagePath || !config.audioPath) {
          throw new Error(`Incomplete blending problem configuration for type ${type}`);
        }

        return new BlendingProblem({
          correctImagePath: config.correctImagePath,
          wrongImagePath: config.wrongImagePath,
          audioPath: config.audioPath,
        });
      }

      if (isSegmentingProblemType(type)) {
        const config = problemConfig as SegmentingProblemConfig;

        if (!config.imagePath || !config.correctAudioPath || !config.wrongAudioPath) {
          throw new Error(`Incomplete segmenting problem configuration for type ${type}`);
        }

        return new SegmentingProblem({
          imagePath: config.imagePath,
          correctAudioPath: config.correctAudioPath,
          wrongAudioPath: config.wrongAudioPath,
        });
      }

      throw new Error(`Unknown problem type: ${type}`);
    } catch (error) {
      console.error('Error generating problem:', error);
      throw error;
    }
  }

  public resetUsedProblems(): void {
    this.usedIndices.clear();
  }
}
