<template>
  <div class="recom" ref="recomScroll">
    <div class="recom-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in slider" key="index">
          <router-link to="/home/search">
            <img :src="slide.picUrl" alt="">
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="radioList">
        <h2 class="title">电台</h2>
        <ul class="list-items clearfix">
          <li v-for="(radio,index) in radioList">
            <router-link :to="'/songlist/'+(10+index)">
              <div class="list-media">
                <img v-lazy="radio.picUrl" alt="">
                <span class="play-icon"></span>
              </div>
              <div class="list-info">
                <h3 class="space">{{radio.Ftitle}}</h3>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="songList">
        <h2 class="title">热门歌曲</h2>
        <ul class="list-items clearfix">
          <li v-for="(song, index) in songList">
            <router-link :to="'/songlist/'+(20+index)">
              <div class="list-media">
                <img v-lazy="song.picUrl" alt="">
                <span class="listen-count">
                  <i class="listen-icon"></i>
                  {{song.accessnum | filterNum}}
                </span>
                <span class="play-icon"></span>
              </div>
              <div class="list-info">
                <h3 class="space">{{song.songListDesc}}</h3>
                <p class="space author">{{song.songListAuthor}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        slider: '',
        radioList: '',
        songList: '',
        swiperOption: {
          autoplay: 3000,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          loop: true
        }
      };
    },
    created () {
      this.$http.get('/api/recom').then((res) => {
        if (res.data.code === 0) {
          this.slider = res.data.data.slider;
          this.radioList = res.data.data.radioList;
          this.songList = res.data.data.songList;
          this.$nextTick(() => {
            if (this.recomScroll) {
              this.recomScroll.refresh();
            } else {
              this._initScorll();
            }
          });
        }
      });
    },
    methods: {
      _initScorll () {
        this.recomScroll = new BScroll(this.$refs.recomScroll, {
          probeType: 3,
          click: true
        });
      }
    },
    filters: {
      filterNum (val) {
        return (val / 10000).toFixed(1) + '万';
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .recom
    position: absolute
    top: 84px
    left: 0
    bottom: 0
    width: 100%
    background: #f4f4f4
    overflow: hidden
    .recom-wrapper
      padding-bottom: 20px
      .swiper-container
        min-height: 130px
        b-img('loaderror.png', #E7E7E7, center)
        .swiper-slide > a
          display: block
          width: 100%
          & > img
            width: 100%
        .swiper-pagination-bullet-active
          background: #fff
      .radioList, & .songList
        margin-top: 10px
        margin-left: 8px
      .title
        height: 30px
        line-height: 30px
        font-size: 16px
      .list-items li
        float: left
        width: 50%
        padding-right: 8px
        margin-top: 8px
        box-sizing: border-box
        & > a
          display: block
          background: #fff
          .list-media
            position: relative
            width: 100%;
            padding-top: 100%
            & > img
              position: absolute
              top: 0
              left: 0
              width: 100%
            .play-icon
              position: absolute
              right: 5px
              bottom: 5px
              width: 25px
              height: 25px
              b-img('list_sprite.png')
              background-size: 100%
            .listen-count
              position: absolute
              bottom: 5px
              left: 5px
              font-size: 10px
              font-weight: 600
              color: #fff
              .listen-icon
                display: inline-block
                width: 10px
                height: 10px
                b-img('list_sprite.png')
                background-position: 0 -50px
                background-size: 24px 60px
          .list-info
            width: 100%
            height: 41px
            padding: 7px 5px
            font-size: 14px
            color: #000
            box-sizing: border-box
            .author
              font-size: 12px
              line-height: 18px

</style>
