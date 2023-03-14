<template>
  <view class="app">
    <view class="content">
      <view class="header">
        <tNav title="成果详情" />
      </view>
      <view
        v-for="item in content"
        :key="item.name"
        class="detail_dis"
      >
        <view class="detail_left">
          {{ item.name }}
        </view>
        <view class="detail_right">
          {{ item.content || '暂无数据' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import API from '@/apis'
import tNav from "@/components/tNav/tNav.vue";
export default {
  components: { tNav },
  data() {
    return {
      content: [],
      code: "",
    };
  },
  // async onLoad(option) {
  // 	let {
  // 		id,
  // 		code
  // 	} = option
  // 	const params = {
  // 		'id': id
  // 	}
  // 	const ret = await API.home.getResourceById(params)
  // 	if (code == ('I' || 'E' || 'U' || 'J')) {
  // 		this.content = [{
  // 				'name': '标题',
  // 				'content': ret.title
  // 			},
  // 			{
  // 				'name': '姓名',
  // 				'content': ret.creatorAll
  // 			},
  // 			{
  // 				'name': '关键词',
  // 				'content': ret.keyword
  // 			},
  // 			{
  // 				'name': '期刊',
  // 				'content': ret.journal
  // 			},
  // 			{
  // 				'name': '年份',
  // 				'content': ret.year
  // 			},
  // 			{
  // 				'name': '卷',
  // 				'content': ret.volume
  // 			},
  // 			{
  // 				'name': '期',
  // 				'content': ret.issue
  // 			},
  // 		]
  // 	}else if(code == 'O'){
  // 		this.content = [{
  // 				'name': '项目标题',
  // 				'content': ret.title
  // 			},
  // 			{
  // 				'name': '参与人',
  // 				'content': ret.creatorAll
  // 			},
  // 			{
  // 				'name': '项目编号',
  // 				'content': ret.projectNo
  // 			},
  // 			{
  // 				'name': '项目基金',
  // 				'content': ret.projectFund
  // 			},
  // 			{
  // 				'name': '项目来源',
  // 				'content': ret.projectOrigin
  // 			}
  // 		]
  // 	}else if(code == 'P'){
  // 		this.content = [{
  // 				'name': '专利名称',
  // 				'content': ret.patentName
  // 			},
  // 			{
  // 				'name': '全体发明人',
  // 				'content': ret.allInventors
  // 			},
  // 			{
  // 				'name': '法律状态',
  // 				'content': ret.legalState
  // 			},
  // 			{
  // 				'name': '专利申请编号',
  // 				'content': ret.applicationNo
  // 			},
  // 			{
  // 				'name': '专利编号',
  // 				'content': ret.patentNo
  // 			},
  // 			{
  // 				'name': '专利发布时间',
  // 				'content': ret.publicationDate
  // 			}
  // 		]
  // 	}else if(code == 'B'){
  // 		this.content = [{
  // 				'name': '标题',
  // 				'content': ret.patentName
  // 			},
  // 			{
  // 				'name': '作者',
  // 				'content': ret.creator
  // 			},
  // 			{
  // 				'name': '出版年',
  // 				'content': ret.year
  // 			}
  // 		]
  // 	}else if(code == 'A'){
  // 		this.content = [{
  // 				'name': '成果名称',
  // 				'content': ret.patentName
  // 			},
  // 			{
  // 				'name': '参与人',
  // 				'content': ret.allCompletedPeople
  // 			},
  // 			{
  // 				'name': '获奖类型',
  // 				'content': ret.awardType
  // 			},
  // 			{
  // 				'name': '获奖年度',
  // 				'content': ret.awardWinningYear
  // 			},
  // 			{
  // 				'name': '奖励等级',
  // 				'content': ret.awardWinningLevel
  // 			}
  // 		]
  // 	}
  // },
};
</script>

<style lang="scss" scoped>
.app {
  .content {
    padding: 50rpx;

    .header {
      padding-bottom: 50rpx;
    }

    .achment-list-container {
      height: calc(100vh - var(--status-bar-height) - 350rpx);
    }

    .detail_dis {
      display: flex;
      margin-bottom: 30rpx;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Medium, sans-serif;

      .detail_right {
        width: 450rpx;
        font-size: $uni-font-size-lg;
        color: #000000;
        line-height: 50rpx;
        font-weight: 300;
      }

      .detail_left {
        color: #316b7a;
        font-size: $uni-font-size-lg;
        font-weight: 500;
      }
    }
  }
}
</style>
