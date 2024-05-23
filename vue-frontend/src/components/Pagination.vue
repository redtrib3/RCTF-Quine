<template>

<nav>
    <ul class="flex justify-center m-4 -space-x-px text-sm">
        <li v-for="page in pageSetlength" :key="page">
          <a :id="`pg-${page}`" @click="pageClick(page)" :class="{'flex items-center rounded-lg opacity-60 cursor-pointer m-2  justify-center px-3 h-8 leading-tight border   bg-gray-800 border-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white': true, 'opacity-100 bg-gray-900  border-gray-700': activePage === page, '': activePage!==page}">{{ page }}</a>
        </li>
    </ul>
</nav>

</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pageSetlength: Number,
    },
    data(){
        return {
            activePage: 1,
        }
    },
    methods: {
        setStyleActive(page){
            this.activePage = page;

        },
        pageClick(pageNum) {
            this.setStyleActive(pageNum);
            this.$emit('page-clicked', pageNum);
        }
    }
}
</script>