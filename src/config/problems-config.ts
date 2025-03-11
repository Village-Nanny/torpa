import { Problems } from '@/src/types/enums/problems.enum';

export interface BlendingProblemConfig {
  correctImagePath: string;
  wrongImagePath: string;
  audioPath: string;
}

export interface SegmentingProblemConfig {
  imagePath: string;
  correctAudioPath: string;
  wrongAudioPath: string;
}

export const PROBLEMS_CONFIG = {
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
  ] as SegmentingProblemConfig[],

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
  ] as SegmentingProblemConfig[],

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
  ] as SegmentingProblemConfig[],

  [Problems.INITIAL_BLENDING]: [
    {
      correctImagePath: '/assets/images/sock.png',
      wrongImagePath: '/assets/images/lock.png',
      audioPath: '/assets/audio/sock.wav',
    },
    {
      correctImagePath: '/assets/images/wheel.png',
      wrongImagePath: '/assets/images/seal.png',
      audioPath: '/assets/audio/wheel.wav',
    },
    {
      correctImagePath: '/assets/images/can.png',
      wrongImagePath: '/assets/images/fan.png',
      audioPath: '/assets/audio/can.wav',
    },
    {
      correctImagePath: '/assets/images/fish.png',
      wrongImagePath: '/assets/images/dish.png',
      audioPath: '/assets/audio/fish.wav',
    },
    {
      correctImagePath: '/assets/images/cat.png',
      wrongImagePath: '/assets/images/bat.png',
      audioPath: '/assets/audio/cat.wav',
    },
    {
      correctImagePath: '/assets/images/hose.png',
      wrongImagePath: '/assets/images/nose.png',
      audioPath: '/assets/audio/hose.wav',
    },
    {
      correctImagePath: '/assets/images/one.png',
      wrongImagePath: '/assets/images/sun.png',
      audioPath: '/assets/audio/one.wav',
    },
    {
      correctImagePath: '/assets/images/goose.png',
      wrongImagePath: '/assets/images/juice.png',
      audioPath: '/assets/audio/goose.wav',
    },
  ] as BlendingProblemConfig[],

  [Problems.FINAL_BLENDING]: [
    {
      correctImagePath: '/assets/images/couch.png',
      wrongImagePath: '/assets/images/cows.png',
      audioPath: '/assets/audio/couch.wav',
    },
    {
      correctImagePath: '/assets/images/cake.png',
      wrongImagePath: '/assets/images/cage.png',
      audioPath: '/assets/audio/cake.wav',
    },
    {
      correctImagePath: '/assets/images/doll.png',
      wrongImagePath: '/assets/images/dog.png',
      audioPath: '/assets/audio/doll.wav',
    },
    {
      correctImagePath: '/assets/images/beach.png',
      wrongImagePath: '/assets/images/beak.png',
      audioPath: '/assets/audio/beach.wav',
    },
    {
      correctImagePath: '/assets/images/comb.png',
      wrongImagePath: '/assets/images/coat.png',
      audioPath: '/assets/audio/comb.wav',
    },
    {
      correctImagePath: '/assets/images/mail.png',
      wrongImagePath: '/assets/images/man.png',
      audioPath: '/assets/audio/mail.wav',
    },
    {
      correctImagePath: '/assets/images/bowl.png',
      wrongImagePath: '/assets/images/boat.png',
      audioPath: '/assets/audio/bowl.wav',
    },
    {
      correctImagePath: '/assets/images/bus.png',
      wrongImagePath: '/assets/images/bug.png',
      audioPath: '/assets/audio/bus.wav',
    },
  ] as BlendingProblemConfig[],
};
