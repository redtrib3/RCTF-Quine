<template>
<NavBar />
<section class="bg-gray-900 mt-20">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mt-0 mt-20">
            <h1 class="font-anonymouspro text-9xl  lg:font-bold lg:text-8xl ">404</h1>
            <p class="font-anonymouspro  mb-4 text-3xl  md:text-4xl   text-white">Not found</p>
            <p class="mb-4 text-md font-light   text-gray-400">Is this what they call the Dark web?</p>
            <router-link to="/"><button class="inline-flex text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to home</button></router-link>
        </div>   
    </div>
</section>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'NotFound',
    components: { NavBar }

}
</script>

