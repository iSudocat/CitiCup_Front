<template>
    <div>
        <b-card-text>请选择经营范围</b-card-text>
        <b-form-select v-model="range.selected" :options="range.options" size="sm" @input="dataTransport"></b-form-select>
        <b-card-text style="margin-top: 20px">请选择所在地区</b-card-text>
        <div class="row">
            <div class="col-6">
                <b-form-select v-model="province.selected" :options="province.options" size="sm" @input="pChange" ></b-form-select>
            </div>
            <div class="col-6">
                <b-form-select v-model="city.selected" :options="city.options" size="sm" @input="dataTransport"></b-form-select>
            </div>
        </div>
        <b-card-text style="margin-top: 20px">请输入店铺评分：{{ star }}</b-card-text>
        <b-form-input v-model="star" type="range" min="0" max="5" step="0.1" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入店铺人均价格：</b-card-text>
        <b-form-input v-model="avgPrice" type="number" min="0" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入店铺最低价格：</b-card-text>
        <b-form-input v-model="minPrice" type="number" min="0" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">请输入店铺历史订单数：</b-card-text>
        <b-form-input v-model="totalOrder" type="number" min="0" @input="dataTransport"></b-form-input>
        <b-card-text style="margin-top: 20px">店铺有无外卖：</b-card-text>
        <b-form-group>
            <b-form-radio v-model="takeout" value="1" @input="dataTransport">有</b-form-radio>
            <b-form-radio v-model="takeout" value="0" @input="dataTransport">无</b-form-radio>
        </b-form-group >
        <b-card-text style="margin-top: 20px">店铺有无WIFI：</b-card-text>
        <b-form-group>
            <b-form-radio v-model="wifi" value="1" @input="dataTransport">有</b-form-radio>
            <b-form-radio v-model="wifi" value="0" @input="dataTransport">无</b-form-radio>
        </b-form-group>

    </div>
</template>

<script>
    export default {
        name: "CateringComponent",
        data: () => {
            return {
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
                province:{  //TODO:把河北省以后省份的城市填完
                    selected: null,
                    options: [
                        { text: '请选择省份', value: null },
                        { text: '北京', value: '北京市', city:['北京市'] },
                        { text: '天津', value: '天津市', city:['天津市'] },
                        { text: '上海', value: '上海市', city:['上海市'] },
                        { text: '重庆', value: '重庆市', city:['重庆市'] },
                        { text: '河北', value: '河北省', city:['石家庄','忻州','长治'] },
                        { text: '山西', value: '山西省', city:['太原'] },
                        { text: '辽宁', value: '辽宁省', city:['重庆市'] },
                        { text: '吉林', value: '吉林省', city:['重庆市'] },
                        { text: '黑龙江', value: '黑龙江省', city:['重庆市'] },
                        { text: '江苏', value: '江苏省', city:['重庆市'] },
                        { text: '浙江', value: '浙江省', city:['重庆市'] },
                        { text: '安徽', value: '安徽省', city:['重庆市'] },
                        { text: '福建', value: '福建省', city:['重庆市'] },
                        { text: '江西', value: '江西省', city:['重庆市'] },
                        { text: '山东', value: '山东省', city:['重庆市'] },
                        { text: '湖北', value: '湖北省', city:['重庆市'] },
                        { text: '湖南', value: '湖南省', city:['重庆市'] },
                        { text: '广东', value: '广东省', city:['重庆市'] },
                        { text: '海南', value: '海南省', city:['重庆市'] },
                        { text: '四川', value: '四川省', city:['重庆市'] },
                        { text: '贵州', value: '贵州省', city:['重庆市'] },
                        { text: '云南', value: '云南省', city:['重庆市'] },
                        { text: '陕西', value: '陕西省', city:['重庆市'] },
                        { text: '甘肃', value: '甘肃省', city:['重庆市'] },
                        { text: '青海', value: '青海省', city:['重庆市'] },
                        { text: '内蒙古', value: '内蒙古自治区', city:['重庆市'] },
                        { text: '广西', value: '广西壮族自治区', city:['重庆市'] },
                        { text: '西藏', value: '西藏自治区', city:['重庆市'] },
                        { text: '宁夏', value: '宁夏回族自治区', city:['重庆市'] },
                        { text: '新疆', value: '新疆维吾尔自治区', city:['重庆市'] }
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
                takeout: null,
                wifi: null,
                totalOrder: 0
            }
        },
        methods: {
            dataTransport: function(){
                console.log('ok')
                this.$emit('childByValue', {
                    range: this.range.selected,
                    province: this.province.selected,
                    city: this.city.selected,
                    star: this.star,
                    avgPrice: this.avgPrice,
                    minPrice: this.minPrice,
                    takeout: this.takeout,
                    wifi: this.wifi,
                    totalOrder: this.totalOrder
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
                this.city.options = [{ text: '请选择城市', value: null }];
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