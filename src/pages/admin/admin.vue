<template>

    <div class="page admin-page">

        <headerComponent></headerComponent>

        <div class="row justify-content-center">
            <div class="col-10 col-md-8" style="margin-top: 40px; margin-bottom: 40px;">
                <b-card title="预测记录">
                    <div>
                        <b-table hover :responsive="true" v-if="predictLoaded" :fields="predictFields" :items="predictItems">
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
        },
        data: () => {
            return {
                UserID: '',
                predictItems:[],
                predictFields:[],
            }
        },
        mounted () {
            try {

                //TODO:修改表头字段
                this.predictFields =[
                    { key: 'time', label: '预测时间' },
                    { key: 'name', label: '企业名称' },
                    { key: 'city', label: '所在城市' },
                    { key: 'business', label: '所在行业' },
                    { key: 'level', label: '预测风险等级' },
                    { key: 'operation', label:'管理' },
                    { key: 'detail', label:'详情' }
                ]

                //TODO:从后端获取所有预测记录
                //数据记录
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
            } catch (e) {
                console.error(e)
            }
        },
        methods: {

        }
    }

</script>
