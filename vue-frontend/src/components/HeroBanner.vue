<template>

<div class="bg-gradient-to-r from-gray-900 to-blue-900 shadow-md text-white py-20 relative">
    <div class="container mx-auto">
        <h1 class="text-3xl md:text-3xl lg:text-4xl font-bold mb-4 font-mono ml-4">Challenges<span class="animate-ping">_</span></h1>
        <!--an apt description for a CTF platform-->
        <p class="text-base md:text-lg lg:text-md mb-8 ml-4">A curated set of CTF challenges for noobs and vets alike.</p>
    </div>
    
    <div class="absolute bottom-0 right-0 mb-4 mr-4">

        
        <!--Filter by Difficulty -->
        <button  type="button" id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" class="inline-flex text-center text-white  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700">
            <span>Difficulty</span>
            <svg class="w-3 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <!-- Dropdown menu -->
        <div id="dropdownBgHover" class="animate-fadeIn-quick absolute right-0 mt-2 z-10 hidden w-48 rounded-lg shadow bg-gray-700">
            <ul class="p-3 space-y-1 text-sm  text-gray-200" aria-labelledby="dropdownBgHoverButton">
                <li v-for="(diff, index) in challDiffs" :key="index">
                    <div class="flex items-center p-2 rounded  hover:bg-gray-600">
                        <input  v-model="filteredDiff" id="checkbox-item-1" type="checkbox" :value="diff" class="w-4 h-4 text-green-500 rounded focus:ring-green-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500">
                        <label  for="checkbox-item-1" class="w-full ms-2 text-sm font-medium rounded text-gray-300">{{ diff }}</label>
                    </div>
                </li>
            </ul>
        </div>
        <!--Filter by type --->
        <button id="filterByTypeBtn"  class="inline-flex text-center ml-2 shadow-lg text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700" type="button">
            <span>Type</span>
            <svg class="w-3 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="filterByTypeMenus" class="animate-fadeIn-quick absolute right-0 mt-2 z-10 hidden w-48 rounded-lg shadow bg-gray-700">
            <ul class="p-3 space-y-1 text-sm  text-gray-200" aria-labelledby="filterByTypeBtn">
                <li v-for="(type, index) in challTypes" :key="index">
                    <div class="flex items-center p-2 rounded  hover:bg-gray-600">
                        <input v-model="filteredTypes" id="checkbox-item-4" type="checkbox" :value="type" class="w-4 h-4 text-green-500 rounded  focus:ring-green-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500">
                        <label for="checkbox-item-4" class="w-full ms-2 text-sm font-medium rounded text-gray-300">{{ type }}</label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'HeroBanner',
    data(){
        return {
            challTypes: ['Web', 'Forensics', 'Cryptography', 'Reversing', 'OSINT', 'Miscellaneous'],
            challDiffs: ['Easy', 'Medium', 'Hard'],
            filteredTypes: [],
            filteredDiff: []
        }
    },
    
    watch: {
        filteredTypes: function() {
            this.$emit('update-filtered-types', this.filteredTypes);
        },
        filteredDiff: function() {
            this.$emit('update-filtered-diff', this.filteredDiff);
        }
    },
    // Inject client side js to control filter dropdowns
    mounted(){
      const dropdownButton = document.getElementById("dropdownBgHoverButton");
      const dropdownMenu = document.getElementById("dropdownBgHover");
      const filterByTypeBtn = document.getElementById("filterByTypeBtn");
      const filterByTypeMenus = document.getElementById("filterByTypeMenus");
      filterByTypeBtn.addEventListener("click", () => {
        filterByTypeMenus.classList.toggle("hidden");
      });
      dropdownButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden");
      });
  
      // Close the dropdown menu when clicking outside of it
      document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.add("hidden");
        }
        if (!filterByTypeBtn.contains(event.target) && !filterByTypeMenus.contains(event.target)) {
          filterByTypeMenus.classList.add("hidden");
        }
      });
},
}
</script>
