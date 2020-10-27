<template>
    <div class="page admin-page">

        <headerComponent></headerComponent>

        <div class="row justify-content-center">
            <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
                <b-card title="所有预测记录">
                    <div>
                        <b-table hover :responsive="true" :fields="predictFields" :items="predictItems">
                            <template v-slot:head()="scope">
                                <div class="text-nowrap">{{ scope.label }}</div>
                            </template>
                            <template v-slot:cell()="data">
                                <div class="text-nowrap">{{data.value}}</div>
                            </template>
                        </b-table>
                    </div>

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
            if(this.cookies.get('isAdmin') === 'false' || this.cookies.get('isAdmin') === null){
                window.location.href = 'index.html'
            }
        },
        data: () => {
            return {
                UserID: '',
                predictItems:[],
                predictFields:[],
                predictDetails:[],
                levelMap: [
                    { text: 'A', value: 1},
                    { text: 'B', value: 2 },
                    { text: 'C', value: 3 }
                ],
                rangeMap: [
                    { text: '请选择', value: null },
                    { text: '外国菜', value: 1 },
                    { text: '地方菜', value: 2 },
                    { text: '粉面', value: 3 },
                    { text: '蛋糕甜点', value: 4 },
                    { text: '火锅', value: 5 },
                    { text: '海鲜', value: 6 },
                    { text: '小吃', value: 7 },
                    { text: '烧烤', value: 8 },
                    { text: '烤肉 铁板烧', value: 9 },
                    { text: '早餐', value: 11 },
                    { text: '西餐', value: 12 },
                    { text: '饮品', value: 13 },
                    { text: '快餐 简餐', value: 14 },
                    { text: '料理', value: 16 },
                    { text: '素食', value: 17 },
                    { text: '自助餐', value: 18 },
                    { text: '茶点', value: 19 },
                    { text: '披萨', value: 20 },
                    { text: '特色菜', value: 21 },
                    { text: '鱼鸭鸡兔鹅', value: 22 },
                    { text: '焖锅 煲', value: 23 },
                    { text: '其他', value: 24 }
                ],
                situationMap: [
                    { text: '极好', value: 1},
                    { text: '较好', value: 2 },
                    { text: '一般', value: 3 },
                    { text: '差', value: 4 }
                ],
                shareHoldingMap: [
                    { text: '缺失', value: null},
                    { text: '(0,0.5]', value: 0.5 },
                    { text: '(0.5,0.7]', value: 0.7 },
                    { text: '(0.7,0.99]', value: 0.99 },
                    { text: '(0.99,1]', value: 1 }
                ],
                ownershipMap: [
                    { text: '自有', value: 1},
                    { text: '租赁/缺失', value: 2 },
                    { text: '其他', value: 3 }
                ],
                businessTimeMap: [
                    { text: '缺失 / (0,3]', value: 3},
                    { text: '(3,4]', value: 4 },
                    { text: '(4,5]', value: 5 },
                    { text: '(5,11]', value: 11 },
                    { text: '(11,13]', value: 13 },
                    { text: '(13,MAX)', value: 15 }
                ],
                totalCreditMap: [
                    { text: '缺失', value: null},
                    { text: '(0,2000000]', value: 2000000 },
                    { text: '(2000000,11799866]', value: 11799866 },
                    { text: '(11799866,17500000]', value: 17500000 },
                    { text: '(17500000,MAX)', value: 17500002 }
                ],
                creditBalanceMap: [
                    { text: '缺失 / (0,18245]', value: 18425},
                    { text: '(18245,207261]', value: 207261 },
                    { text: '(207261,1993987]', value: 1993987 },
                    { text: '(1993987,3917093]', value: 3917093 },
                    { text: '(3917093,MAX)', value: 3917095 }
                ],
                guaranteeValueMap: [
                    { text: '缺失', value: null},
                    { text: '0', value: 0 },
                    { text: '(0,1000000]', value: 1000000 },
                    { text: '(1000000,27900000]', value: 27900000 },
                    { text: '(27900000,MAX)', value: 28900000 }
                ],
                guarantyTypeMap: [
                    { text: '信用', value: 1},
                    { text: '抵押', value: 2 },
                    { text: '质押', value: 3 },
                    { text: '保证', value: 4 }
                ]
            }
        },
        mounted () {
            try {
                this.predictFields =[
                    { key: 'time', label: '预测时间' },
                    { key: 'business', label: '所在行业' },
                    { key: 'name', label: '企业名称' },
                    { key: 'range', label: '经营范围' },
                    { key: 'city', label: '所在城市' },
                    { key: 'star', label: '评分' },
                    { key: 'avgPrice', label: '人均价格' },
                    { key: 'minPrice', label: '最低价格' },
                    { key: 'totalOrder', label: '历史订单数' },
                    { key: 'takeout', label: '有无外卖' },
                    { key: 'wifi', label: '有无WiFi' },
                    { key: 'income', label: '年收入' },
                    { key: 'ownership', label: '经营场所权属' },
                    { key: 'businessTime', label: '企业经营年限' },
                    { key: 'totalCredit', label: '累计授信总量（不含本笔申请）' },
                    { key: 'creditBalance', label: '征信总余额' },
                    { key: 'guaranteeValue', label: '押品有效担保价值' },
                    { key: 'guarantyType', label: '押品主担保方式' },
                    { key: 'money', label: '贷款额度（万元）' },
                    { key: 'loanStart', label: '贷款起始时间' },
                    { key: 'loanEnd', label: '贷款结束时间' },
                    { key: 'situation', label: '还款情况' },
                    { key: 'level', label: '预测风险等级' }
                ]

                this.getAllPrediction()


                console.log(this.predictItems)

            } catch (e) {
                console.error(e)
            }
        },
        methods: {
            getAllPrediction(){
                this.predictItems = []
                this.predictDetails = []
                this.axios.get('/api/predictions/all')
                    .then((response) => {
                        console.log(response)

                        response.data.data.forEach((item) => {
                            this.predictDetails.push(item)
                        })

                        this.predictDetails.forEach((item,index) => {
                            let p ={
                                time: this.predictDetails[index].predictTime.substring(0,this.predictDetails[index].predictTime.indexOf("T")),
                                business: '餐饮业',
                                name: this.predictDetails[index].enterpriseName,
                                range: this.rangeMap[this.predictDetails[index].category].text,
                                city: this.predictDetails[index].city,
                                star: this.predictDetails[index].score,
                                avgPrice: this.predictDetails[index].averageCost,
                                minPrice: this.predictDetails[index].lowestCost,
                                totalOrder: this.predictDetails[index].totalSold,
                                takeout: this.predictDetails[index].takeOut === 1.0 ? '有' : '无',
                                wifi: this.predictDetails[index].wifi === 1.0 ? '有' : '无',
                                income: Math.round(this.predictDetails[index].yearIncome),
                                shareHolding: this.getShareHoldingText(this.predictDetails[index].proportion),
                                ownership: this.ownershipMap[this.predictDetails[index].ownershipOfPremises].text,
                                businessTime: this.getBusinessTimeText(this.predictDetails[index].operatingAge),
                                totalCredit: this.getTotalCreditText(this.predictDetails[index].totalLoanMoney),
                                creditBalance: this.getCreditBalanceText(this.predictDetails[index].totalCreditBalance),
                                guaranteeValue: this.getGuaranteeValueText(this.predictDetails[index].effectiveGuaranteeValue),
                                guarantyType: this.guarantyTypeMap[this.predictDetails[index].mainGuaranteeMethod].text,
                                money: this.predictDetails[index].loanAmount,
                                rate: this.predictDetails[index].loanRate,
                                loanStart: this.predictDetails[index].loanStart == null ? '' : this.predictDetails[index].loanStart.substring(0,this.predictDetails[index].loanStart.indexOf("T")),
                                loanEnd:  this.predictDetails[index].loanEnd == null ? '' : this.predictDetails[index].loanEnd.substring(0,this.predictDetails[index].loanEnd.indexOf("T")),
                                situation: this.predictDetails[index].repaymentLevel == null ? '' : this.situationMap[this.predictDetails[index].repaymentLevel].text,
                                level: this.levelMap[item.predictRiskLevel].text
                            }
                            this.predictItems.push(p)

                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            },
            getShareHoldingText(v){
                let text
                this.shareHoldingMap.forEach((item) => {
                    if (item.value === v)
                        text = item.text
                })
                return text
            },
            getBusinessTimeText(v){
                let text
                this.businessTimeMap.forEach((item) => {
                    if (item.value === v)
                        text = item.text
                })
                return text
            },
            getTotalCreditText(v){
                let text
                this.totalCreditMap.forEach((item) => {
                    if (item.value === v)
                        text = item.text
                })
                return text
            },
            getCreditBalanceText(v){
                let text
                this.creditBalanceMap.forEach((item) => {
                    if (item.value === v)
                        text = item.text
                })
                return text
            },
            getGuaranteeValueText(v){
                let text
                this.guaranteeValueMap.forEach((item) => {
                    if (item.value === v)
                        text = item.text
                })
                return text
            }
        }
    }

</script>
