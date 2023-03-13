<template>
  <view class="list">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="list-item"
    >
      <view class="list-item__chart">
        <view>{{ item.fistPY }}</view>
        <view>({{ item.num }})</view>
      </view>
      <view
        v-for="(sItem, sIndex) in item.data"
        :key="sIndex"
        class="list-item__info"
        @click="toItem(sItem)"
      >
        <view class="top">
          <view class="left">
            <image
              :src="sItem.userImg"
              v-if="sItem.userImg"
            />
            <image
              src="../../static/home/default-user-header2.png"
              mode=""
              v-show="sItem.userImg === null"
            ></image>
          </view>
          <view class="right">
            <view>{{ sItem.userName }}</view>
            <view>{{ getEUserName(sItem.eUserName) }}</view>
            <view>{{ sItem.institute }} - {{ sItem.jobTitle || '暂无' }}</view>
            <view>{{ sItem.subject }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    getEUserName(value) {
      try {
        const name = JSON.parse(value)[0].name;
        return name;
      } catch (e) {
        //TODO handle the exception
        return " 1";
      }
    },
    toItem(sItem) {
      this.$emit("update:item", sItem);
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .list-item {
    &__chart {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 72rpx;
      font-family: PingFangSC-Light, sans-serif;
      text-align: right;
      color: $base-color;
      view:first-child {
        flex: 1;
        font-size: $uni-font-size-hg;
      }
      view:last-child {
        width: 50rpx;
        font-size: $uni-font-size-lg;
      }
    }
    &__info {
      background: rgba(220, 221, 222, 0.26);
      margin-bottom: 20rpx;
      .top {
        height: 168rpx;
        display: flex;
        padding: 30rpx 30rpx 0rpx 30rpx;
        .left {
          width: 168rpx;
          font-size: 0;
          image {
            height: 168rpx;
            width: 168rpx;
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: flex-end;
          view:first-child {
            font-family: PingFangSC-Medium, sans-serif;
            font-size: $uni-font-size-lm;
            flex: 1;
          }
          view:nth-child(2) {
            font-family: PingFangSC-Light, sans-serif;
            font-size: $uni-font-size-sm;
            flex: 1;
          }
          view:nth-child(3) {
            font-family: PingFangSC-Light, sans-serif;
            font-size: $uni-font-size-sm;
            flex: 1;
          }
          view:last-child {
            display: -webkit-box;
            -webkit-box-oriet: vertical;
            -webkit-line-clap: 4;
            overflow: hidden;
            font-family: PingFangSC-Light, sans-serif;
            font-size: $uni-font-size-sm;
            flex: 1;
          }
        }
      }
      .bottom {
        padding-bottom: 15rpx;
        text {
          color: $contrast-color;
          font-size: $uni-font-size-sm;
          transform: scale(0.8);
          transform-origin: 0;
        }
        text-align: right;
      }
    }
  }
}
</style>