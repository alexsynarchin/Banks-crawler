<template>
  <div class="navbar rowBC reset-el-dropdown">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container" />
    </div>
    <!--nav title-->

    <div v-if="settings.ShowDropDown" class="right-menu rowSC">

      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img
            :src="no_avatar"
            class="user-avatar"
          />
            <span class="avatar-name">{{name}}</span>
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/trumanwong/laravel-vue-admin">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>

import no_avatar from '@/assets/user/no-avatar-user.png'
import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'

import { appStore } from '@/store/app'
import { userStore } from '@/store/user'
const router = useRouter()
const route = useRoute()

const useUserStore = userStore()
const useAppStore = appStore()

const settings = computed(() => {
  return useAppStore.settings
})
const name = computed(() => {
  return useUserStore.name
})
const opened = computed(() => {
  return useAppStore.sidebar.opened
})


const toggleSideBar = () => {
  useAppStore.toggleSideBar()
}

const loginOut = async () => {
  await useUserStore.logout().then(() => {
    router.push(`/login?redirect=/`)
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  //height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//logo
.user-balance {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    margin-right: 10px;
    &__sum {
        font-size: 18px;
        line-height: 1;
    }
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;
   display: flex;
   align-items: center;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
      margin-right: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
}
</style>
