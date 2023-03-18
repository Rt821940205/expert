<template>
  <view class="extraInfo">
    <view class="title">完善信息可帮助您拓展科研合作和精准学术文献推送。</view>
    <view>
      <view>头像</view>
      <view>
        <image :src="form.userImg" />
      </view>
      <view>
        <u-icon
          name="arrow-right"
          color="#316B7A"
          size="18"
          @click="toHeader"
        />
      </view>
    </view>
    <view>
      <view>研究方向</view>
      <view>{{ researchDirectionCount }}个</view>
      <view>
        <u-icon
          name="arrow-right"
          color="#316B7A"
          size="18"
          @click="toResearchDirection"
        />
      </view>
      <text>补全研究方向，有助于为您推荐科研项目，拓展科研合作</text>
    </view>
    <view>
      <view>英文名</view>
      <view>{{ eUserNameCount }}个</view>
      <view>
        <u-icon
          name="arrow-right"
          color="#316B7A"
          size="18"
          @click="toEnglishName"
        />
      </view>
      <text>补全使用英文名，有助于发现您更多的研究成果</text>
    </view>
    <view>
      <view>个人简介</view>
      <view v-if="!isShowProfile">
        <view>{{ form.userDetail }}</view>
        <view class="btn">
          <image
            src="@/static/common/update@2x.png"
            @click="toEditPersonalProfile"
          />
        </view>
      </view>
      <view v-else>
        <u--form
          ref="form"
          label-width="0"
          :model="form"
          :rules="rules"
        >
          <u-form-item
            name="userDetail"
            prop="userDetail"
          >
            <u--textarea
              v-model="form.userDetail"
              type="textarea"
              placeholder="补全个人简历有助于您的学术交流和科研合作。"
            />
          </u-form-item>
        </u--form>
        <view
          class="btn"
          @click.stop="confirm"
        >
          确定
        </view>
      </view>
    </view>
  </view>
</template>
  <script>
import Api from "@/server/index.js";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      isShowProfile: false,
      rules: Object.freeze({
        userDetail: {
          rules: [
            {
              required: true,
              errorMessage: "请输入个人简介",
            },
          ],
        },
      }),
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.home.user,
    }),
    ...mapGetters({
      researchDirectionCount: "researchDirectionCounts",
      eUserNameCount: "eUserNames",
    }),
  },
  methods: {
    toHeader() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/picture",
      });
    },
    toResearchDirection() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/researchDirection",
      });
    },
    toEnglishName() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/englishName",
      });
    },
    toEditPersonalProfile() {
      this.isShowProfile = !this.isShowProfile;
    },
    async confirm() {
      this.$refs.form
        .validate()
        .then(async (res) => {
          //     // await API.home.updateUserByUserNo(this.form);
          this.isShowProfile = !this.isShowProfile;
        })
        .catch((errors) => {});
    },
  },
};
</script>
  <style lang="scss" scoped>
.extraInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  padding: 22rpx 8rpx 22rpx 8rpx;
  .title {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-base;
  }
  > view:nth-child(2) {
    height: 182rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-bottom: 1px dashed $base-border-color;
    > view:first-child {
      width: 108rpx;
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
    position: relative;
    border-bottom: 1px dashed $base-border-color;
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