<template>
  <div class="home">
    <Header />

    <Menu />
    <br>
    <br>

    <Information />
    <ContainerOptions />
    



    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ContainerOptions from '@/components/ContainerOptions.vue';
import Information from '@/components/Information.vue';
import Menu from '@/components/Menu.vue';



export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    ContainerOptions,
    Information,
    Menu,
}
}
</script>
