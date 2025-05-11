import { Problems } from '@/src/types/enums/problems.enum';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalProblems: number;
  problemType: Problems | null;
}

export const ProgressIndicator = ({ currentIndex, totalProblems, problemType }: ProgressIndicatorProps) => {
  const getProblemTypeTitle = () => {
    switch (problemType) {
      case Problems.TUTORIAL_BLENDING:
        return 'Tutorial: Blending';
      case Problems.TUTORIAL_SEGMENTING:
        return 'Tutorial: Segmenting';
      case Problems.INITIAL_BLENDING:
        return 'Initial Blending';
      case Problems.FINAL_BLENDING:
        return 'Final Blending';
      case Problems.INITIAL_SEGMENTING:
        return 'Initial Segmenting';
      case Problems.FINAL_SEGMENTING:
        return 'Final Segmenting';
      default:
        return 'Practice';
    }
  };

  const isTutorial = problemType === Problems.TUTORIAL_BLENDING || problemType === Problems.TUTORIAL_SEGMENTING;
  const problemTitle = getProblemTypeTitle();

  // Don't show progress for tutorial problems
  if (isTutorial) {
    return (
      <div className="absolute top-6 right-6 z-20 bg-white/30 backdrop-blur-md rounded-full px-6 py-2.5 text-white font-medium shadow-lg flex items-center gap-3">
        <span className="h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></span>
        <span className="text-base">{problemTitle}</span>
      </div>
    );
  }

  // Calculate progress percentage
  const progressPercentage = totalProblems > 0 ? (currentIndex / totalProblems) * 100 : 0;

  return (
    <div className="absolute top-6 right-6 z-20 bg-white/30 backdrop-blur-md rounded-xl px-6 py-4 text-white shadow-lg max-w-[250px] w-full">
      <div className="text-base font-semibold mb-2 text-center truncate">{problemTitle}</div>
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-sm">Progress</span>
        <span className="font-bold text-base">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="h-3 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="mt-2 text-sm text-right font-medium">
        {currentIndex + 1} of {totalProblems}
      </div>
    </div>
  );
};
