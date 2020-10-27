<template>

  <div class="page select-page">

    <headerComponent></headerComponent>

    <div class="row justify-content-center">
      <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
        <b-card class="box" shadow>
          <div class="row">
            <div class="col-3">
              <b-card
                  border-variant="primary"
                  header="测试会员"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
              >
                <b-card-text>10元/1天</b-card-text>
                <b-button v-b-modal.modal-1 variant="outline-primary" size="sm" @click="pay1">立即充值</b-button>
              </b-card>
            </div>
            <div class="col-3">
              <b-card
                  border-variant="primary"
                  header="月度会员"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
              >
                <b-card-text>100元/1个月</b-card-text>
                <b-button v-b-modal.modal-2 variant="outline-primary" size="sm" @click="pay2">立即充值</b-button>
              </b-card>
            </div>
            <div class="col-3">
              <b-card
                  border-variant="primary"
                  header="半年会员"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
              >
                <b-card-text>500元/6个月</b-card-text>
                <b-button v-b-modal.modal-3 variant="outline-primary" size="sm" @click="pay3">立即充值</b-button>
              </b-card>
            </div>
            <div class="col-3">
              <b-card
                  border-variant="primary"
                  header="年度会员"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center"
              >
                <b-card-text>900元/1年</b-card-text>
                <b-button v-b-modal.modal-4 variant="outline-primary" size="sm" @click="pay4">立即充值</b-button>
              </b-card>
            </div>
          </div>

          <b-modal size="sm" id="modal-1" title="扫码立即充值" ok-only>
            <div class="row justify-content-center">
              <img class="" src="../../assets/pay.jpg" alt="支付二维码"/>
            </div>
          </b-modal>

          <b-modal size="sm" id="modal-2" title="扫码立即充值" ok-only>
            <div class="row justify-content-center">
              <img class="" src="../../assets/pay.jpg" alt="支付二维码"/>
            </div>
          </b-modal>

          <b-modal size="sm" id="modal-3" title="扫码立即充值" ok-only>
            <div class="row justify-content-center">
              <img class="" src="../../assets/pay.jpg" alt="支付二维码"/>
            </div>
          </b-modal>

          <b-modal size="sm" id="modal-4" title="扫码立即充值" ok-only>
            <div class="row justify-content-center">
              <img class="" src="../../assets/pay.jpg" alt="支付二维码"/>
            </div>
          </b-modal>
        </b-card>
      </div>

    </div>


  </div>


</template>

<script>
import headerComponent from "@/pages/header/header"

export default {
  name: 'payComponent',
  components: {headerComponent},
  beforeMount() {
    if (this.cookies.get('UserID') == null) {
      window.location.href = 'index.html'
    }
    if (this.cookies.get('isAdmin') === 'true') {
      window.location.href = 'index.html'
    }
  },
  data: () => {
    return {}
  },
  methods: {
    pay1: function () {
      let url = '/api/renew?level=1';
      this.axios
          .post(url)
          .then(response => (this.info = response))
          .catch((error) => { //请求失败处理
            console.log(error);
          });
    },
    pay2: function () {
      let url = '/api/renew?level=2';
      this.axios
          .post(url)
          .then(response => (this.info = response))
          .catch((error) => { //请求失败处理
            console.log(error);
          });
    },
    pay3: function () {
      let url = '/api/renew?level=3';
      this.axios
          .post(url)
          .then(response => (this.info = response))
          .catch((error) => { //请求失败处理
            console.log(error);
          });
    },
    pay4: function () {
      let url = '/api/renew?level=4';
      this.axios
          .post(url)
          .then(response => (this.info = response))
          .catch((error) => { //请求失败处理
            console.log(error);
          });
    },
  }
}

</script>
