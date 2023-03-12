<template>
  <view class="tab3-container">
    <!-- 查找 -->
    <seach-input
      v-if="isSearch"
      @onSearch="handleSearch"
    ></seach-input>
    <!-- 列表 -->
    <block v-else>
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
    </block>
  </view>
</template>

<script>
import seachInput from "@/components/seachInput/index.vue";
import resultItem from "@/components/resultItem/index.vue";

export default {
  components: { seachInput, resultItem },
  data() {
    return {
      isLoading: false,
      isSearch: true,
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
      // 1. 调用搜索接口
      this.isSearch = false;
    },
  },
};
</script>

<style scoped lang="scss">
.tab-container {
  padding: 39rpx 0 39rpx 0;
}
</style>
