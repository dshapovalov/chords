import axios from 'axios'

import { resolveSongs } from '../api'
import { AGENDA } from '../utils/constants'

const store = {
  state() {
    return {
      song: {},
      songs: [],
      agenda: [],
      agendaSuccessMessage: null
    }
  },
  mutations: {
    openSong(state, song) {
      state.song = song
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    setAgenda(state, agenda) {
      const songsToday = [];
      agenda.forEach(({ order, id }) => {
        songsToday[order-1] = state.songs.find(song => song.id === id)
      })
      state.agenda = songsToday
    },
    setMessage(state, { type, message }) {
      state[`${type}SuccessMessage`] = message
      setTimeout(() => state[`${type}SuccessMessage`] = null, 3000);
    },
  },
  getters: {
    getSongs: state => {
      return state.songs
    }
  },
  actions: {
    fetchSongs: async (context) => {
      const response = await axios.get('http://a.luminus.kiev.ua/db/getSongs.php')
      const songs = resolveSongs(response.data)

      if (response.status === 200) {
        context.commit('setSongs', songs)
      }
    },
    fetchAgenda: async (context) => {
      await context.dispatch('fetchSongs')
      const response = await axios.get('http://a.luminus.kiev.ua/db/getAgenda.php')
      const agenda = response.data

      if (response.status === 200) {
        const firstSongId = agenda.find(song => song.order === "1").id
        const currentSong = context.state.songs.find(song => song.id === firstSongId)
        context.commit('setAgenda', agenda)
        context.commit('openSong', currentSong)
      }
    },
    addToAgenda: async (context, { id, order }) => {
      const data = new FormData();
      data.append('id', id);
      data.append('order', order);
      const response = await axios.post('http://a.luminus.kiev.ua/db/setAgenda.php', data)

      if (response.status === 200) {
        context.dispatch('fetchAgenda');
        const message = `Песня успешно добавлена в программу под номером: ${order}`;
        context.commit('setMessage', { type: AGENDA, message })
      } else {
        const message = `Не удалось добавиь песню в программу`;
        context.commit('setMessage', { type: AGENDA, message })
      }
    }
  }
}

export default store
