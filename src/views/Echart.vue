<template>
  <v-container fluid class="text-center background pa-6">
    <query-builder :cubejs-api="cubejsApi" :query="query" :disableHeuristics="true" css="width: 100%">
      <template v-slot="{ loading, resultSet }">
        <div v-if="loading" class="loading">Loading e-Chart...</div>
        <div v-if="!loading && resultSet !== undefined">
          <EchartBar v-if="!loading" title="Bar with e-Chart" :resultSet="resultSet" />
          <EchartPie v-if="!loading" title="Classification of Paintings" :resultSet="resultSet" />
        </div>
      </template>

      <template #empty>Loading...</template>
    </query-builder>
  </v-container>
</template>
  
<script>
import cubejs from '@cubejs-client/core'
import { QueryBuilder } from '@cubejs-client/vue3'
import EchartBar from '@/components/EchartBar.vue';
import EchartPie from '@/components/EchartPie.vue';

const cubejsApi = cubejs("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODgxODcwMTgsImV4cCI6MTY4ODI3MzQxOH0._HBnEKnHoqDYlwR5U4Lid4Hqtpe7djsrV4QVnz_sK-Q", {
  apiUrl: `http://localhost:4000/cubejs-api/v1`
});

export default {
  name: 'HelloWorld',

  components: {
    QueryBuilder,
    EchartBar,
    EchartPie
  },
  data: () => {
    const query = {
      measures: [
        "city.count",
        "country.count"
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
      const x = resultSet.series();
      const data = resultSet.series().map(series => ({
        name: series.key,
        data: series.series.map(row => [row.x, row.value])
      }));
      console.log(resultSet);
      console.log(x);
      console.log('data:', data);
      return resultSet.series().map(series => ({
        name: series.key,
        data: series.series.map(row => [row.x, row.value])
      }))
    },
    pie(resultSet) {
      const pieData = resultSet.series().map(series => ({
        name: series.key,
        data: series.series.map(row => [row.x, row.value])
      }));
      console.log('pieData:', pieData);
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