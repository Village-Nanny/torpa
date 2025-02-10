import { GAME_CONFIG } from '@/src/config/gameConfig';
import { Problems } from '@/src/types/enums/problems.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProblemGenerator } from '@/src/utils/problem-generator';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';

type Problem = BlendingProblem | SegmentingProblem;
interface GameState {
  config: Problems[] | null;
  problems: Problem[];
  currentProblemIndex: number;
  score: number;
}

const initialState: GameState = {
  config: null,
  problems: [],
  currentProblemIndex: 0,
  score: 0,
};

const startGame = (config: Problems[]) => async (dispatch: any) => {
  try {
    const validProblemTypes = config.filter(type => GAME_CONFIG.includes(type));
    const problems = await Promise.all(validProblemTypes.map(type => ProblemGenerator.generateProblem(type)));

    dispatch(
      setGameState({
        config: validProblemTypes,
        problems,
        currentProblemIndex: 0,
        score: 0,
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
    setGameState: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
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
    },
  },
});

export const { submitAnswer, endGame, setGameState } = gameSlice.actions;
export { startGame };
export default gameSlice.reducer;

export const getCurrentProblem = (state: { game: GameState }): Problem | null =>
  state.game.problems[state.game.currentProblemIndex] || null;
