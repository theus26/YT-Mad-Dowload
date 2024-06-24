<template>
  <div class="container mx-auto w-full">
    <SearchBar
      :extraText="extraText"
      :svgIcon="svgIcon"
      @search="getVideoUrl"
    />
    <Loading v-show="load" />
    <div class="container mx-auto w-full mb-8">
      <div class="flex">
        <div class="w-1/2">
          <VideoPlayer
            :videoUrl="videoUrl"
            :showInstructions="textInformation"
          />
        </div>
        <div class="w-1.9">
          <VideoOptions
            :title="title"
            :text="text"
            :show="show"
            :svgVideo="svgVideo"
            :svgAudio="svgAudio"
            :container="container"
            :resolution="resolution"
            :selectedItems="selectedItems"
            @video-selected="videoCont"
            @audio-selected="audioCont"
            @toggle-selection="toggleSelection"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import VideoOptions from "@/components/VideoOptions.vue";
import Loading from "@/components/shared/Loading.vue";
import { GetVideoUrl, GetVideoInfoUrl } from "@/services/api";

export default {
  components: {
    SearchBar,
    VideoPlayer,
    VideoOptions,
    Loading,
  },
  data() {
    return {
      linkForSearch: "",
      title: "",
      cont: "",
      videoUrl: "",
      option: "",
      res: "",
      extraText: "https://www.youtube.com/watch?v=gNBKvpAPMUI&list",
      svgIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>',
      svgVideo:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>',
      svgAudio:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"\ /></svg>',
      container: [],
      resolution: [],
      selectedItems: [],
      objVideo: [],
      objAudio: [],
      textInformation: false,
      load: false,
      show: false,
      text: false,
    };
  },
  methods: {
    async getVideoUrl(link) {
      this.load = true;
      this.linkForSearch = link.replace("watch?v=", "embed/");
      const regex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
      const match = this.linkForSearch.match(regex);
      if (match) {
        const result = await GetVideoUrl(this.linkForSearch);
        if (result.status === 200) {
          this.loadProps(this.linkForSearch);

          this.objVideo = result.data.quality.filter(
            (mixed) => mixed.type === "Mixed"
          );

          this.objAudio = result.data.quality.filter(
            (mixaudio) => mixaudio.type === "Audio"
          );

          this.getUniqueContainers(this.objVideo, this.objAudio);
          this.title = result.data.title;
        } else {
          this.showError("Não Foi possivel");
        }
      } else {
        this.showError(`Url ${link}, Inválida, Tente Novamente!`);
      }
      this.load = false;
    },
    getUniqueContainers(objMixed, objAudio) {
      return [
        ...new Set([...objMixed, ...objAudio].map((item) => item.container)),
      ];
    },
    loadProps(linkForSearch) {
      this.selectedItems.length = 0;
      this.videoUrl = linkForSearch;
      this.show = true;
      this.text = true;
    },
    videoCont() {
      this.option = "Mixed";
      this.container = this.getUniqueContainers(this.objVideo, []);
      this.resolution = this.objVideo.map((res) => res.resolution);
    },
    audioCont() {
      this.option = "Audio";
      this.container = this.getUniqueContainers([], this.objAudio);
      this.resolution = this.objAudio.map((bit) => bit.bitrate).slice(0, 3);
    },
    toggleSelection(item) {
      if (this.isSelected(item)) {
        this.selectedItems = this.selectedItems.filter((i) => i !== item);
      } else {
        this.selectedItems.push(item);
      }
      if (this.option === "Mixed") {
        this.cont = this.selectedItems[0];
        this.res = this.selectedItems[1];
      } else {
        this.cont = this.selectedItems[0];
        this.res = this.selectedItems[1];
      }
      this.modelData();
    },
    isSelected(item) {
      return this.selectedItems.includes(item);
    },
    async modelData() {
      if (this.cont && this.res != undefined) {
        const requestInfo = await GetVideoInfoUrl(this.linkForSearch);
        if (requestInfo.status === 200) {
          const filterOptions = requestInfo.data.quality.filter(
            (inf) =>
              inf.type === this.option &&
              inf.container === this.cont &&
              (this.option === "Mixed"
                ? inf.resolution === this.res
                : inf.bitrate === this.res)
          );

          if (filterOptions.length === 0) {
            this.showError(
              `Opção Invalida, ${this.cont ? this.cont : ""}, para ${
                this.res ? this.res : "essa opção"
              }  tente outra`
            );
            (this.resolution = []),
              (this.container = []),
              (this.selectedItems.length = 0);
          } else {
            this.videoUrl = filterOptions[0].url;
            this.textInformation = true;
          }
        } else {
          this.showError("Não foi possivel identificar essa URL");
        }
      }
    },
    showError(message) {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: message,
      });
      this.load = false;
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: yellow;
}
</style>
