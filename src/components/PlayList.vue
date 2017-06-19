<template>
  <div class="list-contianer">
    <div class="list-header border-tb">播放队列<span>({{$store.state.songList.length}})</span></div>
    <div class="list-wrap" ref="listScroll">
      <ul class="list-content">
        <li class="border-tb" v-for="(song, index) in $store.state.songList" @click="play(song.id)"
            :class="{active:song.id==$store.state.playSong.id}">
          <span class="name space"><span>{{index+1}}</span>{{song.name}}</span>
          <span class="singer space"> - {{song.singer}}</span>
          <span class="currentAni ani-wrap" v-if="song.id==$store.state.playSong.id"><i></i><i></i><i></i><i></i><i></i></span>
        </li>
      </ul>
    </div>
    <div class="btn-close" @click="hideList">关闭</div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    created () {
      this.$nextTick(() => {
        this._resetScroll();
      });
    },
    methods: {
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.listScroll, {click: true});
      },
      _resetScroll () {
        if (this.listScroll) {
          this.listScroll.refresh();
        } else {
          this._initScroll();
        }
      },
      hideList () {
        this.$emit('listChange');
      },
      play (id) {
        this.$store.commit('playCSong', id);
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .list-contianer
    width: 100%
    height: 360px
    background: rgba(0, 6, 12, 0.8)
    .list-header
      height: 50px
      line-height: 50px
      text-align: center
      font-size: 16px
      color: #ffffff
      border-1px('bottom', rgba(255, 255, 255, .5))
      span
        margin: auto 15px
        font-size: 14px
        color: rgba(255, 255, 255, .5)

    .list-wrap
      height: 260px
      overflow: hidden
      .list-content
        width: 100%
        padding: 0 10px
        li
          height: 50px
          line-height: 50px
          border-1px('bottom', rgba(255, 255, 255, .5))
          overflow: hidden
          .name
            max-width: 35%
            font-size: 16px
            color: #fff
            span
              margin-right: 10px
          .singer
            max-width: 20%
            font-size: 12px
            color: rgba(255, 255, 255, .5)
          .ani-wrap
            float: right
            margin-top: 18px
            margin-right: 20px
          &.active
            .name
              color: #31c27c
            .singer
              color: #31c27c

  .btn-close
    height: 50px
    line-height: 50px
    color: #fff
    font-size: 16px
    text-align: center
    border-1px('top', rgba(255, 255, 255, .5))
</style>
