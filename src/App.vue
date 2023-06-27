<template>
  <main class="bg-white dark:bg-slate-700">
    <div class="flex justify-end py-1 px-10">
      <p class="dark:text-white mt-3 px-2 text-base font-medium tracking-tight">Dark Mode</p>
      <input class="DarkCheckbox" type="checkbox" v-model="isDark" />
    </div>
    <router-view/>
  </main>
  
</template>

<script setup>
import { useDark } from '@vueuse/core';
const isDark = useDark();

</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}



.DarkCheckbox{
  width: 80px;
  height: 40px;
  -webkit-appearance: none;
  appearance: none;
  background-color: green;
  outline: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-bottom: -80px;
}

.DarkCheckbox::before{
  content: "";
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  transition: 0.5s;
}
.DarkCheckbox:checked::before{
  transform: translateX(100%);
  background: #fff;
}
  
</style>