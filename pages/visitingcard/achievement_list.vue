<template>
  <view class="container">
    <view class="container-title">
      <view>
        我的成果（{{ total }}）
      </view>
      <view
        class="right"
        @click.stop="toList"
      >
        成果管理
      </view>
    </view>
    <view class="tabs">
      <u-tabs
        :list="achievementList"
        @click="click"
      ></u-tabs>
    </view>
    <view class="list">
      <view
        class="list_item"
        v-for="(item, index) in achievementPageList"
        :key="index"
        @click="goAchmentDetail(item)"
      >
        <view class="item_header">
          <view class="item_header_l">{{ index + 1 }}</view>
          <view class="item_header_c">
            <view class="header_c_tit">
              {{ item.title }}
            </view>
            <view class="com_text">{{
              keyWordTran(item.creatorAll || "")
            }}</view>
            <view class="com_text">{{ keyWordTran(item.keyword || "") }}</view>
            <view class="com_text">{{ item.journal }}</view>
          </view>
          <view class="item_header_r">新！</view>
        </view>
        <view class="item_footer">查看原文</view>
      </view>
      <view class="achment-operate">
        <view>
          <image
            v-show="showUpImg"
            src="@/static/home/arrow-up.png"
          />
          <image
            v-show="!showUpImg"
            src="@/static/home/arrow-down.png"
          />
        </view>
        <view>
          <image
            src="@/static/home/time_new.png"
            @click="sortByTime"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { keyWordTran } from "@/utils/common.js";
export default {
  data() {
    return {
      loading: true,
      showUpImg: true,
    };
  },
  props: {
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    achievementPageList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    total() {
      return this.achievementList.reduce(
        (pre, next) => pre + +next.badge.value,
        0
      );
    },
  },
  methods: {
    keyWordTran,
    click(item) {
      this.$emit("getList", item.resourceCode);
    },
    goAchmentDetail(item) {
      const { resource_id, resource_code } = item;
      uni.navigateTo({
        url: `/pages/compage/achment-detail?id=${resource_id}&code=${resource_code}`,
      });
    },
    sortByTime() {
      this.showUpImg = !this.showUpImg;
      this.$emit("sortByTime");
    },
    toList() {
      uni.navigateTo({
        url: "/pages/compage/achmentList",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .container-title {
    display: flex;
    justify-content: space-between;
    height: 88rpx;
    line-height: 88rpx;
    padding: 0 50rpx;
    view {
      flex: 1;
    }
    .right {
      text-align: right;
    }
  }

  .tabs {
    padding: 20rpx 60rpx;
  }

  .list {
    margin-top: 20rpx;
    position: relative;
    .list_item {
      padding: 30rpx 40rpx 60rpx 60rpx;
      background: -webkit-linear-gradient(
        top left,
        rgba(75, 195, 226, 0.2) 0%,
        white 30%
      );
      background: linear-gradient(
        to bottom right,
        rgba(75, 195, 226, 0.2) 0%,
        white 30%
      );

      .item_header {
        display: flex;
        justify-content: space-between;

        .item_header_l {
          width: 10%;
        }

        .item_header_c {
          width: 75%;
          font-size: 28rpx;

          .header_c_tit {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .com_text {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 20rpx;
            margin-top: 20rpx;
          }
        }

        .item_header_r {
          width: 15%;
          display: flex;
          justify-content: flex-end;
          font-size: 28rpx;
          color: #ad1528;
        }
      }

      .item_footer {
        font-size: 24rpx;
        display: flex;
        justify-content: flex-end;
        color: #316b7a;
      }
    }

    .achment-operate {
      display: flex;
      position: absolute;
      top: -$uni-spacing-col-hg;
      right: $uni-spacing-row-lg;
      gap: 10rpx;

      view {
        flex: 1;
        image {
          width: $uni-img-size-sm;
          height: $uni-img-size-sm;
        }
      }
    }
  }
}
</style>
