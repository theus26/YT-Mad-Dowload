<template>
    <!-- component -->
    <div class="h-screen bg-white">
        <div class="flex justify-center items-start h-full py-8">
            <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
        </div>
    </div>
</template>

<script>
export default{
    components:{
        name: 'Loading',
        props:['show']
    },

}

</script>