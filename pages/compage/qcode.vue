<template>
  <view class="app">
    <view class="header">
      <tNav title="我的二维码" color="white" />
    </view>
    <view class="content">
      <view class="content-info">
        <view class="logo">
          <image src="@/static/home/logo1@2x.png" />
        </view>
        <view class="user">
          <view class="user__pic">
            <image :src="userInfo.userImg" />
          </view>
          <view>
            <view
              ><text>{{ userInfo.userName }}</text
              >{{ getEName(userInfo.eUserName) }}</view
            >
            <view>{{ userInfo.jobTitle }}</view>
            <view>{{ userInfo.subject }}</view>
          </view>
        </view>
        <view class="QrCode">
          <div id="qrCode" ref="qrCodeDiv" />
        </view>
      </view>
    </view>
    <view class="des">
      <view>扫一扫，访问我的主页</view>
      <view>长按保存名片到相册</view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      userInfo: {},
      sn: "",
    };
  },
  onLoad(option) {
    this.sn = option.sn;
  },
  async mounted() {
    await this.init();
    await this.$nextTick();
    this.bindQRCode();
  },
  methods: {
    async init() {
      await this.getUserByUserNo();
    },
    async getUserByUserNo() {
      const params = { userNo: this.sn };
      const { data } = await Api.getUserByUserNo(params);
      this.userInfo = data;
    },

    getEName(eNames) {
      if (eNames) {
        const _eNames = JSON.parse(eNames);
        return _eNames.find((item) => !!item.isSelect).name;
      }
    },

    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "http://dev.heidutech.com:14281/#/?sn=" + this.userInfo.userNo,
        width: 200,
        height: 200,
        colorDark: "#316B7A",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(133, 171, 179, 1),
    rgba(49, 107, 122, 1)
  );
  .header {
    // height: 64rpx;
    padding: $zgd-nav-padding;
  }
  .content {
    padding: 0 50rpx 0 50rpx;
    margin-top: 40rpx;
    .content-info {
      padding: 50rpx;
      background: white;
      .logo {
        height: 64rpx;
        font-size: 0;
        image {
          width: $zgd-logo-w;
          height: $zgd-logo-h;
        }
      }
      .user {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1rpx solid #85abb3;
        margin-top: 50rpx;
        padding-bottom: 60rpx;
        &__pic {
          width: 160rpx;
          font-size: 0;
          image {
            width: 160rpx;
            height: 160rpx;
          }
        }
        > view:last-child {
          display: flex;
          flex-flow: column nowrap;
          margin-left: 34rpx;
          view {
            flex: 1;
            font-size: $uni-font-size-lg;
          }
          text {
            font-size: $uni-font-size-hg;
            font-family: PingFangSC-Medium, sans-serif;
            margin-right: 20rpx;
          }
        }
      }
      .QrCode {
        padding: 76rpx;
        text-align: center;
      }
    }
  }
  .des {
    margin-top: 50rpx;
    color: white;
    text-align: center;
    font-size: $uni-font-size-lg;
    view:last-child {
      margin-top: 20rpx;
    }
  }
}
</style>
