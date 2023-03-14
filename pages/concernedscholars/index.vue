<template>
  <!-- 关注学者 -->
  <view class="app">
    <view class="header">
      <view class="logo">
        <image src="@/static/schoolBadge.png" />
      </view>
    </view>
    <view class="search-bar">
      <view class="inputView">
        <input
          type="text"
          v-model="theme"
          placeholder="可输入研究关键词或者学者姓名"
        />
      </view>
      <view class="button-view">
        <button
          type="primary"
          class="btn"
          @click="searchDaniu"
        >搜索</button>
      </view>
    </view>
    <view class="seegment-view">
      <button
        type="default"
        plain="true"
        :class="{'button-select': selectFirst === true }"
        @click="clickMyFollowList"
      >我的关注</button>
      <button
        type="default"
        plain="true"
        :class="{'button-select': selectFirst === false}"
        @click="clickDaniu"
      >校内学者</button>
    </view>
    <view class="content">
      <list
        v-show="selectFirst === true"
        :list="list"
        @update:item="toItem"
      />
      <listdaniu
        v-show="selectFirst === false"
        :list="daniuList"
        @update:item="toFollow"
      />
    </view>
  </view>
</template>

<script>
import List from "./list.vue";
import Listdaniu from "./listdaniu.vue";
import Api from "@/server/index.js";
export default {
  components: {
    List,
    Listdaniu,
  },
  data() {
    return {
      list: [],
      daniuList: [],
      selectFirst: true, //默认选择第一个
      theme: "", //搜索关键字
    };
  },
  async onShow() {
    await this.init();
  },
  methods: {
    init() {
      this.updateFollowList();
    },
    //
    async updateFollowList() {
      const { data } = await Api.getUserBuddyPage({
        userId: "35",
      });
      this.list = data;
    },
    async searchDaniu() {
      this.selectFirst = false;
      if (!this.theme.length) {
        this.daniuList = [];
        return;
      }
      const { data } = await Api.findScholarByUserId({
        userId: "35",
        keyWords: this.theme,
      });
      console.log("data", data);
      this.daniuList = data;
    },
    async toFollow(id) {
      await Api.addUserBuddy({
        userId: "35",
        buddyUserId: id,
      });
      uni.showToast({
        title: "关注成功",
      });
      this.updateFollowList();
    },
    toItem(sItem) {
      console.log("buddyId: " + JSON.stringify(sItem.buddyId));
      console.log("id: " + JSON.stringify(sItem.id));

      uni.navigateTo({
        url:
          "/pages/visitingcard/index?id=" +
          sItem.id +
          "&buddyId=" +
          sItem.buddyId,
      });
    },
    clickMyFollowList() {
      this.selectFirst = true;
    },
    clickDaniu() {
      this.selectFirst = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .header {
    height: 64rpx;
    padding: 86rpx 50rpx 8rpx 50rpx;
    .logo {
      height: 64rpx;
      font-size: 0;
      image {
        width: 300rpx;
        height: 64rpx;
      }
    }
  }
  .search-bar {
    display: flex;
    height: 100rpx;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .inputView {
      border-radius: 30rpx;
      border: 2rpx solid $base-color;
      width: 80%;
      margin-left: 40rpx;

      input {
        font-size: 28rpx;
        height: 60rpx;
        margin-left: 10rpx;
        margin-right: 10rpx;
      }
    }
    .button-view {
      margin-left: 10rpx;
      margin-right: 40rpx;
      height: 60rpx;
      width: 20%;
      button {
        font-size: 28rpx;
        width: 100%;
        line-height: 60rpx;
        background-color: $base-color;
      }
    }
  }
  .seegment-view {
    justify-content: center;
    align-content: center;
    margin-top: 20rpx;
    display: flex;
    gap: $uni-spacing-row-base;
    height: 60rpx;
    width: 100%;

    button {
      margin-left: 0rpx;
      margin-right: 0rpx;
      font-size: 28rpx;
      line-height: 60rpx;
      width: 45%;
      border: 2rpx solid $base-color;
      color: $base-color;
    }
    .button-select {
      background: $base-color;
      color: white;
    }
  }
  .content {
    padding: 0rpx 25rpx 0rpx 25rpx;
  }
}
</style>
