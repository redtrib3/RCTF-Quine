<template>

  <nav class="sticky top-0 z-50 shadow-lg  backdrop-blur-xl supports-backdrop-blur:bg-white/95 bg-slate-900/75">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4 px-5 xl:px-12 py-6 w-full">
    <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse text-2xl font-semibold font-heading font-anonymouspro transition duration-1000 ease-out hover:text-lime-400">
        redtrib3
    </router-link>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <!--Call the Shepherd-->
      <button data-tooltip-target="tooltip-default" @click="callShepherdAgain" type="button" class="focus:outline-none rounded-full  ">
        <svg class="w-5 h-5 fill-current text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>
      </button>

      <button data-collapse-toggle="navbar-cta" @click="changeBurgerIcon" id="hamburger"  type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none  text-gray-400 hover:bg-gray-700 focus:ring-gray-900" aria-controls="navbar-cta" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 ease-in-out shadow-xl" :class="{ 'scale-y-[-1] scale-x-[-1]': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
      </button>
  </div>
  <div class="animate-growDown items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border-2 border-gray-700 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent ">
      <li id="blog-link">
        <a href="https://blog.redtrib3.me" target="_blank" class="hover:bg-blue-800 md:hover:bg-transparent block py-2 px-3 md:p-0 md:font-semibold">Writeups</a>
      </li>
      <li>
        <a href="/" :class="{ 'text-lime-500 hover:bg-blue-800 md:hover:bg-transparent block py-2 px-3 md:p-0 md:font-semibold': isActive(), 'hover:bg-blue-800 md:hover:bg-transparent block py-2 px-3 md:p-0 md:font-semibold': !isActive() }">Challenges</a>
      </li>
    </ul>
  </div>
  </div>
  <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      Get Started
      <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</nav>




</template>

<script>
export default {
  name: 'NavBar',
  data(){
    return {
      isOpen: false
    }
  },


  methods:{
      isActive(){
        return this.$route.path === '/';
      },

      changeBurgerIcon(){
        this.isOpen = !this.isOpen;
      },

      callShepherdAgain(){
        this.$emit('shepherd-call');
      }
 
    }
}

</script>