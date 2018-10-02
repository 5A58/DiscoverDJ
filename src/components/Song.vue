<template>
    <div v-on:dblclick="songClicked(link, title)" @click.ctrl="addSongToQueue(title, artist, link)" @click="renderAddForm">
      {{displayString}}
      <span v-if="isAdmin">
        <span class="edit" @click="editSong({id, title, artist, link})">Edit</span>
        <span class="delete" @click="deleteSong(id)">Delete</span>
      </span>
    </div>
</template>

<script>
export default {
  name: 'Song',
  props: {
    id: String,
    title: String,
    artist: String,
    link: String,
    songClicked: {
      type: Function,
      default: () => {
        return null
      }
    },
    addSongToQueue: {
      type: Function,
      default: () => {
        return null
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    renderAddForm: {
      type: Function,
      default: () => {
        return null
      }
    },
    editSong: Function,
    deleteSong: Function
  },
  computed: {
    displayString () {
      if (this.artist) {
        let a = this.artist.length > 25 ? this.artist.substring(0, 22) + '...' : this.artist
        let t = this.title.length > 25 ? this.title.substring(0, 22) + '...' : this.title
        return `${a} - ${t}`
      } else {
        return this.title.length > 50 ? this.title.substring(0, 47) + '...' : this.title
      }
    }
  }
}
</script>

<style scoped>
  div {
    position: relative;
    color: white;
    background: #181818;
    margin: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #282828;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
  }

  div:hover {
    background: #333333;
  }

  .edit, .delete {
    position: absolute;
    box-sizing: content-box;
    padding: 0.2rem;
    border-radius: 3px;
    height: 1.5rem;
    top: calc((1.5rem + 0.2rem) / 2);
  }

  .edit {
    right: calc(3rem + 0.5rem + 0.5rem + 0.2rem);
    width: 3rem;
  }

  .edit:hover {
    background: rgba(255, 165, 0, 1);
    transition: all 0.2s linear;
  }

  .delete {
    right: 0.5rem;
    width: 3rem;
  }

  .delete:hover {
    transition: all 0.3s linear;
    background: rgba(255, 0, 0, 1);
  }
</style>
