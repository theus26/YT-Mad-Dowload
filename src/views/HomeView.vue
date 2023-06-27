<template>
  <div class="home ">
    <Header />

    <Menu />
    <br>
    <br>

    <Information />
    <InputSearch />
   
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import InputSearch from '@/components/InputSearch.vue';
import Information from '@/components/Information.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    InputSearch,
    Information,
    Menu,
},
 
}
</script>
