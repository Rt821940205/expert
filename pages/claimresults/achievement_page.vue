<template>
    <view class="app">
        <tNav title="成果认领" />
        <view class="claim_information">
            <view class="claim_text">成果信息</view>
            <view class="claim_title">{{ detail.title }}</view>
            <view class="claim_item">
                类型：{{ detail.typeName }}
            </view>
            <view class="claim_item">
                期刊：{{ detail.journal }}
            </view>
            <view class="claim_item" v-if="detail.level">
                收录：{{ detail.level }}
            </view>
            <view class="claim_item">
                时间：{{ detail.year }}
            </view>
            <view class="claim_item">
                作者：{{ detail.creatorAll }}
            </view>
        </view>
        <view class="claim_completion" v-if="!showForm">
            <view class="claim_text">信息补全</view>
            <view class="claim_subText">成果类型确认</view>
            <u-radio-group class="claim_type" v-model="radiovalue" placement="row">
                <u-radio :customStyle="{ marginRight: '24px' }" v-for="(item, index) in radiolist" :key="index"
                    :label="item.name" :name="item.name" @change="radioChange">
                </u-radio>
            </u-radio-group>
            <view class="author_list" v-for="(item, index) in detail.author" :key="index">
                <view>{{ item.type }}</view>
                <view>{{ item.name }}</view>
                <view @click="infoConfirm(item.name, item.type, index)">信息确认</view>
            </view>
            <u-button @click="submit" color="#557ff7" :disabled="disabled">提交</u-button>
        </view>
        <u-form class="claim_completion" v-if="showForm" ref="uForm" :model="author">
            <view class="claim_text">信息补全</view>
            <!-- <view class="author_form_list">
                <view>姓名：</view>
                <u--input class="author_form_input" border="bottom" placeholder="请输入内容" v-model="value"></u--input>
            </view> -->
            <u-form-item class="author_form_list" @click="handleChoice" label="姓名：" labelWidth="150rpx">
                <u--input v-model="author.name" class="author_form_input" border="bottom" placeholder="请选择"></u--input>
            </u-form-item>
            <view v-if="authors.length > 0" class="author_tip">同名{{ authors.length }}人，请选择学工号</view>
            <u-form-item class="author_form_list" @click="showAuthorsSort = true" label="排序：" labelWidth="150rpx">
                <u--input v-model="author.type" class="author_form_input" border="bottom" placeholder="请输入内容"></u--input>
            </u-form-item>
            <u-form-item class="author_form_list" label="学工号：" labelWidth="150rpx">
                <u--input v-model="author.account" :disabled="authors.length > 0" class="author_form_input" border="bottom"
                    placeholder="请输入内容"></u--input>
            </u-form-item>
            <u-form-item class="author_form_list" @click="showPersonTypeDic = true" label="类型：" labelWidth="150rpx">
                <u--input v-model="author.person_type" :disabled="authors.length > 0"
                    class="author_form_input" border="bottom" placeholder="请输入内容"></u--input>
            </u-form-item>
            <u-form-item class="btn_group">
                <u-button @click="back">返回</u-button>
                <u-button @click="save" color="#557ff7">确认并保存</u-button>
            </u-form-item>
        </u-form>
        <u-action-sheet :show="showAuthors" :actions="authors" title="请选择" @close="showAuthors = false"
            @select="authorSelect">
        </u-action-sheet>
        <u-action-sheet :show="showAuthorsSort" :actions="authorSortDic" title="请选择" @close="showAuthorsSort = false"
            @select="authorsSortSelect">
        </u-action-sheet>
        <u-action-sheet :show="showPersonTypeDic" :actions="personTypeDic" title="请选择" @close="showPersonTypeDic = false"
            @select="personTypeSelect">
        </u-action-sheet>
    </view>
</template>
<script>
import Api from "@/server/index.js";
import { dictionary, authorSortDic, personTypeDic } from "@/utils/dic.js";
export default {
    data() {
        return {
            resource_id: "",
            detail: {},
            radiolist: [{
                name: '科学技术类'
            },
            {
                name: '社会科学类'
            },],
            radiovalue: '科学技术类',
            value: '',
            showForm: false,
            showAuthors: false,
            showAuthorsSort: false,
            showPersonTypeDic: false,
            author: {
                name: '',
                type: '',
                account: '',
                person_type: ''
            },
            authors: [],
            authorSortDic,
            personTypeDic,
            index: 0,
            disabled: false,
        };
    },
    onLoad(option) {
        this.resource_id = option.id;
        this.findResourceById(option);
        console.log(this.$store.state.home.user)
    },
    mounted() {
        this.radiovalue = this.$store.state.home.user.paperType;
    },
    methods: {
        init() {
            this.authors = [];
            this.author = {};
        },
        async findResourceById(option) {
            try {
                const res = await Api.getResourceById(option);
                const { code, data: { title, resourceCode, journal, year, creatorAll, resultAuthor: { author }, level } } = res;
                if (code === 1) {
                    this.detail = {
                        title: title,
                        typeName: dictionary[resourceCode],
                        journal,
                        year,
                        creatorAll,
                        author,
                        level
                    };
                }
            } catch (e) { }
        },
        radioChange(n) {
            console.log('radioChange', n);
        },
        async infoConfirm(name, type, index) {
            //选中了第几个作者
            this.index = index;
            try {
                const res = await Api.findUserByName({ name });
                const { code, data } = res;
                if (code === 1 && data.length > 0) {
                    const firstP = data[0];
                    //默认选择第一项
                    this.author = {
                        name: firstP.name + '-' + firstP.second_department,
                        type,
                        account: firstP.account,
                        person_type: firstP.person_type,
                    }
                    this.authors = data.map(p => ({
                        name: p.name + '-' + p.second_department,
                        account: p.account,
                        person_type: p.person_type,
                    }));
                } else {
                    this.author = {};
                }
            } catch {

            }
            this.showForm = !this.showForm;
        },
        authorSelect(e) {
            this.author = e;
        },
        authorsSortSelect(e) {
            this.author.type = e.name
        },
        personTypeSelect(e) {
            this.author.person_type = e.name
        },
        handleChoice() {
            if (this.authors.length > 0) {
                this.showAuthors = true;
            }
        },
        back() {
            this.showForm = !this.showForm;
            this.init();
        },
        save() {
            // this.$refs.uForm.validate().then(res => {
            //     uni.$u.toast('校验通过')
            // }).catch(errors => {
            //     uni.$u.toast('校验失败')
            // })
            console.log(this.author.name)
            if(!this.author.name || this.author.name === '') {
                uni.showToast({ title: '请输入姓名' });
                return;
            };
            if(!this.author.type || this.author.type === '') {
                uni.showToast({ title: '请选择排序' });
                return;
            };
            if(!this.author.account || this.author.account === '') {
                uni.showToast({ title: '请输入学工号' });
                return;
            };
            if(!this.author.person_type || this.author.person_type === '') {
                uni.showToast({ title: '请选择类型' });
                return;
            };
            const submitAuthor = {
                ...this.author,
                name: this.authors.length > 0 ? this.author.name.split('-')[0] : this.author.name,
                org: this.authors.length > 0 ? this.author.name.split('-')[1] : '',
            }
            this.detail.author[this.index] = submitAuthor;
            this.showForm = !this.showForm;
            this.init();
        },
        async submit() {
            // this.disabled = true;
            const params = {
                resource_id: this.resource_id,
                resultAuthor: JSON.stringify({
                    type: this.radiovalue,
                    author: this.detail.author,
                }),
            };
            try {
                const res = await Api.updatePaperAuthorInfo(params);
                if (res.code === 1) {
                    const params1 = {
                        resourceIdList: this.resource_id,
                    }
                    const res = await Api.addNewResource(params1);
                    if (res.code === 1) {
                        uni.showToast({
                            title: "老师，您好！在您完成论文认领半小时之后，您可登录科研服务系统，核查论文信息是否正确，并提交审核。如有疑问，请联系：刘礼芳，电话：666018。谢谢！",
                            icon: "none"
                        });
                        setTimeout(() => {
                            this.disabled = false;
                            uni.$emit('refresh');
                            uni.navigateBack({
                                delta: 1,
                            });
                        }, 1500);
                    };
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: "none"
                    });
                    this.disabled = false;
                }
            } catch {
                this.disabled = false;
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.app {
    padding: 44rpx 36rpx 0 36rpx;

    .claim_information {
        border-bottom: 1px dashed #ccc;
        padding-bottom: 6px;
        margin-bottom: 24rpx;
        padding: 0 24rpx;
    }

    .claim_text {
        font-size: 19px;
        margin-bottom: 12px;
        font-weight: 700;
    }

    .claim_title {
        font-size: 16px;
        color: $base-color;
        margin-bottom: 12px;
    }

    .claim_item {
        font-size: 16px;
        margin-bottom: 12px;
    }

    .claim_subText {
        margin-bottom: 24rpx;
    }

    .claim_type {
        margin-bottom: 60rpx;
    }

    .claim_completion {
        padding: 0 24rpx;
    }

    .author_list {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rpx;
        font-size: 28rpx;
    }

    .author_list>uni-view:nth-child(1) {
        width: 40%;
    }

    .author_list>uni-view:nth-child(2) {
        box-sizing: border-box;
        width: 30%;
        // border: 1px #ccc solid;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .author_list>uni-view:nth-child(3) {
        width: 30%;
        color: #fff;
        background: $base-color;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .author_form_list {
        // display: flex;
        // align-items: flex-end;
        // margin-bottom: 6rpx;
    }

    ::v-deep .u-form-item__body {
        padding: 4rpx 0 !important;
    }

    // .author_form_list>uni-view:first-child {
    //     width: 25%;
    // }

    .author_form_input {
        border-bottom: 1px solid $base-color;
    }

    .btn_group {
        margin-top: 36rpx;
    }

    .author_tip {
        color: $base-color;
        font-size: 24rpx;
        margin-left: 28%;
    }
}
</style>
  