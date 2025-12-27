<template>
  <div>
    <drawer-side-bar-component></drawer-side-bar-component>

    <button @click="onSignOut()">Salir</button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import DrawerSideBarComponent from '@/shared/components/DrawerSideBarComponent.vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const authStore = useAuthStore();

const onSignOut = () => {
  authStore.signOut();
  router.push({ name: 'signIn' })
}

</script>

<style></style>
