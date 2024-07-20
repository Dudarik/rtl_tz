<script setup lang="ts">
interface IProps {
  cardBackgroundColor: string | null;
}

const props = defineProps<IProps>();
</script>
<template>
  <div class="card_wrapper" v-if="cardBackgroundColor">
    <div
      class="card-copy_1"
      :style="{ backgroundColor: props.cardBackgroundColor || '' }"
    ></div>
    <div
      class="card-copy_2"
      :style="{ backgroundColor: `${props.cardBackgroundColor}aa` }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.card_wrapper {
  position: relative;

  width: 100%;
  height: 100%;

  top: -0.5rem;
  right: -0.5rem;

  .card-copy_2 {
    // position: relative;

    height: 100%;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    box-shadow: -8px 8px 8px 0px rgba(34, 60, 80, 0.2);
  }

  .card-copy_1 {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 1rem;
    right: 1rem;
  }
}
</style>
