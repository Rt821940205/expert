<template>
  <view class="container">
    <u-modal
      :show="show"
      :title="title"
      @confirm="confirm"
    >
      <view>
        <u-form :model="userInfo">
          <u-form-item borderBottom>
            <u--input
              placeholder="请输入工号"
              v-model="userInfo.userNo"
            ></u--input>
          </u-form-item>
        </u-form>
      </view>
    </u-modal>
    <view v-if="!show">
      <BasicInfo
        :basicInfo="userInfo"
        :eUserName="eUserName"
        :researchDirection="researchDirection"
        @update:ename="eNamesChange"
      />
      <AchievementList
        :achievementList="achievementList"
        :achievementPageList="achievementPageList"
        @getList="getList"
        @sortByTime="sortByTime"
      />
    </view>
  </view>
</template>

<script>
import Api from "@/server/index.js";
import BasicInfo from "./basic_info.vue";
import AchievementList from "./achievement_list.vue";
import { dictionary } from "@/utils/dic.js";
export default {
  components: {
    BasicInfo,
    AchievementList,
  },
  data() {
    return {
      baseList: [],
      loading: true,
      show: true,
      title: "请输入工号",
      userInfo: {
        userNo: "00740",
      },
      eUserName: [],
      researchDirection: [],
      achievementList: [],
      achievementPageList: [],
      orderByType: 1, //  -- 排列顺序（1-时间倒序，2-时间正序）
    };
  },
  mounted() {},
  created() {},
  methods: {
    confirm() {
      this.show = !this.show;
      this.getData(this.userInfo);
      this.$store.dispatch("setSnNo", this.userInfo.userNo);
    },
    click(name) {
      this.$refs.uToast.success(name);
      uni.navigateTo({
        url: `/pages/functionintroduction/details/index?id=${name}`,
      });
    },
    async getData(params) {
      try {
        const res = await Api.getUserByUserNo(params);
        if (res.code === 1) {
          const {
            data,
            data: { eUserName, researchDirection, id },
          } = res;
          uni.setStorageSync("userId", id);
          this.$store.dispatch("setUser", data);
          console.log(data, id);
          this.userInfo = data;
          this.eUserName = JSON.parse(eUserName).map((i) => i.name);
          this.researchDirection = Object.freeze(JSON.parse(researchDirection));
        }
        this.getCatalogueList();
      } catch (e) {
        console.log(e);
      }
    },
    async getCatalogueList() {
      try {
        const res = await Api.getUserResourceNum({});
        if (res.code === 1) {
          const { data } = res;
          this.achievementList = data.map((a) => ({
            resourceCode: a.resourceCode,
            name: dictionary[a.resourceCode],
            badge: {
              value: a.num,
            },
          }));
          this.getList(data[0].resourceCode);
        }
      } catch (e) {
        console.log(e);
      }
    },
    sortByTime() {
      this.orderByType == 1 ? (this.orderByType = 2) : (this.orderByType = 1);
      this.getList();
    },
    async getList(resourceCode) {
      this.achievementPageList = [];
      try {
        const res = await Api.getUserResourcePage({
          resourceCode,
          orderByType: this.orderByType,
          pageNo: 1,
          pageSize: 100,
        });
        if (res.code === 1) {
          const { data } = res;
          this.achievementPageList = Object.freeze(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async eNamesChange(value) {
      const eNames = JSON.parse(this.userInfo.eUserName);
      eNames.forEach((item) =>
        item.name === value ? (item.isSelect = 1) : (item.isSelect = 0)
      );
      // console.log("eNames", eNames);
      // this.userInfo.eUserName = JSON.stringify(eNames);
      this.userInfo.eUserName = eNames;
      const { code } = await Api.updateUserByUserNo(this.userInfo);
      const title = code == 1 ? "修改默认英文名成功" : "修改默认英文名失败";
      uni.showToast({
        title,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}

.container {
}
</style>
