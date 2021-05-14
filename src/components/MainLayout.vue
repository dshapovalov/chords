<template>
  <div class="mainLayout">
    <List></List>
    <Lyrics></Lyrics>
  </div>
</template>
<script>
    import List from './List/List.vue'
    import Lyrics from './Lyrics/Lyrics.vue'

    export default {
        name: 'MainLayout',
        components: {
            List,
            Lyrics
        }
    }
</script>
<style>
.mainLayout {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  min-height: 100vh;
}
</style>