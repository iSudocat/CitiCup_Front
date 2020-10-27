<!--TODO:完成注册界面(fhq)-->
<template>
    <div class="page login-page">
        <div class="container d-flex align-items-center">
            <div class="form-holder has-shdow">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="info d-flex align-items-center">
                            <div class="welcome">
                                <h1>注册</h1>
                                <p>欢迎使用Blanker——白板企业信贷评估平台</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 bg-white">
                        <div class="form d-flex align-items-center">
                            <div class="content">
                                <b-form @submit="onSubmit" id="login-form">
                                    <div class="form-group">
                                        <b-form-input id="username" type="text" v-model="form.UserID" required
                                                      class="input-material" placeholder="请输入用户名"></b-form-input>
                                    </div>
                                    <div class="form-group">
                                        <b-input id="password" type="password" required v-model="form.Password"
                                                 class="input-material" placeholder="请输入密码"></b-input>
                                    </div>
                                    <div class="form-group">
                                        <b-input id="passwordAgain" type="password" required v-model="form.PasswordAgain"
                                                 class="input-material" placeholder="请再次输入密码"></b-input>
                                    </div>
                                    <div class="form-group">
                                        <b-form-input id="phone" type="text" v-model="form.Phone" required
                                                      class="input-material" placeholder="请输入手机号"></b-form-input>
                                    </div>
                                    <div class="form-group">
                                        <b-form-input id="email" type="email" v-model="form.Email" required
                                                      class="input-material" placeholder="请输入邮箱"></b-form-input>
                                    </div>
                                    <b-alert v-model="showAlert" variant="danger" dismissible>两次输入密码不一致!</b-alert>
                                    <b-alert
                                        :show="CountDown"
                                        dismissible
                                        variant="warning"
                                        @dismissed="CountDown=0"
                                        @dismiss-count-down="countDownChanged"
                                        >
                                        <p>注册成功，将在{{ CountDown }}秒后跳转至登录页</p>
                                        <b-progress
                                            variant="warning"
                                            :max="Secs"
                                            :value="CountDown"
                                            height="4px"
                                        ></b-progress>
                                    </b-alert>
                                    <b-button block pill type="submit" variant="primary">注册</b-button>
                                    <b-button block pill @click="backToLogin" variant="primary">返回登录</b-button>
                                </b-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="copyrights text-center">
            <p>Designed by <a href="https://bootstrapious.com/p/admin-template" class="external">Bootstrapious</a></p>
        </div>

    </div>


</template>

<script>

    export default {
        name: 'indexComponent',
        data: () => {
            return {
                Secs: 3,
                CountDown: 0,
                showAlert:false,
                form: {
                    UserID: '',
                    Password: '',
                    PasswordAgain: '',
                    Phone:'',
                    Email:''
                }
            }
        },
        methods: {
            onSubmit(evt) {
                //TODO:完成注册提交(fhq)

                evt.preventDefault()

                this.showAlert = false
                if(this.form.Password != this.form.PasswordAgain){
                    //提示密码不一致
                    this.showAlert = true
                }else{
                    this.axios
                    .post('/api/register?g-recaptcha-response=', {
                        username: this.form.UserID,
                        password: this.form.Password,
                        phoneNum: this.form.Phone,
                        email: this.form.Email
                    })
                    .then((response) => {
                        console.log(response.data)
                        //成功后跳转
                        setTimeout(()=>{
                            window.location.href = 'index.html'
                        },3000)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    //跳转前提示
                        this.CountDown = this.Secs
                }

            },
            countDownChanged(dismissCountDown) {
                this.CountDown = dismissCountDown
            },
            backToLogin(){
                window.location.href = 'index.html'
            }
        }
    }

</script>
