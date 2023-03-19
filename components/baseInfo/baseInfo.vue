<template>
  <view class="basicInfo">
    <view class="title">以下信息来自校数据中心，若有误可进行编辑或者联系学校信息办。</view>
    <view class="basicInfo-item">
      <view>姓名</view>
      <view>{{ form.userName }}</view>
    </view>
    <view class="basicInfo-item">
      <view>所在学校（部门）</view>
      <view class="">{{ form.institute }}</view>
    </view>
    <view class="basicInfo-item">
      <view>学科</view>
      <view>{{ form.subject }}</view>
    </view>
    <view class="basicInfo-item">
      <view>手机号</view>
      <view>{{ form.phone }}</view>
    </view>
    <view class="basicInfo-item">
      <view>学校邮箱</view>
      <view>{{ form.email }}</view>
    </view>
    <view class="basicInfo-item last-item">
      <view>联系地址</view>
      <view>{{ form.address }}</view>
    </view>

  </view>
</template>
<script>
export default {
  computed: {
    form() {
      return this.$store.state.home.user;
    },
  },
};
</script>
  <style lang="scss" scoped>
.basicInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  padding: 22rpx 8rpx 22rpx 8rpx;
  .title {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-base;
  }

  .basicInfo-item {
    display: flex;
    justify-content: space-between;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-lm;
    border-bottom: 2rpx dashed $base-border-color;
    > view:last-child {
      text-align: right;
      width: 60%;
      @include ellipsis();
    }
  }

  .last-item {
    border-bottom: none;
  }
}
</style>