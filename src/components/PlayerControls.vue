<template>
  <div id="container">
    <a class="control" @click="playVideo"><font-awesome-icon icon="play"/></a>
    <a class="control" @click="pauseVideo"><font-awesome-icon icon="pause"/></a>
    <a class="control" @click="stopVideo"><font-awesome-icon icon="stop"/></a>
  </div>
</template>

<script>
export default {
  name: 'PlayerControls',
  props: {
    playVideo: Function,
    pauseVideo: Function,
    stopVideo: Function
  }
}
</script>

<style scoped>
  #container {
    display: flex;
    justify-content: space-between;
    width: 100px;
    margin: auto;
  }

  .control {
    color: gray;
    font-size: 1.5em;
  }

  .control:hover {
   color: black;
  }
  .control:active {
   color:purple;
  }
</style>
