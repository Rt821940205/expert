<template>
  <view class="resultItem-container">
    <view class="resultItem-index">
      <text>{{ index }}</text>
    </view>

    <view class="resultItem-left">
      <u-form labelPosition="left">
        <u-form-item label="标题">
          <u-text
            :text="detail.title"
            :bold="true"
            class="u-text"
          ></u-text>
        </u-form-item>
        <u-form-item label="类型">
          <u-text
            :text="detail.type"
            :bold="true"
          ></u-text>
        </u-form-item>
        <u-form-item label="时间">
          <u-text
            :text="detail.time"
            :bold="true"
          ></u-text>
        </u-form-item>
        <u-form-item label="作者">
          <u-text
            :text="detail.author"
            :bold="true"
          ></u-text>
        </u-form-item>
      </u-form>
    </view>

    <view class="resultItem-right">
      <text
        class="right-text"
        @click.stop="handleClaim"
      >认领</text>
      <text
        class="right-text"
        @click.stop="handleDetail"
      >详情</text>
      <text
        class="right-text"
        @click.stop="handleSign"
      >标为已查看</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "resultItem",
  props: {
    detail: {
      type: Object,
      required: true,
    },
    index: {
      type: String | Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 认领
    handleClaim() {
      console.log("认领");
    },
    //  详细
    handleDetail() {
      console.log("详细");
    },
    // 标记
    handleSign() {
      console.log("标记");
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.resultItem-container {
  position: relative;
  border: 3rpx solid #6a7d7e;
  padding: 19rpx 89rpx 34rpx 47rpx;

  .resultItem-index {
    position: absolute;
    left: 10rpx;
    right: 20rpx;
  }

  ::v-deep .u-text {
    span {
      display: block;
      width: 438rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ::v-deep .resultItem-left {
    font-size: 20rpx !important;
    .u-form-item__body {
      padding: 0;
    }
  }

  ::v-deep .resultItem-right {
    position: absolute;
    top: 10rpx;
    right: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 53rpx);

    .right-text {
      font-size: 22rpx;
      font-weight: 500;
      color: #014099;
      line-height: 59rpx;
    }
  }
}
</style>