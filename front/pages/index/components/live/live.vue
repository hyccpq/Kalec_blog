<template>
    <div>
        <script crossorigin="anonymous" integrity="sha384-LQ4iUfR5iWRvSEKpfA333wz5p7iO8T+cofeGI2F+2vrvWIMCyrbccYoBTpzoy/fJ" src="https://lib.baomitu.com/flv.js/1.5.0/flv.min.js"></script>
    <video meted="meted" id="videoElement"/>
    </div>

</template>

<script>
  export default {
    name: "live",
    data() {
      return {
        videoElement: null
      }
    },
    methods : {
      initVideo() {
        let flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://home.yes.kalecgos.top:9999/live/00'
          });
          flvPlayer.attachMediaElement(this.videoElement);
          flvPlayer.load();
          flvPlayer.play();
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (flvjs.isSupported()) {
          this.videoElement = document.getElementById('videoElement');
          // if (this.videoElement) this.initVideo()
          // else
            setTimeout(() => this.initVideo(), 2000)
        }
      })

    }
  };
</script>

<style scoped>

</style>
