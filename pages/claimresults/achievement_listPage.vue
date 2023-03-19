<template>
  <view class="claim_list">
    <view class="result_item" v-for="(item, index) in achievementList" :key="item.id">
      <view class="result_index">{{ index + 1 }}</view>
      <view class="result_content">
        <view class="result_row">
          <view>标题</view>
          <view>{{ item.title }}</view>
          <!-- <view @click="operateFun(item, 'add')">认领</view>
          <view @click="operateFun(item, 'add')">认领</view> -->
          <view
            :class="
              operation == 'claimAll'
                ? item.isSelcet == 0
                  ? 'iconfont icon-fuxuankong'
                  : 'iconfont icon-fuxuan'
                : ''
            "
          >
            {{ operation == "claimAll" ? "" : "认领" }}
          </view>
        </view>
        <view class="result_row">
          <view>类型</view>
          <view>{{ item.type }}</view>
        </view>
        <view class="result_row">
          <view>时间</view>
          <view>{{ item.year }}</view>
          <view style="bottom: 75%" @click="operateFun(item, 'detail')"
            >详情</view
          >
        </view>
        <view class="result_row">
          <view>作者</view>
          <view>{{ item.creator }}</view>
          <view v-if="type == 1" @click="operateFun(item, 'looked')"
            >标为已查看</view
          >
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
    achievementList: {
      type: Array,
      default: [],
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      operation: "",
      list: [],
      achievementList1: achievementList
    };
  },
  watch: {
    achievementList:function(newVal, oldVal){
      this.achievementList1 = newVal
    }
  },
  mounted() {
    // this.list = this.achievementList;
  },
  methods: {
    operateFun(item, type) {
      const { id, resourceCode } = item;
      switch (type) {
        case "add":
          this.$emit("findAddNewResource", id);
          break;
        case "looked":
          this.$emit("findSetResourceSearch", id);
          break;
        case "detail":
          uni.navigateTo({
            url: `/pages/compage/achment-detail?id=${id}&code=${resourceCode}`,
          });
          break;
        default:
          return;
      }
    },
    handleListStatus(res) {
      this.operation = res;
      this.achievementList = this.achievementList.map(l => ({...l, isSelcet: 0}))
      console.log(this.achievementList)
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.claim_list {
  .result_item {
    border: 1px $base-color solid;
    padding: $uni-spacing-row-lg;
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
      width: 8%;
      font-size: $uni-font-size-base;
      color: $base-color;
    }
    .result_content {
      width: 92%;
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
          color: $base-color;
          right: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
