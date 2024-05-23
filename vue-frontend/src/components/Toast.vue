<template>
    <div id="toast-success" class="animate-fadeIn absolute top-0 right-0 z-50 mt-4 mr-4 w-30 h-10 ">
        <div  class="flex items-center w-full max-w-xs p-4 mb-4 top-4 right-4  rounded-lg shadow text-gray-400 bg-gray-800" role="alert">
            <div class='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg'>
                

                <!--hint toast-->
                <svg v-if="state=='hint'" class="w-6 h-6 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" fill="currentColor">
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"></path>
                </svg>

                <!--success toast-->
                <svg v-if="state=='success'" class="w-5 h-5 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"></path>
                </svg>

                <!--warning toast-->
                <svg v-if="state=='warning'" class="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>

                <!--failure toast-->
                <svg v-if="state=='failure'" class="w-6 h-6 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>

            </div>
            <div class="ms-3 text-sm font-normal p-2 ">{{ message }}</div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Toast',
    props: {
        message: String,
        state: String
    }
}
</script>