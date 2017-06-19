<template>
  <div class="playSong">
    <div class="btn-showPlay" v-show="$store.state.showDown" @click="showAudio" ref="btnShow"></div>
    <transition name="fadeBottom">
      <div class="play-wrap" v-show="$store.state.showAudio">
        <div class="song-img" @click="showPage">
          <div class="song-circle rotateLoop" :class="imgClass">
            <img :src="$store.state.playSong.imgUrl" alt="">
          </div>
        </div>
        <div class="song-content">
          <div class="song-progress">
            <xProgress></xProgress>
          </div>
          <div class="song-info" >
            <div class="song-name" @click="showPage">
              <h3 class="name space">{{$store.state.playSong.name}}</h3>
              <p class="singer space">{{$store.state.playSong.singer}}</p>
            </div>
            <div class="toolbar">
              <div :class="playClass" @click="playAudio"></div>
              <div class="btn-next" @click="nextSong"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:after-leave="afterLeave"
                v-bind:css="false">
      <div class="play-page" v-if="$store.state.showPage">
        <div class="play-container">
          <div class="song-title">
            <h3 class="name space">{{$store.state.playSong.name}}</h3>
            <p class="singer space">{{$store.state.playSong.singer}}</p>
          </div>
          <div class="song-img">
            <div class="song-circle rotateLoop" :class="imgClass">
              <img :src="$store.state.playSong.imgUrl" alt="">
            </div>
          </div>
          <div class="toolbar">
            <div class="songlist">
              <span class="btn-showList" @click="_showlist"></span>
              <span class="icon-like"></span>
            </div>
            <div class="song-progress">
              <span class="cur-time">{{$store.state.currentTime | formatTime}}</span>
              <div class="pro-wrap">
                <xProgress></xProgress>
              </div>
              <span class="tol-time">{{$store.state.totalTime | formatTime}}</span>
            </div>
            <div class="btn-group">
              <span class="btn-pre" @click="preSong"></span>
              <span :class="playClass" @click="playAudio"></span>
              <span class="btn-next" @click="nextSong"></span>
            </div>
          </div>
          <div class="btn-back" @click="showPage"><span class="icon-back"></span></div>
          <div class="bg-img">
            <img :src="$store.state.playSong.imgUrl" alt="">
          </div>
          <transition name="fadeDown">
            <div class="play-list" v-if="showList">
              <PlayList @listChange="_showlist"></PlayList>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import xProgress from './Progress.vue';
  import PlayList from './PlayList.vue';
  import Velocity from 'velocity-animate';
  export default {
    data () {
      return {
        showList: false
      };
    },
    computed: {
      playClass () {
        return this.$store.state.playing ? 'btn-pause' : 'btn-play';
      },
      imgClass () {
        return this.$store.state.playing ? 'rungingAni' : 'pauseAni';
      }
    },
    methods: {
      playAudio () {
        if (this.$store.state.playing) {
          this.$store.commit('pauseSong');
        } else {
          this.$store.commit('playSong');
        }
      },
      preSong () {
        this.$store.commit('preSong');
      },
      nextSong () {
        this.$store.commit('nextSong');
      },
      showPage () {
        this.$store.commit('setShowPage');
      },
      showAudio () {
        if (this.$store.state.showAudio) {
          Velocity(this.$refs.btnShow, {translateY: '50px'}, {duration: 100});
          Velocity(this.$refs.btnShow, {rotateZ: '180deg'}, {duration: 100});
        } else {
          Velocity(this.$refs.btnShow, {rotateZ: '0deg'}, {duration: 100});
          Velocity(this.$refs.btnShow, {translateY: '0px'}, {duration: 100});
        }
        this.$store.commit('setShowAudio');
      },
      _showlist () {
        this.showList = !this.showList;
      },
      beforeEnter (el) {
        Velocity(el, {
          opacity: 0,
          scale: 0,
          translateX: -1 * window.innerWidth + 30 + 'px',
          translateY: window.innerHeight - 30 + 'px',
          rotateZ: '0deg'
        }, {duration: 1});
      },
      enter (el, done) {
        Velocity(el, {opacity: 1, translateX: '0px', translateY: '0px', scale: '1.2'}, {duration: 400});
        Velocity(el, {scale: '1'}, {duration: 200, complete: done});
      },
      leave (el, done) {
        Velocity(el, {
          scale: 1.2
        }, {duration: 150});
        Velocity(el, {
          scale: 0.5,
          rotateZ: '45deg',
          translateX: window.innerWidth + 100 + 'px',
          translateY: -1 * window.innerHeight - 100 + 'px'
        }, {duration: 300, complete: done});
      },
      afterLeave (el) {
        Velocity(el, {
          opacity: 0,
          scale: 0,
          translateX: -1 * window.innerWidth + 30 + 'px',
          translateY: window.innerHeight - 30 + 'px',
          rotateZ: '0deg'
        }, {duration: 1});
      }
    },
    filters: {
      formatTime (time) {
        if (!time) return '00:00';
        let tow = (num) => {
          return num < 10 ? '0' + num : num;
        };
        let f = parseInt(time / 60);
        let s = parseInt(time % 60);
        return tow(f) + ':' + tow(s);
      }
    },
    components: {
      xProgress,
      PlayList
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  #audio
    display: none

  .playSong
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    .btn-showPlay
      position: absolute
      right: 10px
      bottom: 60px;
      width: 28px
      height: 28px
      background: rgba(0, 0, 0, .4)
      border-radius: 50%
      &:before, &:after
        content: ''
        display: block
        position: absolute
      &:before
        top: 6px
        left: 10px
        width: 8px
        height: 8px
        background: #fff
      &:after
        top: 14px
        left: 6px
        border-width: 8px
        border-color: #fff transparent transparent transparent
        border-style: solid dashed dashed dashed
    .play-wrap
      display: flex
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 50px
      background: #fff
      box-shadow: 0 -3px 3px rgba(0, 0, 0, .3)
      &.fadeBottom-enter-active, &.fadeBottom-leave-active
        transition: all 0.2s linear
      &.fadeBottom-enter, &.fadeBottom-leave-to
        bottom: -55px
      .song-img
        position: relative
        flex: 0 0 70px
        .song-circle
          position: absolute
          left: 10px
          bottom: 8px
          width: 50px
          height: 50px
          border-radius: 50%
          box-shadow: 0 0 3px 3px rgba(0, 0, 0, .2)
          background: #fff
          overflow: hidden
          img
            width: 100%
      .song-content
        flex: 1
        overflow: hidden
        .song-progress
          width: 100%
          height: 15px
          padding: 4px 10px 0 0
          box-sizing: border-box
        .song-info
          display: flex
          width: 100%
          height: 35px
          .song-name
            flex: 1
            overflow: hidden
            .name
              margin-bottom: 4px
              font-size: 14px
              color: #000
            .singer
              font-size: 12px
              color: rgba(0, 0, 0, .5)
          .toolbar
            flex: 0 0 72px
            padding: 0 10px
            padding-top: 2px
            .btn-play, & .btn-pause, & .btn-next
              position: relative
              display: inline-block
              width: 28px
              height: 28px
              border-radius: 50%
              box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 3px 3px rgba(255, 255, 255, .5) inset
              &:before, &:after
                content: ''
                position: absolute
            .btn-play
              &:before
                top: 6px
                left: 10px
                border-width: 8px
                border-color: transparent transparent transparent rgba(0, 0, 0, .4)
                border-style: dashed dashed dashed solid
            .btn-pause
              &:before, &:after
                top: 8px
                width: 2px
                height: 12px
                background: rgba(0, 0, 0, .4)
              &:before
                left: 10px
              &:after
                right: 10px
            .btn-next
              margin-left: 10px
              &:before
                top: 7px
                left: 9px
                border-width: 7px
                border-color: transparent transparent transparent rgba(0, 0, 0, .4)
                border-style: dashed dashed dashed solid
              &:after
                right: 9px
                top: 8px
                width: 2px
                height: 12px
                background: rgba(0, 0, 0, .4)
    .play-page
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #fff
      .play-container
        position: relative
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.5)
        overflow: hidden
      .bg-img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(16px)
        overflow: hidden
        img
          margin-left: -20%
          height: 100%
      .song-title
        width: 100%
        height: 70px
        padding: 15px 15px 0 15px
        box-sizing: border-box
        text-align: center
        .name
          height: 30px
          line-height: 30px
          font-size: 20px
          font-weight: 600
          color: #fff
        .singer
          line-height: 26px
          font-size: 14px
          color: rgba(255, 255, 255, .7)
      .song-img
        position: relative
        width: 100%
        padding-top: 80%
        .song-circle
          position: absolute
          top: 50%
          left: 50%
          margin-left: -80px
          margin-top: -80px
          width: 160px
          height: 160px
          border-radius: 50%
          overflow: hidden
          img
            width: 100%

      .toolbar
        .songlist
          width: 100%
          overflow: hidden
          .btn-showList
            display: block
            float: left
            margin-left: 30px
            width: 24px
            height: 18px
            b-img('sprite_play.png')
            background-position: 0 -240px
            background-size: 40px 350px;
          .icon-like
            display: block
            float: right
            margin-right: 30px
            width: 25px
            height: 21px
            b-img('sprite_play.png')
            background-size: 40px 350px;
        .song-progress
          display: flex
          height: 40px
          overflow: hidden
          .cur-time, & .tol-time
            flex: 0 0 55px
            line-height: 40px
            text-align: center
            font-size: 12px
            color: rgba(255, 255, 255, .5)
          .pro-wrap
            flex: 1
            padding-top: 16px
        .btn-group
          text-align: center
          & > span
            position: relative
            display: inline-block
            border: 1px solid #fff
            border-radius: 50%
            margin: 0 12px
            vertical-align: middle
          & > span:before, & > span:after
            content: ''
            position: absolute
            display: blcok
          .btn-pre, & .btn-next
            width: 34px
            height: 34px
            &:before
              top: 8px
              left: 10px
              width: 3px
              height: 16px
              background: #fff
            &:after
              top: 7px
              right: 10px
              border-color: transparent #fff transparent transparent
              border-width: 9px
              border-style: dashed solid dashed dashed
          .btn-next
            transform: rotate(180deg)
          .btn-play, & .btn-pause
            width: 40px
            height: 40px
          .btn-play
            &:after
              top: 9px
              right: 1px
              border-color: transparent transparent transparent #fff
              border-width: 11px
              border-style: dashed dashed dashed solid
          .btn-pause
            &:before, &:after
              top: 10px
              left: 13px
              width: 3px
              height: 17px
              background: #fff
            &:after
              left: 24px
      .btn-back
        position: absolute
        top: 15px
        left: 15px
        padding: 6px 8px
        border-radius: 50%
        background: rgba(0, 0, 0, .4)
        overflow: hidden
        .icon-back
          display: block
          width: 12px
          height: 16px
          b-img('goback.png')
          background-size: auto 100%
      .play-list
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        &.fadeDown-enter-active, &.fadeDown-leave-active
          transition: all .3s linear
        &.fadeDown-enter, &.fadeDown-leave-to
          transform: translateY(360px)
</style>
