import { Problems } from '@/src/types/enums/problems.enum';
import { SegmentingProblem, SegmentingProblemProps } from '../types/segmenting';
import {
  BlendingProblem,
  BlendingProblemProps,
  TutorialBlendingProblem,
  TutorialBlendingProblemProps,
} from '../types/blending';
import { Character } from '../types/enums/characters.enum';
import { getRandomCharacter } from '../utils/helpers';
import { BlendingTutorial } from '../types/blending-tutorial';

type ProblemsConfigType = {
  [Problems.TUTORIAL_SEGMENTING]: SegmentingProblemProps[];
  [Problems.TUTORIAL_BLENDING]: TutorialBlendingProblemProps[];
  [Problems.INITIAL_SEGMENTING]: SegmentingProblemProps[];
  [Problems.FINAL_SEGMENTING]: SegmentingProblemProps[];
  [Problems.INITIAL_BLENDING]: BlendingProblemProps[];
  [Problems.FINAL_BLENDING]: BlendingProblemProps[];
};

export const PROBLEMS_CONFIG: ProblemsConfigType = {
  [Problems.TUTORIAL_SEGMENTING]: [
    {
      imagePath: '/assets/images/gum.png',
      correctAudioPath: '/assets/audio/gum.wav',
      wrongAudioPath: '/assets/audio/watch.wav',
    },
    {
      imagePath: '/assets/images/watch.png',
      correctAudioPath: '/assets/audio/watch.wav',
      wrongAudioPath: '/assets/audio/gum.wav',
    },
    {
      imagePath: '/assets/images/pot.png',
      correctAudioPath: '/assets/audio/pot.wav',
      wrongAudioPath: '/assets/audio/door.wav',
    },
    {
      imagePath: '/assets/images/door.png',
      correctAudioPath: '/assets/audio/door.wav',
      wrongAudioPath: '/assets/audio/pot.wav',
    },
  ],
  [Problems.TUTORIAL_BLENDING]: [
    {
      correctImagePath: '/assets/images/gum.png',
      wrongImagePath: '/assets/images/watch.png',
      audioPath: '/assets/audio/gum.wav',
      visibleCharacter: Character.LULU,
      correctImageNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - Correct watch: “Good Job!”.m4a',
      wrongImageNarration: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
      tapCharacterNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Tap Francine to listen to her”.m4a',
      instructUserNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Which one did she say? Tap the right picture”.m4a',

      retryAudioPath: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
      correctNextNarration:
        'public/assets/audio/blending/TORPA Blending Task /TORPA Blending Task Transition - “Now let’s keep playing”.m4a',
      wrongNextNarration:
        'public/assets/audio/blending/TORPA Blending Task /TORPA Blending Task Transition - “Now let’s keep playing”.m4a',
    },
    {
      correctImagePath: '/assets/images/pot.png',
      wrongImagePath: '/assets/images/door.png',
      audioPath: '/assets/audio/pot.wav',
      visibleCharacter: Character.LULU,
      correctImageNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - correct answer door “Good job. You chose pic of door”.m4a',
      wrongImageNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Let’s Try Another One”.m4a',
      tapCharacterNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA  Blending Training - “Tap Lulu to Listen to Her”.m4a',
      instructUserNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Which one did she say? Tap the right picture” 2.m4a',
      retryAudioPath: '/assets/audio/blending_training/TORPA Blending Training/lets_listen_again.mp3',
      correctNextNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Good job. Now let’s try one more”.m4a',
      wrongNextNarration:
        '/assets/audio/blending_training/TORPA Blending Training/TORPA Blending Training - “Let’s Try Another One”.m4a',
    },
  ],

  [Problems.INITIAL_SEGMENTING]: [
    {
      imagePath: '/assets/images/hose.png',
      correctAudioPath: '/assets/audio/hose.wav',
      wrongAudioPath: '/assets/audio/nose.wav',
    },
    {
      imagePath: '/assets/images/nose.png',
      correctAudioPath: '/assets/audio/nose.wav',
      wrongAudioPath: '/assets/audio/hose.wav',
    },
    {
      imagePath: '/assets/images/one.png',
      correctAudioPath: '/assets/audio/one.wav',
      wrongAudioPath: '/assets/audio/sun.wav',
    },
    {
      imagePath: '/assets/images/sun.png',
      correctAudioPath: '/assets/audio/sun.wav',
      wrongAudioPath: '/assets/audio/one.wav',
    },
    {
      imagePath: '/assets/images/cat.png',
      correctAudioPath: '/assets/audio/cat.wav',
      wrongAudioPath: '/assets/audio/bat.wav',
    },
    {
      imagePath: '/assets/images/bat.png',
      correctAudioPath: '/assets/audio/bat.wav',
      wrongAudioPath: '/assets/audio/cat.wav',
    },
    {
      imagePath: '/assets/images/goose.png',
      correctAudioPath: '/assets/audio/goose.wav',
      wrongAudioPath: '/assets/audio/juice.wav',
    },
    {
      imagePath: '/assets/images/juice.png',
      correctAudioPath: '/assets/audio/juice.wav',
      wrongAudioPath: '/assets/audio/goose.wav',
    },
    {
      imagePath: '/assets/images/can.png',
      correctAudioPath: '/assets/audio/can.wav',
      wrongAudioPath: '/assets/audio/fan.wav',
    },
    {
      imagePath: '/assets/images/fan.png',
      correctAudioPath: '/assets/audio/fan.wav',
      wrongAudioPath: '/assets/audio/can.wav',
    },
    {
      imagePath: '/assets/images/fish.png',
      correctAudioPath: '/assets/audio/fish.wav',
      wrongAudioPath: '/assets/audio/dish.wav',
    },
    {
      imagePath: '/assets/images/dish.png',
      correctAudioPath: '/assets/audio/dish.wav',
      wrongAudioPath: '/assets/audio/fish.wav',
    },
    {
      imagePath: '/assets/images/lock.png',
      correctAudioPath: '/assets/audio/lock.wav',
      wrongAudioPath: '/assets/audio/sock.wav',
    },
    {
      imagePath: '/assets/images/sock.png',
      correctAudioPath: '/assets/audio/sock.wav',
      wrongAudioPath: '/assets/audio/lock.wav',
    },
    {
      imagePath: '/assets/images/wheel.png',
      correctAudioPath: '/assets/audio/wheel.wav',
      wrongAudioPath: '/assets/audio/seal.wav',
    },
    {
      imagePath: '/assets/images/seal.png',
      correctAudioPath: '/assets/audio/seal.wav',
      wrongAudioPath: '/assets/audio/wheel.wav',
    },
  ],

  [Problems.FINAL_SEGMENTING]: [
    {
      imagePath: '/assets/images/comb.png',
      correctAudioPath: '/assets/audio/comb.wav',
      wrongAudioPath: '/assets/audio/coat.wav',
    },
    {
      imagePath: '/assets/images/coat.png',
      correctAudioPath: '/assets/audio/coat.wav',
      wrongAudioPath: '/assets/audio/comb.wav',
    },
    {
      imagePath: '/assets/images/bus.png',
      correctAudioPath: '/assets/audio/bus.wav',
      wrongAudioPath: '/assets/audio/bug.wav',
    },
    {
      imagePath: '/assets/images/bug.png',
      correctAudioPath: '/assets/audio/bug.wav',
      wrongAudioPath: '/assets/audio/bus.wav',
    },
    {
      imagePath: '/assets/images/boat.png',
      correctAudioPath: '/assets/audio/boat.wav',
      wrongAudioPath: '/assets/audio/bowl.wav',
    },
    {
      imagePath: '/assets/images/bowl.png',
      correctAudioPath: '/assets/audio/bowl.wav',
      wrongAudioPath: '/assets/audio/boat.wav',
    },
    {
      imagePath: '/assets/images/mail.png',
      correctAudioPath: '/assets/audio/mail.wav',
      wrongAudioPath: '/assets/audio/man.wav',
    },
    {
      imagePath: '/assets/images/man.png',
      correctAudioPath: '/assets/audio/man.wav',
      wrongAudioPath: '/assets/audio/mail.wav',
    },
    {
      imagePath: '/assets/images/dog.png',
      correctAudioPath: '/assets/audio/dog.wav',
      wrongAudioPath: '/assets/audio/doll.wav',
    },
    {
      imagePath: '/assets/images/doll.png',
      correctAudioPath: '/assets/audio/doll.wav',
      wrongAudioPath: '/assets/audio/dog.wav',
    },
    {
      imagePath: '/assets/images/couch.png',
      correctAudioPath: '/assets/audio/couch.wav',
      wrongAudioPath: '/assets/audio/cows.wav',
    },
    {
      imagePath: '/assets/images/cows.png',
      correctAudioPath: '/assets/audio/cows.wav',
      wrongAudioPath: '/assets/audio/couch.wav',
    },
    {
      imagePath: '/assets/images/beach.png',
      correctAudioPath: '/assets/audio/beach.wav',
      wrongAudioPath: '/assets/audio/beak.wav',
    },
    {
      imagePath: '/assets/images/beak.png',
      correctAudioPath: '/assets/audio/beak.wav',
      wrongAudioPath: '/assets/audio/beach.wav',
    },
    {
      imagePath: '/assets/images/cake.png',
      correctAudioPath: '/assets/audio/cake.wav',
      wrongAudioPath: '/assets/audio/cage.wav',
    },
    {
      imagePath: '/assets/images/cage.png',
      correctAudioPath: '/assets/audio/cage.wav',
      wrongAudioPath: '/assets/audio/cake.wav',
    },
  ],

  [Problems.INITIAL_BLENDING]: [
    {
      correctImagePath: '/assets/images/sock.png',
      wrongImagePath: '/assets/images/lock.png',
      audioPath: '/assets/audio/sock.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/wheel.png',
      wrongImagePath: '/assets/images/seal.png',
      audioPath: '/assets/audio/wheel.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/can.png',
      wrongImagePath: '/assets/images/fan.png',
      audioPath: '/assets/audio/can.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/fish.png',
      wrongImagePath: '/assets/images/dish.png',
      audioPath: '/assets/audio/fish.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/cat.png',
      wrongImagePath: '/assets/images/bat.png',
      audioPath: '/assets/audio/cat.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/hose.png',
      wrongImagePath: '/assets/images/nose.png',
      audioPath: '/assets/audio/hose.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/one.png',
      wrongImagePath: '/assets/images/sun.png',
      audioPath: '/assets/audio/one.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/goose.png',
      wrongImagePath: '/assets/images/juice.png',
      audioPath: '/assets/audio/goose.wav',
      visibleCharacter: Character.LULU,
    },
  ],

  [Problems.FINAL_BLENDING]: [
    {
      correctImagePath: '/assets/images/couch.png',
      wrongImagePath: '/assets/images/cows.png',
      audioPath: '/assets/audio/couch.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/cake.png',
      wrongImagePath: '/assets/images/cage.png',
      audioPath: '/assets/audio/cake.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/doll.png',
      wrongImagePath: '/assets/images/dog.png',
      audioPath: '/assets/audio/doll.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/beach.png',
      wrongImagePath: '/assets/images/beak.png',
      audioPath: '/assets/audio/beach.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/comb.png',
      wrongImagePath: '/assets/images/coat.png',
      audioPath: '/assets/audio/comb.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/mail.png',
      wrongImagePath: '/assets/images/man.png',
      audioPath: '/assets/audio/mail.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/bowl.png',
      wrongImagePath: '/assets/images/boat.png',
      audioPath: '/assets/audio/bowl.wav',
      visibleCharacter: Character.LULU,
    },
    {
      correctImagePath: '/assets/images/bus.png',
      wrongImagePath: '/assets/images/bug.png',
      audioPath: '/assets/audio/bus.wav',
      visibleCharacter: Character.LULU,
    },
  ],
};

export const PROBLEMS = {
  [Problems.TUTORIAL_SEGMENTING]: PROBLEMS_CONFIG[Problems.TUTORIAL_SEGMENTING].map(
    props => new SegmentingProblem(props)
  ),
  [Problems.TUTORIAL_BLENDING]: (() => {
    const problems = PROBLEMS_CONFIG[Problems.TUTORIAL_BLENDING].map(props => new TutorialBlendingProblem(props));
    return new BlendingTutorial({
      problem1: problems[0],
      problem2: problems[1],
    });
  })(),
  [Problems.INITIAL_SEGMENTING]: PROBLEMS_CONFIG[Problems.INITIAL_SEGMENTING].map(
    props => new SegmentingProblem(props)
  ),
  [Problems.FINAL_SEGMENTING]: PROBLEMS_CONFIG[Problems.FINAL_SEGMENTING].map(props => new SegmentingProblem(props)),
  [Problems.INITIAL_BLENDING]: PROBLEMS_CONFIG[Problems.INITIAL_BLENDING].map(
    props => new BlendingProblem({ ...props, visibleCharacter: getRandomCharacter() })
  ),
  [Problems.FINAL_BLENDING]: PROBLEMS_CONFIG[Problems.FINAL_BLENDING].map(
    props => new BlendingProblem({ ...props, visibleCharacter: getRandomCharacter() })
  ),
};
