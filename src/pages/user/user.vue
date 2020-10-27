<template>

  <div class="page select-page">

    <headerComponent></headerComponent>

    <div class="row justify-content-center">
      <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
        <b-card class="box" shadow>
          <div class="d-flex justify-content-center">
            <img class="img-circle" src="../../assets/head.svg" alt="头像"/>
          </div>
          <b-card-text style="margin-top: 20px">
            <div class="col-md-8 offset-md-3">账号：{{ UserID }}</div>
          </b-card-text>
          <b-card-text>
            <div class="col-md-6 offset-md-3">
              剩余服务时间：{{ remainingServiceDay }}天
              <b-link href="pay.html">充值</b-link>
            </div>
          </b-card-text>
          <b-card-text>
            <div class="col-md-8 offset-md-3">手机号：{{ tel }}</div>
          </b-card-text>
          <b-card-text>
            <div class="col-md-8 offset-md-3">邮箱：{{ email }}</div>
          </b-card-text>

          <b-card title="预测记录">
            <div>
              <b-table hover :responsive="true" :fields="predictFields" :items="predictItems">
                <template v-slot:cell(operation)="row">
                  <b-button variant="primary" size="sm" @click="initLoanModal(row.item, row.index, $event.target)"
                            style="width: 5rem">
                    贷款管理
                  </b-button>
                </template>

                <template v-slot:cell(detail)="row">
                  <b-button variant="info" size="sm" @click="initDetailModal(row.item, row.index, $event.target)"
                            style="width: 3rem">
                    查看
                  </b-button>
                </template>

                <template v-slot:head()="scope">
                  <div class="text-nowrap">{{ scope.label }}</div>
                </template>
                <template v-slot:cell()="data">
                  <div class="text-nowrap">{{ data.value }}</div>
                </template>
              </b-table>
            </div>

            <b-modal size="md" :id="loanModal.id" :title="loanModal.title">
              <form>
                <b-form-group label="贷款额度（万元）">
                  <b-form-input v-model="loanModal.loan.money"></b-form-input>
                </b-form-group>
                <b-form-group label="贷款利率（%）">
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
                      <div class="col">
                        <b-form-radio v-model="loanModal.loan.situation" value="1">极好</b-form-radio>
                      </div>
                      <div class="col">
                        <b-form-radio v-model="loanModal.loan.situation" value="2">较好</b-form-radio>
                      </div>
                      <div class="col">
                        <b-form-radio v-model="loanModal.loan.situation" value="3">一般</b-form-radio>
                      </div>
                      <div class="col">
                        <b-form-radio v-model="loanModal.loan.situation" value="4">差</b-form-radio>
                      </div>
                    </div>
                  </b-form-group>
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
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">所在行业：{{ detailModal.detail.business }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">企业名称：{{ detailModal.detail.name }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">经营范围：{{ detailModal.detail.range }}</div>
                  <div class="col-md-5" style="margin-top: 5px;">所在城市：{{ detailModal.detail.city }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">评分：{{ detailModal.detail.star }}</div>
                  <div class="col-md-5" style="margin-top: 5px;">人均价格：{{ detailModal.detail.avgPrice }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">最低价格：{{ detailModal.detail.minPrice }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">历史订单数：{{ detailModal.detail.totalOrder }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">有无外卖：{{ detailModal.detail.takeout }}</div>
                  <div class="col-md-5" style="margin-top: 5px;">有无WiFi：{{ detailModal.detail.wifi }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">年收入：{{ detailModal.detail.income }}</div>
                  <div class="col-md-5" style="margin-top: 5px;">最大股东持股占比：{{ detailModal.detail.shareHolding }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">经营场所权属：{{ detailModal.detail.ownership }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">企业经营年限：{{ detailModal.detail.businessTime }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">
                    累计授信总量（不含本笔申请）：{{ detailModal.detail.totalCredit }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">征信总余额：{{ detailModal.detail.creditBalance }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">
                    押品有效担保价值：{{ detailModal.detail.guaranteeValue }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">押品主担保方式：{{ detailModal.detail.guarantyType }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">贷款额度（万元）：{{ detailModal.detail.money }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">贷款利率：{{ detailModal.detail.rate }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">贷款起始时间：{{ detailModal.detail.loanStart }}
                  </div>
                  <div class="col-md-5" style="margin-top: 5px;">贷款结束时间：{{ detailModal.detail.loanEnd }}</div>
                </div>
                <div class="row">
                  <div class="col-md-5 offset-md-1" style="margin-top: 5px;">还款情况：{{ detailModal.detail.situation }}
                  </div>
                </div>
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
  beforeMount() {
    if (this.cookies.get('UserID') == null) {
      window.location.href = 'index.html'
    }
    if (this.cookies.get('isAdmin') === 'true') {
      this.isAdmin = true
      window.location.href = 'index.html'
    }
  },
  data: () => {
    return {
      UserID: '',
      remainingServiceDay: 0,
      tel: null,
      email: null,
      isAdmin: false,
      predictItems: [],
      predictFields: [],
      loanModal: {
        index: null,
        id: 'info-modal',
        title: '贷款管理',
        loan: {
          money: null,
          rate: null,
          loanStart: null,
          loanEnd: null,
          situation: null
        }
      },
      detailModal: {
        index: null,
        id: 'audio-modal_admin',
        title: '详情',
        record: '',
        detail: {
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
          loanStart: null,
          loanEnd: null,
          situation: null

        }
      },
      predictDetails: [],
      levelMap: [
        {text: 'A', value: 1},
        {text: 'B', value: 2},
        {text: 'C', value: 3}
      ],
      rangeMap: [
        {text: '请选择', value: null},
        {text: '外国菜', value: 1},
        {text: '地方菜', value: 2},
        {text: '粉面', value: 3},
        {text: '蛋糕甜点', value: 4},
        {text: '火锅', value: 5},
        {text: '海鲜', value: 6},
        {text: '小吃', value: 7},
        {text: '烧烤', value: 8},
        {text: '烤肉 铁板烧', value: 9},
        {text: '早餐', value: 11},
        {text: '西餐', value: 12},
        {text: '饮品', value: 13},
        {text: '快餐 简餐', value: 14},
        {text: '料理', value: 16},
        {text: '素食', value: 17},
        {text: '自助餐', value: 18},
        {text: '茶点', value: 19},
        {text: '披萨', value: 20},
        {text: '特色菜', value: 21},
        {text: '鱼鸭鸡兔鹅', value: 22},
        {text: '焖锅 煲', value: 23},
        {text: '其他', value: 24}
      ],
      situationMap: [
        {text: '极好', value: 1},
        {text: '较好', value: 2},
        {text: '一般', value: 3},
        {text: '差', value: 4}
      ],
      shareHoldingMap: [
        {text: '缺失', value: null},
        {text: '(0,0.5]', value: 0.5},
        {text: '(0.5,0.7]', value: 0.7},
        {text: '(0.7,0.99]', value: 0.99},
        {text: '(0.99,1]', value: 1}
      ],
      ownershipMap: [
        {text: '自有', value: 1},
        {text: '租赁/缺失', value: 2},
        {text: '其他', value: 3}
      ],
      businessTimeMap: [
        {text: '缺失 / (0,3]', value: 3},
        {text: '(3,4]', value: 4},
        {text: '(4,5]', value: 5},
        {text: '(5,11]', value: 11},
        {text: '(11,13]', value: 13},
        {text: '(13,MAX)', value: 15}
      ],
      totalCreditMap: [
        {text: '缺失', value: null},
        {text: '(0,2000000]', value: 2000000},
        {text: '(2000000,11799866]', value: 11799866},
        {text: '(11799866,17500000]', value: 17500000},
        {text: '(17500000,MAX)', value: 17500002}
      ],
      creditBalanceMap: [
        {text: '缺失 / (0,18245]', value: 18425},
        {text: '(18245,207261]', value: 207261},
        {text: '(207261,1993987]', value: 1993987},
        {text: '(1993987,3917093]', value: 3917093},
        {text: '(3917093,MAX)', value: 3917095}
      ],
      guaranteeValueMap: [
        {text: '缺失', value: null},
        {text: '0', value: 0},
        {text: '(0,1000000]', value: 1000000},
        {text: '(1000000,27900000]', value: 27900000},
        {text: '(27900000,MAX)', value: 28900000}
      ],
      guarantyTypeMap: [
        {text: '信用', value: 1},
        {text: '抵押', value: 2},
        {text: '质押', value: 3},
        {text: '保证', value: 4}
      ]
    }
  },
  mounted() {
    this.predictDetails = []
    try {
      this.axios.get('/api/me')
          .then((response) => {
            console.log(response)
            this.UserID = response.data.data.username
            let time1 = Date.parse(new Date())
            let time2 = Date.parse(response.data.data.restUseTime)
            this.remainingServiceDay = Math.ceil((time2 - time1) / 1000 / 60 / 60 / 24)
            this.tel = response.data.data.phoneNum
            this.email = response.data.data.email
          })
          .catch((error) => {
            console.log(error)
          });

      this.predictFields = [
        {key: 'time', label: '预测时间'},
        {key: 'name', label: '企业名称'},
        {key: 'city', label: '所在城市'},
        {key: 'business', label: '所在行业'},
        {key: 'level', label: '预测风险等级'},
        {key: 'operation', label: '管理'},
        {key: 'detail', label: '详情'}
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
    handleCancel() {
      this.$nextTick(() => {
        this.$bvModal.hide(this.loanModal.id)
      })
    },
    handleOk() {
      let time1 = Date.parse(this.loanModal.loan.loanStart)
      let time2 = Date.parse(this.loanModal.loan.loanEnd)
      let a = Math.ceil((time2 - time1) / 1000 / 60 / 60 / 24)
      if (a < 0) {
        alert("开始时间不能晚于结束时间.")
      } else {
        this.axios
            .put("/api/prediction", {
              "id": this.loanModal.loan.id,
              "loanAmount": this.loanModal.loan.money,
              "loanRate": this.loanModal.loan.rate,
              "loanStart": this.loanModal.loan.loanStart,
              "loanEnd": this.loanModal.loan.loanEnd,
              "repaymentLevel": this.loanModal.loan.situation
            })
            .then((response) => {
              console.log(response.data)
              this.getAllPrediction()
            })
            .catch((error) => {
              console.log(error)
            });
        this.$nextTick(() => {
          this.$bvModal.hide(this.loanModal.id)
        })
      }
    },
    initDetailModal(item, index, button) {
      this.detailModal.index = index
      this.detailModal.detail = {
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
        ownership: this.ownershipMap[this.predictDetails[index].ownershipOfPremises - 1].text,
        businessTime: this.getBusinessTimeText(this.predictDetails[index].operatingAge),
        totalCredit: this.getTotalCreditText(this.predictDetails[index].totalLoanMoney),
        creditBalance: this.getCreditBalanceText(this.predictDetails[index].totalCreditBalance),
        guaranteeValue: this.getGuaranteeValueText(this.predictDetails[index].effectiveGuaranteeValue),
        guarantyType: this.guarantyTypeMap[this.predictDetails[index].mainGuaranteeMethod - 1].text,
        money: this.predictDetails[index].loanAmount,
        rate: this.predictDetails[index].loanRate,
        loanStart: this.predictDetails[index].loanStart == null ? '' : this.predictDetails[index].loanStart.substring(0, this.predictDetails[index].loanStart.indexOf("T")),
        loanEnd: this.predictDetails[index].loanEnd == null ? '' : this.predictDetails[index].loanEnd.substring(0, this.predictDetails[index].loanEnd.indexOf("T")),
        situation: this.predictDetails[index].repaymentLevel == null ? '' : this.situationMap[this.predictDetails[index].repaymentLevel].text
      }

      this.$root.$emit('bv::show::modal', this.detailModal.id, button)
    },
    getAllPrediction() {
      this.predictItems = []
      this.predictDetails = []
      this.axios.get('/api/predictions')
          .then((response) => {
            console.log(response)

            response.data.data.forEach((item) => {
              this.predictDetails.push(item)
            })
            this.predictDetails.forEach((item) => {
              let p = {
                id: item.id,
                name: item.enterpriseName,
                time: item.predictTime.substring(0, item.predictTime.indexOf("T")),
                business: '餐饮业',
                city: item.city,
                level: this.levelMap[item.predictRiskLevel - 1].text
              }
              this.predictItems.push(p)
            })
          })
          .catch((error) => {
            console.log(error)
          });
    },
    getShareHoldingText(v) {
      let text
      this.shareHoldingMap.forEach((item) => {
        if (item.value === v)
          text = item.text
      })
      return text
    },
    getBusinessTimeText(v) {
      let text
      this.businessTimeMap.forEach((item) => {
        if (item.value === v)
          text = item.text
      })
      return text
    },
    getTotalCreditText(v) {
      let text
      this.totalCreditMap.forEach((item) => {
        if (item.value === v)
          text = item.text
      })
      return text
    },
    getCreditBalanceText(v) {
      let text
      this.creditBalanceMap.forEach((item) => {
        if (item.value === v)
          text = item.text
      })
      return text
    },
    getGuaranteeValueText(v) {
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
