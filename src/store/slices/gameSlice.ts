import { GAME_CONFIG } from '@/src/config/gameConfig';
import { BlendingProblem } from '@/src/types/blending';
import { Problems } from '@/src/types/enums/problems.enum';
import { SegmentingProblem } from '@/src/types/segmenting';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Problem = BlendingProblem | SegmentingProblem;

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

const generateProblem = (type: Problems): Problem => {
  if (type === Problems.BLENDING) {
    return new BlendingProblem({
      imagePath: '/assets/images/couch.png',
      correctAudioPath: '/assets/audio/couch.wav',
      wrongAudioPath: '/assets/audio/cake.wav',
    });
  } else if (type === Problems.SEGMENTING) {
    return new SegmentingProblem({
      correctImagePath: '/assets/images/fish.png',
      wrongImagePath: '/assets/images/wheel.png',
      audioPath: '/assets/audio/fish.wav',
    });
  }
  throw new Error(`Unknown problem type: ${type}`);
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<Problems[]>) => {
      const validProblemTypes = action.payload.filter(type => GAME_CONFIG.includes(type));
      state.config = validProblemTypes;
      state.problems = validProblemTypes.map(type => generateProblem(type));
      state.currentProblemIndex = 0;
      state.score = 0;
    },

    submitAnswer: (state, action: PayloadAction<string>) => {
      const currentProblem = state.problems[state.currentProblemIndex];
      if (!currentProblem) return;

      const isCorrect = currentProblem.isCorrect(action.payload);
      if (isCorrect) {
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

export const { startGame, submitAnswer, endGame } = gameSlice.actions;
export default gameSlice.reducer;

export const getCurrentProblem = (state: { game: GameState }): Problem | null =>
  state.game.problems[state.game.currentProblemIndex] || null;
