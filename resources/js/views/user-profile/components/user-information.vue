<template>
<section>
    <section>

        <el-form
            class="disabled-form"
            :model="form" label-position="top" :disabled="!checkRole(['admin'])">
            <div class="row">
                <el-form-item class="col-md-6" label="Имя" :error="errors.get('name')">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item class="col-md-6" label="E-mail" :error="errors.get('email')">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </div>

            <div class="row align-items-end">

                <div class="col-md-6" style="margin-bottom: 22px;" v-if="checkRole(['admin'])">
                    <el-button icon="el-icon-unlock" type="primary"
                               @click="showPasswordModal = true">Сменить пароль</el-button>
                </div>
            </div>
            <el-button type="success" @click="onSubmit" v-if="checkRole(['admin'])">Сохранить</el-button>
        </el-form>
        <el-dialog
            v-model="showPasswordModal"
            title="Сменить пароль"
        >
            <el-form :model="passwordForm" label-position="top">
                <div class="row">
                    <el-form-item class="col-md-6" label="Новый пароль" :error="errors.get('password')">
                        <el-input v-model="passwordForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="col-md-6" label="Подтверждение пароля">
                        <el-input v-model="passwordForm.password_confirmation" show-password></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer" >
            <el-button @click="showPasswordModal = false">Отмена</el-button>
            <el-button type="success" @click="changePassword">Сохранить</el-button>
          </span>
        </el-dialog>
    </section>
</section>
</template>
<script>
import { Errors } from  '@/utils/errors.js';
import { mapState, mapActions, mapWritableState } from 'pinia'
import {csrf} from '@/api/auth'
import { userStore } from '@/store/user'
import checkRole from '@/utils/role';
export default {

    data() {
        return {
            showPasswordModal:false,
            passwordForm: {
                password: '',
                password_confirmation: ''
            },
            form: {
                name: "",
                email: "",
            },
            errors: new Errors(),
        }
    },
    computed: {
        ...mapState(userStore,["id"]),
        ...mapWritableState(userStore,["name"])
    },
    methods: {
        ...mapActions(userStore,["$patch"]),
        checkRole,
        csrf,
        changePassword() {
            axios.post('/api/admin/user/' + this.id + '/change-password', this.passwordForm)
                .then((response) => {
                    this.$message({
                        message: response.data,
                        type: 'success'
                    });
                    this.showPasswordModal = false;
                    this.passwordForm.password = '';
                    this.passwordForm.password_confirmation= '';

                })
                .catch((error) => {
                    this.errors.record(error.response.data.errors);
                })
        },
        onSubmit() {
            axios.post('/api/admin/user/' + this.id + '/update', this.form)
                .then((response) => {
                    this.$patch([
                        this.name = response.data.name
                    ]);
                    //this.$store.commit('user/SET_NAME', response.data.name);
                    this.$message({
                        message: 'Ваши данные изменены',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    this.errors.record(error.response.data.errors);
                })
        },
        getUser() {
            axios.get('/api/admin/user/' + this.id + '/show')
                .then((response) => {
                    this.form = response.data;
                    this.form.referral_url = "https://t.me/TOP_iBot?start=" + this.form.referral_token;
                })
        },
    },
    mounted() {
        this.getUser();
    }
}
</script>
