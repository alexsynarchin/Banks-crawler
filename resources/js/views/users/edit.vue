<template>
    <section>
        <moderator-form
            :save-msg="'Пользователь обновлен'"
            v-if="loaded"
            :form="form"
            :formAction="formAction"
            @close="closeModal"
        ></moderator-form>
    </section>

</template>
<script>
import ModeratorForm from "./components/form";
export default {
    components:{
        ModeratorForm
    },
    props:['id'],
    data() {
        return {
            loaded:false,
            form: {

            },
            formAction: {
                url: '/api/admin/user/' + this.id + '/update',
                method: 'post',
            },
        }
    },
    methods:{
        closeModal(data) {
            this.$emit('close',data)
        },
        getFormData() {
            this.$root.isLoading = true;
            return axios.get('/api/admin/user/' + this.id + '/show')
                .then((response) => {
                    this.form = response.data;
                    this.loaded = true;
                    this.$root.isLoading = false;

                })
        }
    },
    async mounted() {
        await this.getFormData();
    }
}
</script>
