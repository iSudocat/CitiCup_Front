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
            //TODO:判断未登录时应跳转回登录界面(fhq)

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
            bChange: function () {
                this.business.options[0].showDetails = this.business.selected === 1;
            },
            childByValue: function (childValue) {
                //TODO:完成所有组件间的数据传递(fhq)

                //例子：
                this.submitData.range = childValue.range
            },
            submit: function(){
                //TODO:构造并提交预测结果(fhq)

                console.log(this.submitData.range)

            }
        }
    }

</script>
