<template>
  <view class="achievementviewed">
    <view class="claimDate">
      <view class="claimDate_selcet">
        <view class="alldis">
          选择年份
          <view class="uni-list-cell-db">
            <picker
              mode="selector"
              :value="indexYear"
              :range="yearList"
              :range-key="'year'"
              @change="bindDateChange"
            >
              <view v-if="yearList.length > 0" class="uni-input">
                {{ yearList[indexYear].year }}
              </view>
            </picker>
          </view>
        </view>
        <view class="alldis">
          选择类别
          <view class="uni-list-cell-db">
            <picker
              mode="selector"
              :value="index"
              :range="array"
              :range-key="'name'"
              @change="bindPickerChange"
            >
              <view class="uni-input">
                {{ array[index].name ? array[index].name : array[index] }}
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="all_Claim alldis">
        <text
          v-for="(item, index) in btnList"
          v-show="item.type == 'claimAll' ? allClaim : !allClaim"
          :key="index"
          @click="allCliam(item.type)"
        >
          {{ item.name }}
        </text>
      </view>
    </view>
    <view class="claimList">
      <view class="result_item" v-for="(item, index) in list" :key="item.id">
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
  </view>
</template>

<script>
import resultItem from "@/components/resultItem/index.vue";
import Api from "@/server/index.js";
import { dictionary } from "@/utils/dic.js";

export default {
  components: { resultItem },
  props: {
    yearList: {
      type: Array,
      default: () => {
        return [{ year: "2021" }];
      },
    },
  },
  data() {
    return {
      array: [
        { name: "全部", resourceCode: "" },
        { name: "成果", resourceCode: "A" },
        { name: "图书", resourceCode: "B" },
        { name: "会议", resourceCode: "C" },
        { name: "学位论文", resourceCode: "D" },
        { name: "EI", resourceCode: "E" },
        { name: "SCI", resourceCode: "I" },
        { name: "期刊", resourceCode: "J" },
        { name: "项目", resourceCode: "O" },
        { name: "专利", resourceCode: "P" },
        { name: "其他", resourceCode: "Q" },
        { name: "报告", resourceCode: "R" },
        { name: "标准", resourceCode: "S" },
        { name: "团队", resourceCode: "T" },
        { name: "SCOPUS", resourceCode: "U" },
        { name: "活动", resourceCode: "Y" },
      ],
      index: 0,
      indexYear: 0,
      allClaim: true,
      btnList: [
        { name: "批量认领", type: "claimAll" },
        { name: "确认", type: "claimComit" },
        { name: "本页全选", type: "allselcet" },
      ],

      list: [],
    };
  },
  mounted() {
    this.findNewResourceNumByYear({
      type: "1",
      year: "2020",
      resourceCode: "",
      pageSize: 10,
      pageNo: 1,
    });
  },
  watch: {
    yearList: function () {
      // this.getType();
    },
  },
  methods: {
    async findNewResourceNumByYear(params) {
      try {
        const res = await Api.getNewResourceNumPage(params);
        if (res.code === 1) {
          const { data } = res;
          this.list = Object.freeze(data).map(r => ({...r, type: dictionary[r.resourceCode]}));
        }
      } catch (e) {
        console.log(e);
      }
    },
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
.achievementviewed {
  .claimDate {
    color: #316b7a;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-row-base;
    &_selcet {
      display: flex;
      justify-content: space-between;
      margin-bottom: $uni-spacing-col-lg;
      margin-right: $uni-spacing-col-sm;
      .uni-input {
        text-decoration: underline;
        position: relative;
      }
      .uni-input::after {
        content: "";
        position: absolute;
        top: 39%;
        right: -22rpx;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #316b7a;
      }
    }
    .uni-list-cell-db {
      margin-left: $uni-spacing-col-base;
    }
    .alldis {
      display: flex;
    }
    .all_Claim {
      font-size: $uni-font-size-base;
      color: #316b7a;
      justify-content: space-between;
    }
  }

  .claimList {
    .result_item {
      border: 1px $main-color solid;
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
}
</style>
