import { ICard } from '../interfaces';

export const CARD_COLORS = [
  null,
  null,
  null,
  null,
  '#7FAA65',
  '#AA9765',
  '#656CAA',
];

export const deafultCard: ICard = {
  id: -1,
  color: null,
  count: 0,
  dragable: false,
};

export const LS_KEY_SAVE_STATE = 'rtl_tz_save_state';
