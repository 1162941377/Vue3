<template>
  <div class="container">
    <div class="list">
      <strong>编辑中：</strong>
      <div class="list">
        <checkEditor
          v-for="task in tasks"
          :key="task.id"
          v-model="task.sell"
          v-model:title.trim="task.title"
        />
      </div>
    </div>
    <div class="list">
      <strong>销售中：</strong>
      <template v-for="(sell, index) in sells" :key="sell.id">
        <span>{{ index + 1 }}.</span>
        <strong>{{ sell.title }}</strong>
      </template>
      </div>
    </div>
  </div>
</template>

<script>
import CheckEditor from "./components/CheckEditor.vue";
import { ref, computed } from "vue";
export default {
  components: { CheckEditor },
  setup() {
    const tasksRef = ref([
      {
        id: 1,
        title: "iphone",
        sell: true,
      },
      {
        id: 2,
        title: "huawei",
        sell: false,
      },
      {
        id: 3,
        title: "xiaomi",
        sell: false,
      },
      {
        id: 4,
        title: "magic",
        sell: true,
      },
    ]);
    const sellsRef = computed(() => {
      return tasksRef.value.filter((task) => task.sell);
    });
    return {
      tasks: tasksRef,
      sells: sellsRef,
    };
  },
};
</script>

<style scoped>
.container {
  width: 960px;
  margin: 50px auto;
}

.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}

strong {
  margin-right: 1em;
}
</style>