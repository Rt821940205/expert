<template>
  <view class="achementlist-container">
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
    <view
      v-if="!loading"
      class="achment-list"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="achment-list__item"
      >
        <view class="index">{{ index + 1 }}</view>
        <view class="key">
          <view class="first">项目</view>
          <view class="other">归属机构</view>
          <view class="other">标题</view>
        </view>
        <view class="value">
          <view class="first">{{ item.year }}</view>
          <view class="other">{{ item.instituteAll }}</view>
          <view class="other ellipsis">{{ item.title }}</view>
        </view>
        <view class="btn">
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
    <view
      v-if="loading"
      class="loading"
    >
      <u-loading-icon></u-loading-icon>
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
      loading: false,
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      const { data } = await Api.getUserResourceNum({});
      this.tabList = this.changeRetToTabList(data);
      await this.tabChange(this.tabList[0]);
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
      this.loading = true;
      const { data } = await Api.getUserResourcePage(param);
      this.list = data;
      this.loading = false;
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
.achementlist-container {
  .header {
    padding: $zgd-arrow-padding;
  }
  .achment-nav {
    margin-top: -25rpx;
    padding: 0 50rpx 12rpx 50rpx;
  }

  .achment-list {
    padding: 0 $uni-spacing-row-base;
    padding-bottom: $uni-spacing-col-hg;

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
      font-size: $uni-font-size-base;
      .index {
        color: $base-color;
        width: 20rpx;
      }
      .key {
        width: 102rpx;
        margin-left: 20rpx;
        display: flex;
        flex-flow: column nowrap;
        > view {
          flex: 1;
        }
        .first {
          color: $base-color;
        }
        .other {
          font-size: $uni-font-size-sm;
        }
      }

      .value {
        flex: 1;
        display: flex;
        margin-left: 20rpx;
        flex-flow: column nowrap;
        font-size: $uni-font-size-base;
        > view {
          flex: 1;
        }

        .first {
          color: $base-color;
        }

        .other {
          font-size: $uni-font-size-sm;
        }

        .ellipsis {
          @include ellipsis();
          width: 390rpx;
        }
      }

      .btn {
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

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -24rpx;
  }
}
</style>
