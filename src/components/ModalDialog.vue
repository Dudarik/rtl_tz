<script setup lang="ts">
import { ref } from 'vue';
import Card from './Card.vue';
import Substrate from './Substrate.vue';
import Skeleton from './Skeleton.vue';
import { ICard } from '../interfaces';

interface IProps {
  card: ICard;
  isVisible: boolean;
}

// const { cardBackgroundColor, isVisible, cardCount } = defineProps<IProps>();
const props = defineProps<IProps>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirmDelete', value: number): void;
}>();

const isDelete = ref(false);
const deleteCount = ref(0);

const onClose = () => {
  console.log('close Dialog');
  isDelete.value = false;
  emit('close');
};

const onDeleteItem = () => {
  console.log('onDeleteItem', props.card.color, props.card.count);
  isDelete.value = true;
};

const onConfirmDelete = () => {
  console.log('onConfirmDelete', deleteCount.value);
  emit('confirmDelete', deleteCount.value);
  emit('close');
};

const onCancelDelete = () => {
  console.log('onCancelDelete');
  isDelete.value = false;
};

const onChangeDeleteCount = () => {
  // if (typeof deleteCount.value !== 'number') deleteCount.value = 0;
  console.log(deleteCount.value, props.card.count, props.card.color);
  if (deleteCount.value > props.card.count)
    deleteCount.value = props.card.count;

  if (deleteCount.value < 0) deleteCount.value = 0;
};
</script>
<template>
  <Substrate
    class="modal-dialog"
    :class="{ open: isVisible }"
    closeButton
    @close="onClose"
  >
    <div class="modal-dialog_card-wrapper">
      <Card :cardBackgroundColor="props.card.color" />
    </div>

    <hr class="delimiter" />

    <div class="card-info">
      <Skeleton width="20rem" height="3rem" borderRadius=".5rem" />
      <Skeleton width="20rem" height="1rem" style="margin-top: 1rem" />
      <Skeleton width="20rem" height="1rem" />
      <Skeleton width="20rem" height="1rem" />
      <Skeleton width="16rem" height="1rem" />
      <Skeleton width="13rem" height="1rem" />
    </div>

    <hr class="delimiter" />

    <div class="control-panel">
      <button @click.stop="onDeleteItem" class="btn red_button">
        Удалить предмет
      </button>
    </div>
    <Substrate
      class="confirm-delete_dialog"
      :class="{ open: isDelete }"
      @close="onClose"
      @click.stop
    >
      <input
        v-model.number="deleteCount"
        type="number"
        min="0"
        :max="card.count"
        class="card_count"
        placeholder="Введите количество"
        @keyup.stop="onChangeDeleteCount"
        @click.stop
      />
      <div class="control-buttons_wrapper">
        <button @click="onCancelDelete" class="btn">Отмена</button>
        <button @click="onConfirmDelete" class="btn red_button">
          Подтвердить
        </button>
      </div>
    </Substrate>
  </Substrate>
</template>

<style scoped lang="scss">
@import '../assets/styles/const';
.modal-dialog {
  position: absolute;

  top: 0;
  bottom: 0;
  right: -50rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  width: 25rem;

  overflow: hidden;

  transition: right 0.5s;
  z-index: 1000;

  .card-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 1.5rem;

    margin-top: 1rem;
  }

  .control-panel {
    width: 100%;

    margin-top: 1rem;
  }

  .btn {
    cursor: pointer;

    width: 100%;

    background-color: white;
    color: black;

    padding: 1rem;

    border: none;

    border-radius: $border-radius;

    font-size: 1.1rem;

    &.red_button {
      background-color: #ff8888;
      color: white;

      transition: background-color 0.5s;

      &:hover {
        background-color: darken(#ff8888, 10%);
      }
    }
  }

  &.open {
    right: 0;
  }
  .delimiter {
    margin-top: 2rem;
    width: 100%;
    border: 1px solid $border-color;
  }

  .modal-dialog_card-wrapper {
    margin-top: 5rem;
    height: 10rem;
    width: 10rem;
  }

  .confirm-delete_dialog {
    position: absolute;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    border: none;
    border-top: 1px solid $border-color;

    bottom: -60rem;
    right: 0;
    left: 0;

    border-radius: 0;

    height: 13rem;

    z-index: 1001;
    transition: bottom 0.3s;
    &.open {
      bottom: 0;
    }
    .card_count {
      width: 100%;
      padding: 1rem;

      border-radius: 0.5rem;
      font-size: 1.1rem;

      border: 1px solid $border-color;

      background-color: #262626;
    }
    .control-buttons_wrapper {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
