<template>
  <v-app>
   
    <!-- top application bar-->
    <app-bar/>
    <!-- side menu bar-->
    <v-navigation-drawer permanent expand-on-hover rail color="info">
      <side-menu />
    </v-navigation-drawer>

    <!-- top application bar-->
    <!--  <app-bar @click.stop="drawer = !drawer"/> -->

    <!-- main content-->
    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script setup>
/* import { ref } from 'vue' */
import AppBar from './AppBar.vue';
import SideMenu from './Menu.vue'

/* const drawer = ref(false) */

</script>