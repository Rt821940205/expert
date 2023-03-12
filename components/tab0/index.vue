<template>
  <view class="tab0-container">
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
              <view
                v-if="yearList.length > 0"
                class="uni-input"
              >
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
                {{ array[index].name ? array[index].name   : array[index] }}
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="all_Claim alldis">
        <text
          v-for="(item,index) in btnList"
          v-show="item.type == 'claimAll' ? allClaim : !allClaim "
          :key="index"
          @click="allCliam(item.type)"
        >
          {{ item.name }}
        </text>
      </view>
    </view>

    <view>
      <u-list
        @scrolltolower="scrolltolower"
        v-if="searchData.length >0 "
      >
        <u-list-item
          v-for="(item, index) in searchData.length"
          :key="index"
        >
          <result-item
            class="reslut-item"
            :detail="{
                      title:'膜活性肽强化多功能复合微粒基因载体的构建及',
                      type:'项目',
                      time:'2012',
                      author:'王文英'
                    }"
            :index="index + 1"
          >
            {{ index }}
          </result-item>
        </u-list-item>
      </u-list>
      <view
        class="noListTips"
        v-if='searchData.length === 0'
      >
        未检索到符合条件的成果，请重试
      </view>

    </view>
  </view>
</template>

<script>
// import API from "@/apis";
// import { getWordByChart } from "@/utils/index";
import resultItem from "@/components/resultItem/index.vue";

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
      title: "picker",
      array: [{ name: "全部", resourceCode: "" }],
      //A-成果 B-图书 C-会议 D-学位论文 E-EI I-SCI J-期刊 O-项目 P-专利 Q-其他 R-报告 S-标准 T-团队 U-SCOPUS Y-活动
      index: 0,
      indexYear: 0,
      allClaim: true,
      btnList: [
        { name: "批量认领", type: "claimAll" },
        { name: "确认", type: "claimComit" },
        { name: "本页全选", type: "allselcet" },
      ],
      searchData: new Array(10),
    };
  },
  watch: {
    yearList: function () {
      this.getType();
    },
  },
  methods: {
    allCliam(type) {
      type == "claimAll"
        ? (this.allClaim = false)
        : type == "allselcet"
        ? (this.allClaim = false)
        : (this.allClaim = true);
      uni.$emit("claim", type);
    },
    allselcet() {
      uni.$emit("allselcet", true);
    },
    bindPickerChange: function (e) {
      this.index = e.target.value;
      uni.$emit("selcetPick", this.array[e.target.value].resourceCode);
    },
    bindDateChange: function (e) {
      this.indexYear = e.target.value;
      this.array = [{ name: "全部", resourceCode: "" }];
      this.getType(this.yearList[e.target.value].year);
      uni.$emit("selcetData", this.yearList[e.target.value].year);
    },
    async getType(value) {
      const params = { year: value };
      const ret = await API.home.getNewResourceNumByType(params);
      let retlist = ret
        .filter((re) => {
          return re.resourceCode != null;
        })
        .map((item) => (item.name = getWordByChart(item.resourceCode)));
      this.array = this.array.concat(retlist);
      this.$forceUpdate();
    },
    async getYear() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      const params = { year: 50 };
      let ret = await API.home.getNewResourceNumByYear(params);
      this.yearList = ret;
      uni.hideLoading();
      this.$forceUpdate();
    },
    scrolltolower() {
      this.loadmore();
    },
    loadmore() {},
  },
};
</script>

<style lang="scss" scoped>
.tab0-container {
  ::v-deep {
    .uni-scroll-view-content {
      > view {
        padding-bottom: 250px !important;
      }
    }
  }
}

.claimDate {
  color: #316b7a;
  font-size: $uni-font-size-base;
  padding: 40rpx 26rpx 0 26rpx;
  &_selcet {
    display: flex;
    justify-content: space-between;
    margin: 0 30rpx 30rpx 0;
    .uni-input {
      text-decoration: underline;
      position: relative;
    }
    .uni-input::after {
      content: "";
      position: absolute;
      top: 39%;
      right: -22px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #316b7a;
    }
  }
  .uni-list-cell-db {
    margin-left: 40rpx;
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
</style>
