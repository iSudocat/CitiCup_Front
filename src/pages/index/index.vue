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
              <div class="content d-flex justify-content-center">
                <b-form @submit="onSubmit" id="login-form">
                  <div class="form-group">
                    <b-form-input id="username" type="text" v-model="form.UserID" required
                                  class="input-material" placeholder="请输入用户名"></b-form-input>
                  </div>
                  <div class="form-group">
                    <b-input id="password" type="password" required v-model="form.Password"
                             class="input-material" placeholder="请输入密码"></b-input>
                  </div>
                  <b-alert :show="showError" variant="danger">用户名或密码错误！</b-alert>
                  <b-button block pill type="submit" variant="primary" id="login">登录</b-button>
                  <b-button block pill @click="jumpToRegister" variant="outline-info">没有账号？ 立即注册</b-button>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copyrights text-center">
      <p>Designed by ？</p>
    </div>

  </div>

</template>

<script>
export default {
  name: 'indexComponent',
  data: () => {
    return {
      showError: false,
      form: {
        UserID: '',
        Password: ''
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      this.axios.defaults.withCredentials = true;

      this.axios
          .post("/api/login?username=" + this.form.UserID + "&password=" + this.form.Password)
          .then((response) => {
            console.log(response.data)
            if (response.data.code === 200) {
              this.showError = false
              this.cookies.set("UserID", this.form.UserID)

              this.axios.get('/api/me')
                  .then((response) => {
                    let isAdmin = response.data.data.isAdmin
                    this.cookies.set("isAdmin", isAdmin)

                    let time1 = Date.parse(new Date())
                    let time2 = Date.parse(response.data.data.restUseTime)
                    let restUseTime = Math.ceil((time2 - time1) / 1000 / 60 / 60 / 24)

                    this.cookies.set("restUseTime", restUseTime)
                    if (isAdmin === true)
                      window.location.href = 'admin.html'
                    else
                      window.location.href = 'select.html'
                  })
                  .catch((error) => {
                    console.log(error)
                  });


            } else {
              this.showError = true
            }

          })
          .catch((error) => {
            console.log(error)
          });


    },
    jumpToRegister() {
      window.location.href = 'register.html'
    },
  }
}

</script>
