<template>
  <div id="container">
    <a v-if="!disabled" class="control" @click="handleClick">
      <font-awesome-icon class="play-icon" v-if="paused" icon="play"/>
      <font-awesome-icon v-else icon="pause"/>
    </a>
    <a v-else class="control-disabled">
      <font-awesome-icon class="play-icon" v-if="paused" icon="play"/>
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
  #container {
    margin-top: 0.5em;
    padding: 0.3rem 0;
    height: 1.75rem;
    width: 100%;
    background: #282828 repeat scroll 0% 0%;
    position: fixed;
    bottom: 0pt;
    left: 0pt;
  }

  .control svg, .control-disabled svg {
    height: 0.7em;
    width: 0.7em;
    border: 1px solid #b3b3b3;
    padding: 0.5em;
    border-radius: 50%;
  }

  .control-disabled svg {
    color: #535353;
    border: 1px solid #535353;
  }

  .control {
    color: #b3b3b3;
  }

  .control:hover {
    color: #ffffff;
  }

  .control svg:hover {
    border: 1px solid #ffffff;
  }

  .control:active {
    color: #535353;
  }

  .control svg:active {
    border: 1px solid #535353;
  }

  .play-icon {
    padding-left: 0.6em;
    padding-right: 0.4em;
  }
</style>
