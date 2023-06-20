<template>
    <div class="video-player">
      <iframe :src="videoLink" ></iframe>
      <button @click="downloadVideo" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Download
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      videoLink: {
        type: String,
        required: true
      }
    },
    methods: {
      downloadVideo() {
        const link = document.createElement('a');
        link.href = this.videoLink;
        link.download = 'video.mp4'; // Nome do arquivo de download
        link.click();
      }
    }
  };
  </script>
  
  <style>
  .video-player {
    /* Estilos para o contêiner do player de vídeo */
  }
  </style>
  