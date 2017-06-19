<template>
  <div class="toplist" ref="toplistScroll">
    <ul class="toplist-wrapper">
      <li class="list-item" v-for="list in topList">
        <router-link :to="'/songlist/'+list.id">
          <div class="img">
            <img v-lazy="list.picUrl" alt="">
            <span class="listen-count">
                  <i class="listen-icon"></i>
                  {{list.listenCount | filterNum}}
                </span>
            <span class="play-icon"></span>
          </div>
          <div class="info">
            <div class="info-content">
              <h2 class="title space">{{list.topTitle}}</h2>
              <p class="space" v-for="(song, index) in list.songList">
                {{index + 1}}<span>{{song.songname}}</span>-{{song.singername}}
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        topList: ''
      };
    },
    created () {
      this.$http.get('/api/toplist').then((res) => {
        if (res.data.code === 0) {
          this.topList = res.data.data.topList;
          this.$nextTick(() => {
            if (this.toplistScroll) {
              this.toplistScroll.refresh();
            } else {
              this._initScroll();
            }
          });
        }
      });
    },
    methods: {
      _initScroll () {
        this.toplistScroll = new BScroll(this.$refs.toplistScroll, {click: true});
      }
    },
    filters: {
      filterNum (val) {
        return (val / 10000).toFixed(1) + '万';
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .toplist
    position: absolute
    top: 84px
    left: 0
    bottom: 0
    width: 100%
    background: #f4f4f4
    overflow: hidden
    .toplist-wrapper
      padding: 4px 0
      .list-item
        margin: 8px
        & > a
          display: flex
          color: #000
          background: #fff
          overflow: hidden
          .img
            position: relative
            flex: 0 0 100px
            height: 100px
            & > img
              width: 100%
            .listen-count
              position: absolute
              bottom: 5px
              left: 5px
              font-size: 10px
              color: #fff
              .listen-icon
                display: inline-block
                width: 10px
                height: 10px
                b-img('list_sprite.png')
                background-position: 0 -50px
                background-size: 24px 60px
          .info
            flex: 1
            font-size: 14px
            overflow: hidden
            .info-content
              margin: 0 10px
              .title
                height: 30px
                line-height: 30px
                font-size: 16px
              & > p
                height: 24px
                line-height: 24px
                color: rgba(0, 0, 0, .5)
                & > span
                  margin: 0 5px
                  color: #000


</style>
