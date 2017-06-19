<template>
  <div class="songlist" :style="{background:color}">
    <div class="songlist-header" ref="songListHeader">
      <div class="header-title">
        <div class="title-wrap" :style="{color:txtColor}">
          <p>{{topInfo.ListName}}</p>
        </div>
      </div>
      <div class="header-bg">
        <img :src="topInfo.pic_album" alt="">
        <div class="focus-gradient" :style="{color:bgColor}"></div>
      </div>
    </div>
    <div class="songlist-wrapper" ref="listScroll">
      <div class="scroll-wrap">
        <ul class="list-song border-tb" :class="txtColor === '#000' ? 'ct-1' : 'ct-2'"
            :style="{color:txtColor,background:color}">
          <li class="song-item" v-for="(song, index) in songList" @click="playAudio($event,song)">
            <div class="song-no">{{index + 1}}</div>
            <div class="song-info border-tb" :class="txtColor === '#000' ? 'ct-1' : 'ct-2'">
              <h3 class="song-title space">{{song.data.songorig}}</h3>
              <p class="song-desc space">
              <span v-for="(sing,idx) in song.data.singer">{{sing.name}}<span
                v-if="idx < song.data.singer.length-1">/</span></span>
                - {{song.data.albumname}}·{{song.data.albumdesc}}
              </p>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <span class="btn-back" @click="goBack" ref="btnBack">
      <i class="icon-left"></i>
    </span>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Transform from 'css3transform/transform.js';

  export default {
    data () {
      return {
        bgColor: '',
        txtColor: '',
        color: '',
        songList: '',
        topInfo: ''
      };
    },
    created () {
      let id = this.$route.params.id;
      let color = 14737632;
      if (!id) return;
      this.$http.get('/api/topsonglist/' + id).then((res) => {
        if (res.data.code === 0) {
          let tcolor = res.data.color.toString(16);
          if (tcolor.length < 6) {
            tcolor = '000000'.substr(0, 6 - tcolor.length) + tcolor;
          }
          this.bgColor = res.data.color === color ? '#' + tcolor : '#000';
          this.txtColor = res.data.color === color ? '#000' : '#fff';
          this.color = '#' + tcolor;
          this.songList = res.data.songlist;
          this.topInfo = res.data.topinfo;
          this.$nextTick(() => {
            this._resetScroll();
          });
        }
      });
    },
    methods: {
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.listScroll, {
          click: true,
          probeType: 3
        });
        Transform(this.$refs.songListHeader);
        Transform(this.$refs.btnBack);
        let h = this.$refs.songListHeader.getBoundingClientRect().height;
        this.$refs.songListHeader.originY = -h / 2;
        this.$refs.songListHeader.translateY = -h / 2;
        this.listScroll.on('scroll', (pos) => {
          if (pos.y > 0) {
            let scaleY = 1 + pos.y.toFixed(2) / h;
            this.$refs.songListHeader.translateY = (-pos.y - h) / 2;
            this.$refs.songListHeader.scaleY = scaleY;
          } else {
            this.$refs.songListHeader.translateY = pos.y - h / 2;
          }
          if (pos.y < -100) {
            this.$refs.btnBack.translateY = pos.y + 100;
          } else {
            this.$refs.btnBack.translateY = 0;
          }
        });
      },
      _resetScroll () {
        if (this.listScroll) {
          this.listScroll.refresh();
        } else {
          this._initScroll();
        }
      },
      goBack () {
        this.$router.go(-1);
      },
      playAudio (e, song) {
        if (!e._constructed) return;
        let songlist = [];
        this.songList.forEach((list) => {
          songlist.push(this.resolveSong(list));
        });
        this.$store.commit('setPlaySong', {id: song.data.songid, songlist: songlist});
      },
      resolveSong (song) {
        let songObj = {};
        songObj.name = song.data.songorig;
        songObj.id = song.data.songid;
        songObj.url = `http://ws.stream.qqmusic.qq.com/${song.data.songid}.m4a?fromtag=46`;
        songObj.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${song.data.albummid}.jpg?max_age=2592000`;
        songObj.singer = '';
        song.data.singer.forEach((singer) => {
          songObj.singer += singer.name + '/';
        });
        songObj.singer = songObj.singer.substring(0, songObj.singer.lastIndexOf('/'));
        return songObj;
      }
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .songlist
    position: relative
    width: 100%;
    height: 100%
    font-size: 0
    overflow: hidden
    .songlist-header
      position: absolute
      top: 0
      let: 0
      width: 100%
      padding-top: 100%
      font-size: 0
      transform-origin: center top
      transform-style: perspective-3d
      .header-title
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        .title-wrap
          p
            padding: 0 10px
            height: 50px
            font-size: 20px
            line-height: 50px
            overflow: hidden
      .header-bg
        position: absolute
        top: 0
        left: 0
        width: 100%
        z-index: -1
        img
          width: 100%
        .focus-gradient
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          padding-top: 60%
          background: -webkit-linear-gradient(top, transparent, currentColor 80%)
    .songlist-wrapper
      width: 100%
      height: 100%
      overflow: hidden
      .scroll-wrap
        width: 100%
        padding-top: 100%
      .list-song
        padding: 0 8px
        &.ct-1
          border-1px('top', rgba(0, 0, 0, .25))
        &.ct-2
          border-1px('top', rgba(255, 255, 255, .45))
        .song-item
          display: flex
          .song-no
            flex: 0 0 30px
            padding-right: 10px
            font-size: 18px
            display: flex
            justify-content: center
            align-items: center
          .song-info
            flex: 1
            padding: 5px 0
            &.ct-1
              border-1px('bottom', rgba(0, 0, 0, .25))
            &.ct-2
              border-1px('bottom', rgba(255, 255, 255, .45))
            overflow: hidden
            .song-title
              height: 22px
              line-height: 22px
              font-size: 14px
            .song-desc
              opacity: 0.5
              line-height: 20px
              font-size: 12px


</style>
