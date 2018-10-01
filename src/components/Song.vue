<template>
    <div v-on:dblclick="songClicked(link)" @click.ctrl="addToQueue(title, artist, link)">
      {{artist ? artist + ' - ' : ''}} {{title}}
    </div>
</template>

<script>
export default {
  name: 'Song',
  props: {
    title: String,
    artist: String,
    link: String,
    songClicked: Function
  },
  methods: {
    addToQueue: (key, title, artist, link) => {
      console.log(`Add to queue ${title} ${artist} ${link}`)
    }
  }
}
</script>

<style scoped>
  div {
    color: white;
    background: #181818;
    margin: 0;
    padding: 1em 0;
    border-bottom: 1px solid #282828;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
  }

  div:hover {
    background: #333333;
  }
</style>
