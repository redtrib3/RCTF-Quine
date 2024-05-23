<template>
    
        <div id="chall-card" class="max-w-lg p-6 bg-gray-800 border  rounded-lg mx-4 my-4 shadow border-gray-700 hover:scale-95 transform transition duration-300 relative">
            <a>

                <span class="flex">
                    <h5 :class="{'text-2xl font-semibold tracking-tight font-mono': true, 'text-green-500':solvedChalls.includes(challJson.id), 'text-white': !solvedChalls.includes(challJson.id) }">{{ challJson.title }}</h5>
                    <svg v-if="solvedChalls.includes(challJson.id)" class="m-2 w-4 h-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.707,15.707C11.512,15.902,11.256,16,11,16s-0.512-0.098-0.707-0.293l-4-4c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0L11,13.586l8.35-8.35C17.523,3.251,14.911,2,12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10 c0-1.885-0.531-3.642-1.438-5.148L11.707,15.707z"></path>
                    </svg>
                </span>
                <p class="text-sm pb-6 text-gray-400 font-mono transition duration-200">{{ challJson.type }} - {{ challJson.difficulty }}</p>
            </a>
            <div class="p-2">
                <p class="font-normal text-gray-400 text-sm pb-4 line-clamp-2" v-html="padDesc(challJson.desc)"></p>
            </div>
            <button id="solve-btn" @click="showModal" class="mt-4 bottom-2 left-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg focus:ring-4 focus:outline-none  bg-green-600 hover:bg-green-700 focus:ring-green-800">
                Solve
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>

        </div>
    
</template>

<script>

export default {
    name: 'ChallCard',
    props: { challJson: Object, solvedChalls: Array },
    methods: {
        showModal() {
            this.$emit('show-modal-event', this.challJson);
        },
        padDesc(desc) {
            return desc.padEnd(161,' Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.');
        }
    },


}
</script>


