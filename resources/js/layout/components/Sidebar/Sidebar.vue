<template>
    <div id="Sidebar" class="reset-menu-style">
        <!--logo-->
        <Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
        <!--router nav-->
        <el-scrollbar class="sidebar-scrollbar">
            <el-menu
                class="el-menu-vertical"
                :default-active="activeMenu"
                :collapse="!isCollapse"
                :unique-opened="false"
                :collapse-transition="false"

                text-color="#bfcbd9"
                :router="true"

                mode="vertical"
            >
                <el-menu-item index="/dashboard" >
                    <el-icon size="18" ><HomeFilled /></el-icon>
                    <span class="sidebar-nav__link-text">Главная</span>

                </el-menu-item>
                <el-menu-item index="/profile" >
                    <el-icon size="18" ><User /></el-icon>
                    <span class="sidebar-nav__link-text">Пользователь</span>
                </el-menu-item>
                <el-menu-item index="/banks" >
                    <el-icon size="18" ><List /></el-icon>
                    <span class="sidebar-nav__link-text">Банки</span>
                </el-menu-item>
                <el-menu-item index="/credits" >
                    <el-icon size="18" ><List /></el-icon>
                    <span class="sidebar-nav__link-text">Кредиты</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>


    </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import {reactive, toRefs} from "vue"
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
//get scss variable
import checkPermission from '@/utils/permission';
import { appStore } from '@/store/app'
import { permissionStore } from '@/store/permission'
import {userStore} from "@/store/user.js";
import {ElMessage} from "element-plus";
import {HomeFilled, List} from "@element-plus/icons-vue";
const useUserStore = userStore();
const useAppStore = appStore()
const settings = computed(() => {
    return useAppStore.settings
})

const route = useRoute()
const usePermissionStore = permissionStore()
const routes = computed(() => {
    return usePermissionStore.routes
})
const isCollapse = computed(() => {
    return useAppStore.sidebar.opened
})

//change  scss variable to js



const activeMenu = computed(() => {
    const {meta, fullPath} = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return fullPath
})


</script>

<style lang="scss">
.reset-menu-style {
    .el-menu {
        background-color: transparent ;
        border-right: none;
    }
    .el-scrollbar__wrap {
        padding-bottom: 10vh;
    }
}

.el-menu-vertical {
    width: $sideBarWidth;

    .el-menu-item, .el-sub-menu {
        svg {
            position: relative;
            fill: currentColor;
            vertical-align: -7px !important;
        }
    }
}
.sidebar-scrollbar {
    .el-scrollbar__thumb {
        background-color: rgba(255, 255, 255, 0.8);

    }
    .el-scrollbar__bar.is-vertical {
        width: 10px;
    }
}
</style>
