<template>
  <view class="search-container">
    <view class="search-box">
      <u-search
        placeholder="请输入内容"
        v-model="keyword"
        :clearabled="true"
        bgColor="#fffff00"
        @custom="onSearch"
        @search="onSearch"
      >
      </u-search>
      <view class="search-history">搜索历史</view>
      <view class="search-notfound">搜索不到您的成果？ </view>
      <view class="search-tofind" @click="show = true"
        >点击此处在系统补全您的成果</view
      >
      <u-modal
        :show="show"
        :title="title"
        :content="content"
        :showCancelButton="true"
        @cancel="show = false"
        confirmColor="#316b7a"
      >
        <view class="completion_content">
          <text class="completion_p"
            >请填入您的联系邮箱，系统将发送成果补全页面链接至您的邮箱</text
          >
          <u--input
            placeholder="请输入邮箱"
            border="surround"
            v-model="email"
            @change="change"
          ></u--input>
          <text class="completion_p">链接有效期：72小时</text>
        </view>
      </u-modal>
    </view>
  </view>
</template>

<script>
export default {
  name: "seachInput",
  props: {
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      keyword: "",
      show: false,
      title: "成果补全",
      email: "",
    };
  },
  computed: {},
  methods: {
    onSearch() {
      this.$emit("onSearch", this.keyword);
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
    width: 80%;
    text-align: center;
    .uni-input-input {
      border-bottom: 4rpx solid $base-color !important;
      border-radius: 0 !important;
      padding-left: 0;
    }
    .u-search__action {
      span {
        color: $base-color;
        font-weight: bold;
      }
    }

    .search-history {
      color: $base-color;
      line-height: 59rpx;
      font-size: $uni-font-size-base;
      font-weight: bolder;
      margin-top: $uni-spacing-col-sm;
    }

    .search-notfound {
      color: $base-color;
      line-height: 59rpx;
      font-size: $uni-font-size-base;
      font-weight: bolder;
      margin-top: $uni-spacing-col-hg;
    }
    .search-tofind {
      width: 400rpx;
      height: 80rpx;
      line-height: 80rpx;
      border: 4rpx solid $base-color;
      font-weight: bold;
      color: $base-color;
      font-size: $uni-font-size-base;
      margin: $uni-spacing-col-sm auto;
    }
    .completion_content {
      padding: $uni-spacing-col-lg;
      .completion_p {
        color: $base-color;
        font-size: $uni-font-size-base;
        text-align: left;
      }
    }
  }
}
</style>
