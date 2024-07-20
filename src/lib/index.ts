import { ref } from 'vue';
import { ICard } from '../interfaces';
import { CARD_COLORS } from '../config';

const getRandomNumber = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

const getRandomColor = (colors: (string | null)[]) =>
  colors[getRandomNumber(0, colors.length - 1)];

export const useCards = () => {
  return ref<ICard[]>(
    new Array(25).fill(1).map((_, id) => {
      const color = getRandomColor(CARD_COLORS);
      return {
        id,
        color,
        count: getRandomNumber(1, 100),
        dragable: !!color || false,
      };
    })
  );
};
