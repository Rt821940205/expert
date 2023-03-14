<template>
  <view class="app">
    <view class="content">
      <view class="header">
        <tNav title="成果认领" />
      </view>
      <view class="claim_information">
        <view class="claim_text">成果信息</view>
        <view class="claim_title">{{ content.title }}</view>
        <view class="claim_box">
          <view>类型：</view>
          <view>成果</view>
        </view>
        <view class="claim_box">
          <view>期刊：</view>
          <view>CHEM ENG J</view>
        </view>
        <view class="claim_box">
          <view>时间：</view>
          <view>{{ content.year }}</view>
        </view>
        <view class="claim_box">
          <view>作者：</view>
          <view>{{ content.participant }}</view>
        </view>
      </view>

      <view class="claim_completion">
        <view class="completion_text">信息补全</view>
        <view class="completion_type">成果类型确认</view>
        <view class="completion_radio">
          <u-radio-group
            v-model="value"
            placement="row"
            activeColor="#85abb3"
          >
            <u-radio
              label="自然科学"
              name="自然科学"
            ></u-radio>
            <u-radio
              label="社会科学"
              name="社会科学"
              :customStyle="{marginLeft: '8px'}"
            ></u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="completion_submit">
        <u-button text="提交"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import tNav from "@/components/tNav/tNav.vue";
import Api from "@/server/index.js";
export default {
  components: { tNav },
  data() {
    return {
      content: [],
      code: "",
      value: "自然科学",
    };
  },
  onload() {},
  created() {
    this.getList({
      id: "bd2e691b-ea92-0ae0-cafd-bab64debc453",
    });
  },
  methods: {
    async getList(id) {
      const { data } = await Api.getResourceById(id);
      this.content = data
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  .content {
    padding: 50rpx;

    .header {
      padding-bottom: 50rpx;
    }
    .claim_information {
      border-bottom: 2rpx dashed #ccc;
      padding-bottom: $uni-spacing-col-base;
      .claim_text {
        font-size: $uni-font-size-base;
        margin-bottom: $uni-spacing-col-base;
        font-weight: 700;
      }
      .claim_title {
        font-size: $uni-font-size-base;
        color: $base-color;
        margin-bottom: $uni-spacing-col-base;
      }

      .claim_box {
        font-size: $uni-font-size-base;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        margin-bottom: $uni-spacing-col-base;
        > view:nth-child(1) {
          width: 20%;
        }

        > view:nth-child(2) {
          width: 80%;
        }
      }
    }

    .claim_completion {
      margin-top: 21px;
      border-bottom: 2rpx dashed #ccc;

      .completion_text {
        font-size: $uni-font-size-base;
        margin-bottom: $uni-spacing-col-base;
        font-weight: 700;
      }

      .completion_type {
        font-size: $uni-font-size-base;
        margin-bottom: $uni-spacing-col-base;
      }
    }

    .completion_radio {
      padding-bottom: 22px;
    }

    .completion_submit uni-button {
      width: 164px;
      margin: 0 auto;
      height: 38px;
      line-height: 38px;
      text-align: center;
      color: #fff;
      background: #85abb3;
      font-size: 15px;
      margin-top: 16px;
    }
  }
}
</style>
