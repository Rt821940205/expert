<template>
  <view class="tab3-container">
    <!-- 查找 -->
    <seach-input v-if="currentSearch" @onSearch="handleSearch"></seach-input>
    <!-- 列表 -->
    <block v-else>
      <u-list @scrolltolower="scrolltolower" v-if="searchData.length > 0">
        <u-list-item v-for="(item, index) in searchData.length" :key="index">
          <result-item
            class="reslut-item"
            :detail="{
              title: '膜活性肽强化多功能复合微粒基因载体的构建及',
              type: '项目',
              time: '2012',
              author: '王文英',
            }"
            :index="index + 1"
          >
            {{ index }}
          </result-item>
        </u-list-item>
      </u-list>
      <view class="noListTips" v-if="searchData.length === 0">
        未检索到符合条件的成果，请重试
      </view>
    </block>
  </view>
</template>

<script>
import seachInput from "@/components/seachInput/index.vue";
import resultItem from "@/components/resultItem/index.vue";

export default {
  components: { seachInput, resultItem },
  props: {
    isSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoading: false,
      currentSearch: this.isSearch,
      searchData: new Array(10),
    };
  },
  created() {},
  methods: {
    scrolltolower() {
      this.loadmore();
    },
    loadmore() {},
    // 搜索
    handleSearch(val) {
      console.log(val)
      // 1. 调用搜索接口
      // this.currentSearch = false;
    },
  },
};
</script>

<style scoped lang="scss">
.tab3-container {
  padding: 39rpx 0 39rpx 0;
}
</style>
