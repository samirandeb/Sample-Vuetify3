<template>
  <v-container fluid class="text-center background pa-0">
    <query-builder :cubejs-api="cubejsApi" :query="query" :disableHeuristics="true" css="width: 100%">
      <template
        v-slot:builder="{ measures, setMeasures, availableMeasures, dimensions, setDimensions, availableDimensions }">
        <v-container fluid class="pa-4 pa-md-8 pt-6 background-white">
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
        </v-container>
      </template>
      <template v-slot="{ resultSet }">
        <div class="pa-4 pa-md-8" v-if="resultSet">
          <div class="border-light pa-4 pa-md-12">
            <line-chart legend="bottom" :data="series(resultSet)"></line-chart>
          </div>
          <div class="border-light pa-4 pa-md-12">
            <column-chart legend="bottom" :data="series(resultSet)"></column-chart>
          </div>
          <div class="border-light pa-4 pa-md-12">
            <pie-chart legend="bottom" :data="pie(resultSet)"></pie-chart>
          </div>
        </div>
      </template>

      <template #empty>Loading...</template>
    </query-builder>
  </v-container>
</template>

<script>
import cubejs from '@cubejs-client/core'
import { QueryBuilder } from '@cubejs-client/vue3'

const cubejsApi = cubejs("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgxODcwMTgsImV4cCI6MTY4ODI3MzQxOH0._HBnEKnHoqDYlwR5U4Lid4Hqtpe7djsrV4QVnz_sK-Q", {
  apiUrl: `http://localhost:4000/cubejs-api/v1`
});

export default {
  name: 'HelloWorld',

  components: {
    QueryBuilder
  },
  data: () => {
    const query = {
      measures: [
        "city.count"
      ],
      dimensions: [
        "country.region"
      ],
      order: {
        "country.count": "desc"
      }
    }

    return {
      cubejsApi,
      query
    }
  },
  methods: {
    series(resultSet) {
      return resultSet.series().map(series => ({
        name: series.key,
        data: series.series.map(row => [row.x, row.value])
      }))
    },
    pie(resultSet) {
      /* console.log(resultSet.series().map(series => (
        series.series.map(row => [row.x, row.value])
      ))[0]) */
      return resultSet.series().map(series => (
        series.series.map(row => [row.x, row.value])
      ))[0]
    }
  }
}
</script>

<style scopped>
.background {
  background: #F3F3FB;
  min-height: 100vh;
}

.background-white {
  background: #fff;
}

.border-light {
  background: #FFFFFF;
  border-radius: 8px;
}
</style>