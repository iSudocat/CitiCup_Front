<template>
    <div>
        <b-card-text>请选择经营范围</b-card-text>
        <b-form-select v-model="range.selected" :options="range.options" size="sm" @input="dataTransport"></b-form-select>
        <b-card-text style="margin-top: 20px">请输入企业名称</b-card-text>
        <b-form-input v-model="name" type="text" size="sm" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请选择所在地区</b-card-text>
        <div class="row">
            <div class="col-6">
                <b-form-select v-model="province.selected" :options="province.options" size="sm" @input="pChange" ></b-form-select>
            </div>
            <div class="col-6">
                <b-form-select v-model="city.selected" :options="city.options" size="sm" @input="dataTransport"></b-form-select>
            </div>
        </div>
        <b-card-text style="margin-top: 20px">请输入评分：{{ star }}</b-card-text>
        <b-form-input v-model="star" type="range" min="0" max="5" step="0.1" size="sm" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入人均价格（元）</b-card-text>
        <b-form-input v-model="avgPrice" type="number" min="0" size="sm" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入最低价格（元）</b-card-text>
        <b-form-input v-model="minPrice" type="number" min="0" size="sm" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入历史订单数：</b-card-text>
        <b-form-input v-model="totalOrder" type="number" min="0" size="sm" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">有无外卖</b-card-text>
        <b-form-group>
            <b-form-radio v-model="takeout" value="1" @input="dataTransport">有</b-form-radio>
            <b-form-radio v-model="takeout" value="0" @input="dataTransport">无</b-form-radio>
        </b-form-group >
        <b-card-text style="margin-top: 20px">有无WIFI</b-card-text>
        <b-form-group>
            <b-form-radio v-model="wifi" value="1" @input="dataTransport">有</b-form-radio>
            <b-form-radio v-model="wifi" value="0" @input="dataTransport">无</b-form-radio>
        </b-form-group>
        <hr>

        <b-card-text style="margin-top: 20px">最大股东持股占比（%）</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="shareHolding.selected" :options="shareHolding.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>

        <b-card-text style="margin-top: 20px">经营场所权属</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="ownership.selected" :options="ownership.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <b-card-text style="margin-top: 20px">企业经营年限</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="businessTime.selected" :options="businessTime.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <b-card-text style="margin-top: 20px">累计授信总量（不含本笔申请）</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="totalCredit.selected" :options="totalCredit.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <b-card-text style="margin-top: 20px">征信总余额</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="creditBalance.selected" :options="creditBalance.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <b-card-text style="margin-top: 20px">押品有效担保价值</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="guaranteeValue.selected" :options="guaranteeValue.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <b-card-text style="margin-top: 20px">押品主担保方式</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-business" v-model="guarantyType.selected" :options="guarantyType.options"
                                buttons button-variant="outline-primary" size="sm" @input="dataTransport"></b-form-radio-group>
        </b-form-group>
        <hr>

        <b-form-checkbox v-model="inputIncome" :value=true :unchecked-value=false>手动输入年收入（元） *若不输入将使用系统模型进行预测</b-form-checkbox>
        <b-form-input v-if="inputIncome" v-model="income" type="number" min="0" size="sm" @input="dataTransport" style="margin-top: 10px"></b-form-input>

    </div>
</template>

<script>
    export default {
        name: "CateringComponent",
        data: () => {
            return {
                name: "",
                range:{
                    selected: null,
                    options: [
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
                    ]
                },
                province:{
                    selected: null,
                    options: [
                        { text: '请选择省份', value: null },
                        { text: '北京', value: '北京市', city:['北京市'] },
                        { text: '天津', value: '天津市', city:['天津市'] },
                        { text: '上海', value: '上海市', city:['上海市'] },
                        { text: '重庆', value: '重庆市', city:['重庆市'] },
                        { text: '河北', value: '河北省', city:['石家庄','唐山','承德'] },
                        { text: '山西', value: '山西省', city:['太原','忻州','长治'] },
                        { text: '辽宁', value: '辽宁省', city:['沈阳','大连','葫芦岛'] },
                        { text: '吉林', value: '吉林省', city:['长春','吉林','松原'] },
                        { text: '黑龙江', value: '黑龙江省', city:['哈尔滨','佳木斯','鹤岗'] },
                        { text: '江苏', value: '江苏省', city:['南京','徐州','泰州'] },
                        { text: '浙江', value: '浙江省', city:['杭州','绍兴','丽水'] },
                        { text: '安徽', value: '安徽省', city:['合肥','宣城','黄山'] },
                        { text: '福建', value: '福建省', city:['泉州','福州','厦门'] },
                        { text: '江西', value: '江西省', city:['南昌','赣州','萍乡'] },
                        { text: '山东', value: '山东省', city:['青岛','济南','菏泽'] },
                        { text: '河南', value: '河南省', city:['郑州','洛阳','开封'] },
                        { text: '湖北', value: '湖北省', city:['武汉','襄阳','恩施'] },
                        { text: '湖南', value: '湖南省', city:['长沙','湘潭','怀化'] },
                        { text: '广东', value: '广东省', city:['深圳','广州','佛山'] },
                        { text: '海南', value: '海南省', city:['海口','三亚','儋州'] },
                        { text: '四川', value: '四川省', city:['成都','宜宾','内江'] },
                        { text: '贵州', value: '贵州省', city:['贵阳','遵义','六盘水'] },
                        { text: '云南', value: '云南省', city:['昆明','红河','玉溪'] },
                        { text: '陕西', value: '陕西省', city:['西安','宝鸡','汉中'] },
                        { text: '甘肃', value: '甘肃省', city:['兰州','天水','酒泉'] },
                        { text: '青海', value: '青海省', city:['西宁','海东'] },
                        { text: '内蒙古', value: '内蒙古自治区', city:['鄂尔多斯','呼和浩特','包头'] },
                        { text: '广西', value: '广西壮族自治区', city:['南宁','柳州','桂林'] },
                        { text: '西藏', value: '西藏自治区', city:['拉萨'] },
                        { text: '宁夏', value: '宁夏回族自治区', city:['银川'] },
                        { text: '新疆', value: '新疆维吾尔自治区', city:['乌鲁木齐','昌吉'] }
                    ]
                },
                city:{
                    selected: null,
                    options: [
                        { text: '请选择城市', value: null }
                    ]
                },
                star: 0,
                avgPrice: 0,
                minPrice: 0,
                totalOrder: 0,
                takeout: null,
                wifi: null,
                inputIncome: true,
                income: 0,
                shareHolding:{
                    selected: -1,
                    options: [
                        { text: '缺失', value: null},
                        { text: '(0,0.5]', value: 0.5 },
                        { text: '(0.5,0.7]', value: 0.7 },
                        { text: '(0.7,0.99]', value: 0.99 },
                        { text: '(0.99,1]', value: 1 }
                    ]
                },
                ownership:{
                    selected: -1,
                    options: [
                        { text: '自有', value: 1},
                        { text: '租赁 / 缺失', value: 2 },
                        { text: '其他', value: 3 }
                    ]
                },
                businessTime:{
                    selected: -1,
                    options: [
                        { text: '缺失 / (0,3]', value: 3},
                        { text: '(3,4]', value: 4 },
                        { text: '(4,5]', value: 5 },
                        { text: '(5,11]', value: 11 },
                        { text: '(11,13]', value: 13 },
                        { text: '(13,MAX)', value: 15 }
                    ]
                },
                totalCredit:{
                    selected: -1,
                    options: [
                        { text: '缺失', value: null},
                        { text: '(0,2000000]', value: 2000000 },
                        { text: '(2000000,11799866]', value: 11799866 },
                        { text: '(11799866,17500000]', value: 17500000 },
                        { text: '(17500000,MAX)', value: 17500002 }
                    ]
                },
                creditBalance:{
                    selected: -1,
                    options: [
                        { text: '缺失 / (MIN,18245]', value: 18425},
                        { text: '(18245,207261]', value: 207261 },
                        { text: '(207261,1993987]', value: 1993987 },
                        { text: '(1993987,3917093]', value: 3917093 },
                        { text: '(3917093,MAX)', value: 3917095 }
                    ]
                },
                guaranteeValue:{
                    selected: -1,
                    options: [
                        { text: '缺失', value: null},
                        { text: '0', value: 0 },
                        { text: '(0,1000000]', value: 1000000 },
                        { text: '(1000000,27900000]', value: 27900000 },
                        { text: '(27900000,MAX)', value: 28900000 }
                    ]
                },
                guarantyType:{
                    selected: -1,
                    options: [
                        { text: '信用', value: 1},
                        { text: '抵押', value: 2 },
                        { text: '质押', value: 3 },
                        { text: '保证', value: 4 }
                    ]
                },
            }
        },
        methods: {
            dataTransport: function(){
                console.log('ok')
                this.$emit('childByValue', {
                    star: this.star,
                    avgPrice: this.avgPrice,
                    minPrice: this.minPrice,
                    takeout: this.takeout,
                    totalOrder: this.totalOrder,
                    wifi: this.wifi,
                    province: this.province.selected,
                    city: this.city.selected,
                    range: this.range.selected,

                    inputIncome: this.inputIncome,
                    income: this.income,
                    name: this.name,
                    shareHolding: this.shareHolding.selected,
                    ownership: this.ownership.selected,
                    businessTime: this.businessTime.selected,
                    totalCredit: this.totalCredit.selected,
                    creditBalance: this.creditBalance.selected,
                    guaranteeValue:this.guaranteeValue.selected,
                    guarantyType: this.guarantyType.selected
                })
            },
            pChange: function () {
                if(this.province.selected === null)
                    return;
                let p = {};
                for (let i=0; i < this.province.options.length; i++) {
                    if(this.province.options[i].value === this.province.selected){
                        p = this.province.options[i];
                        console.log(p);
                        break;
                    }
                }
                this.city.options = [{ text: '请选择城', value: null }];
                p.city.forEach((item) => {
                    console.log(item);
                    this.city.options.push({text: item, value: item});
                })
                this.city.selected = null;
            },
        }
    }
</script>

<style scoped>

</style>