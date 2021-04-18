<template>
  <button @click="increase">count: {{ countRef }}</button>
</template>

<script>
import { ref } from "vue";

function useCount() {
  let countRef = ref(0);
  const increase = () => {
    countRef.value++;
  };
  return {
    countRef,
    increase,
  };
}

export default {
  name: "App",
  // <button @click="increase">count: {{ count }}</button>
  // data() {
  //   return {
  //     count: 0,
  //   };
  // },
  // methods: {
  //   increase() {
  //     this.count++;
  //   },
  // },
  setup() {
    // console.log("setup 函数执行了");
    // let countRef = ref(0);
    // // function increase() {
    // //   countRef.value++;
    // // }
    // const increase = () => {
    //   countRef.value++;
    // }
    return {
      // countRef,
      // increase,
      ...useCount(),
    };
  },
};
</script>
