<template>
  <v-list>
    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg" title="Sam Adams"
      subtitle="sam@bmail.com"></v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list density="compact">
    <v-list-item v-for="(item, i) in memenuItems" :key="i" :value="item" :title="item.text" :prependIcon="item.icon"
      :to="item.path">
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const memenuItems = ref([{ text: 'My Files', icon: 'mdi-folder', path: "/landing" },
{ text: 'Shared with me', icon: 'mdi-account-multiple', path: "/page2" },
{ text: 'Starred', icon: 'mdi-star', path: "/landing" },
{ text: 'Recent', icon: 'mdi-history', path: "/recent" },
{ text: 'E-Chart', icon: 'mdi-check-circle', path: "/echart" },
{ text: 'Uploads', icon: 'mdi-upload', path: "/landing" },
{ text: 'Backups', icon: 'mdi-cloud-upload', path: "/landing" }])
</script>