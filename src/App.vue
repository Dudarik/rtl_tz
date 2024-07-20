<script setup lang="ts">
import Skeleton from './components/Skeleton.vue';
import Substrate from './components/Substrate.vue';
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
      <Skeleton width="12rem" height="1.7rem" borderRadius=".5rem" />
      <Skeleton width="10rem" height=".7rem" style="margin-top: 1rem" />
      <Skeleton width="12rem" height=".7rem" />
      <Skeleton width="10rem" height=".7rem" />
      <Skeleton width="9rem" height=".7rem" />
      <Skeleton width="8rem" height=".7rem" />
      <Skeleton width="5rem" height=".7rem" style="margin-top: 1rem" />
    </Substrate>
  </div>
</template>

<style scoped lang="scss">
@import './assets/styles/const';
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

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

      width: 13rem;
      height: 15rem;

      overflow: hidden;

      border-radius: $border-radius;

      .img_filter {
        position: absolute;

        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: transparent;

        backdrop-filter: blur(5px);
      }

      .profile_image {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
