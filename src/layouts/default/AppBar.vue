<template>
  <v-app-bar class="flex-grow-0" app>
    <v-app-bar-nav-icon density="comfortable" icon="$vuetify" size="x-large" color="teal"></v-app-bar-nav-icon>
    <v-toolbar-title>SAM Application</v-toolbar-title>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg" title="Sam Adams"
          subtitle="Logged In"></v-list-item>
      </v-list>
      <v-divider color="info"></v-divider>
      <v-list density="compact">
        <v-list-item title="Logout" @click="logout()">
          <!-- <v-btn type="submit" class="mt-4" color="primary"></v-btn> -->
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      const { username } = this;
      this.$router.replace({ name: "login", params: { username: username } });
    },
  }
};
</script>


<!-- <template>
  <v-app-bar class="flex-grow-0" app>
      <v-app-bar-nav-icon density="comfortable" icon="$vuetify" size="x-large" color="teal"></v-app-bar-nav-icon>
      <v-toolbar-title>SAM Application</v-toolbar-title>
      <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const items = ref([{ text: 'My Files', icon: 'mdi-folder', path: "/landing" },
        { text: 'Shared with me', icon: 'mdi-account-multiple', path: "/page2" },
        { text: 'Starred', icon: 'mdi-star' , path: "/landing"},
        { text: 'Recent', icon: 'mdi-history', path: "/landing"},
        { text: 'Offline', icon: 'mdi-check-circle', path: "/landing"},
        { text: 'Uploads', icon: 'mdi-upload', path: "/landing" },
        { text: 'Backups', icon: 'mdi-cloud-upload', path: "/landing" }])
</script> -->