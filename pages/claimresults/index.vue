<template>
  <view class="u-page">
    <u-image
      :showLoading="true"
      src="/static/schoolBadge.png"
      width="245rpx"
      height="49rpx"
      :style="{
          marginLeft: '35rpx',
          marginTop: '58rpx'
      }"
      class="test"
    ></u-image>
    <view>
      <u-text
        text="成果认领"
        align="center"
        size="36rpx"
        lineHeight="93rpx"
        class="title"
      ></u-text>
    </view>

    <u-line></u-line>
    <u-tabs
      :list="list"
      :current="tabIndex"
      active-color="#316B7A"
      lineColor="#85ABB3"
      lineWidth="80"
      :inactiveStyle="{
				color:'#85ABB3',
				fontSize: '24rpx'
      }"
      :activeStyle="{
				color: '#316B7A',
				fontSize: '24rpx'
			}"
      :itemStyle="{
        height:'60rpx'
      }"
      @change="tabChange"
    ></u-tabs>

    <view class="swiper-container">
      <swiper
        :current="tabIndex"
        class="swiper-box"
        :duration="300"
        @animationfinish="onSwiperEnd"
        @change="onSwiperChange"
      >
        <swiper-item
          class="swiper-item"
          v-for="(tab, index) in list.length"
          :key="index"
        >
          <view v-if="index == 0">
            <tab0 />
          </view>
          <view v-else-if="index == 1">
            <tab0 />
          </view>
          <view v-else>
            <tab2 isSearch />
          </view>

        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import tab0 from "@/components/tab0";
import tab2 from "@/components/tab2";
import Api from "@/server/index.js";
export default {
  components: {
    tab2,
    tab0,
  },
  data() {
    return {
      list: Object.freeze([
        {
          name: "未查看成果",
        },
        {
          name: "已查看成果",
        },
        {
          name: "搜索成果",
        },
      ]),
      tabIndex: 0,
    };
  },
  onLoad() {},
  methods: {
    getUserByUserNo(params) {
      Api.getUserByUserNo(params)
        .then((res) => {
          console.log(res, "res");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tabChange(tab) {
      this.tabIndex = tab.index;
      this.isSearch = true;
    },
    onSwiperEnd() {},
    onSwiperChange(e) {
      this.tabIndex = e.detail.current;
      this.isSearch = true;
    },
    getList() {},
  },
};
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.u-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $uni-spacing-row-base $uni-spacing-col-base;
  padding-top: $uni-spacing-col-sm;

  ::v-deep {
    .title {
      border-bottom: 1px solid;
      border-image: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1),
          rgba(49, 107, 122, 1)
        )
        1 1;
      span {
        color: $base-color;
      }
    }
    .u-tabs__wrapper__nav {
      justify-content: space-between;
      .u-tabs__wrapper__nav__item {
        flex: 1;
      }
    }

    .swiper-container {
      flex: 1;
      // padding: 39rpx 0 39rpx 0;

      .swiper-box {
        height: 100%;
      }

      .uni-scroll-view-content {
        > view {
          padding-bottom: 200px;
        }
      }
    }

    .reslut-item {
      margin-bottom: 21rpx;
    }
  }
}
</style>
