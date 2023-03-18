<template>
  <view class="basicInfo">
    <view>以下信息来自校数据中心，若有误可进行编辑或者联系学校信息办。</view>
    <view>
      <view>姓名</view>
      <view>{{ form.userName }}</view>
    </view>
    <view>
      <view>所在学校（部门）</view>
      <view>{{ form.institute }}</view>
    </view>
    <view>
      <view>学科</view>
      <view>{{ form.subject }}</view>
    </view>
    <view>
      <view>手机号</view>
      <view>{{ form.phone }}</view>
    </view>
    <view>
      <view>学校邮箱</view>
      <view>{{ form.email }}</view>
    </view>
    <view>
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
  > view:first-child {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: 24rpx;
  }
  view:not(:first-child):not(:last-child):not(:nth-child(5)) {
    height: 108rpx;
    line-height: 108rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed $base-border-color;
    > view:first-child {
      font-size: $uni-font-size-base;
    }
    > view:last-child {
      font-size: $uni-font-size-base;
      color: $base-chart-color;
    }
  }
  > view:nth-child(5) {
    flex: 1;
    display: flex;
    justify-content: space-between;
    min-height: 108rpx;
    border-bottom: 1px dashed $base-border-color;
    > view:first-child {
      font-size: $uni-font-size-base;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > view:last-child {
      font-size: $uni-font-size-base;
      color: $base-chart-color;
      width: 312rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  > view:last-child {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-top: 34rpx;
    > view:first-child {
      font-size: $uni-font-size-base;
    }
    > view:last-child {
      font-size: $uni-font-size-base;
      color: $base-chart-color;
    }
  }
}
</style>