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
        beforeMount(){
            //TODO:判断未登录时应跳转回登录界面（fhq）

            //window.location.href = 'index.html'
        },
        data: () => {
            return {

            }
        },
        methods: {
            //TODO:向后端发送续费请求(wx)
            pay1: function(){

            },
            pay2: function(){

            },
            pay3: function(){

            },
            pay4: function(){

            },
        }
    }

</script>
