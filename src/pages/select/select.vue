<template>

    <div class="page select-page">
        <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light bg-white">
                <div class="container">
                    <div class="col-8 justify-content-start">
                        <img src="../../assets/logo.svg" alt="" width="30">
                        <span class="text-uppercase text-small font-weight-bold text-dark ml-2 mb-0">Blanker——白板企业信贷评估平台</span>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center">
                        <b-button variant="outline-primary" size="sm" @click="logOut">注销</b-button>
                    </div>
                </div>
            </nav>
        </header>

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
                    <b-button block pill @click="submit" variant="primary">提交预测</b-button>
                </b-card>
            </div>

        </div>


    </div>


</template>

<script>
    import CateringComponent from "@/pages/select/business/catering";
    export default {
        name: 'selectComponent',
        components: {CateringComponent},
        beforeMount: function(){
            //TODO:判断未登录时应跳转回登录界面

            //window.location.href = 'index.html'
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
                    range: 0,
                }
            }
        },
        methods: {

            logOut: function () {
                //TODO:注销后清除cookies

                window.location.href = 'index.html'
            },
            bChange: function () {
                this.business.options[0].showDetails = this.business.selected === 1;
            },
            childByValue: function (childValue) {
                //TODO:完成所有组件间的数据传递

                //例子：
                this.submitData.range = childValue.range
            },
            submit: function(){
                //TODO:构造并提交预测结果

                console.log(this.submitData.range)

            }
        }
    }

</script>
