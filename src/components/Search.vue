<template>
  <div class="search">
    <div class="search-top">
      <div class="search-bar">
        <span class="icon-search"></span>
        <input class="search-key" v-model="key" @keydown="searchKey" @focus="_focus" ref="search"
               @blur="_blur" type="text"
               placeholder="搜索歌曲、歌单、专辑">
        <span class="icon-delete" v-show="key!=''" @click="_clearKey">&times</span>
      </div>
    </div>
    <div class="result-wrap" ref="resultScroll">
      <div class="result-scroll">
        <div class="hot-key" v-show="hotShow">
          <h3 class="hot-title">热门搜索</h3>
          <ul class="hot-push">
            <li v-for="hot in hotList" @click="_setKey(hot.k)">{{hot.k}}</li>
          </ul>
        </div>
        <ul class="result-content" v-show="key!=''">
          <li class="result-item border-tb" v-for="song in keyList" @click="playSong($event, song)">
            <div class="song-img">
              <span class="icon-song"></span>
            </div>
            <div class="song-info">
              <p class="song-name space">{{song.songname}}</p>
              <p class="song-singer space">
                <span v-for="(singer, index) in song.singer">{{singer.name}} <span
                  v-if="index<song.singer.length-1">/</span></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        key: '',
        hotList: [],
        recordList: [],
        keyList: [],
        focus: false
      };
    },
    created () {
      this.$http('api/hotkey').then(res => {
        if (res.data.code === 0) {
          let datas = res.data.data.hotkey;
          while (this.hotList.length < 9) {
            let data = datas[Math.floor(Math.random() * datas.length)];
            this.hotList.push(data);
            datas.splice(datas.indexOf(data), 1);
            if (datas.length <= 0) {
              break;
            }
          }
          this.$nextTick(() => {
            this._resetScroll();
          });
        }
      });
    },
    computed: {
      hotShow () {
        return !this.focus && this.keyList.length <= 0;
      }
    },
    methods: {
      _initScroll () {
        this.resultScroll = new BScroll(this.$refs.resultScroll, {click: true, probeType: 3});
        this.resultScroll.on('beforeScrollStart', () => {
          this.$refs.search.blur();
        });
      },
      _resetScroll () {
        if (this.resultScroll) {
          this.resultScroll.refresh();
        } else {
          this._initScroll();
        }
      },
      _focus () {
        this.focus = true;
      },
      _blur () {
        this.focus = false;
      },
      _clearKey () {
        this.key = '';
        this.keyList = [];
        this.$nextTick(() => {
          this._resetScroll();
        });
      },
      _setKey (hot) {
        this.key = hot;
        this.searchKey();
      },
      searchKey () {
        if (this.searchTiem) {
          clearTimeout(this.searchTiem);
        }
        this.searchTiem = setTimeout(() => {
          this.$http.get('/api/search?key=' + this.key + '&num=3').then((res) => {
            if (res.data.code === 0) {
              this.keyList = res.data.data.song.list;
              this.$nextTick(() => {
                this._resetScroll();
              });
            }
          });
        }, 400);
      },
      playSong (e, song) {
        if (!e._constructed) return;
        let songlist = [];
        this.keyList.forEach((list) => {
          songlist.push(this.resolveSong(list));
        });
        this.$store.commit('setPlaySong', {id: song.songid, songlist: songlist});
      },
      resolveSong (song) {
        let songObj = {};
        songObj.name = song.songname;
        songObj.id = song.songid;
        songObj.url = `http://ws.stream.qqmusic.qq.com/${song.songid}.m4a?fromtag=46`;
        songObj.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${song.albummid}.jpg?max_age=2592000`;
        songObj.singer = '';
        song.singer.forEach((singer) => {
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
  .search
    position: absolute
    top: 84px
    left: 0
    bottom: 0
    width: 100%
    background: #f4f4f4
    overflow: hidden
    .search-top
      padding: 10px 0
      .search-bar
        display: flex
        position: relative
        margin: 0 auto
        width: 90%
        height: 36px
        background: #fff
        border-radius: 4px
        overflow: hidden
        .icon-search
          flex: 0 0 40px
          height: 36px
          b-img('search.png', center)
          background-size: auto 50%
        .search-key
          flex: 1
          height: 36px
          line-height: 34px
          color: rgba(0, 0, 0, .3)
          font-size: 14px
          border: none
          outline: none
        .icon-delete
          position: absolute
          top: 8px
          right: 9px
          width: 20px
          height: 20px
          line-height: 20px
          text-align: center
          color: #fff
          font-size: 16px
          border-radius: 50%
          background: rgba(0, 0, 0, .3)
    .result-wrap
      position: absolute
      top: 56px
      bottom: 0
      left: 0
      width: 100%
      overflow: hidden
      background: #fff
      .hot-key
        padding: 5px 10px
        .hot-title
          line-height: 30px
          font-size: 16px
          color: #000
        .hot-push
          & li
            display: inline-block
            font-size: 16px
            margin: 0 10px 10px 0
            padding: 8px 14px
            border: 1px solid rgba(0, 0, 0, .6)
            border-radius: 16px

      .result-content
        .result-item
          display: flex
          border-1px('top', #e5e5e5)
          .song-img
            flex: 0 0 55px
            display: flex
            justify-content: center
            align-items: center
            .icon-song
              display: block
              width: 22px
              height: 20px
              b-img('song.png')
              background-size: 22px auto
          .song-info
            flex: 1
            overflow: hidden
            .song-name
              margin: 10px 0 2px 0
              line-height: 18px
              font-size: 16px
              color: #000
            .song-singer
              margin-bottom: 10px
              line-height: 18px
              font-size: 8px
              color: #808080
</style>
