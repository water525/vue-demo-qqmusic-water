<template>
  <div class="progress" @click="toClick($event)" ref="progressWrap">
    <div class="progress-wrap">
      <div class="progress-bg" :style="{width:progress+'%'}"></div>
      <div class="progress-btn" :style="{left:progress+'%'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      progress () {
        return this.$store.getters.cleProgress;
      }
    },
    methods: {
      toClick (e) {
        let box = this.$refs.progressWrap.getBoundingClientRect();
        let x = e.clientX - box.left;
        let time = parseInt(this.$store.state.totalTime * (x / box.width));
        this.$store.commit('setAudioTime', time);
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .progress
    width: 100%
    padding: 2px 0
    .progress-wrap
      position: relative
      height: 2px
      background: rgba(0, 0, 0, .3)
      border-radius: 1px
      .progress-bg
        width: 0%
        height: 100%
        background: #63abfb
        border-radius: 1px
      .progress-btn
        position: absolute
        top: -3px
        left: 0%
        width: 8px;
        height: 8px
        border-radius: 50%
        background: #63abfb

</style>
