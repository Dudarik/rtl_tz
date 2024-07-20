<script setup lang="ts">
interface IProps {
  width: string;
  height: string;
  borderRadius?: string;
}

const DEFAULT_BORDER_RADIUS = '0.5rem';

const { width, height, borderRadius } = withDefaults(defineProps<IProps>(), {
  borderRadius: DEFAULT_BORDER_RADIUS,
});
</script>

<template>
  <div class="skeleton">
    <div
      class="skeleton_wrapper"
      :style="{
        width,
        height,
        borderRadius,
      }"
    >
      <div
        class="skeleton_gradient"
        :style="{
          width,
          height,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  display: flex;
  .skeleton_gradient {
    position: absolute;
    background-image: linear-gradient(
      90deg,
      #3c3c3c 0%,
      #444444 51%,
      #3c3c3c 100%
    );
    width: 10rem;

    animation: shine-lines 2s infinite linear;
  }
  .skeleton_wrapper {
    position: relative;
    background-color: #3c3c3c;
    overflow: hidden;
  }
}

@keyframes shine-lines {
  0% {
    left: -100%;
  }

  40% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
