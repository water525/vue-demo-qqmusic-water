<template>
  <div id="app">
    <router-view></router-view>
    <play></play>
    <div class="audio-wrap">
      <audio :src="$store.state.playSong.url" ref="audio" id="audio" @timeupdate="updateTime" @ended="ended"
             @canplay="canplay"></audio>
    </div>
  </div>
</template>

<script>
  import Play from './components/Play.vue';
  export default {
    name: 'app',
    mounted () {
      this.$store.commit('setAudio', this.$refs.audio);
    },
    components: {
      Play
    },
    methods: {
      updateTime () {
        let time = this.$refs.audio.currentTime;
        this.$store.commit('setCurrentTime', time);
      },
      ended () {
        this.$store.commit('nextSong');
      },
      canplay () {
        this.$store.commit('setTotalTime');
      }
    }
  };
</script>

<style lang="stylus">
  #app
    position: absolute
    top: 0
    left: 0
    bottom: 0
    width: 100%
    font-family: "hiragino sans gb", "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif
    .loading
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      z-index: 100
      img
        justify-content: center
        align-items: center
    .audio-wrap
      display: none
</style>
