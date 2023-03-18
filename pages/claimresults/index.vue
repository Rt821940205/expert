<template>
  <view class="app">
    <view class="header">
      <image src="/static/schoolBadge.png"></image>
    </view>
    <view class="content">
      <view class="title">成果认领</view>
      <tabs @tabChange="tabChange" :tabs="tabs" :tabIndex="tabIndex"></tabs>
      <view class="claim_selcet" v-if="tabIndex != 2">
        <view class="alldis">
          <text>选择年份</text>
          <text @click="showYear = true">{{ year }}</text>
          <u-picker
            v-if="yearList.length > 0"
            :show="showYear"
            :columns="yearList"
            @confirm="handleYearChange"
            @cancel="showYear = false"
            keyName="year"
            confirmText="确定"
            confirmColor="#316b7a"
          ></u-picker>
        </view>
        <view class="alldis">
          <text>选择类别</text>
          <text @click="showResourceCode = true">{{
            currentResourceName
          }}</text>
          <u-picker
            v-if="resourceList.length > 0"
            :show="showResourceCode"
            :columns="resourceList"
            @confirm="handleResourceChange"
            @cancel="showResourceCode = false"
            keyName="name"
            confirmText="确定"
            confirmColor="#316b7a"
          ></u-picker>
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
      <view v-if="tabIndex == 0">
        <Achievementviewed
          :achievementList="achievementList"
          @findNewResourceNumByYear="findNewResourceNumByYear"
        />
        <view v-if="loading" class="swiper-loading"
          ><u-loading-icon></u-loading-icon
        ></view>
        <view v-if="!loading && achievementList.length == 0" class="noListTips"
          >未检索到符合条件的成果，请重试</view
        >
      </view>
      <view v-else-if="tabIndex == 1">
        <Achievementnotviewed
          :achievementListNo="achievementListNo"
          @findNewResourceNumByYear="findNewResourceNumByYear"
        />
        <view v-if="!loading && achievementListNo.length == 0" class="noListTips"
          >未检索到符合条件的成果，请重试</view
        >
      </view>
      <view v-else>
        <Achievementsearch isSearch />
      </view>
      <u-toast ref="uToast"></u-toast>
    </view>
  </view>
</template>

<script>
import Achievementviewed from "./achievementviewed.vue";
import Achievementnotviewed from "./achievementnotviewed";
import Achievementsearch from "./achievementsearch";
import { dictionary } from "@/utils/dic.js";
import Api from "@/server/index.js";
export default {
  components: {
    Achievementviewed,
    Achievementnotviewed,
    Achievementsearch,
  },
  data() {
    return {
      tabIndex: 0,
      type: 1,
      tabs: [
        { name: "未查看成果" },
        { name: "已查看成果" },
        { name: "搜索成果" },
      ],
      allClaim: true,
      btnList: [
        { name: "批量认领", type: "claimAll" },
        { name: "确认", type: "claimComit" },
        { name: "本页全选", type: "allselcet" },
      ],
      showYear: false,
      yearList: [],
      year: "",
      showResourceCode: false,
      resourceCode: "",
      currentResourceName: "",
      resourceList: [],
      achievementList: [],
      achievementListNo: [],
      loading: false,
      pageNo: 1,
      pageSize: 5,
    };
  },
  mounted() {
    this.findNewResourceNumByYear({
      year: 50,
    });
    this.findNewResourceNumByType({});
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
      if (index != 2) {
        this.type = index + 1;
        this.findNewResourceNumPage();
      }
    },
    async findNewResourceNumByYear(params) {
      try {
        const res = await Api.getNewResourceNumByYear(params);
        if (res.code === 1) {
          const { data } = res;
          this.yearList = [data];
          this.year = data[0].year;
          this.findNewResourceNumPage();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async findNewResourceNumByType(params) {
      try {
        const res = await Api.getNewResourceNumByType(params);
        if (res.code === 1) {
          const { data } = res;
          const arr = data.map((t) => ({
            resourceCode: t.resourceCode,
            name: dictionary[t.resourceCode],
          }));
          const finalarr = [{ name: "全部", resourceCode: "" }, ...arr];
          this.resourceCode = finalarr[0].resourceCode;
          this.currentResourceName = finalarr[0].name;
          this.resourceList = [finalarr];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async findNewResourceNumPage() {
      this.loading = true;
      const { year, resourceCode, pageNo, pageSize, type } = this;
      const params = {
        pageSize,
        type,
        year,
        resourceCode,
        pageNo,
      };
      console.log(pageNo);
      try {
        const res = await Api.getNewResourceNumPage(params);
        if (res.code === 1) {
          const { data } = res;
          let arr = data.map((r) => ({
            ...r,
            type: dictionary[r.resourceCode],
          }));
          if (data.length > 0) {
            this.achievementList =
              pageNo === 1 ? arr : [...this.achievementList, ...arr];
          } else {
            // this.$refs.uToast.show("已无更多成果");
            console.log("已无更多成果");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    handleYearChange(e) {
      this.pageNo = 1;
      this.showYear = false;
      const { value } = e;
      const year = value[0].year;
      if (this.year === year) {
        return;
      }
      this.year = year;
      this.achievementList = [];
      this.findNewResourceNumPage();
    },
    handleResourceChange(e) {
      this.pageNo = 1;
      this.showResourceCode = false;
      const { value } = e;
      const resourceCode = value[0].resourceCode;
      if (this.resourceCode === resourceCode) {
        return;
      }
      this.resourceCode = resourceCode;
      this.currentResourceName = value[0].name;
      this.achievementList = [];
      this.findNewResourceNumPage();
    },
  },
  //下拉刷新
  onPullDownRefresh() {
    this.pageNo = 1;
    this.findNewResourceNumPage();
    uni.stopPullDownRefresh();
  },
  //上拉加载更多
  onReachBottom() {
    this.pageNo++;
    this.findNewResourceNumPage();
  },
};
</script>

<style scoped lang="scss">
.app {
  .header {
    padding: $zgd-logo-padding;
    image {
      width: $zgd-logo-w;
      height: $zgd-logo-h;
    }
  }
  .content {
    padding: $zgd-content-padding;
    .title {
      color: $base-color;
      font-size: $uni-font-size-title;
      text-align: center;
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1),
          rgba(49, 107, 122, 1)
        )
        1 1;
    }
    .tabs {
      display: flex;
      justify-content: center;
      margin-bottom: 60rpx;
      .tabs-item {
        font-size: 30rpx;
        color: $main-color;
        width: 33%;
        text-align: center;
      }
      .active {
        color: $base-color;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 150rpx;
          height: 4rpx;
          background-color: $base-color;
          left: 50%;
          bottom: -20rpx;
          margin-left: -75rpx;
        }
      }
    }
    .claim_selcet {
      color: #316b7a;
      font-size: $uni-font-size-base;
      padding: 0 $uni-spacing-row-lg;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .alldis {
        display: flex;
        align-items: center;
        width: 40%;
        margin-bottom: $uni-spacing-row-base;
        > text:nth-child(1) {
          margin-right: 30rpx;
        }
        &:nth-child(2) {
          display: flex;
          justify-content: flex-end;
        }
        &:nth-child(1),
        &:nth-child(2) {
          > text:nth-child(2) {
            position: relative;
            border-bottom: 1px $main-color solid;
            &::after {
              content: "";
              position: absolute;
              top: 39%;
              right: -40rpx;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid #316b7a;
            }
          }
        }
      }
      .uni-list-cell-db {
        margin-left: $uni-spacing-col-base;
      }

      .all_Claim {
        font-size: $uni-font-size-base;
        color: #316b7a;
      }
    }
    .swiper-loading {
      position: fixed;
      top: 40%;
      left: 50%;
      margin-left: -24rpx;
    }
    .noListTips {
      text-align: center;
      font-size: 14px;
      color: #316b7a;
      margin-top: 50rpx;
    }
  }
}
</style>
