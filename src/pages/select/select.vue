<template>

    <div class="page select-page">

        <headerComponent></headerComponent>

        <div class="row justify-content-center">
            <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
                <b-card class="box" shadow>
                    <div class="select-area" v-if="showSelectArea">
                        <div>
                            <b-card-text>请选择行业信息</b-card-text>
                            <b-form-group>
                                <b-form-radio-group id="radio-group-business" v-model="business.selected" :options="business.options" buttons
                                                    button-variant="outline-primary" size="sm" @input="bChange"></b-form-radio-group>
                            </b-form-group>
                        </div>
                        <div v-if="business.options[0].showDetails">
                            <cateringComponent v-on:childByValue="childByValue"></cateringComponent>
                        </div>
                        <b-button block pill @click="submit" variant="primary" style="margin-top: 20px">提交预测</b-button>
                    </div>

                    <!--预测结果界面-->
                    <div class="Result-area" v-if="showResultArea">
                        <div class="row align-items-center" style="margin-top: 20px;">
                            <div class="col-4 offset-2">
                                <b-card-text style="font-size:40px;">风险等级</b-card-text>
                            </div>
                            <div class="col-6" v-if="result.level === 1">
                                <img class="" src="../../assets/a.png" style="max-height: 140px;" alt="A"/>
                            </div>
                            <div class="col-6" v-if="result.level === 2">
                                <img class="" src="../../assets/b.png" style="max-height: 140px;" alt="A"/>
                            </div>
                            <div class="col-6" v-if="result.level === 3">
                                <img class="" src="../../assets/c.png" style="max-height: 140px;" alt="A"/>
                            </div>
                        </div>
                        <div class="row align-items-center" style="margin-top: 50px;margin-bottom: 30px;" v-if="showIncome">
                            <div class="col-4 offset-2">
                                <b-card-text style="font-size:40px;">预期年收入</b-card-text>
                            </div>
                            <div class="col-6">
                                <b-card-text style="font-size:30px;">{{result.income}}元</b-card-text>
                            </div>
                        </div>
                    </div>

                    <!--预测加载界面-->
                    <div class="progress-area" v-if="showProgress">
                        <div class="d-flex justify-content-center" style="margin-top: 20px;margin-bottom: 20px">
                            <div style="margin-right: 10px;">
                                <b-spinner variant="primary" ></b-spinner>
                            </div>
                            <div>
                                <b-card-text style="font-size:20px;">预测进行中……</b-card-text>
                            </div>
                        </div>
                    </div>
                </b-card>
            </div>

        </div>

    </div>

</template>

<script>
    import headerComponent from "@/pages/header/header"
    import cateringComponent from "@/pages/select/business/catering";
    export default {
        name: 'selectComponent',
        components: {cateringComponent,headerComponent},
        beforeMount(){
            if(this.cookies.get('UserID') == null){
                window.location.href = 'index.html'
            }
            if(this.cookies.get('isAdmin') === 'true'){
                window.location.href = 'index.html'
            }
        },
        data: () => {
            return {
                showSelectArea: true,
                showResultArea: false,
                showIncome: false,
                showProgress: false,
                business:{
                    selected: 0,
                    options: [
                        { text: '餐饮业', value: 1, showDetails: false},
                        { text: '酒店业', value: 2 },
                        { text: '旅游业', value: 3 }
                    ]
                },
                submitData:{
                    score: 0,
                    averageCost: 0,
                    lowestCost: 0,
                    takeOut: 0,
                    totalSold: 0,
                    wifi: 0,
                    province: '',
                    city: '',
                    category: 0,
                    yearIncome : null, //可无
                    enterpriseName: '',
                    industryName: '餐饮业',
                    proportion: 0,
                    ownershipOfPremises: 0,
                    operatingAge: 0,
                    totalLoanMoney: 0,
                    totalCreditBalance: 0,
                    effectiveGuaranteeValue: 0,
                    mainGuaranteeMethod: 0
                },
                result:{
                    income: null,
                    level: null
                }
            }
        },
        methods: {
            bChange: function () {
                this.business.options[0].showDetails = this.business.selected === 1;
            },
            childByValue: function (childValue) {
                this.submitData.score = childValue.star
                this.submitData.averageCost = childValue.avgPrice
                this.submitData.lowestCost = childValue.minPrice
                this.submitData.takeOut = childValue.takeout
                this.submitData.totalSold = childValue.totalOrder
                this.submitData.wifi = childValue.wifi
                this.submitData.province = childValue.province
                this.submitData.city = childValue.city
                this.submitData.category = childValue.range

                this.submitData.enterpriseName = childValue.name
                this.submitData.industryName = '餐饮业'
                this.submitData.proportion = childValue.shareHolding
                this.submitData.ownershipOfPremises = childValue.ownership
                this.submitData.operatingAge = childValue.businessTime
                this.submitData.totalLoanMoney = childValue.totalCredit
                this.submitData.totalCreditBalance = childValue.creditBalance
                this.submitData.effectiveGuaranteeValue = childValue.guaranteeValue
                this.submitData.mainGuaranteeMethod = childValue.guarantyType

                this.submitData.yearIncome = childValue.income
            },
            submit: function(){
                this.showSelectArea = false
                this.showProgress = true

                this.submitData.yearIncome = (this.submitData.yearIncome === 0) ? null : this.submitData.yearIncome

                this.axios.defaults.withCredentials = true;
                this.axios
                    .post('/api/prediction', this.submitData)
                    .then((response) => {
                        console.log(response.data)
                        this.result.level = response.data.predictRiskLevel
                        this.result.income = Math.round(response.data.predictionValue)
                        this.showProgress = false
                        this.showResultArea = true
                        this.showIncome = this.result.income !== 0
                    })
                    .catch((error) => {
                        console.log(error)
                    });

            }
        }
    }

</script>
