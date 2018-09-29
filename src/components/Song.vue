<template>
    <div v-on:dblclick="doubleClick">
      {{artist ? artist + ' - ' : ''}} {{title}}
    </div>
</template>

<script>
export default {
  name: 'Song',
  props: {
    title: {
      type: String
    },
    artist: {
      type: String
    },
    link: {
      type: String
    }
  },
  methods: {
    doubleClick () {
      console.log('Double Click')
    }
  }
}
</script>

<style scoped>
  div {
    color: white;
    background: #181818;
    margin: 0;
    border-bottom: 1px solid #282828;
  }
</style>
