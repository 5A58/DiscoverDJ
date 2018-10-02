<template>
  <div id="formBG" @click="hideForm">
    <div id="form-container">
      <form v-on:submit="submitForm" @click="(e) => e.stopPropagation()">
        <p v-if="edit" class="type">Edit A Song</p>
        <p v-else class="type">Add A New Song</p>
        <input v-model="title" class="text" type="text" placeholder="Title" :disabled="originalTitle">
        <div id="checkbox"><input v-model="originalTitle" type="checkbox">Use Video Title?</div>
        <input v-model="artist" class="text" type="text" placeholder="Artist">
        <input v-model="link" class="text" type="text" placeholder="Link">
        <p v-if="error" class="error-message">{{error}}</p>
        <button class="submit">Submit</button>
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
      error: '',
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
    getId: Function,
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
      let videoId = this.getId(this.link)
      console.log(typeof videoId)
      if (videoId === null) {
        this.error = 'This is an invalid video Id'
      } else {
        getYoutubeTitle(videoId, (err, title) => {
          if (err) {
            console.log(err)
            this.error = 'Video not found'
          } else {
            // Video exists, complete action
            let newTitle = this.originalTitle ? title : this.title
            if (newTitle.length < 1) { this.error = 'The song must have a title'; return }
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

  form {
    background: #282828;
    width: 50%;
    max-width: 400px;
    padding: 1.5rem 2rem;
    border-radius: 5px;
  }

  .text, .submit {
    width: 100%;
    max-width: 400px;
    border-radius: 3px;
  }

  .text {
    border: 2px solid #dce4ec;
    margin-bottom: 1rem;
    padding: 0.5rem 0 0.5rem 0.3rem;
    font-size: 1rem;
    color: #555;
  }

  .text:focus {
    outline:none;
    border-color: #025cc0;
    transition: all 0.2s linear;
  }

  .submit {
    border: none;
    background: #121212;
    color: white;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  }

  .submit:hover {
    background: #040404;
    transition: all 0.2s linear;
  }

  .submit:focus {
    outline:0;
  }

  #form-container {
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }

  .type {
    text-transform: uppercase;
    background: #121212;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-weight: bold;
    font-size: 1.5rem;
    margin: -1.5rem -2rem 1rem -2rem;
    padding: 0.3rem;
  }

  .error-message {
    color: red;
    font-weight: bold;
    text-align: left;
    margin: -1rem 0 0.75rem 0.25rem;
  }

  #form-container #checkbox {
    color: white;
    margin-top: -1rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    text-align: left;
    margin-left: 0.25rem;
  }

  #checkbox input {
    margin-right: 0.3rem;
    height: 0.8rem;
    width: 0.8rem;
    vertical-align: bottom;
    margin-bottom: 0.13rem;
  }
</style>
