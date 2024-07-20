<script setup lang="ts">
import Card from './Card.vue';
interface IProps {
  cardBackgroundColor: string | null;
  cardCount?: number;
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="card_cell">
    <Card :cardBackgroundColor="props.cardBackgroundColor" />
    <div class="card_count" v-if="props.cardBackgroundColor">
      {{ cardCount }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.card_cell {
  position: relative;

  display: flex;

  place-items: center;

  width: 10rem;
  height: 10rem;

  padding: 2.2rem;

  background-color: #262626;

  border: 1px solid #4d4d4d;

  &.selected {
    background-color: #2f2f2f;
  }

  &:first-child {
    border-radius: 0.5rem 0 0 0;
  }

  &:nth-child(5) {
    border-radius: 0 0.5rem 0 0;
  }

  &:nth-child(21) {
    border-radius: 0 0 0 0.5rem;
  }

  &:nth-child(25) {
    border-radius: 0 0 0.5rem 0;
  }
  .card_count {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 0.3rem;

    height: 1.5rem;

    bottom: -1px;
    right: -1px;

    background-color: #262626;

    border-top: 1px solid #4d4d4d;
    border-left: 1px solid #4d4d4d;

    border-radius: 0.5rem 0 0 0;
  }
}
</style>
