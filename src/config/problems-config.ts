import { Problems } from '@/src/types/enums/problems.enum';
import { BlendingProblem, TutorialBlendingProblem } from '../types/blending';
import { SegmentingProblem, TutorialSegmentingProblem } from '../types/segmenting';
import { Character } from '../types/enums/characters.enum';
import { getRandomCharacter } from '../utils/helpers';
import { BlendingTutorial } from '../types/blending-tutorial';
import { SegmentingTutorial } from '../types/segmenting-tutorial';

export const PROBLEMS_LIST: {
  type: Problems;
  inst: BlendingProblem | SegmentingProblem | BlendingTutorial | SegmentingTutorial;
}[] = [
  {
    type: Problems.TUTORIAL_BLENDING,
    inst: new BlendingTutorial({
      problem2: new TutorialBlendingProblem({
        correctImagePath: '/assets/images/watch.png',
        wrongImagePath: '/assets/images/gum.png',
        audioPath: '/assets/audio/watch.wav',
        visibleCharacter: Character.FRANCINE,

        correctImageAudio: '/assets/audio/blending_training/TORPA Blending Training/this_watch.mp3',
        wrongImageAudio: '/assets/audio/blending_training/TORPA Blending Training/this_gum.mp3',
        correctImageNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingCorrect watchGood Job.m4a',
        wrongImageNarration: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
        tapCharacterNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingTap Francine to listen to her.m4a',
        instructUserNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - Which one did she sayTap the right picture.m4a',
        retryAudioPath: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
        correctNextNarration:
          '/assets/audio/blending/TORPA Blending Task /TORPA Blending Task TransitionNow letkeep playing.m4a',
        wrongNextNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingLet Try Another One.m4a',
        narrationOrder: ['correct', 'wrong'],
      }),
      problem1: new TutorialBlendingProblem({
        correctImagePath: '/assets/images/door.png',
        wrongImagePath: '/assets/images/pot.png',
        audioPath: '/assets/audio/door.wav',
        visibleCharacter: Character.LULU,
        correctImageAudio: '/assets/audio/blending_training/TORPA Blending Training/and_door.mp3',
        wrongImageAudio: '/assets/audio/blending_training/TORPA Blending Training/this_is_a_pot.mp3',
        correctImageNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training Good jobYou chose pic of door.m4a',
        wrongImageNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingLet Try Another One.m4a',
        tapCharacterNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA  Blending TrainingTap Lulu to Listen to Her.m4a',
        instructUserNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - Which one did she sayTap the right picture.m4a',
        retryAudioPath: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
        correctNextNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingGood jobNow lets try one more.m4a',
        wrongNextNarration:
          '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending TrainingLet Try Another One.m4a',
        narrationOrder: ['wrong', 'correct'],
      }),
    }),
  },

  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/can.png',
      wrongImagePath: '/assets/images/fan.png',
      audioPath: '/assets/audio/can.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/fish.png',
      wrongImagePath: '/assets/images/dish.png',
      audioPath: '/assets/audio/fish.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/doll.png',
      wrongImagePath: '/assets/images/dog.png',
      audioPath: '/assets/audio/doll.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/comb.png',
      wrongImagePath: '/assets/images/coat.png',
      audioPath: '/assets/audio/comb.wav',
      visibleCharacter: Character.LULU,
    }),
  },

  {
    type: Problems.TUTORIAL_SEGMENTING,
    inst: new SegmentingTutorial({
      problem2: new TutorialSegmentingProblem({
        imagePath: '/assets/images/gum.png',
        correctAudioPath: '/assets/audio/gum.wav',
        wrongAudioPath: '/assets/audio/watch.wav',
        correctChoiceNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingGood jobLulu said it the right way.m4a',
        imageNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingThis is gum.m4a',
        correctChoiceNextNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingGreatNow lets try one more.m4a',
        instructUserNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting Training Who said it the right way.m4a',
        retryNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingLets listen again.m4a',
        tapCharacterNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingNow tap Lulu and Francine.m4a',
        wrongInstructUserNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingTap Luluthen tap Francine.m4a',
        correctCharacter: Character.LULU,
      }),
      problem1: new TutorialSegmentingProblem({
        imagePath: '/assets/images/pot.png',
        correctAudioPath: '/assets/audio/pot.wav',
        wrongAudioPath: '/assets/audio/door.wav',
        correctChoiceNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingGood JobFrancine said it the right way.m4a',
        imageNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingThis is a pot.m4a',
        correctChoiceNextNarration:
          '/assets/audio/segmenting/TORPA Segmenting Task /TORPA Segmenting Task TransitionGreatNow lets keep playing.m4a',
        instructUserNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting Training Who said it the right way.m4a',
        retryNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingLets listen again.m4a',
        tapCharacterNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingNow tap Lulu and Francine.m4a',
        wrongInstructUserNarration:
          '/assets/audio/segmenting_training/TORPA Segmenting Training/TORPA Segmenting TrainingTap Luluthen tap Francine.m4a',
        correctCharacter: Character.FRANCINE,
      }),
    }),
  },

  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/can.png',
      correctAudioPath: '/assets/audio/can.wav',
      wrongAudioPath: '/assets/audio/fan.wav',
      correctCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/fish.png',
      correctAudioPath: '/assets/audio/fish.wav',
      wrongAudioPath: '/assets/audio/dish.wav',
      correctCharacter: getRandomCharacter(),
    }),
  },
  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/cows.png',
      correctAudioPath: '/assets/audio/cows.wav',
      wrongAudioPath: '/assets/audio/couch.wav',
      correctCharacter: getRandomCharacter(),
    }),
  },
  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/boat.png',
      correctAudioPath: '/assets/audio/boat.wav',
      wrongAudioPath: '/assets/audio/bowl.wav',
      correctCharacter: getRandomCharacter(),
    }),
  },

  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/hose.png',
      wrongImagePath: '/assets/images/nose.png',
      audioPath: '/assets/audio/hose.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/goose.png',
      wrongImagePath: '/assets/images/juice.png',
      audioPath: '/assets/audio/goose.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/sock.png',
      correctAudioPath: '/assets/audio/sock.wav',
      wrongAudioPath: '/assets/audio/lock.wav',
      correctCharacter: Character.LULU,
    }),
  },

  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/bat.png',
      correctAudioPath: '/assets/audio/bat.wav',
      wrongAudioPath: '/assets/audio/cat.wav',
      correctCharacter: Character.LULU,
    }),
  },

  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/can.png',
      wrongImagePath: '/assets/images/fan.png',
      audioPath: '/assets/audio/can.wav',
      visibleCharacter: getRandomCharacter(),
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/seal.png',
      wrongImagePath: '/assets/images/wheel.png',
      audioPath: '/assets/audio/seal.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/bug.png',
      wrongImagePath: '/assets/images/bus.png',
      audioPath: '/assets/audio/bug.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/cake.png',
      correctAudioPath: '/assets/audio/cake.wav',
      wrongAudioPath: '/assets/audio/cage.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/man.png',
      correctAudioPath: '/assets/audio/man.wav',
      wrongAudioPath: '/assets/audio/mail.wav',
      correctCharacter: Character.LULU,
    }),
  },

  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/coat.png',
      wrongImagePath: '/assets/images/comb.png',
      audioPath: '/assets/audio/coat.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/one.png',
      wrongImagePath: '/assets/images/sun.png',
      audioPath: '/assets/audio/one.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/lock.png',
      correctAudioPath: '/assets/audio/lock.wav',
      wrongAudioPath: '/assets/audio/sock.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/dog.png',
      correctAudioPath: '/assets/audio/dog.wav',
      wrongAudioPath: '/assets/audio/doll.wav',
      correctCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/comb.png',
      wrongImagePath: '/assets/images/comb.png',
      audioPath: '/assets/audio/comb.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/cage.png',
      wrongImagePath: '/assets/images/cake.png',
      audioPath: '/assets/audio/cage.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/juice.png',
      correctAudioPath: '/assets/audio/juice.wav',
      wrongAudioPath: '/assets/audio/goose.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/sun.png',
      wrongImagePath: '/assets/images/one.png',
      audioPath: '/assets/audio/sun.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/doll.png',
      correctAudioPath: '/assets/audio/doll.wav',
      wrongAudioPath: '/assets/audio/dog.wav',
      correctCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/beak.png',
      correctAudioPath: '/assets/audio/beak.wav',
      wrongAudioPath: '/assets/audio/beach.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/bus.png',
      wrongImagePath: '/assets/images/bug.png',
      audioPath: '/assets/audio/bus.wav',
      visibleCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/cat.png',
      wrongImagePath: '/assets/images/bat.png',
      audioPath: '/assets/audio/cat.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/dish.png',
      correctAudioPath: '/assets/audio/dish.wav',
      wrongAudioPath: '/assets/audio/fish.wav',
      correctCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/wheel.png',
      wrongImagePath: '/assets/images/seal.png',
      audioPath: '/assets/audio/wheel.wav',
      visibleCharacter: Character.LULU,
    }),
  },
  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/one.png',
      correctAudioPath: '/assets/audio/one.wav',
      wrongAudioPath: '/assets/audio/sun.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/beach.png',
      correctAudioPath: '/assets/audio/beach.wav',
      wrongAudioPath: '/assets/audio/beak.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.FINAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/cake.png',
      wrongImagePath: '/assets/images/cage.png',
      audioPath: '/assets/audio/cake.wav',
      visibleCharacter: Character.FRANCINE, // Use random character
    }),
  },
  {
    type: Problems.FINAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/bus.png',
      correctAudioPath: '/assets/audio/bus.wav',
      wrongAudioPath: '/assets/audio/bug.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },

  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/seal.png',
      correctAudioPath: '/assets/audio/seal.wav',
      wrongAudioPath: '/assets/audio/wheel.wav',
      correctCharacter: Character.FRANCINE,
    }),
  },
  {
    type: Problems.INITIAL_BLENDING,
    inst: new BlendingProblem({
      correctImagePath: '/assets/images/nose.png',
      wrongImagePath: '/assets/images/hose.png',
      audioPath: '/assets/audio/nose.wav',
      visibleCharacter: Character.LULU,
    }),
  },

  {
    type: Problems.INITIAL_SEGMENTING,
    inst: new SegmentingProblem({
      imagePath: '/assets/images/sun.png',
      correctAudioPath: '/assets/audio/sun.wav',
      wrongAudioPath: '/assets/audio/one.wav',
      correctCharacter: Character.LULU,
    }),
  },
];
