import { PROBLEMS_LIST } from '@/src/config/problems-config';
import { Problems } from '@/src/types/enums/problems.enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlendingProblem } from '@/src/types/blending';
import { SegmentingProblem } from '@/src/types/segmenting';
import { BlendingTutorial } from '@/src/types/blending-tutorial';
import { SegmentingTutorial } from '@/src/types/segmenting-tutorial';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/src/services/firebase';
import { AppDispatch, RootState } from '@/src/store';

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

const startGame = (wantedTypes: Problems[]) => async (dispatch: AppDispatch) => {
  const filteredProblems = PROBLEMS_LIST.filter(p => wantedTypes.includes(p.type));

  const configPerProblem = filteredProblems.map(p => p.type);
  const problems = filteredProblems.map(p => p.inst);

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

      if (currentProblem instanceof BlendingTutorial || currentProblem instanceof SegmentingTutorial) {
        console.log('Tutorial completed, advancing...');
      } else {
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

      state.currentProblemIndex += 1;
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
    const state = getState().game;
    const auth = getState().auth;

    if (state.problems.length > 0 && state.currentProblemIndex >= state.problems.length) {
      console.log('Attempting to record game run...');
      try {
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
        console.log('Game run recorded.');

        if (auth.user?.email) {
          console.log('Attempting to send email...');
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
          console.log('Email request sent.');
        }

        dispatch(endGame());
      } catch (error) {
        console.error('Error recording game run or sending email:', error);
        dispatch(endGame());
      }
    } else {
      if (state.problems.length > 0) {
        console.log('Game not finished yet, index:', state.currentProblemIndex, 'length:', state.problems.length);
      }
    }
  };

export default gameSlice.reducer;

export const getCurrentProblem = (state: { game: GameState }): Problem | null =>
  state.game.problems?.[state.game.currentProblemIndex] || null;

export const getBlendingScore = (state: RootState): string =>
  `${state.game.totalBlendingProblems > 0 ? state.game.blendingScore : '-'}/${state.game.totalBlendingProblems > 0 ? state.game.totalBlendingProblems : '-'}`;

export const getSegmentingScore = (state: RootState): string =>
  `${state.game.totalSegmentingProblems > 0 ? state.game.segmentingScore : '-'}/${state.game.totalSegmentingProblems > 0 ? state.game.totalSegmentingProblems : '-'}`;
