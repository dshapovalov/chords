export default {
  beforeCreate() {
    this.$store.dispatch('fetchAgenda');
  },
  data() {
    return {
      collapsed: true
    }
  },
  computed: {
    songs() {
      return this.$store.state.songs
    },
    agenda() {
      return this.$store.state.agenda
    },
    activeSong() {
      return this.$store.state.song
    }
  },
  methods: {
    openSong(song) {
      this.$store.commit('openSong', song)
      this.toogleList()
    },
    toogleList() {
      this.collapsed = !this.collapsed
    }
  }
}
