import { changeKey, transpose, setKey } from '../../api'

export default {
  data: function() {
    return {
      currentKey: this.$store.state.song.key,
      lyrics: this.$store.state.song.lyrics,
      pureLyrics: this.$store.state.song.pureLyrics,
      showOrder: false
    }
  },
  computed: {
    song() {
      return this.$store.state.song
    },
    agendaSuccessMessage() {
      return this.$store.state.agendaSuccessMessage
    },
  },
  watch: {
    song: function(song) {
      this.currentKey = song.key
      this.lyrics = song.lyrics
      this.pureLyrics = song.pureLyrics
    },
  },
  methods: {
    decreaseKey() {
      this.currentKey = changeKey(this.currentKey)
      this.lyrics = transpose(this.lyrics)
    },
    increaseKey() {
      this.currentKey = changeKey(this.currentKey, true)
      this.lyrics = transpose(this.lyrics, true)
    },
    switchKey(targetKey) {
      const { key, lyrics } = setKey(targetKey, this.currentKey, this.lyrics)
      this.currentKey = key
      this.lyrics = lyrics
    },
    toogleShowOrder() {
      this.showOrder = !this.showOrder
    },
    addToAgenda({ target }) {
      const order = Number.parseInt(target.innerText)
      const id = Number.parseInt(this.song.id)
      this.$store.dispatch('addToAgenda', { order, id });
      this.showOrder = false
    }
  }
}