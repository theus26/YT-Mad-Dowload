<template>
  <div class="flex ...">
    <div class="w-5/6 ...">
      <input
        v-model="link"
        type="search"
        :placeholder="` Digite sua pesquisa aqui, Ex: ${extraText}`"
        class="border-2 border-indigo-500 rounded text-black-500 py-3 focus:outline-none focus:ring focus:ring-violet-300 w-full placeholder:italic placeholder:text-slate-400"
      />
    </div>
    <div class="w-1/6 px-2 ...">
      <button
        @click="$emit('search', link)"
        class="bg-btn text-white py-3 px-14 px4 rounded font-bold focus:outline-none border-2 border-indigo-500"
        :class="{ 'cursor-not-allowed': !link, 'cursor-pointer': link }"
        :disabled="!link"
      >
        <span class="icon" v-html="svgIcon"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["extraText", "svgIcon"],
  data() {
    return {
      link: "",
    };
  },
};
</script>
