<template>
  <div>
    <iframe
      :src="videoUrl"
      width="560"
      height="315"
      frameborder="0"
      allowfullscreen
      class="py-3 mb-1"
    ></iframe>
    <p v-show="showInstructions" class="text-left py-2">
      <strong>Como Realizar o Dowload?</strong> <br />
      Clique nos três pontinhos e aperte em fazer o download
    </p>
  </div>
</template>

<script>
export default {
  props: ["videoUrl", "showInstructions"],
};
</script>
