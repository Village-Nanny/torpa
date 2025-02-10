import { GAME_CONFIG } from '@/src/config/gameConfig';
import { Problems } from '@/src/types/enums/problems.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProblemGenerator } from '@/src/utils/problem-generator';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { AppDispatch, RootState } from '@/src/store';

type Problem = BlendingProblem | SegmentingProblem;
interface GameState {
  config: Problems[] | null;
  problems: Problem[];
  currentProblemIndex: number;
  score: number;
  totalScoreable: number;
}

const initialState: GameState = {
  config: null,
  problems: [],
  currentProblemIndex: 0,
  score: 0,
  totalScoreable: 0,
};

const startGame = (config: Problems[]) => async (dispatch: AppDispatch) => {
  try {
    const validProblemTypes = config.filter(type => GAME_CONFIG.includes(type));
    const problems = await Promise.all(validProblemTypes.map(type => ProblemGenerator.generateProblem(type)));
    const totalScoreable = validProblemTypes.filter(type => type !== Problems.TUTORIAL_BLENDING).length;
    dispatch(
      setGameState({
        config: validProblemTypes,
        problems,
        currentProblemIndex: 0,
        score: 0,
        totalScoreable,
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
    setGameState: (state, action: PayloadAction<GameState>) => action.payload,
    submitAnswer: (state, action: PayloadAction<string>) => {
      const currentProblem = state.problems[state.currentProblemIndex];
      const currentProblemType = state.config?.[state.currentProblemIndex];

      if (!currentProblem || !currentProblemType) return;

      const isCorrect = currentProblem.isCorrect(action.payload);

      if (isCorrect && currentProblemType !== Problems.TUTORIAL_BLENDING) {
        state.score += 1;
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
      state.score = 0;
      state.totalScoreable = 0;
    },
  },
});

export const { submitAnswer, endGame, setGameState } = gameSlice.actions;
export { startGame };

export const submitAnswerAndRecord =
  (answer: string, uid: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(submitAnswer(answer));
    const state: GameState = getState().game;

    if (state.config === null && state.problems.length === 0 && state.currentProblemIndex === 0) {
      try {
        const finalPercentage = state.totalScoreable > 0 ? Math.round((state.score / state.totalScoreable) * 100) : 0;
        await addDoc(collection(db, 'gameRuns'), {
          score: finalPercentage,
          uid,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error recording game run:', error);
      }
    }
  };

export default gameSlice.reducer;

export const getCurrentProblem = (state: { game: GameState }): Problem | null =>
  state.game.problems[state.game.currentProblemIndex] || null;
