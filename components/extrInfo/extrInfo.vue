<template>
  <view class="extraInfo">
    <view>完善信息可帮助您拓展科研合作和精准学术文献推送。</view>
    <view>
      <view>头像</view>
      <view>
        <image :src="form.userImg" />
      </view>
      <view>
        <uni-icons
          type="arrowright"
          size="18"
          color="#316B7A"
          @click="toHeader"
        />
      </view>
    </view>
    <view @click="toResearchDirection">
      <view>研究方向</view>
      <view>{{ researchDirectionCount }}个</view>
      <view>
        <uni-icons
          type="arrowright"
          size="18"
          color="#316B7A"
        />
      </view>
      <text>补全研究方向，有助于为您推荐科研项目，拓展科研合作</text>
    </view>
    <view @click="toEnglishName">
      <view>英文名</view>
      <view>{{ eUserNameCount }}个</view>
      <view>
        <uni-icons
          type="arrowright"
          size="18"
          color="#316B7A"
        />
      </view>
      <text>补全使用英文名，有助于发现您更多的研究成果</text>
    </view>
    <view>
      <view>个人简介</view>
      <view v-if="!show">
        <view>{{ form.userDetail }}</view>
        <view class="btn">
          <image
            src="@/static/common/update@2x.png"
            @click="toEditPersonalProfile"
          />
        </view>
      </view>
      <view v-else>
        <uni-forms
          ref="form"
          label-width="0"
          :model-value="form"
          :rules="rules"
        >
          <uni-forms-item
            name="userDetail"
            label=""
          >
            <uni-easyinput
              v-model="form.userDetail"
              type="textarea"
              placeholder="补全个人简历有助于您的学术交流和科研合作。"
            />
          </uni-forms-item>
        </uni-forms>
        <view
          class="btn"
          @click="confirm"
        >
          确定
        </view>
      </view>
    </view>
  </view>
</template>
  <script>
// import API from "@/apis";
export default {
  data() {
    return {
      show: false,
      rules: {
        userDetail: {
          rules: [
            {
              required: true,
              errorMessage: "请输入个人简介",
            },
          ],
        },
      },
    };
  },

  computed: {
    form() {
      return this.$store.state.home.user;
    },
    researchDirectionCount() {
      return !!this.form.researchDirection
        ? JSON.parse(this.form.researchDirection).length
        : 0;
    },

    eUserNameCount() {
      return !!this.form.eUserName ? JSON.parse(this.form.eUserName).length : 0;
    },
  },

  methods: {
    toHeader() {
      uni.navigateTo({
        url: "/pages/home/user/extraInfo/header",
      });
    },

    toResearchDirection() {
      uni.navigateTo({
        url: "/pages/home/user/extraInfo/researchDirection",
      });
    },

    toEnglishName() {
      uni.navigateTo({
        url: "/pages/home/user/extraInfo/englishName",
      });
    },

    toEditPersonalProfile() {
      this.show = !this.show;
    },

    async confirm() {
      //   this.$refs.form.validate(async (err) => {
      //     if (!err) {
      //       await API.home.updateUserByUserNo(this.form);
      //       this.show = !this.show;
      //     }
      //   });
    },
  },
};
</script>
  <style lang="scss" scoped>
.extraInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  border: 1px solid $base-border-color;
  padding: 22rpx 8rpx 22rpx 8rpx;
  background: $base-background-color;
  > view:first-child {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: 24rpx;
  }
  > view:nth-child(2) {
    height: 182rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $base-border-color;
    > view:first-child {
      width: 108rpx;
      font-family: PingFangSC-Medium, sans-serif;
      font-size: $uni-font-size-base;
    }
    > view:nth-child(2) {
      flex: 1;
      text-align: right;
      font-size: 0;
      image {
        width: 130rpx;
        height: 130rpx;
      }
    }
    > view:last-child {
      width: 60rpx;
      text-align: center;
    }
  }
  > view:nth-child(3),
  > view:nth-child(4) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 104rpx;
    // line-height: 104rpx;
    position: relative;
    border-bottom: 1px solid $base-border-color;
    > view:first-child {
      width: 118rpx;
      font-family: PingFangSC-Medium, sans-serif;
      font-size: $uni-font-size-base;
    }
    > view:nth-child(2) {
      flex: 1;
      text-align: right;
      font-size: $uni-font-size-base;
    }
    > view:nth-child(3) {
      width: 60rpx;
      text-align: center;
    }
    > text {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: $uni-font-size-sm;
      color: $base-chart-color;
    }
  }
  > view:last-child {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-top: 34rpx;
    > view:first-child {
      font-family: PingFangSC-Medium, sans-serif;
      font-size: $uni-font-size-base;
    }
    > view:last-child {
      font-size: $uni-font-size-base;
      color: $base-chart-color;
      width: 602rpx;
    }
    .btn {
      text-align: right;
      margin-top: 20rpx;
      margin-right: 30rpx;
      font-size: $uni-font-size-base;
      color: $base-color;
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
}
</style>