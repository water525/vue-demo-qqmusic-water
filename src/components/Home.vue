<template>
  <div class="index-wrapper">
    <div class="header">
      <span class="logo">QQ音乐</span>
      <span class="btn-download-app">下载APP</span>
    </div>
    <div class="nav-bar">
      <router-link to="/home/recom">推存</router-link>
      <router-link to="/home/toplist">排行榜</router-link>
      <router-link to="/home/search">搜索</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../common/stylus/mixin.styl'
  .index-wrapper
    position: relative
    width: 100%
    height: 100%
    font-size: 0
    .header
      height: 44px
      background: #31c27c
      .logo
        float: left
        display: block
        width: 90px
        height: 25px
        margin: 9px 0 0 10px
        b-img('logo.png')
        background-size: 100%
      .btn-download-app
        float: right
        display: inline-block
        height: 28px
        line-height: 28px
        margin: 8px 10px 0 0
        padding: 0 12px
        font-size: 14px
        border-radius: 99px
        background: #149c5a
        color: #fff
    .nav-bar
      display: flex
      & > a
        flex: 1
        height: 40px
        line-height: 40px
        box-sizing: border-box
        text-align: center
        font-size: 16px
        color: rgba(0, 0, 0, .6);
        &.router-link-active
          color: #31c27c
          border-bottom: 2px solid #31c27c
</style>
