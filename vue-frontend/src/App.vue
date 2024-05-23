<template>
  <router-view/>
  <FooterComp v-if="showFooter"/>   
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComp
  },
  data() {
    return {
      showFooter: true
    };
  },

  // dynamically let the routes decide if to show footer or not.
  created() {
    /*
      from = the path user is coming from.
      to = the path user is going to.
      next() -> call the next beforeEach 
    */ 
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.hideFooter) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
      next();
    });
  }
}
</script>