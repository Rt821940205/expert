<template>
  <view class="t-nav">
    <view class="t-nav__arrow">
      <u-icon
        name="arrow-left"
        :color="color"
        size="24"
        @click="toBack"
      ></u-icon>
    </view>
    <view
      class="t-nav__title"
      :style="{'color': color}"
    >
      {{ title }}
    </view>
  </view>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    color: {
      type: String,
      default: () => {
        return "#316B7A";
      },
    },
  },
  methods: {
    toBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.t-nav {
  height: 56rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  &__arrow {
    width: 56rpx;
    line-height: 56rpx;
    align-self: baseline;
  }
  &__title {
    flex: 1;
    font-family: PingFangSC-Light, sans-serif;
    font-size: $uni-font-size-hg;
  }
}
</style>