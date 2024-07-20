import { Ref } from 'vue';
import { ICard } from '../interfaces';
import { CARD_COLORS, deafultCard, LS_KEY_SAVE_STATE } from '../config';

const getRandomNumber = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

const getRandomColor = (colors: (string | null)[]) =>
  colors[getRandomNumber(0, colors.length - 1)];

export const useCards = (cardColors = CARD_COLORS) => {
  return new Array(25).fill(1).map((_, id) => {
    const color = getRandomColor(cardColors);
    return {
      id,
      color,
      count: getRandomNumber(1, 100),
      dragable: !!color || false,
    };
  });
};

export const getSelectedCard = (event: Event, cards: Ref<ICard[]>) => {
  const { target } = event;

  if (!(target instanceof HTMLElement)) return deafultCard;

  const closestSell = target.closest('.card_cell');

  if (!(closestSell instanceof HTMLDivElement)) return deafultCard;
  const cardId = closestSell.dataset.key;

  if (!cardId) return deafultCard;

  const targetCard = cards.value.find((card) => card.id === parseInt(cardId));

  if (targetCard && targetCard.color) return targetCard;

  return deafultCard;
};

export const saveStateToLS = (state: ICard[]) => {
  localStorage.setItem(LS_KEY_SAVE_STATE, JSON.stringify(state));
};

export const loadStateFromLS = () => {
  const fromLS = localStorage.getItem(LS_KEY_SAVE_STATE);
  if (fromLS) return JSON.parse(fromLS);
  return undefined;
};
