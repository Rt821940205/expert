<template>
  <view class="list">
    <view
      v-for="(sItem, sIndex) in list"
      :key="sIndex"
      class="list-item__info"
    >
      <view class="top">
        <view class="left">
          <button
            type="default"
            :class="{'followStyle':sItem.isfocus != '0'}"
            @click="searchDaniu(sItem.user_id,sItem)"
          >关注</button>
          <image
            :src="sItem.avatarPath"
            v-if="sItem.avatarPath"
          />
          <image
            v-if="!sItem.avatarPath"
            src="../../static/home/default-user-header2.png"
          />
        </view>
        <view class="right">
          <view>{{ sItem.scholar_name }}</view>
          <view>{{ sItem.institute }} - {{ sItem.professional_title || '暂无' }}</view>
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
    searchDaniu(id, item) {
      this.$emit("update:item", id);
      item.isfocus = "1";
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
      margin-top: 20rpx;
      background: rgba(220, 221, 222, 0.26);
      margin-bottom: 20rpx;

      .top {
        height: 232rpx;
        display: flex;
        padding: 30rpx 30rpx 0rpx 30rpx;

        .left {
          button {
            color: white;
            background: $base-color;
            line-height: 64rpx;
            height: 64rpx;
          }
          .followStyle {
            color: black;
            background: white;
          }
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
