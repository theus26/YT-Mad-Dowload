<template>
  <div class="container mx-auto  w-full">
    <div class="flex ...">
      <div class="w-5/6 ..."><input v-model="Link" type="search" :placeholder="`Digite sua pesquisa aqui, Ex: ${extraText}`"
          class="border-2 border-indigo-500 rounded text-black-500 py-3 focus:outline-none w-full	" /> </div>
          <div class="w-1/6 ...">
            <button @click="GetVideoUrl" class="bg-btn text-white py-3 px-14 px4 rounded font-bold focus:outline-none border-2 border-indigo-500">
              <span class="icon" v-html="svgIcon"></span>
            </button>
          </div>
        </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      placeholderText: 'Cole o Link do seu video aqui!',
      extraText: 'https://www.youtube.com/watch?v=gNBKvpAPMUI&list',
      Link:'',
      svgIcon:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>'
    };
  },

  methods:{
    GetVideoUrl(){
      console.log(this.Link)
    }
  }
};
</script>


     