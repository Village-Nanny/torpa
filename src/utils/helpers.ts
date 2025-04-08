import { Character } from '../types/enums/characters.enum';

export function getRandomCharacter(): Character {
  const characters = Object.values(Character);
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}
