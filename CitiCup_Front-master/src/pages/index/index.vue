<template>
    <div class="page login-page">
        <div class="container d-flex align-items-center">
            <div class="form-holder has-shdow">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="info d-flex align-items-center">
                            <div class="welcome">
                                <h1>登录</h1>
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
                                    <b-button block pill type="submit" variant="primary" id="login">登录</b-button>
                                    <b-button block pill @click="jumpToRegister" variant="primary">注册</b-button>
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
                form: {
                    UserID: '',
                    Password: ''
                }
            }
        },
        methods: {
            jumpToRegister(){
                window.location.href = 'register.html'
            },
            onSubmit(evt) {
                //TODO:完成登录提交(fhq)

                evt.preventDefault()

                console.log(this.form.UserID)
                console.log(this.form.Password)



                this.axios.defaults.withCredentials = true;
                this.axios
                    .post("/api/login?username=" + this.form.UserID + "&password=" + this.form.Password)
                    .then((response) => {
                        console.log(response.data)
                        this.cookies.set("UserID",this.form.UserID)

                        console.log(document.cookie)
                        window.location.href = 'select.html'
                    })
                    .catch((error) => {
                        console.log(error)
                    });


            }
        }
    }

</script>
