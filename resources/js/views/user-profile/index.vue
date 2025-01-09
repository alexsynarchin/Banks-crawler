<template>
    <section >
        <h1 class="page-title">Профиль пользователя</h1>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane name="main-information">
                <template #label>
                <span class="custom-tabs-label">
               <el-icon style="margin-right: 5px" :size="16"><User /></el-icon>
                  <span> Основная информация</span>
                </span>
                </template>
                <user-information></user-information>
            </el-tab-pane>
            <!--
            <el-tab-pane label="Финансы" name="finance"></el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
            -->
        </el-tabs>


    </section>
</template>
<script>
    import userInformation from "./components/user-information.vue";
    export default {
        components: {
            userInformation,
        },
        data() {
            return {
                activeName: 'main-information',
            }
        },
        watch: {
            activeName(val) {
                this.$router.push(`${this.$route.path}?tab=${val}`)
            }
        },
        created() {
            // init the default selected tab
            const tab = this.$route.query.tab
            if (tab) {
                this.activeName = tab
            }
        },
    }

</script>
