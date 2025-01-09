import{_ as m,h as o,p as u,o as l,c as k,a as p,l as h,b as a,d as g,k as x,j as f,m as w,n as C}from"./app-CUJ9P7mJ.js";const v={data(){return{isLoading:!1,banks:{data:[],per_page:20,current_page:1,total:0}}},methods:{getBanks(){this.isLoading=!0,axios.get("/api/admin/banks",{params:{page:this.banks.current_page,per_page:this.banks.per_page}}).then(s=>{this.isLoading=!1,this.banks=s.data})},banksCrawler(){axios.post("/api/crawler/banks").then(s=>{this.$message({message:s.data.message,type:s.data.type})})}},mounted(){this.getBanks()}},z={class:"mb-3"};function B(s,t,y,L,e,r){const b=o("el-button"),n=o("el-table-column"),c=o("el-table"),d=o("el-pagination"),_=u("loading");return l(),k("section",null,[p("h1",null,"Банки ("+h(e.banks.total)+")",1),p("div",z,[a(b,{onClick:f(r.banksCrawler,["prevent"]),type:"primary",icon:"Refresh"},{default:g(()=>t[2]||(t[2]=[x("Парсить банки sravni.ru")])),_:1},8,["onClick"])]),w((l(),C(c,{data:e.banks.data,style:{width:"100%","margin-bottom":"20px"}},{default:g(()=>[a(n,{label:"Название","min-width":"170px",prop:"name",sortable:""}),a(n,{label:"Название","min-width":"170px",prop:"name",sortable:""}),a(n,{label:"Регистрационный номер","min-width":"170px",prop:"register_number",sortable:""}),a(n,{label:"Головной офис","min-width":"170px",prop:"head_office",sortable:""}),a(n,{label:"Телефоны","min-width":"170px",prop:"phones",sortable:""}),a(n,{label:"Официальный сайт","min-width":"170px",prop:"website",sortable:""})]),_:1},8,["data"])),[[_,e.isLoading]]),a(d,{background:"",layout:"sizes, prev, pager, next","page-sizes":[20,50,100,250,500],size:"default","current-page":e.banks.current_page,"onUpdate:currentPage":t[0]||(t[0]=i=>e.banks.current_page=i),"page-size":e.banks.per_page,"onUpdate:pageSize":t[1]||(t[1]=i=>e.banks.per_page=i),total:e.banks.total,onCurrentChange:r.getBanks,onSizeChange:r.getBanks},null,8,["current-page","page-size","total","onCurrentChange","onSizeChange"])])}const D=m(v,[["render",B]]);export{D as default};