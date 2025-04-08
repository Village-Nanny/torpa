import { GAME_CONFIG } from '@/src/config/gameConfig';
import { Problems } from '@/src/types/enums/problems.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { AppDispatch, RootState } from '@/src/store';
import { PROBLEMS } from '@/src/config/problems-config';

type Problem = BlendingProblem | SegmentingProblem;
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

const startGame = (config: Problems[]) => async (dispatch: AppDispatch) => {
  try {
    const validProblemTypes = config.filter(type => GAME_CONFIG.includes(type));

    const problems = validProblemTypes
      .map(type => {
        const availableProblems = PROBLEMS[type];
        if (!availableProblems || availableProblems.length === 0) {
          console.error(`No problems defined or available for type: ${type}`);
          return null;
        }
        const randomIndex = Math.floor(Math.random() * availableProblems.length);
        return availableProblems[randomIndex];
      })
      .filter((problem): problem is Problem => problem !== null);

    const blendingTypes = [Problems.INITIAL_BLENDING, Problems.FINAL_BLENDING];
    const totalBlendingProblems = validProblemTypes.filter(type => blendingTypes.includes(type)).length;

    const segmentingTypes = [Problems.INITIAL_SEGMENTING, Problems.FINAL_SEGMENTING];
    const totalSegmentingProblems = validProblemTypes.filter(type => segmentingTypes.includes(type)).length;

    dispatch(
      setGameState({
        config: validProblemTypes,
        problems,
        currentProblemIndex: 0,
        blendingScore: 0,
        segmentingScore: 0,
        totalBlendingProblems,
        totalSegmentingProblems,
      })
    );
  } catch (error) {
    console.error('Error starting game:', error);
  }
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

      state.currentProblemIndex += 1;

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
