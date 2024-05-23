export default {
    data() {
        return {
            tour: null,
            tourSteps: []
        };
    },

    methods: {
        createTour(steps, modalOverlay) {

            this.tourSteps = steps;
            this.tour = this.$shepherd({
                useModalOverlay: modalOverlay,
                defaultStepOptions: {
                    cancelIcon: {
                        enabled: true
                    },
                    scrollTo: { behavior: 'smooth', block: 'center' },
                }
            });

            // prevent background scrolling when tour is active
            this.tour.on('start', () => document.body.classList.add('overflow-y-hidden'));
            this.tour.on('complete', () => document.body.classList.remove('overflow-y-hidden'));
            this.tour.on('cancel', () => document.body.classList.remove('overflow-y-hidden'));

            // this.tour.addSteps(this.tourSteps);

            this.tourSteps.forEach(step => {

                // set appropriate buttons for each step.
                if (step.tourType === 0){
                  step.buttons = [
                    {
                      text: 'Next',
                      action: this.tour.next
                    }
                  ];

                } else if (step.tourType === 1) {
                  step.buttons = [
                    { 
                      text: 'Back',
                      action: this.tour.back
                    },
                    { 
                      text: 'Next',
                      action: this.tour.next
                    }
                  ];

                }  else if (step.tourType === -1) {
                  step.buttons = [
                    {
                      text: 'Close',
                      action: this.tour.complete
                    }
                  ];

                } else {
                    step.buttons = [
                        {   
                            
                            text:  'Skip',
                            action: this.tour.complete
                        },
                        {
                            text: 'Start',
                            action: this.tour.next
                        }
                    ]
                }


                this.tour.addStep(step);
              });
        },

        startTour(){
            if (this.tour){
                this.tour.start();
            } else {
                console.error('Tour is null. call createTour().');
            }
        }
    }

}