<template>
  <div id="messenger-container">
    <p id="message-container-title">Live Messages</p>
    <div id="messages">
      <!--eslint-disable-next-line-->
      <div class="message" v-for="message in messages">
        <p><span class="name">{{message.author}}</span>: {{message.message}}</p>
      </div>
    </div>
    <div id="message-form">
      <input id="message-input" v-model="clientMessage" @keyup.enter="attemptSend" type="text">
      <a id="icon-container" @click="attemptSend">
        <font-awesome-icon id="message-send" icon="arrow-right"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messenger',
  data () {
    return {
      clientMessage: '',
      messages: []
    }
  },
  props: {
    sendMessage: Function
  },
  methods: {
    attemptSend (e) {
      e.preventDefault()
      if (this.clientMessage) {
        console.log('Sending ', this.clientMessage)
        this.sendMessage(this.clientMessage)
        this.addMessage({author: 'You', message: this.clientMessage})
        this.clientMessage = ''
      }
    },
    addMessage (message) {
      this.messages.push(message)
    }
  }
}
</script>

<style scoped>
  #messenger-container {
    color: white;
    z-index: 1;
    position: fixed;
    top: 0;
    height: calc(100vh - 2.4rem);
    overflow: auto;
    width: 20%;
    background: #121212;
    right: 0;
  }

  #message-container-title {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 0;
    font-weight: 500;
    margin: 0;
    /*position: fixed;*/
    /*top: 0;*/
  }

  .message {
    font-size: 0.8rem;
    background: #181818;
    padding: 0.4em 0;
    border-bottom: 1px solid #282828;
    /*box-sizing: content-box;*/
  }

  .message p {
    text-align: left;
    margin: 0 1rem;
  }

  .name {
    font-weight: bold;
  }

  .message:hover {
    background: #333333;
  }

  #message-form {
    position: fixed;
    bottom: 2.4rem;
    display: flex;
    width: inherit;
    background: #007BC4;
  }

  #icon-container {
    margin: auto;
  }

  #message-input {
    width: calc(100% - 1.4rem - 10px);
    font-size: 0.8rem;
  }

  #message-send {
    height: 1rem;
    /*width: 1rem;*/
    width: 1.4rem;
  }

  #message-send:hover {
    opacity: 0.7;
  }

  #messages {
    margin-bottom: 1.5rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
