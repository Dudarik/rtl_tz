<script setup lang="ts">
import Skeleton from './components/Skeleton.vue';
import Substrate from './components/Substrate.vue';
import FieldCell from './components/FieldCell.vue';
import ModalDialog from './components/ModalDialog.vue';

import { getSelectedCard, useCards } from './lib';
import { deafultCard } from './config';
import { ICard } from './interfaces';
import { ref } from 'vue';

const cards = useCards();

const selectedCard = ref<ICard>(deafultCard);
const isOpenModal = ref(false);

const onClickBoard = (event: MouseEvent) => {
  selectedCard.value = getSelectedCard(event, cards);
  if (selectedCard.value.id !== -1) isOpenModal.value = true;
  if (selectedCard.value.id === -1) isOpenModal.value = false;
};

const onConfirmDelete = (value: number) => {
  const card = cards.value[selectedCard.value.id];
  if (card.count <= value) {
    cards.value[selectedCard.value.id] = { ...deafultCard, id: card.id };
    return;
  }
  cards.value[selectedCard.value.id].count -= value;
};

const onCloseDialog = () => {
  selectedCard.value = deafultCard;
  isOpenModal.value = false;
};

const startDrag = (event: DragEvent) => {
  selectedCard.value = getSelectedCard(event, cards);
};

const onDrop = (event: DragEvent) => {
  const { target } = event;

  if (!(target instanceof HTMLElement)) return;

  const closestCell = target.closest('.card_cell');

  if (!(closestCell instanceof HTMLElement)) return;
  const { key } = closestCell.dataset;

  if (!key) return;

  const cellId = parseInt(key);

  if (parseInt(key) === selectedCard.value.id) return;

  if (
    cards.value[cellId].color !== null &&
    cards.value[cellId].color !== selectedCard.value.color
  )
    return;

  if (cards.value[cellId].color === selectedCard.value.color) {
    cards.value[cellId].count += selectedCard.value.count;
  }

  if (cards.value[cellId].color === null)
    cards.value[cellId] = { ...selectedCard.value, id: cellId };

  cards.value[selectedCard.value.id] = {
    ...deafultCard,
    id: selectedCard.value.id,
  };
};
</script>

<template>
  <div class="container">
    <Substrate class="profile">
      <div class="profile-image_wrapper">
        <div class="img_filter"></div>
        <img
          src="/img/profile_img.webp"
          alt="Profile image"
          class="profile_image"
        />
      </div>
      <div class="user-info">
        <Skeleton width="17rem" height="2rem" borderRadius=".5rem" />
        <Skeleton width="16rem" height="1rem" style="margin-top: 1rem" />
        <Skeleton width="17rem" height="1rem" />
        <Skeleton width="15rem" height="1rem" />
        <Skeleton width="14rem" height="1rem" />
        <Skeleton width="11rem" height="1rem" />
        <Skeleton width="8rem" height="1rem" style="margin-top: 1rem" />
      </div>
    </Substrate>
    <div
      class="card_board"
      @click="onClickBoard"
      @drop="onDrop"
      @dragstart.stop="startDrag"
      @dragover.prevent
      @dragenter.prevent
    >
      <FieldCell
        v-for="card in cards"
        :cardBackgroundColor="card.color"
        :cardCount="card.count"
        :key="card.id"
        :draggable="card.dragable"
        :data-key="card.id"
      />
      <ModalDialog
        :card="selectedCard"
        :isVisible="isOpenModal"
        @close="onCloseDialog"
        @confirmDelete="onConfirmDelete"
        @click.stop
      />
    </div>
    <Substrate closeButton class="tip">
      <Skeleton width="90%" height="3rem" borderRadius=".5rem" />
    </Substrate>
  </div>
</template>

<style scoped lang="scss">
@import './assets/styles/const';
.container {
  display: flex;
  gap: 1rem;
  padding: 1rem;

  flex-wrap: wrap;

  .profile {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    .profile-image_wrapper {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 18rem;
      height: 22rem;

      overflow: hidden;
      //for safari
      isolation: isolate;

      border-radius: $border-radius;

      .img_filter {
        position: absolute;

        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: transparent;

        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .profile_image {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;

      gap: 1.5rem;

      margin-top: 1rem;
    }
  }

  .card_board {
    position: relative;

    display: grid;
    grid-template-columns: repeat(5, 1fr);

    overflow: hidden;
  }

  .tip {
    width: 71.5rem;
    height: 5rem;
  }
}
</style>
