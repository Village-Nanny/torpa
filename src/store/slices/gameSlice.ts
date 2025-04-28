import { Problems } from '@/src/types/enums/problems.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { BlendingTutorial } from '@/src/types/blending-tutorial';
import { SegmentingTutorial } from '@/src/types/segmenting-tutorial';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { AppDispatch, RootState } from '@/src/store';
import { PROBLEMS, PROBLEMS_CONFIG } from '@/src/config/problems-config';

type Problem = BlendingProblem | SegmentingProblem | BlendingTutorial | SegmentingTutorial;
interface GameState {
  config: Problems[] | null;
  problems: Problem[];
  currentProblemIndex: number;
  blendingScore: number;
  segmentingScore: number;
  totalBlendingProblems: number;
  totalSegmentingProblems: number;
}

const initialState: GameState = {
  config: null,
  problems: [],
  currentProblemIndex: 0,
  blendingScore: 0,
  segmentingScore: 0,
  totalBlendingProblems: 0,
  totalSegmentingProblems: 0,
};

type GameProblem = BlendingProblem | SegmentingProblem | BlendingTutorial | SegmentingTutorial;

interface ProblemEntry {
  type: Problems;
  inst: GameProblem;
}

const startGame = (wantedTypes: Problems[]) => async (dispatch: AppDispatch) => {
  const allTypesInOrder = Object.keys(PROBLEMS_CONFIG) as Problems[];
  const orderedTypes = allTypesInOrder.filter(t => wantedTypes.includes(t));

  const tuples: ProblemEntry[] = orderedTypes.reduce<ProblemEntry[]>((acc, type) => {
    const entry = PROBLEMS[type];
    if (!entry) {
      console.warn(`No PROBLEMS entry for ${type}`);
      return acc;
    }

    if (Array.isArray(entry)) {
      entry.forEach(inst => acc.push({ type, inst }));
    } else {
      acc.push({ type, inst: entry });
    }

    return acc;
  }, []);

  const problems = tuples.map(t => t.inst);
  const configPerProblem = tuples.map(t => t.type);

  const blendingTypes = [Problems.INITIAL_BLENDING, Problems.FINAL_BLENDING];
  const segmentingTypes = [Problems.INITIAL_SEGMENTING, Problems.FINAL_SEGMENTING];
  const totalBlendingProblems = configPerProblem.filter(t => blendingTypes.includes(t)).length;
  const totalSegmentingProblems = configPerProblem.filter(t => segmentingTypes.includes(t)).length;

  dispatch(
    setGameState({
      config: configPerProblem,
      problems,
      currentProblemIndex: 0,
      blendingScore: 0,
      segmentingScore: 0,
      totalBlendingProblems,
      totalSegmentingProblems,
    })
  );
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (_, action: PayloadAction<GameState>) => action.payload,
    submitAnswer: (state, action: PayloadAction<string>) => {
      const currentProblem = state.problems[state.currentProblemIndex];
      const currentProblemType = state.config?.[state.currentProblemIndex];

      if (!currentProblem || !currentProblemType) return;

      // Check if the current problem is a Tutorial
      if (currentProblem instanceof BlendingTutorial || currentProblem instanceof SegmentingTutorial) {
        // For tutorials, submitting means completion, just advance index
        console.log('Tutorial completed, advancing...');
      } else {
        // For regular problems, check correctness and score
        if ('isCorrect' in currentProblem && typeof currentProblem.isCorrect === 'function') {
          const isCorrect = currentProblem.isCorrect(action.payload);

          if (isCorrect) {
            if (currentProblemType === Problems.INITIAL_BLENDING || currentProblemType === Problems.FINAL_BLENDING) {
              state.blendingScore += 1;
            } else if (
              currentProblemType === Problems.INITIAL_SEGMENTING ||
              currentProblemType === Problems.FINAL_SEGMENTING
            ) {
              state.segmentingScore += 1;
            }
          }
        } else {
          console.error('Current problem does not have a valid isCorrect method', currentProblem);
        }
      }

      // Advance to the next problem index
      state.currentProblemIndex += 1;

      // Check if the game run is complete
      if (state.currentProblemIndex >= state.problems.length) {
        state.config = null;
        state.problems = [];
        state.currentProblemIndex = 0;
      }
    },
    endGame: state => {
      state.config = null;
      state.problems = [];
      state.currentProblemIndex = 0;
      state.blendingScore = 0;
      state.segmentingScore = 0;
      state.totalBlendingProblems = 0;
      state.totalSegmentingProblems = 0;
    },
  },
});

export const { submitAnswer, endGame, setGameState } = gameSlice.actions;
export { startGame };

export const submitAnswerAndRecord =
  (answer: string, uid: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(submitAnswer(answer));
    const state: GameState = getState().game;
    const auth = getState().auth;

    if (state.config === null && state.problems.length === 0 && state.currentProblemIndex === 0) {
      try {
        // Record to Firebase
        await addDoc(collection(db, 'gameRuns'), {
          blendingScore: {
            correct: state.blendingScore,
            total: state.totalBlendingProblems,
          },
          segmentingScore: {
            correct: state.segmentingScore,
            total: state.totalSegmentingProblems,
          },
          uid,
          createdAt: new Date().toISOString(),
        });

        // Send email
        if (auth.user?.email) {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: auth.user.email,
              blendingScore: {
                correct: state.blendingScore,
                total: state.totalBlendingProblems,
              },
              segmentingScore: {
                correct: state.segmentingScore,
                total: state.totalSegmentingProblems,
              },
            }),
          });
        }
      } catch (error) {
        console.error('Error recording game run:', error);
      }
    }
  };

export default gameSlice.reducer;

export const getCurrentProblem = (state: { game: GameState }): Problem | null =>
  state.game.problems[state.game.currentProblemIndex] || null;

// Helper selectors for getting the scores
export const getBlendingScore = (state: RootState): string =>
  `${state.game.blendingScore}/${state.game.totalBlendingProblems}`;

export const getSegmentingScore = (state: RootState): string =>
  `${state.game.segmentingScore}/${state.game.totalSegmentingProblems}`;
