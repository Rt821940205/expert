<template>
  <view class="app">
    <view class="header">
      <image src="/static/schoolBadge.png"></image>
    </view>
    <view class="content">
      <view class="title">成果认领</view>
      <tabs
        @tabChange="tabChange"
        :tabs="list"
        :tabIndex="tabIndex"
      ></tabs>
      <view class="swiper-container">
        <view v-if="tabIndex == 0">
          <Achievementviewed />
        </view>
        <view v-else-if="tabIndex == 1">
          <Achievementnotviewed />
        </view>
        <view v-else>
          <Achievementsearch isSearch />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Achievementviewed from "./achievementviewed.vue";
import Achievementnotviewed from "./achievementnotviewed";
import Achievementsearch from "./achievementsearch";
import Api from "@/server/index.js";
export default {
  components: {
    Achievementviewed,
    Achievementnotviewed,
    Achievementsearch,
  },
  data() {
    return {
      list: [
        { name: "未查看成果" },
        { name: "已查看成果" },
        { name: "搜索成果" },
      ],
      tabIndex: 0,
    };
  },
  onLoad() {},
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
    getUserByUserNo(params) {
      Api.getUserByUserNo(params)
        .then((res) => {
          console.log(res, "res");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSwiperEnd() {},
    onSwiperChange(e) {
      this.tabIndex = e.detail.current;
    },
    getList() {},
  },
};
</script>

<style scoped lang="scss">
.app {
  .header {
    padding: $zgd-logo-padding;
    image {
      width: $zgd-logo-w;
      height: $zgd-logo-h;
    }
  }
  .content {
    padding: $zgd-content-padding;
    .title {
      color: $base-color;
      font-size: $uni-font-size-title;
      text-align: center;
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1),
          rgba(49, 107, 122, 1)
        )
        1 1;
    }
    .tabs {
      display: flex;
      justify-content: center;
      margin-bottom: 60rpx;
      .tabs-item {
        font-size: 30rpx;
        color: $main-color;
        width: 33%;
        text-align: center;
      }
      .active {
        color: $base-color;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 150rpx;
          height: 4rpx;
          background-color: $main-color;
          left: 50%;
          bottom: -20rpx;
          margin-left: -75rpx;
        }
      }
    }
  }
}
</style>
