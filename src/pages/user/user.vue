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
                        <div class="col-md-8 offset-md-3">账号：{{UserID}}</div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-6 offset-md-3">
                            剩余服务时间：{{remainingServiceDay}}天 <b-link href="pay.html">充值</b-link>
                        </div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-8 offset-md-3">手机号：{{tel}}</div>
                    </b-card-text>
                    <b-card-text>
                        <div class="col-md-8 offset-md-3">邮箱：{{email}}</div>
                    </b-card-text>

                    <b-card title="预测记录">
                        <div>
                            <b-table hover :responsive="true" :fields="predictFields" :items="predictItems">
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
                                <!--
                                <b-form-group label="贷款期限（年）">
                                    <b-form-input v-model="loanModal.loan.time"></b-form-input>
                                </b-form-group>
                                -->
                                <b-form-group label="贷款起始时间">
                                    <b-form-datepicker v-model="loanModal.loan.loanStart"></b-form-datepicker>
                                </b-form-group>
                                <b-form-group label="贷款结束时间">
                                    <b-form-datepicker v-model="loanModal.loan.loanEnd"></b-form-datepicker>
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

                        <b-modal size="lg" :id="detailModal.id" :title="detailModal.title" ok-only>
                            <div>
                                <div class="row">
                                    <div class="col-md-5 offset-md-1" style="margin-top: 5px;">所在行业：{{detailModal.detail.business}}</div>
                                    <div class="col-md-5 offset-md-7" style="margin-top: 5px;">企业名称：{{detailModal.detail.name}}</div>
                                </div>

                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">经营范围：{{detailModal.detail.range}}</div>
                                <div class="col-md-5 offset-md-7" style="margin-top: 5px;">所在城市：{{detailModal.detail.city}}</div>

                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">评分：{{detailModal.detail.star}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">人均价格：{{detailModal.detail.avgPrice}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">最低价格：{{detailModal.detail.minPrice}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">历史订单数：{{detailModal.detail.totalOrder}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">有无外卖：{{detailModal.detail.takeout}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">有无WiFi：{{detailModal.detail.wifi}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">年收入：{{detailModal.detail.income}}</div>
                                <div class="col-md-5 offset-md-1" style="margin-top: 5px;">最大股东持股占比：{{detailModal.detail.shareHolding}}</div>
                                <div class="col-md-5 offset-md-7" style="margin-top: 5px;">经营场所权属：{{detailModal.detail.ownership}}</div>
                                <div class="col-md-5 offset-md-7" style="margin-top: 5px;">企业经营年限：{{detailModal.detail.businessTime}}</div>
                                <div class="col-md-5 offset-md-7" style="margin-top: 5px;">累计授信总量（不含本笔申请）：{{detailModal.detail.totalCredit}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">征信总余额：{{detailModal.detail.creditBalance}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">押品有效担保价值：{{detailModal.detail.guaranteeValue}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">押品主担保方式：{{detailModal.detail.guarantyType}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">贷款额度（万元）：{{detailModal.detail.money}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">贷款利率：{{detailModal.detail.rate}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">贷款起始时间：{{detailModal.detail.loanStart}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">贷款结束时间：{{detailModal.detail.loanEnd}}</div>
                                <div class="col-md-11 offset-md-1" style="margin-top: 5px;">还款情况：{{detailModal.detail.situation}}</div>


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
    export default {
        name: 'userComponent',
        components: {headerComponent},
        beforeMount(){
            if(this.cookies.get('UserID') == null){
                window.location.href = 'index.html'
            }
        },
        data: () => {
            return {
                UserID: '',
                remainingServiceDay: 0,
                tel: null,
                email: null,
                predictItems:[],
                predictFields:[],
                loanModal: {
                    index: null,
                    id: 'info-modal',
                    title: '贷款管理',
                    loan:{
                        money: null,
                        rate: null,
                        loanStart:null,
                        loanEnd:null,
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
                        loanStart:null,
                        loanEnd:null,
                        situation: null

                    }
                },
                predictDetails:[],
                levelMap: [
                    { text: 'A', value: 1},
                    { text: 'B', value: 2 },
                    { text: 'C', value: 3 }
                ]
            }
        },
        mounted () {
            this.predictDetails = []
            try {
                /* 示例数据
                this.predictItems = [
                    {
                        id: '2',
                        time:'2020.10.25 19:21:35',
                        name:'珞珈面馆',
                        business:'餐饮业',
                        city:"武汉",
                        level:'A'
                    }
                ]
                */

                this.axios.get('/api/me')
                    .then((response) => {
                        console.log(response)
                        this.UserID = response.data.data.username
                        let time1 = Date.parse(new Date())
                        let time2 = Date.parse(response.data.data.restUseTime)
                        this.remainingServiceDay = Math.ceil((time2 - time1)/1000/60/60/24)
                        this.tel = response.data.data.phoneNum
                        this.email = response.data.data.email

                        this.predictDetails.forEach((item) => {
                            let p ={
                                id: item.id,
                                name: item.industryName,
                                time: item.predictTime.substring(0,item.predictTime.indexOf("T")),
                                business: '餐饮业',
                                city: item.city,
                                level: this.levelMap[item.predictRiskLevel].text
                            }
                            this.predictItems.push(p)
                        })

                        this.predictLoaded = true
                    })
                    .catch((error) => {
                        console.log(error)
                    });

                this.predictFields =[
                    { key: 'time', label: '预测时间' },
                    { key: 'name', label: '企业名称' },
                    { key: 'city', label: '所在城市' },
                    { key: 'business', label: '所在行业' },
                    { key: 'level', label: '预测风险等级' },
                    { key: 'operation', label:'管理' },
                    { key: 'detail', label:'详情' }
                ]

                this.getAllPrediction()

            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            initLoanModal(item, index, button) {
                this.loanModal.index = index

                this.loanModal.loan = {
                    id: this.predictDetails[index].id,
                    money: this.predictDetails[index].loanAmount,
                    rate: this.predictDetails[index].loanRate,
                    loanStart: this.predictDetails[index].loanStart,
                    loanEnd: this.predictDetails[index].loanEnd,
                    situation: this.predictDetails[index].repaymentLevel
                }

                this.loanModal.note = this.predictItems[this.loanModal.index].note

                this.$root.$emit('bv::show::modal', this.loanModal.id, button)
            },
            handleCancel(){
                this.$nextTick(() => {
                    this.$bvModal.hide(this.loanModal.id)
                })
            },
            handleOk() {
                this.axios
                    .put("/api/prediction",{
                        "id": this.loanModal.loan.id,
                        "loanAmount": this.loanModal.loan.money,
                        "loanRate": this.loanModal.loan.rate,
                        "loanStart": this.loanModal.loan.loanStart,
                        "loanEnd": this.loanModal.loan.loanEnd,
                        "repaymentLevel": this.loanModal.loan.situation
                    })
                    .then((response)=> {
                        console.log(response.data)

                        this.getAllPrediction()
                    })
                    .catch((error)=> {
                        console.log(error)
                    });
                this.$nextTick(() => {
                    this.$bvModal.hide(this.loanModal.id)
                })
            },
            initDetailModal(item, index, button) {
                this.detailModal.index = index
                //TODO:显示预测的详情记录【不用再获取，从前面获取的完整记录中构造即可】（wx）


                this.$root.$emit('bv::show::modal', this.detailModal.id, button)
            },
            getAllPrediction(){
                this.axios.get('/api/predictions')
                    .then((response) => {
                        console.log(response)
                        this.predictDetails = []
                        response.data.data.forEach((item) => {
                            console.log(item)
                            this.predictDetails.push(item)
                        })
                        this.predictDetails.forEach((item) => {
                            let p ={
                                id: item.id,
                                name: item.industryName,
                                time: item.predictTime.substring(0,item.predictTime.indexOf("T")),
                                business: '餐饮业',
                                city: item.city,
                                level: this.levelMap[item.predictRiskLevel].text
                            }
                            this.predictItems.push(p)
                        })

                        this.predictLoaded = true
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

        }
    }

</script>
