<template>
  <NavBar @shepherd-call="startOverTour"/>
  <HeroBanner  @update-filtered-types="updateFilteredTypes" @update-filtered-diff="updateFilteredDiff" />
  
  <h1 v-if="!filteredChallenges" class="flex justify-center font-bold font-mono m-5 text-gray-500" >No results found.</h1>

  
  <div  class="ml-8 mr-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-start">
      <ChallCard :solvedChalls="solvedChalls" v-for="(chall, index) in filteredChallenges" :key="index" :challJson="chall" @show-modal-event="ShowModal"/>
  </div>

  <Modal v-if="ModalPopup" :challengeData="currChallData" @challenge-solved="handleChallSolve" @closeModal="closeModal()"/>
  
  <Pagination :pageSetlength="pageSet.length" @page-clicked="setPage" />
  <ScrollToTop />
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import ChallCard from '@/components/ChallCard.vue';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';
import ScrollToTop  from '@/components/ScrollToTop.vue';

import ShepherdTour from '@/mixins/ShepherdTour.js';

// Tour steps are defined here to achieve DRY.
// defining in data() causes async issues.
const TOUR_STEPS = [{
        id: 'intro',
        title: 'Welcome to the redtrib3\'s CTF! 👋',
        text: 'This is a platform where you can solve Capture The Flag challenges and learn new things. Click "Start" to get familiar with the application!',
        tourType: null
      },
      {
        id: 't-0',
        title: 'Filter by Difficulty 🔍',
        text: 'Filter the challenges by difficulty level ranging from Easy to Hard.',
        attachTo: { element: '#dropdownBgHoverButton', on: 'top' },
        tourType: 0, // signifies start of tour
         
      },
      {
        id: 't-1',
        title: 'Filter By Type 🔠',
        text: 'Filter the challenges by six different challenge-types ranging from Web to Miscellaneous.',
        attachTo: { element: '#filterByTypeBtn', on: 'top' },
        tourType: 1 // signifies a step in the tour
      },
      {
        id: 't-2',
        title: 'Solve a challenge 🎯',
        text: 'Each card represents a challenge. Click on the \'Solve\' Button to start ',
        attachTo: { element: '#chall-card', on: 'top' },
        tourType: 1,
        canClickTarget: false
      },
      {
        id: 't-3',
        title: 'Explore More Challenges ✨',
        text: 'We have more challenges for you to explore. Click on the respective page number to navigate through the challenges.',
        attachTo: { element: '#pg-2', on: 'top'},
        tourType: 1 // signifies end of tour
      },
      {
        id: 't-4',
        title: 'Learn from Writeups 👩‍💻',
        text: 'Bored of challenges? Keep an eye on the writeup blog for solutions to different challenges and more!',
        attachTo: { element: '#blog-link', on: 'bottom' },
        tourType: 1
      },
      {
        id: 'ending',
        title: 'The End 💯',
        text: 'You made it to the end! Learn more by playing a challenge, \n\n To start over the tour, click on the "Get Started" icon in the top right corner. Enjoy the challenges!',
        tourType: -1
      }];

export default {
name: 'App',
mixins: [ShepherdTour],
components: {
  NavBar,
  HeroBanner,
  ChallCard,
  Modal,
  Pagination,
  ScrollToTop
},

data(){
    return {
    
      ModalPopup: false,
      currChallData: null,        // stores data for the currently selected Modal.
      allChallenges: [], 
      solvedChalls: [],         // keeps track of solved challenges.
      pageSet: [],             // list of all pages [[{...}],[{...}] ...]
      currChallSet: [],       // Array storing The currently shown page.
      filteredTypes: [],
      filteredDiff: [],
      currPageNo: 0,
    
    };
  },


// fetch challenges from backend, and setup pages.
created(){
  this.fetchChallenges().then(pages => {
    this.pageSet = pages.reverse(); // latest first.
    this.currChallSet = pages[0];
  }).catch(err => {
    console.error(`ERROR: Cannot reach server. VERBOSE: ${err}`);
  });

},

mounted(){

  const tourData = JSON.parse(localStorage.getItem('_tour'));
  const hasViewed = tourData && tourData.tour_viewed;

  if (!hasViewed) {
    this.$nextTick(() => {
      this.createTour(TOUR_STEPS, true);
      this.startTour();
      localStorage.setItem('_tour', JSON.stringify({ modal_viewed: false,  tour_viewed: true }));
    });
  }
  

},



computed: {
  
  filteredChallenges() {

     let filteredChalls =  this.allChallenges.filter(chall => {
      // Filter by type
      const typeFiltered = this.filteredTypes.length === 0 || this.filteredTypes.includes(chall.type);
      // Filter by difficulty
      const diffFiltered = this.filteredDiff.length === 0 || this.filteredDiff.includes(chall.difficulty);
      return typeFiltered && diffFiltered;
    });

    // divide the filtered all challs into pages, 6 each.
    filteredChalls = this.divideChallenges(filteredChalls, 6);
    return filteredChalls[this.currPageNo];
  }
},


methods: {

  startOverTour(){

    // start the tour again.
    this.createTour(TOUR_STEPS, true);
    this.startTour();

    // clear storage if exists.
    localStorage.setItem('_tour', JSON.stringify({ modal_viewed: false,  tour_viewed: true }));
  },
  // event handler for modal challenge-solved event.
  handleChallSolve(challId){
    this.solvedChalls.push(challId)
  },

  // set the current page
  setPage(pageNo){
    this.currChallSet = this.pageSet[pageNo-1];
    this.currPageNo = pageNo-1;

  },

  // check if cache is expired.
  isExpired(timestamp, ttl) {
    if(!timestamp){
      return true;
    }

    const old = new Date(timestamp).getTime();
    const now = new Date().getTime();

    // true if ttl is hit
    return Math.abs(now-old) >= ttl;
  },

 

  /*
    method to fetch challenges from the backend.
    If cache stored in localstorage is expired, 
    fetch from backend and update cache.
  */  
  async fetchChallenges() {
    const CACHE_EXPIRY = 600000; // 10 minutes

    try {
        const cache = JSON.parse(localStorage.getItem('chall-cache'));

        if (!cache || this.isExpired(cache.timestamp, CACHE_EXPIRY)) {
            const response = await fetch('http://127.0.0.1:3000/api/challenges');
            let data = await response.json();
            const localData = { challenges: data.reverse(), timestamp: new Date().toISOString() };
            localStorage.setItem('chall-cache', JSON.stringify(localData));

            this.allChallenges = data;
        } else {
            this.allChallenges = cache.challenges;
        }

        return this.divideChallenges(this.allChallenges, 6);

    } catch (error) {
        console.error('Error fetching challenges:', error);
        return [];
    }
  },

  // divide challenge array into pages, 6 per pg.
  divideChallenges(allchallengeArray, pageSize){
    let pages = []
    for(let i=0 ; i< allchallengeArray.length; i+=pageSize){
        let page = allchallengeArray.slice(i, i + pageSize);
        pages.push(page);
    }
    
    return pages
  },

  ShowModal(challengeData){
    this.currChallData = challengeData;
    this.ModalPopup = true;

  },
  closeModal(){
    this.ModalPopup = false;
    this.currChallData = null;
  },

  updateFilteredTypes(types) {
    this.filteredTypes = types;
  },

  updateFilteredDiff(diff) {
    this.filteredDiff = diff;
  }
}
}
</script>

<style>


body {
  font-family: 'Lato', serif;
  margin: 0
}

code {
  padding: 2px;
}


</style>
