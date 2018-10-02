<template>
  <div id="formBG" @click="hideForm">
    <div id="formContainer">
      <p v-if="edit">Edit A Song</p>
      <p v-else>Add A New Song</p>
      <form v-on:submit="submitForm" @click="(e) => e.stopPropagation()">
        <input v-model="title" type="text" placeholder="Title" :disabled="originalTitle">
        <input v-model="originalTitle" type="checkbox" value="Original Title">
        <input v-model="artist" type="text" placeholder="Artist">
        <input v-model="link" type="text" placeholder="Link">
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import getYoutubeTitle from 'get-youtube-title'
import SongService from '@/services/SongService'
export default {
  name: 'SongForm',
  data () {
    return {
      title: '',
      artist: '',
      link: '',
      originalTitle: false
    }
  },
  props: {
    toggleShowAddForm: {
      type: Function,
      default: () => {
        return null
      }
    },
    hideForm: Function,
    getSongId: Function,
    edit: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  },
  methods: {
    submitForm (e) {
      e.preventDefault()
      let videoId = this.getSongId(this.link)
      console.log(typeof videoId)
      if (videoId === null) {
        console.log('This is an invalid video id')
      } else {
        getYoutubeTitle(videoId, (err, title) => {
          if (err) {
            console.log('Video not found', err)
          } else {
            // Video exists, complete action
            let newTitle = this.originalTitle ? title : this.title
            if (newTitle.length < 1) { console.log('The song must have a title'); return }
            if (this.edit) {
              SongService.editSong({id: this.editData.id, title: newTitle, artist: this.artist, link: this.link}).then(resp => {
                this.hideForm(resp)
              }).catch(err => {
                console.log(err)
                this.hideForm()
              })
            } else {
              SongService.addSong({title: newTitle, artist: this.artist, link: this.link}).then(resp => {
                this.hideForm(resp)
              }).catch(err => {
                console.log(err)
                this.hideForm()
              })
            }
          }
        })
      }
    }
  },
  created () {
    if (this.editData) {
      this.title = this.editData.title
      this.artist = this.editData.artist
      this.link = this.editData.link
    }
  }
}
</script>

<style scoped>
  #formBG {
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  #formContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 2em auto 0 auto;
    background: #181818;
  }
</style>
