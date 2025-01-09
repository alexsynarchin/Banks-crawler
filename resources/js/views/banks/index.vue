<template>
    <section>
        <h1>Банки ({{banks.total}})</h1>
        <div class="mb-3">
            <el-button
                @click.prevent="banksCrawler"
                type="primary"
                icon="Refresh">Парсить банки sravni.ru</el-button>
        </div>
        <el-table
            :data="banks.data"
            v-loading="isLoading"
            style="width: 100%; margin-bottom: 20px"
        >
            <el-table-column
                label="Название"
                min-width="170px"
                prop="name"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Название"
                min-width="170px"
                prop="name"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Регистрационный номер"
                min-width="170px"
                prop="register_number"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Головной офис"
                min-width="170px"
                prop="head_office"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Телефоны"
                min-width="170px"
                prop="phones"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Официальный сайт"
                min-width="170px"
                prop="website"
                sortable
            >
            </el-table-column>
        </el-table>
        <el-pagination background layout="sizes, prev, pager, next"
                       :page-sizes="[20, 50, 100, 250, 500]"
                       size="default"
                       v-model:current-page="banks.current_page"
                       v-model:page-size="banks.per_page"
                       :total="banks.total"
                       @current-change="getBanks"
                       @size-change="getBanks"
        />
    </section>

</template>
<script>
    export default {
        data() {
            return {
                isLoading:false,
                banks: {
                    data: [],
                    per_page: 20,
                    current_page:1,
                    total:0
                },
            }
        },
        methods: {
            getBanks() {
                this.isLoading = true;
                axios.get('/api/admin/banks', {params: {
                        page:this.banks.current_page,
                        per_page:this.banks.per_page
                    }})
                    .then(response => {
                        this.isLoading = false;
                        this.banks = response.data
                    })

            },
            banksCrawler() {
                axios.post('/api/crawler/banks')
                    .then((response) => {

                        this.$message({
                            message: response.data.message,
                            type: response.data.type
                        });

                    })
            },
        },
        mounted() {
            this.getBanks();
        }

    }
</script>
