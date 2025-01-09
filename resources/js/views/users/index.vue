<template>
    <section class="page">
        <div class="page-heading d-flex align-items-center justify-content-between mb-3">
            <h1 class="page-title mb-0">Пользователи</h1>
            <el-button type="success" icon="el-icon-plus" @click="moderatorModalOpen('create')">Добавить</el-button>
        </div>
        <el-row type="flex" class="mb-3">
            <el-col :span="8">
                <el-input
                    v-model="filters[0].value"
                    size="large"
                    width="100%"
                    placeholder="Поиск: Имя или e-mail"/>
            </el-col>
        </el-row>
        <data-tables :data="moderators"  :filters="filters">
            <el-table-column
                type="index"
                label="№"
            >
            </el-table-column>

            <el-table-column
                label="Имя"
                prop="name"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="E-mail"
                prop="email"
                sortable
            >
            </el-table-column>

            <el-table-column
                label="Телефон"
                prop="phone"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Telegram ID"
                prop="tg_user_id"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Компания"
                prop="company_name"
                sortable
            >
            </el-table-column>

            <el-table-column
                label="Действия"
            >

                <template slot-scope="scope">
                    <el-button

                        icon="el-icon-edit" circle
                        type="primary"
                        @click="handleEdit(scope.row)"></el-button>
                    <el-button
                        icon="el-icon-delete" circle
                        type="danger"
                        @click="handleDelete(scope.row)"
                    >
                    </el-button>

                </template>
            </el-table-column>
        </data-tables>
        <el-dialog
            :visible.sync="moderatorModal"
            width="60%"
            :title="moderatorModalTitle"
        >
        <create
            @close="closeModal"
            v-if="moderatorModal && moderatorModalStatus === 'create'"></create>
            <edit
                :id="id"
                @close="closeModal"
                v-if="moderatorModal && moderatorModalStatus === 'edit'"></edit>
        </el-dialog>
    </section>

</template>
<script>
import create from './create';
import edit from './edit';
export default {
    components:{
        create, edit
    },
    computed:{
        moderatorModalTitle:function () {
            if(this.moderatorModalStatus === 'create') {
                return 'Новый пользователь';
            }
            if(this.moderatorModalStatus === 'edit') {
                return 'Обновление данных пользователя';
            }
        },

    },
    data() {
        return {
            id:null,
            moderatorModal:false,
            moderatorModalStatus:"",
            moderators: [],
            filters: [
                {
                    prop: ['name', 'email', 'company_name'],
                    value: ""
                }
            ],

        }
    },
    methods: {
        handleDelete(item) {
            this.$confirm('Вы уверены что хотите удалить пользователя', 'Удаление пользователя', {
                confirmButtonText: 'Удалить',
                cancelButtonText: 'Отмена',
                type: 'warning'
            }).then(() => {
                axios.post('/api/admin/user/' + item.id + '/delete')
                    .then((response) => {
                        let index = this.moderators.findIndex(item => item.id === response.data.id);
                        this.moderators.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: 'Пользователь удален'
                        });
                    });

            }).catch(() => {

            });
        },
        moderatorModalOpen(status) {
            this.moderatorModalStatus = status;
            this.moderatorModal = true;

        },
        getModerators() {
            axios.get('/api/admin/users')
                .then((response) => {
                    this.moderators = response.data;
                })
        },
        closeModal(data) {
            this.moderatorModal= false;
            this.id = null;
            this.getModerators();
        },
        handleEdit(row) {
            this.id = row.id;
            this.moderatorModalStatus = 'edit';
            this.moderatorModal = true;
        },
        updateModerator(formName) {

        },

    },
    mounted() {
        this.getModerators();
    }
}
</script>
