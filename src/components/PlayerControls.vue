<template>
  <div id="container">
    <a v-if="!disabled" id="control" @click="handleClick">
      <font-awesome-icon id="play-icon" v-if="paused" icon="play"/>
      <font-awesome-icon v-else icon="pause"/>
    </a>
    <a v-else id="control-disabled">
      <font-awesome-icon id="play-icon" v-if="paused" icon="play"/>
      <font-awesome-icon v-else icon="pause"/>
    </a>

  </div>
</template>

<script>
export default {
  name: 'PlayerControls',
  props: {
    playVideo: Function,
    pauseVideo: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    sendUpdates: Function,
    paused: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick () {
      if (this.paused) {
        this.playVideo()
        this.sendUpdates(1)
      } else {
        this.pauseVideo()
        this.sendUpdates(2)
      }
    }
  }
}
</script>

<style scoped>
  * {
    box-sizing: content-box;
  }

  #container {
    z-index: 2;
    margin-top: 0.5em;
    padding: 0.3rem 0;
    height: 1.75rem;
    width: 100%;
    background: #282828 repeat scroll 0% 0%;
    position: fixed;
    bottom: 0pt;
    left: 0pt;
  }

  #control svg, #control-disabled svg {
    height: 0.7rem;
    width: 0.7rem;
    border: 1px solid #b3b3b3;
    padding: 0.5rem;
    border-radius: 50%;
  }

  #control-disabled svg {
    color: #535353;
    border: 1px solid #535353;
  }

  #control {
    color: #b3b3b3;
  }

  #control:hover {
    color: #ffffff;
  }

  #control svg:hover {
    border: 1px solid #ffffff;
  }

  #control:active {
    color: #535353;
  }

  #control svg:active {
    border: 1px solid #535353;
  }

  #play-icon {
    padding-left: 0.6rem;
    padding-right: 0.4rem;
  }
</style>
