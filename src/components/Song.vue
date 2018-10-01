<template>
    <div v-on:dblclick="songClicked(link)" @click.ctrl="addSongToQueue(title, artist, link)">
      {{artist ? artist + ' - ' : ''}} {{title}}
      <span v-if="isAdmin">
        <span class="edit" @click="editSong(id)">Edit</span>
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
    songClicked: Function,
    addSongToQueue: Function,
    isAdmin: {
      type: Boolean,
      default: false
    },
    editSong: Function,
    deleteSong: Function
  }
}
</script>

<style scoped>
  div {
    position: relative;
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
