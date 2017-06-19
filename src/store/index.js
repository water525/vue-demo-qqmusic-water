/**
 * Created by DongGe on 2017/6/16.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showDown: false,
    showAudio: false,
    showPage: false,
    audio: '',
    songList: [],
    playSong: {
      url: '',
      imgUrl: '',
      name: '',
      singer: '',
      id: ''
    },
    currentTime: 0,
    totalTime: 0,
    playing: false
  },
  getters: {
    cleProgress (state) {
      let newt = state.currentTime;
      let totalt = state.totalTime;
      if (!totalt) {
        return 0;
      }
      let progress = Math.round(newt / totalt * 100);
      return progress > 100 ? 100 : progress;
    }
  },
  mutations: {
    setAudio (state, audio) {
      state.audio = audio;
    },
    setPlaySong (state, obj) {
      state.showDown = true;
      state.showAudio = true;
      state.showPage = true;
      state.songList = obj.songlist;
      for (let i = 0; i < obj.songlist.length; i++) {
        if (obj.songlist[i].id === obj.id) {
          state.playSong = obj.songlist[i];
          break;
        }
      }
      state.currentTime = 0;
      state.totalTime = 0;
      state.playing = true;
      setTimeout(() => {
        state.audio.play();
      }, 100);
    },
    setCurrentTime (state, time) {
      state.currentTime = time;
    },
    setAudioTime (state, time) {
      state.audio.currentTime = time;
    },
    setTotalTime (state) {
      state.totalTime = state.audio.duration;
    },
    setShowPage (state) {
      state.showPage = !state.showPage;
    },
    setShowAudio (state) {
      state.showAudio = !state.showAudio;
    },
    playSong (state) {
      state.playing = true;
      state.audio.play();
    },
    pauseSong (state) {
      state.playing = false;
      state.audio.pause();
    },
    preSong (state) {
      let index = state.songList.indexOf(state.playSong);
      index = --index < 0 ? state.songList.length - 1 : index;
      state.playSong = state.songList[index];
      state.currentTime = 0;
      state.totalTime = 0;
      state.playing = true;
      setTimeout(() => {
        state.audio.play();
      }, 100);
    },
    nextSong (state) {
      let index = state.songList.indexOf(state.playSong);
      index = ++index >= state.songList.length ? 0 : index;
      state.playSong = state.songList[index];
      state.currentTime = 0;
      state.totalTime = 0;
      state.playing = true;
      setTimeout(() => {
        state.audio.play();
      }, 100);
    },
    playCSong (state, id) {
      for (let i = 0; i < state.songList.length; i++) {
        if (state.songList[i].id === id) {
          state.playSong = state.songList[i];
          break;
        }
      }
      state.currentTime = 0;
      state.totalTime = 0;
      state.playing = true;
      setTimeout(() => {
        state.audio.play();
      }, 100);
    }
  }
});
