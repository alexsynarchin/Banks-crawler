import Layout from "@//layout/Layout.vue";

const bankRoutes = {
    name: 'banks',
    path:'/banks',
    component: Layout,
    meta: { title: 'Список банков',  noCache: false },

    children: [
        {
            name: 'bank-list',
            path:'',
            component: () => import('@/views/banks/index.vue'),
            meta: {title: ''}
        }
    ]
}
export default bankRoutes;
