<template>
  <view class="app">
    <view class="header">
      <tNav title="成果管理" />
    </view>
    <view class="achment-nav">
      <view class="tabs">
        <u-tabs
          :list="tabList"
          @click="tabChange"
        ></u-tabs>
      </view>
    </view>
    <view class="achment-list">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="achment-list__item"
      >
        <view>{{ index + 1 }}</view>
        <view>
          <view>项目</view>
          <view>归属机构</view>
          <view>标题</view>
        </view>
        <view>
          <view>{{ item.year }}</view>
          <view>{{ item.instituteAll }}</view>
          <view>{{ item.title }}</view>
        </view>
        <view>
          <view @click="remove(item)">
            删除
          </view>
          <view />
          <view @click="goAchmentDetail(item)">
            详情
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import { dictionary } from "@/utils/dic";
export default {
  data() {
    return {
      tabList: [],
      tabCur: 0,
      list: [],
      needUpdate: false,
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      const { data } = await Api.getUserResourceNum({});
      this.tabList = this.changeRetToTabList(data);
      await this.tabChange(0);
    },
    changeRetToTabList(arr) {
      return arr.map((item) => ({
        resourceCode: item.resourceCode,
        name: dictionary[item.resourceCode],
        num: Number(item.num),
        badge: {
          value: item.num,
        },
      }));
    },
    async getUserResourcePage(resourceCode) {
      const param = {
        resourceCode: resourceCode,
        orderByType: 1,
        pageNo: 1,
        pageSize: 100,
      };
      const { data } = await Api.getUserResourcePage(param);
      this.list = data;
    },
    async tabChange(tab) {
      this.tabCur = tab.index;
      const { resourceCode } = tab;
      await this.getUserResourcePage(resourceCode);
    },
    async remove(item) {
      const { code } = await Api.delUserResource({
        idList: item.id,
      });
      if (code == 1) {
        const index = this.list.findIndex((sItem) => sItem.id === item.id);
        this.list.splice(index, 1);
        const { data } = await Api.getUserResourceNum({});
        this.tabList = await this.changeRetToTabList(data);
        uni.showToast({
          title: "删除成功",
          icon: "none",
        });
      }
    },
    goAchmentDetail(item) {
      const { resource_id, resource_code } = item;
      uni.navigateTo({
        url: `/pages/compage/achment-detail?id=${resource_id}&code=${resource_code}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  .header {
    height: 64rpx;
    padding: 86rpx 50rpx 8rpx 50rpx;
  }

  .achment-nav {
    height: 100rpx;
    padding: 12rpx 50rpx 12rpx 50rpx;
  }

  .achment-list {
    padding: 0rpx 50rpx 0rpx 50rpx;

    &__item {
      height: 178rpx;
      background: linear-gradient(
        to bottom right,
        rgba(75, 195, 226, 0.2) 0%,
        rgba(255, 255, 255, 1) 30%
      );
      display: flex;
      flex-flow: row nowrap;
      padding: 20rpx 20rpx 0rpx 20rpx;
      border: 1px solid $base-color;
      margin-bottom: 20rpx;

      > view:first-child {
        font-family: PingFangSC-Medium, sans-serif;
        font-size: $uni-font-size-base;
        color: $base-color;
        width: 20rpx;
      }

      > view:nth-child(2) {
        width: 102rpx;
        margin-left: 20rpx;
        display: flex;
        flex-flow: column nowrap;

        > view:first-child {
          font-family: PingFangSC-Medium, sans-serif;
          font-size: $uni-font-size-base;
          color: $base-color;
          flex: 1;
        }

        > view:nth-child(2) {
          font-family: PingFangSC-Light, sans-serif;
          font-size: $uni-font-size-sm;
          flex: 1;
        }

        > view:last-child {
          font-family: PingFangSC-Light, sans-serif;
          font-size: $uni-font-size-sm;
          flex: 1;
        }
      }

      > view:nth-child(3) {
        flex: 1;
        display: flex;
        margin-left: 20rpx;
        flex-flow: column nowrap;

        > view:first-child {
          font-family: PingFangSC-Medium, sans-serif;
          font-size: $uni-font-size-base;
          color: $base-color;
          flex: 1;
        }

        > view:nth-child(2) {
          font-family: PingFangSC-Light, sans-serif;
          font-size: $uni-font-size-sm;
          flex: 1;
        }

        > view:last-child {
          font-family: PingFangSC-Light, sans-serif;
          font-size: $uni-font-size-sm;
          flex: 1;
          // display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 390rpx;
          // -webkit-line-clamp: 1;
          // -webkit-box-orient: vertical;
        }
      }

      > view:last-child {
        font-family: PingFangSC-Medium, sans-serif;
        font-size: $uni-font-size-sm;
        color: $base-color;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

        view {
          flex: 1;
        }
      }
    }
  }
}
</style>
