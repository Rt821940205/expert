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
        color="#050504"
        size="36rpx"
        lineHeight="93rpx"
      ></u-text>
    </view>

    <u-line></u-line>
    <u-tabs
      :list="list"
      :current="tabIndex"
      active-color="#194DA5"
      lineColor="#194DA5"
      lineWidth="50"
      :inactiveStyle="{
				color:'#A0A9B8',
				fontSize: '24rpx'
      }"
      :activeStyle="{
				color: '#050504',
				fontSize: '24rpx'
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
          <!-- 查找 -->
          <seach-input
            v-if="isSearch"
            @onSearch="handleSearch"
          ></seach-input>
          <!-- 列表 -->
          <block v-else>
            <u-list @scrolltolower="scrolltolower">
              <u-list-item
                v-for="(item, index) in 100"
                :key="index"
              >
                <result-item
                  class="reslut-item"
                  :detail="{
                  title:'膜活性肽强化多功能复合微粒基因载体的构建及',
                  type:'项目',
                  time:'2012',
                  author:'王文英'
                }"
                  :index="index + 1"
                >
                  {{ index }}
                </result-item>
              </u-list-item>
            </u-list>

          </block>
        </swiper-item>
      </swiper>
    </view>

  </view>
</template>

<script>
import seachInput from "../../components/seachInput/index.vue";
import resultItem from "../../components/resultItem/index.vue";
export default {
  components: {
    seachInput,
    resultItem,
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
      isLoading: false,
      isSearch: true,
    };
  },
  onLoad() {
    this.loadmore();
  },
  methods: {
    tabChange(tab) {
      this.tabIndex = tab.index;
      this.isSearch = true;
    },
    onSwiperEnd() {},
    onSwiperChange(e) {
      this.tabIndex = e.detail.current;
      this.isSearch = true;
    },
    scrolltolower() {
      this.loadmore();
    },
    loadmore() {},
    getList() {},
    // 搜索
    handleSearch(val) {
      // 1. 调用搜索接口
      this.isSearch = false;
    },
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

  ::v-deep {
    .u-tabs__wrapper__nav {
      justify-content: space-between;
      .u-tabs__wrapper__nav__item {
        flex: 1;
      }
    }

    .swiper-container {
      flex: 1;
      padding: 39rpx 16rpx 39rpx 33rpx;

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
