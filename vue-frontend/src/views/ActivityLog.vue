<template>
  <NavBar @shepherd-call="startOverTour"/>

  <div class="bg-gray-900 flex justify-center text-white m-4 relative flex-col items-center">
    <h1 class="text-3xl lg:text-4xl font-bold font-mono ">Activity Log</h1>
    <p class="text-sm md:text-md text-gray-400 pt-2 text-center">Spying time, See what others users are upto.</p>
  </div>

  <div class="flex justify-center m-4">

    <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
      <div class="log-container p-4 overflow-x-scroll overflow-y-scroll h-96  animate-growDown scroll-smooth" ref="logContainer">
        <div v-for="log in logs" :key="log.timestamp" class="log-entry bg-gray-800 p-2 mb-2 rounded shadow-md flex justify-between">
          <img :src="fetchRandomAvatar()" alt="User Avatar" class="w-8 h-8">
          <p class="text-gray-400 mb-2 pl-2 md:pl-0">User-{{ log.guid.split('-')[0] }}  pwned '{{ log.ch_title }}'</p>
          <p class="text-gray-400 mb-2">{{ formatTime(log.timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ShepherdTour from '@/mixins/ShepherdTour.js';

const ACTIVITY_TOUR_STEPS = [
  {
    id: 'intro',
    title: 'Activity Log 🕵️',
    text: 'This is the activity log where you can take a peak at what other users are doing right now.',
    tourType: null
  },
  {
    id: 't-0',
    title: 'Log 📜',
    text: 'An entry represents someone solving a challenge. well, that was obvious but anyway.',
    attachTo: { element: '.log-entry', on: 'top' },
    tourType: 1
  },
  {
    id: 't-1',
    title: 'Start over 🔄',
    text: 'Remember, You can always start over the tour by clicking the "Get started" button at the top right corner.',
    attachTo: { element: '#shepherd-btn', on: 'bottom' },
    tourType: 1
  },
  {
    id: 't-2',
    title: 'Be a part of the log 🌟',
    text: 'Wanna see yourself in the log? Solve a challenge and you will be here too, forever 😎',
    tourType: -1
  },


];

export default {
  name: 'ActivityLog',
  components: {
    NavBar
  },
  mixins: [ShepherdTour],
  data() {
    return {
      logs: [],
      avatars: []
    };
  },

  // start the scrollbar at bottom, when new logs are added.
  watch: {
    logs() {
      this.$nextTick(() => {
        this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight;
      });
    },
  },

  mounted(){
    this.$nextTick(() => {
      this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight;

      const tourData = JSON.parse(localStorage.getItem('_tour'));
      const hasViewed = tourData && tourData.activity_viewed;

      if(!hasViewed){
        if (tourData){
          localStorage.setItem('_tour', JSON.stringify({...tourData, activity_viewed: true}));
        } else {
          // if someone access' activity before home for first time.
          localStorage.setItem('_tour', JSON.stringify({
              tour_viewed: false,
              modal_viewed: false,
              activity_viewed: true
          }));
        }

        this.createTour(ACTIVITY_TOUR_STEPS, true);
        this.startTour();
      }
    })
  },

  created() {
    this.fetchLogs();
    for(let i = 1; i <= 10; i++) {
      this.avatars.push(`avatars/av${i}.svg`);
    }
  },

  methods: {
    async fetchLogs() {
      const resp = await fetch('/api/peakaboo', {
        credentials: 'same-origin', 
      });

      const data = await resp.json();
      this.logs = data;
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });
    },
    
    fetchRandomAvatar() {
      return this.avatars[Math.floor(Math.random() * this.avatars.length)];
    },

    startOverTour(){
      localStorage.setItem('_tour', JSON.stringify({ modal_viewed: false,  tour_viewed: false, activity_viewed: true }));
      this.createTour(ACTIVITY_TOUR_STEPS, true);
      this.startTour();
    }

  }
};
</script>


