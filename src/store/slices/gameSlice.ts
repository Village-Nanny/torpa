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

const ASSET_PATHS = {
  images: '/assets/images',
  audio: '/assets/audio',
} as const;

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomExcept<T>(array: T[], except: T): T {
  const filtered = array.filter(item => item !== except);
  return getRandomItem(filtered);
}

async function generateProblem(type: Problems): Promise<Problem> {
  try {
    const imagesResponse = await fetch('/api/assets/images');
    const audioResponse = await fetch('/api/assets/audio');

    const images: string[] = await imagesResponse.json();
    const audio: string[] = await audioResponse.json();

    const imageNames = images.map(img => img.split('.')[0]);
    const audioNames = audio.map(aud => aud.split('.')[0]);

    const availableItems = imageNames.filter(name => audioNames.includes(name));

    if (type === Problems.TUTORIAL_BLENDING) {
      const correctItem = 'pot';
      const wrongItem = getRandomExcept(availableItems, correctItem);

      return new BlendingProblem({
        imagePath: `${ASSET_PATHS.images}/${correctItem}.png`,
        correctAudioPath: `${ASSET_PATHS.audio}/${correctItem}.wav`,
        wrongAudioPath: `${ASSET_PATHS.audio}/${wrongItem}.wav`,
      });
    } else if (type === Problems.BLENDING) {
      const correctItem = getRandomItem(availableItems);
      const wrongItem = getRandomExcept(availableItems, correctItem);

      return new BlendingProblem({
        imagePath: `${ASSET_PATHS.images}/${correctItem}.png`,
        correctAudioPath: `${ASSET_PATHS.audio}/${correctItem}.wav`,
        wrongAudioPath: `${ASSET_PATHS.audio}/${wrongItem}.wav`,
      });
    } else if (type === Problems.SEGMENTING) {
      const correctItem = getRandomItem(availableItems);
      const wrongItem = getRandomExcept(availableItems, correctItem);

      return new SegmentingProblem({
        correctImagePath: `${ASSET_PATHS.images}/${correctItem}.png`,
        wrongImagePath: `${ASSET_PATHS.images}/${wrongItem}.png`,
        audioPath: `${ASSET_PATHS.audio}/${correctItem}.wav`,
      });
    }

    throw new Error(`Unknown problem type: ${type}`);
  } catch (error) {
    console.error('Error generating problem:', error);
    throw error;
  }
}

const startGame = (config: Problems[]) => async (dispatch: any) => {
  try {
    const validProblemTypes = config.filter(type => GAME_CONFIG.includes(type));
    const problems = await Promise.all(validProblemTypes.map(generateProblem));

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
    // Handle error appropriately
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
