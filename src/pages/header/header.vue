<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <div class="col-6 justify-content-start">
          <img src="../../assets/logo.svg" alt="" width="30">
          <span class="text-uppercase text-small font-weight-bold text-dark ml-2 mb-0">
                        <a href="select.html" title="预测"
                           style="text-decoration:none;color:#000000;">Blanker——白板企业信贷评估平台</a>
                    </span>
        </div>

        <div class="d-flex flex-row align-items-center">
          <div class="p-2">
            <b-link href="select.html" title="预测">预测</b-link>
          </div>
          <div class="p-2">
            <b-link href="user.html" title="个人中心" v-if="isAdmin === 'false' || isAdmin === 'null'">个人中心</b-link>
          </div>
          <div class="p-2">
            <b-button variant="outline-primary" size="sm" @click="logOut">注销</b-button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import $cookies from 'vue-cookies'

export default {
  name: "headerComponent",
  mounted() {
    this.UserID = $cookies.get('UserID')
    this.isAdmin = this.cookies.get('isAdmin')
  },
  data: () => {
    return {
      UserID: '',
      isAdmin: false
    }
  },
  methods: {
    logOut: function () {
      $cookies.keys().forEach(cookie => $cookies.remove(cookie))
      window.location.href = 'index.html'
    },
  }
}
</script>

<style scoped>
@media (min-width: 992px) {
  .navbar .dropdown-menu {
    display: block;
  }
}

.navbar {
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>