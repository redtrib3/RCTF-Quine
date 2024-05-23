<template>
    <button id="scroll-to-top" @click="scrollToTop()" class="opacity-0 fixed bottom-5 right-5  rounded-full text-slate-300  hover:text-slate-100">
        <svg  class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
        </svg>
    </button>
    
</template>

<script>
export default {
    name: 'ScrollToTop',

    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        scrollToTop(){
            window.scrollTo({ top: 0, behavior: 'smooth'});
        },
        handleScroll(){
            const scrollToTop = document.getElementById('scroll-to-top');
            if (window.scrollY > 300){
                // scrollToTop.classList.remove("invisible");
                scrollToTop.style.opacity = '1';
            } else {
                // scrollToTop.classList.add("invisible");
                scrollToTop.style.opacity = '0';
            }
        },

    }
}
</script>

<style scoped>

#scroll-to-top {
  transition: opacity 0.3s ease;
}

</style>