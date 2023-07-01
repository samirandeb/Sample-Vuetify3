<template>
  <query-builder :cubejs-api="cubejsApi" :query="query">
    <template
      v-slot:builder="{ measures, setMeasures, availableMeasures, dimensions, setDimensions, availableDimensions }">

      <v-container fluid class="pa-4 pa-md-8 pt-6 background-white">
        <v-row>
          <v-col cols="12" md="8">
            <VueMultiselect placeholder="Please Select" label="Title" track-by="name" :multiple="true"
              :customLabel="customLabel" :model-value="measures" :options="availableMeasures"
              @update:modelValue="(...args) => set(setMeasures, ...args)" />
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-container fluid class="pa-4 pa-md-8 pt-6 background-white">
        <v-row>
          <v-col cols="12" md="2">
            <v-select multiple label="Measures" outlined hide-details :value="measures.map(i => (i.name))"
              @update:modelValue="setMeasures" :items="availableMeasures.map(i => (i.name))" />
          </v-col>
          <v-col cols="12" md="2">
            <v-select multiple label="Dimensions" outlined hide-details :value="dimensions.map(i => (i.name))"
              @update:modelValue="setDimensions" :items="availableDimensions.map(i => (i.name))" />
          </v-col>
        </v-row>
      </v-container> -->
    </template>

    <template #default="{ resultSet }">
      <chart-renderer v-if="resultSet" :result-set="resultSet" />
    </template>

    <template #empty>

        <v-container style="height: 400px;">
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            Please wait...fetching your data.
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple-accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
      </template>
  </query-builder>
</template>

<script>
import cubejs from "@cubejs-client/core";
import VueMultiselect from 'vue-multiselect'
import { QueryBuilder } from "@cubejs-client/vue3";
import ChartRenderer from "./ChartRenderer.vue";

const API_URL =
  "https://awesome-ecom.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjY4OTR9.0fdi5cuDZ2t3OSrPOMoc3B1_pwhnWj4ZmM3FHEX7Aus";

const cubejsApi = cubejs(CUBEJS_TOKEN, { apiUrl: API_URL });

export default {
  name: "QueryBuilderExample",
  components: {
    VueMultiselect,
    QueryBuilder,
    ChartRenderer,
  },
  data() {
    const query = {
      measures: [],
      timeDimensions: [
        {
          dimension: "LineItems.createdAt",
          granularity: "month",
        },
      ],
    };

    return {
      cubejsApi,
      selected: null,
      query,
    };
  },
  methods: {
    customLabel(a) {
      return a.title;
    },
    set(setMeasures, value) {
      setMeasures(value.map((e) => e.name));
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
