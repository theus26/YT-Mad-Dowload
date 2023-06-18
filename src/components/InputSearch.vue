<template>
  <div class="container mx-auto  w-full">
    <div class="flex ...">
      <div class="w-5/6 ..."><input v-model="Link" type="search"
          :placeholder="`Digite sua pesquisa aqui, Ex: ${extraText}`"
          class="border-2 border-indigo-500 rounded text-black-500 py-3 focus:outline-indigo-500 w-full placeholder:italic placeholder:text-slate-400 	" />
      </div>
      <div class="w-1/6 ...">
        <button @click="GetVideoUrl"
          class="bg-btn text-white py-3 px-14 px4 rounded font-bold focus:outline-none border-2 border-indigo-500"
          :class="{ 'cursor-not-allowed': !Link, 'cursor-pointer': Link }" :disabled="!Link">
          <span class="icon" v-html="svgIcon"></span>
        </button>
      </div>
    </div>
  </div>


  <div class="container mx-auto  w-full">
    <div class="flex">
      <div class="w-1/2">
        <iframe :src="videoUrl" width="560" height="315" frameborder="0" allowfullscreen class="py-3 mb-1"></iframe>
      </div>

      <div class="w-1.9">
        <p class="py-3 mb-1 text-sm font-bold">{{ title }}</p>
        <br>
        <div class="flex justify-center gap-3" v-show="show">
          <div
            class="bg-cont flex justify-center align-baseline gap-2 rounded-md border-2 border-500 w-40 h-12 cursor-pointer ..."
            @click="VideoCont">
            <p class="py-3 mb-1 text-sm font-extrabold">Video</p>
            <span class="py-3" v-html="svgVideo"></span>
          </div>

          <div
            class="bg-aud flex justify-center align-baseline gap-2 rounded-md border-2 border-500 w-40 h-12 cursor-pointer ..."
            @click="AudioCont">
            <p class="py-3 mb-1 text-sm font-extrabold">Audio</p>
            <span class="py-3" v-html="svgAudio"></span>
          </div>  
        </div>
        <div class="flex w-1.9 justify-center gap-3 py-3">

          <div v-for="(item, index) in container" :key="index" class="p-4 bg-gray-200 cursor-pointer hover:bg-gray-500">
              {{ item }}
            </div>
            <br>

            <div v-for="(item, index) in resolution" :key="index" class="p-4 bg-gray-200 cursor-pointer  hover:bg-gray-500">
              {{ item }}p
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetVideoUrl } from '@/services/api';

export default {
  data() {
    return {
      placeholderText: "Cole o Link do seu video aqui!",
      extraText: "https://www.youtube.com/watch?v=gNBKvpAPMUI&list",
      Link: "",
      title: '',
      obj: [],
      objVideo: [],
      container: [],
      resolution: [],
      objAudio: [],
      show: false,
      videoUrl: '',
      svgIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z\" /></svg>",
      svgVideo: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" d=\"M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z\" /></svg>",
      svgAudio: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"\ /></svg>'
    };
  },
  methods: {
    async GetVideoUrl() {
      //Alterar Url
      const url = this.Link.replace("watch?v=", "embed/")
      console.log(url)
      const result = await GetVideoUrl(url)
      console.log(result.data)

      if (result.status === 200) {
        this.videoUrl = url
        this.show = true
        // Filtrar apenas os objetos do tipo "mixed"
        const objMixed = this.obj = result.data.quality.filter(mixed => mixed.type === 'Mixed');
        this.objVideo = objMixed
        // Filtrar apenas os objetos do tipo "mixed"
        const objAudios = this.obj = result.data.quality.filter(mixaudio => mixaudio.type === 'Audio');
        this.objAudio = objAudios
        const arr = result.data;
        //Receber Titulo do video
        this.title = arr.title;
        console.log(arr)
        console.log(objMixed)
        console.log(objAudios)
      }
      else {
        console.log("Erro intero no servidor")
      }
    },

    VideoCont() {
      console.log("Video")
      const container = this.objVideo.map(cont => cont.container)
      const resolution = this.objVideo.map(res => res.resolution)
      this.container = container.filter((i, index) => container.indexOf(i) === index)
      this.resolution = resolution
      console.log(container)
      console.log(resolution)
    },
    AudioCont() {
      console.log("Audio")
      console.log(this.objAudio)
    }
  },

};
</script>


     