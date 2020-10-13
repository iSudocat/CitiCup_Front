<template>
    <div>
        <b-card-text>请选择经营范围</b-card-text>
        <b-form-group>
            <b-form-radio-group id="radio-group-range" v-model="range.selected" :options="range.options" buttons
                                button-variant="outline-primary" size="sm" ></b-form-radio-group>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "Catering",
        data: () => {
            return {
                range:{
                    selected: 0,
                    options: [
                        { text: '火锅', value: 1 },
                        { text: '快餐', value: 2 },
                        { text: '甜品', value: 3 }
                    ],

                }
            }
        }
    }
</script>

<style scoped>

</style>