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
        v-if="!loading"
      />
      <listdaniu
        v-show="selectFirst === false"
        :list="daniuList"
        @update:item="toFollow"
        v-if="!loading"
      />
      <view
        v-if="loading"
        class="loading"
      >
        <u-loading-icon></u-loading-icon>
      </view>
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
      theme: "", //搜索关键字,
      loading: false,
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
      const { data } = await Api.getUserBuddyPage({});
      this.list = data;
    },
    async searchDaniu() {
      this.selectFirst = false;
      if (!this.theme.length) {
        this.daniuList = [];
        return;
      }
      this.loading = true;
      const { data } = await Api.findScholarByUserId({
        keyWords: this.theme,
      });
      this.loading = false;
      this.daniuList = data;
    },
    async toFollow(id) {
      await Api.addUserBuddy({
        buddyUserId: id,
      });
      uni.showToast({
        title: "关注成功",
      });
      this.updateFollowList();
    },
    toItem(sItem) {
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
    padding: $zgd-logo-padding;
    .logo {
      image {
        width: $zgd-logo-w;
        height: $zgd-logo-h;
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
      margin-left: $uni-spacing-row-base;

      input {
        font-size: $uni-font-size-base;
        height: 60rpx;
        margin-left: $uni-spacing-row-lg;
      }
    }
    .button-view {
      margin-left: $uni-spacing-row-base;
      margin-right: $uni-spacing-row-base;
      height: 60rpx;
      width: 20%;
      button {
        font-size: $uni-font-size-base;
        width: 100%;
        line-height: 60rpx;
        background-color: $base-color;
      }
    }
  }
  .seegment-view {
    box-sizing: border-box;
    justify-content: space-between;
    align-content: center;
    margin-top: $uni-spacing-col-base;
    display: flex;
    // gap: $uni-spacing-row-base;
    height: 60rpx;
    width: 100%;
    padding: 0 $uni-spacing-row-base;

    button {
      margin-left: 0rpx;
      margin-right: 0rpx;
      font-size: $uni-font-size-base;
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
    padding: 0 $uni-spacing-row-base;
  }

  .loading {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -24rpx;
  }
}
</style>
