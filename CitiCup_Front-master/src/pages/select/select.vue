<template>

    <div class="page select-page">

        <headerComponent></headerComponent>

        <div class="row justify-content-center">
            <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
                <b-card class="box" shadow>
                    <div>
                        <b-card-text>请选择行业信息</b-card-text>
                        <b-form-group>
                            <b-form-radio-group id="radio-group-business" v-model="business.selected" :options="business.options" buttons
                                                button-variant="outline-primary" size="sm" @input="bChange"></b-form-radio-group>
                        </b-form-group>
                    </div>
                    <div v-if="business.options[0].showDetails">
                        <CateringComponent v-on:childByValue="childByValue"></CateringComponent>
                    </div>
                    <b-button block pill @click="submit" variant="primary" style="margin-top: 20px">提交预测</b-button>
                </b-card>
            </div>

        </div>


    </div>


</template>

<script>
    import headerComponent from "@/pages/header/header"
    import CateringComponent from "@/pages/select/business/catering";
    export default {
        name: 'selectComponent',
        components: {CateringComponent,headerComponent},
        beforeMount(){
            if(this.cookies.get('UserID') == null){
                window.location.href = 'index.html'
            }
        },
        data: () => {
            return {
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
            }
        },
        methods: {
            bChange: function () {
                this.business.options[0].showDetails = this.business.selected === 1;
            },
            childByValue: function (childValue) {
                //TODO:完成所有组件间的数据传递(fhq)

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
                //TODO:构造并提交预测结果(fhq)
                this.submitData.yearIncome = (this.submitData.yearIncome == 0) ? null : this.submitData.yearIncome

                this.axios.defaults.withCredentials = true;
                this.axios
                    .post('/api/prediction', this.submitData)
                    .then((response) => {
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    });

            }
        }
    }

</script>
