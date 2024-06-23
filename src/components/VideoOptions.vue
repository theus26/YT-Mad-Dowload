<template>
  <div>
    <p class="py-3 mb-1 text-sm font-bold">{{ title }}</p>
    <p class="py-3 mb-1 text-sm font-bold grid grid-cols-1" v-show="text">
      Deseja baixar?
    </p>
    <div class="flex justify-center gap-3" v-show="show">
      <div
        class="bg-cont flex justify-center align-baseline gap-2 rounded-md border-2 border-500 w-40 h-12 cursor-pointer ..."
        @click="$emit('video-selected')"
      >
        <p class="py-3 mb-1 text-sm font-extrabold">Video</p>
        <span class="py-3" v-html="svgVideo"></span>
      </div>

      <div
        class="bg-aud flex justify-center align-baseline gap-2 rounded-md border-2 border-500 w-40 h-12 cursor-pointer ..."
        @click="$emit('audio-selected')"
      >
        <p class="py-3 mb-1 text-sm font-extrabold">Audio</p>
        <span class="py-3" v-html="svgAudio"></span>
      </div>
    </div>
    <div class="flex w-1.9 justify-center gap-3 py-3">
      <div class="grid grid-cols-1 gap-3">
        <div class="grid grid-rows-1">
          <div class="flex justify-center gap-3">
            <div
              v-for="(item, index) in container"
              :key="index"
              class="p-4 bg-gray-200 cursor-pointer rounded hover:bg-gray-500"
              :class="{ selected: isSelected(item) }"
              @click="toggleSelection(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="grid grid-rows-1">
          <div class="flex gap-3">
            <div
              v-for="(item, index) in resolution"
              :key="index"
              class="p-4 bg-gray-200 cursor-pointer rounded hover:bg-gray-500"
              :class="{ selected: isSelected(item) }"
              @click="toggleSelection(item)"
            >
              {{ item }}p
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "text",
    "show",
    "svgVideo",
    "svgAudio",
    "container",
    "resolution",
    "selectedItems",
  ],
  methods: {
    isSelected(item) {
      return this.selectedItems.includes(item);
    },
    toggleSelection(item) {
      this.$emit("toggle-selection", item);
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: yellow;
}
</style>
