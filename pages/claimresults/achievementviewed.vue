<template>
  <view class="claimList">
    <view
      class="result_item"
      v-for="(item, index) in achievementList"
      :key="item.id"
    >
      <view class="result_index">{{ index + 1 }}</view>
      <view class="result_content">
        <view class="result_row">
          <view>标题</view>
          <view>{{ item.title }}</view>
          <view>认领</view>
        </view>
        <view class="result_row">
          <view>类型</view>
          <view>{{ item.type }}</view>
        </view>
        <view class="result_row">
          <view>时间</view>
          <view>{{ item.year }}</view>
          <view style="bottom: 75%" @click="goAchmentDetail(item)">详情</view>
        </view>
        <view class="result_row">
          <view>作者</view>
          <view>{{ item.creator }}</view>
          <view>标为已查看</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import resultItem from "@/components/resultItem/index.vue";

export default {
  components: { resultItem },
  props: {
    yearList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    typeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      allClaim: true,
      btnList: [
        { name: "批量认领", type: "claimAll" },
        { name: "确认", type: "claimComit" },
        { name: "本页全选", type: "allselcet" },
      ],

      list: [],
    };
  },
  mounted() {},
  watch: {},
  methods: {
    goAchmentDetail(item) {
      const { id, resourceCode } = item;
      uni.navigateTo({
        url: `/pages/compage/achment-detail?id=${id}&code=${resourceCode}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.claimList {
  .result_item {
    border: 1px $base-color solid;
    padding: 20rpx;
    background: -webkit-linear-gradient(
      top left,
      rgba(75, 195, 226, 0.2) 0%,
      white 30%
    );
    background: linear-gradient(
      to bottom right,
      rgba(75, 195, 226, 0.2) 0%,
      white 30%
    );
    display: flex;
    margin-bottom: 15rpx;
    .result_index {
      width: 5%;
      font-size: $uni-font-size-base;
      color: $base-color;
    }
    .result_content {
      width: 95%;
      .result_row {
        display: flex;
        font-size: $uni-font-size-base;
        margin-bottom: 20rpx;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        > view:nth-child(1) {
          width: 15%;
        }
        > view:nth-child(2) {
          width: 60%;
          font-weight: bolder;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > view:nth-child(3) {
          position: absolute;
          width: 25%;
          color: $base-color;
          right: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
