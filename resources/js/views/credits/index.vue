<template>
    <section>
        <h1>Кредиты ({{credits.total}})</h1>
        <div class="mb-3">
            <el-button
                @click.prevent="parseCredits"
                type="primary"
                icon="Refresh">Парсить кредиты sravni.ru</el-button>
        </div>
        <el-table
            :data="credits.data"
            v-loading = "isLoading"
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
                label="Банк"
                min-width="170px"
                sortable
            >
                <template #default="scope">
                    <span v-if="scope.row.bank">
                         {{scope.row.bank.name}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="Ставка"
                min-width="120px"
                prop="bid"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="ПСК"
                min-width="120px"
                prop="psk"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Срок"
                min-width="170px"
                prop="term"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Сумма кредита"
                min-width="170px"
                prop="sum"
                sortable
            >
            </el-table-column>
            <el-table-column
                label="Возраст"
                min-width="170px"
                prop="age"
                sortable
            >
            </el-table-column>

        </el-table>
        <el-pagination background layout="sizes, prev, pager, next"
                       :page-sizes="[20, 50, 100, 250, 500]"
                       size="default"
                       v-model:current-page="credits.current_page"
                       v-model:page-size="credits.per_page"
                       :total="credits.total"
                       @current-change="getCredits"
                       @size-change="getCredits"
        />
    </section>

</template>
<script>
export default {
    data() {
        return {
            isLoading:false,
            credits: {
                data: [],
                per_page: 20,
                current_page:1,
                total:0
            },
        }
    },
    methods: {
        parseCredits() {
            axios.post('/api/crawler/credits')
                .then((response) => {

                    this.$message({
                        message: response.data.message,
                        type: response.data.type
                    });

                })

        },
        getCredits() {
            this.isLoading = true;
            axios.get('/api/admin/credits', {params: {
                    page:this.credits.current_page,
                    per_page:this.credits.per_page
                }})
                .then(response => {
                    this.credits = response.data;
                    this.isLoading = false;
                })

        }
    },
    mounted() {
        this.getCredits();
    }

}
</script>
