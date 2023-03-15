<template>
  <view class="header">
    <view class="header_t">
      <view class="header_t_l">
        <image src="@/static/home/logo@2x.png"></image>
      </view>
      <view class="header_t_r">
        <image src="@/static/home/share.png"></image>
        <image src="@/static/home/QRcode.png"></image>
        <image src="@/static/home/update.png"></image>
      </view>
    </view>
    <view class="header_c">
      <view class="header_c_l">
        <image :src="basicInfo.userImg" v-if="basicInfo.userImg" />
        <image
          v-if="!basicInfo.userImg"
          src="@/static/home/default-user-header.png"
        ></image>
      </view>
      <view class="header_c_r">
        <view class="name">
          <view class="CN_name">{{ basicInfo.userName }}</view>
          <view class="EN_name">
            <picker :value="0" :range="eUserName">
              <text class="name_text">{{
                eUserName.length > 0 && eUserName[0]
              }}</text>
              <image src="@/static/home/down_arrow.png" />
            </picker>
          </view>
        </view>
        <view class="com_text">ISNI: {{ basicInfo.userNo }}</view>
        <view class="com_text">{{ basicInfo.jobTitle }}</view>
        <view class="com_text">{{ basicInfo.subject }}</view>
      </view>
    </view>
    <view class="header_b">
      <view class="list">
        <u-tag
          v-for="item in researchDirection"
          :key="item"
          :text="item"
          size="mini"
          bgColor="rgba(255, 255, 255, 0.3)"
          border-color="transparent"
          shape="circle"
        ></u-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    basicInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    eUserName: {
      type: Array,
      default: function () {
        return [];
      },
    },
    researchDirection: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      aaa: "",
    };
  },
  watch: {
    basicInfo: {
      handler(cur, pre) {
        // console.log(cur, pre)
      },
      immediate: true,
      deep: true,
    },
  },
  onLoad() {
    console.log(this.eUserName);
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: -webkit-linear-gradient(bottom left, #316b7a, #85abb3);
  background: linear-gradient(to top right, #316b7a, #85abb3);
  padding: $zgd-logo-padding;

  .header_t {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header_t_l {
      image {
        width: $zgd-logo-w;
        height: $zgd-logo-h;
      }
    }

    .header_t_r {
      width: 150rpx;
      display: flex;
      justify-content: space-between;

      image {
        width: 28rpx;
        height: 28rpx;
      }
    }
  }

  .header_c {
    margin-top: 20rpx;
    display: flex;
    align-items: center;

    .header_c_l {
      margin-right: 35rpx;

      image {
        width: 150rpx;
        height: 160rpx;
      }
    }

    .header_c_r {
      color: #ffffff;

      .name {
        display: flex;
        align-items: center;

        .CN_name {
          font-size: 32rpx;
          margin-right: 40rpx;
        }

        .EN_name {
          display: flex;
          align-items: center;

          .name_text {
            font-size: 32rpx;
            margin-right: 10rpx;
          }

          image {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .com_text {
        font-size: 24rpx;
        margin-bottom: 5rpx;
      }
    }
  }

  .header_b {
    width: 100%;
    margin-top: 20rpx;

    .list {
      display: flex;
      flex-wrap: wrap;
      height: 200rpx;
      overflow-y: scroll;

      > view {
        margin-right: 20rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
