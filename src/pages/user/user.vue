<template>

    <div class="page select-page">

        <headerComponent></headerComponent>

        <div class="row justify-content-center">
            <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
                <b-card class="box" shadow>
                    <div class="d-flex justify-content-center">
                        <img class="img-circle" src="../../assets/head.svg"  alt="头像"/>
                    </div>
                    <b-card-text style="margin-top: 20px">
                        <div class="col-md-8 offset-md-2">账号：{{UserID}}</div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-6 offset-md-2">
                            剩余服务时间：{{remainingServiceDay}}天 <b-link href="pay.html">充值</b-link>
                        </div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-8 offset-md-2">手机号：{{tel}}</div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-8 offset-md-2">邮箱：{{email}}</div>
                    </b-card-text>

                    <b-card title="预测记录">
                        <div>
                            <b-table hover :responsive="true" v-if="predictLoaded" :fields="predictFields" :items="predictItems">
                                <template v-slot:cell(operation)="row" >
                                    <b-button variant="primary" size="sm" @click="initLoanModal(row.item, row.index, $event.target)" style="width: 5rem">
                                        贷款管理
                                    </b-button>
                                </template>

                                <template v-slot:cell(detail)="row">
                                    <b-button variant="info" size="sm" @click="initDetailModal(row.item, row.index, $event.target)" style="width: 3rem">
                                        查看
                                    </b-button>
                                </template>

                                <template v-slot:head()="scope">
                                    <div class="text-nowrap">{{ scope.label }}</div>
                                </template>
                                <template v-slot:cell()="data">
                                    <div class="text-nowrap">{{data.value}}</div>
                                </template>
                            </b-table>
                        </div>

                        <b-modal size="md" :id="loanModal.id" :title="loanModal.title">
                            <form>
                                <b-form-group label="贷款额度（万元）">
                                    <b-form-input v-model="loanModal.loan.money"></b-form-input>
                                </b-form-group>
                                <b-form-group label="贷款利率">
                                    <b-form-input v-model="loanModal.loan.rate"></b-form-input>
                                </b-form-group>
                                <b-form-group label="贷款期限（年）">
                                    <b-form-input v-model="loanModal.loan.time"></b-form-input>
                                </b-form-group>
                                <b-form-group label="还款情况">
                                    <b-form-group>
                                        <div class="row row-cols-4">
                                            <div class="col"><b-form-radio v-model="loanModal.loan.situation" value="1">极好</b-form-radio></div>
                                            <div class="col"><b-form-radio v-model="loanModal.loan.situation" value="2">较好</b-form-radio></div>
                                            <div class="col"><b-form-radio v-model="loanModal.loan.situation" value="3">一般</b-form-radio></div>
                                            <div class="col"><b-form-radio v-model="loanModal.loan.situation" value="4">差</b-form-radio></div>
                                        </div>
                                    </b-form-group >
                                </b-form-group>
                            </form>
                            <template v-slot:modal-footer>
                                <b-button variant="danger" @click="handleCancel">
                                    取消
                                </b-button>
                                <b-button variant="success" @click="handleOk">
                                    确定
                                </b-button>
                            </template>
                        </b-modal>

                        <b-modal size="md" :id="detailModal.id" :title="detailModal.title" ok-only>
                            <div>
                                <div class="col-md-11 offset-md-1">所在行业：{{detailModal.detail.business}}</div>
                                <div class="col-md-11 offset-md-1">企业名称：{{detailModal.detail.name}}</div>
                                <div class="col-md-11 offset-md-1">经营范围：{{detailModal.detail.range}}</div>
                                <div class="col-md-11 offset-md-1">所在城市：{{detailModal.detail.city}}</div>
                                <div class="col-md-11 offset-md-1">评分：{{detailModal.detail.star}}</div>
                                <div class="col-md-11 offset-md-1">人均价格：{{detailModal.detail.avgPrice}}</div>
                                <div class="col-md-11 offset-md-1">最低价格：{{detailModal.detail.minPrice}}</div>
                                <div class="col-md-11 offset-md-1">历史订单数：{{detailModal.detail.totalOrder}}</div>
                                <div class="col-md-11 offset-md-1">有无外卖：{{detailModal.detail.takeout}}</div>
                                <div class="col-md-11 offset-md-1">有无WiFi：{{detailModal.detail.wifi}}</div>
                                <div class="col-md-11 offset-md-1">年收入：{{detailModal.detail.income}}</div>
                                <div class="col-md-11 offset-md-1">最大股东持股占比：{{detailModal.detail.shareHolding}}</div>
                                <div class="col-md-11 offset-md-1">经营场所权属：{{detailModal.detail.ownership}}</div>
                                <div class="col-md-11 offset-md-1">企业经营年限：{{detailModal.detail.businessTime}}</div>
                                <div class="col-md-11 offset-md-1">累计授信总量（不含本笔申请）：{{detailModal.detail.totalCredit}}</div>
                                <div class="col-md-11 offset-md-1">征信总余额：{{detailModal.detail.creditBalance}}</div>
                                <div class="col-md-11 offset-md-1">押品有效担保价值：{{detailModal.detail.guaranteeValue}}</div>
                                <div class="col-md-11 offset-md-1">押品主担保方式：{{detailModal.detail.guarantyType}}</div>
                                <div class="col-md-11 offset-md-1">贷款额度（万元）：{{detailModal.detail.money}}</div>
                                <div class="col-md-11 offset-md-1">贷款利率：{{detailModal.detail.rate}}</div>
                                <div class="col-md-11 offset-md-1">贷款期限（年）：{{detailModal.detail.time}}</div>
                                <div class="col-md-11 offset-md-1">还款情况：{{detailModal.detail.situation}}</div>

                                <!--TODO:按上面的写法把剩余的详情项目写完（czp） 
                                ownership
                                businessTime
                                totalCredit
                                creditBalance
                                guaranteeValue
                                guarantyType
                                money
                                rate
                                time
                                situation
                                -->

                            </div>
                        </b-modal>
                    </b-card>
                </b-card>
            </div>
        </div>
    </div>

</template>

<script>
    import headerComponent from "@/pages/header/header"
    import _global from "@/pages/global";
    export default {
        name: 'userComponent',
        components: {headerComponent},
        beforeMount(){
            //TODO:判断未登录时应跳转回登录界面（fhq）

            //window.location.href = 'index.html'
        },
        data: () => {
            return {
                UserID: _global.UserID,
                remainingServiceDay: _global.remainingServiceDay,
                tel: null,
                email: null,
                predictLoaded: false,
                predictItems:[],
                predictFields:[],
                loanModal: {
                    index: null,
                    id: 'info-modal',
                    title: '贷款管理',
                    loan:{
                        money: null,
                        rate: null,
                        time: null,
                        situation: null
                    }
                },
                detailModal: {
                    index: null,
                    id: 'audio-modal_admin',
                    title: '详情',
                    record: '',
                    detail:{
                        business: null,
                        name: null,
                        range: null,
                        city: null,
                        star: null,
                        avgPrice: null,
                        minPrice: null,
                        totalOrder: null,
                        takeout: null,
                        wifi: null,
                        income: null,
                        shareHolding: null,
                        ownership: null,
                        businessTime: null,
                        totalCredit: null,
                        creditBalance: null,
                        guaranteeValue: null,
                        guarantyType: null,
                        money: null,
                        rate: null,
                        time: null,
                        situation: null

                    }
                },

            }
        },
        async mounted () {
            this.predictLoaded = false
            try {
                //TODO:从后端请求预测记录【请求到的是完整的一条记录，自己创建一个对象来存，predictItems中仅限示特定项目】（wx）

                this.predictFields =[
                    { key: 'time', label: '预测时间' },
                    { key: 'name', label: '企业名称' },
                    { key: 'city', label: '所在城市' },
                    { key: 'business', label: '所在行业' },
                    { key: 'level', label: '预测风险等级' },
                    { key: 'operation', label:'管理' },
                    { key: 'detail', label:'详情' }
                ]

                //table条目存在这，这里是一条示例数据
                this.predictItems = [
                    {
                        id: '0000001',
                        time:'2020.10.25 19:21:35',
                        name:'珞珈面馆',
                        business:'餐饮业',
                        city:"武汉",
                        level:'A',
                        note:'11111'
                    }
                ]
                this.predictLoaded = true
            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            initLoanModal(item, index, button) {
                this.loanModal.index = index
                //TODO:获取贷款管理记录（czp）
                //测试数据
                this.loanModal.loan = {
                    money: 10,
                    rate: 5,
                    time: 2,
                    situation: 2
                }

                //let id = this.predictItems[index].id   //预测记录的id

                this.loanModal.note = this.predictItems[this.loanModal.index].note
                this.$root.$emit('bv::show::modal', this.loanModal.id, button)
            },
            handleCancel(){
                this.$nextTick(() => {
                    this.$bvModal.hide(this.loanModal.id)
                })
            },
            handleOk() {
                //TODO:向后端提交贷款管理记录（czp）

                this.$nextTick(() => {
                    this.$bvModal.hide(this.loanModal.id)
                })
            },
            initDetailModal(item, index, button) {
                this.detailModal.index = index
                //TODO:显示预测的详情记录【不用再获取，从前面获取的完整记录中构造即可】（wx）


                this.$root.$emit('bv::show::modal', this.detailModal.id, button)
            }
        }
    }

</script>
