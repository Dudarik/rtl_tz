<script setup lang="ts">
interface IProps {
  closeButton?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  closeButton: false,
});
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const onClickClose = () => {
  emit('close');
};
</script>

<template>
  <div class="substrate">
    <button
      class="close_btn"
      v-if="props.closeButton"
      @click.stop="onClickClose"
    >
      <span class="line left_line"></span>
      <span class="line right_line"></span>
    </button>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/const';

.substrate {
  position: relative;

  padding: 1rem;

  background-color: #262626dd;

  border-radius: $border-radius;

  border: 1px solid $border-color;

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .close_btn {
    $btn-size: 2.5rem;
    transform: scale(0.6);

    cursor: pointer;

    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;

    border: none;
    border-radius: $border-radius;

    top: 0.5rem;
    right: 0.5rem;

    width: $btn-size;
    height: $btn-size;
    transition: transform 0.3s;
    &:hover {
      transform: rotate(90deg);
    }

    &:hover > .line {
      background-color: #1e99ab;
    }

    .line {
      position: absolute;
      width: 2.5rem;
      height: 0.3rem;
      background-color: white;
      border-radius: 0.2rem;
      transition: background-color 0.3s;

      &.left_line {
        transform: rotate(45deg);
      }
      &.right_line {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
