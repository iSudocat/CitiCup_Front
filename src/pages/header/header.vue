<template>
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
                <div class="col-6 justify-content-start">
                    <img src="../../assets/logo.svg" alt="" width="30">
                    <span class="text-uppercase text-small font-weight-bold text-dark ml-2 mb-0">Blanker——白板企业信贷评估平台</span>
                </div>

                <div class="d-flex flex-row">
                    <div class="p-2"><b-link href="user.html">{{UserID}}</b-link></div>
                    <div class="p-2"><b-button variant="outline-primary" size="sm" @click="logOut">注销</b-button></div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import _global from '@/pages/global';
    export default {
        name: "headerComponent",

        data: () => {
            return{
                UserID: _global.UserID,
            }
        },
        methods:{
            logOut: function () {
                //TODO:注销后清除cookies(fhq)

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