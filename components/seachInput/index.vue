<template>
  <view class="search-container">
    <view class="search-box">
      <u-search
        placeholder="请输入关键字"
        v-model="keyword"
        :clearabled="true"
        bgColor="#fffff00"
        @custom="onSearch"
        @search="onSearch"
      >
      </u-search>
      <view class="search-list">
        <view class="search-list-item">
          搜索历史
        </view>
      </view>
      <view class="search-notfound">
        搜索不到您的成果？
      </view>
      <view class="search-tofind">
        点击此处在系统补全您的成果
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "seachInput",
  props: {},
  data() {
    return {
      keyword: "",
    };
  },
  computed: {},
  methods: {
    onSearch() {
      this.$emit("onSearch");
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
.search-container {
  display: flex;
  justify-content: center;
  padding-bottom: 4rpx;
  ::v-deep .search-box {
    width: 410rpx;
    text-align: center;
    .u-search__content {
      border-bottom: 2rpx solid #a0a9b8 !important;
      border-radius: 0 !important;
      padding-left: 0;
    }

    .search-list {
      .search-list-item {
        font-size: 22rpx;
        font-weight: 500;
        color: #a0a9b8;
        line-height: 59rpx;
      }
    }

    .search-notfound {
      font-size: 22rpx;
      font-weight: 500;
      color: #014099;
      line-height: 59rpx;
    }
    .search-tofind {
      padding: 24rpx 37rpx;
      border: 2px solid #6a7d7e;
      font-size: 22rpx;
      font-weight: 500;
      color: #050504;
      line-height: 52rpx;
    }
  }
}
</style>