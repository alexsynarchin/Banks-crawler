<template>
    <div class="login">
        <div class="login-container">
            <div class="login-image">
            </div>
            <div class="login-content">
                <el-form ref="ruleFormRef" :model="loginForm"  class="login-form" auto-complete="on"
                         label-position="left">
                    <div class="title-wrap">
                        <h3 class="title">

                            Войти в панель управления
                        </h3>
                    </div>

                    <el-form-item prop="email">
            <span class="svg-container">
              <icon class-name="person-fill"/>
            </span>
                        <el-input v-model="loginForm.email" name="email" type="text" auto-complete="on"
                                  :placeholder="$t('login.email')"/>
                    </el-form-item>
                    <el-form-item prop="password">
            <span class="svg-container">
              <icon class-name="shield-lock"/>
            </span>
                        <el-input
                            v-model="loginForm.password"
                            name="password"
                            auto-complete="on"
                            placeholder="Пароль"
                            :type="pwdType"
                            @keyup.enter.native="handleLogin(ruleFormRef)"
                        />
                        <span class="show-pwd" @click="showPwd">
              <icon :class-name="pwdType === 'password' ? 'eye-fill' : 'eye-slash-fill'"/>
            </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" style="width:100%;"
                                   @click.native.prevent="handleLogin(ruleFormRef)">
                            Войти
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import {csrf} from '@/api/auth'
import {reactive, toRefs, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import {userStore} from "@/store/user"
import { ElMessage } from 'element-plus'


import {useI18n} from "vue-i18n";

export default {
    name: 'Login',
    components: {},
    setup(props, ctx) {
        const router = useRouter()

        const resData = reactive({
            loginForm: {
                email: '',
                password: '',
            },
            ruleFormRef: {},

            loading: false,
            pwdType: 'password',
            redirect: undefined,
            otherQuery: {},

        })
        const showPwd = () => {
            if (resData.pwdType === 'password') {
                resData.pwdType = ''
            } else {
                resData.pwdType = 'password'
            }
        }

        const useUserStore = userStore()
        const {t} = useI18n()
        const handleLogin = (formEl) => {
            if (!formEl) {
                return
            }
            csrf().then(() => {
                resData.loading = true
                useUserStore.login(resData.loginForm).then(() => {
                    ElMessage({ message: t('login.loginSuccess'), type: 'success' })
                    router.push({path: resData.redirect || '/', query: resData.otherQuery}, onAbort => {
                    })
                    resData.loading = false
                }).catch((error) => {
                    console.log(error)
                    resData.loading = false
                })
            })
        }
        const getOtherQuery = (query) => {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }

        const route = useRoute()
        watch(() => route.query, (query) => {
            if (query) {
                resData.redirect = query.redirect
                resData.otherQuery = getOtherQuery(query)
            }
        }, {immediate: true})
        return {
            ...toRefs(resData),
            showPwd,
            handleLogin,
            getOtherQuery,
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
/* reset element-plus css */
.login-container {
    .el-input {
        display: contents;
        height: 47px;
        width: 85%;

        .el-input__wrapper {
            background: #283443;
            box-shadow: none;
        }

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;

            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-colorfill-color: rgb(8, 7, 7) !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss">

$bg: #1d1b28;
$dark_gray: #889aa4;
$light_gray: rgb(7, 6, 6);
$bgColor: #2d3a4b;
$brown: #B27C66;
$textColor: #eee;

.login {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bgColor;
    transition: background-color .3s ease-in-out;
    overflow: auto;

    .login-container {
        background: $bg;
        width: 1140px;
        min-height: 590px;
        display: grid;
        grid-template-columns: auto 600px;
        transition: all .3s ease-in-out;
        transform: scale(1);

        .logo {
            display: block;
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
        }

        .login-image {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            overflow: hidden;
            background-color: #303c4b;
            background-image: url('@/assets/login/login-bg.jpeg');
            background-position: 50%;
            background-size: cover;
            opacity: 1;
            transition: opacity .3s ease-in-out, padding .2s ease-in-out;


        }

        .login-form {
            min-width: 320px;
            padding: 30px 60px;
            position: relative;
            opacity: 1;
            transition: opacity .3s ease-in-out, padding .2s ease-in-out;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 50px;
            display: inline-block;
        }

        .title-wrap {
            display: block;
            margin-bottom: 15px;

            .title {
                font-size: 24px;
                color: $textColor;
                margin: 0px auto 10px auto;
                text-align: left;
                font-weight: bold;
            }

            .sub-heading {
                font-size: 14px;
                color: $textColor;
                padding-bottom: 15px;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 14px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .set-language {
            color: $textColor;
            position: absolute;
            top: 40px;
            right: 35px;
        }
    }
}
</style>
