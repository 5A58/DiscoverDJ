<template>
    <div>
      <div class="bg"></div>
      <div id="header-bg">
        <div class="header">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Sign Up</router-link>
        </div>
      </div>
      <div id="content">
        <h1 id="title">Discover DJ</h1>
        <p id="description">Listen to music privately or DJ for your friends</p>
        <router-link to="/music">Get Started</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
  .bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    /*background-image: url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da90b7e324f7b8884b268bb4aaf62fcb&auto=format&fit=crop&w=750&q=80");*/
    background-image: url("https://images.unsplash.com/photo-1537215685160-2496ed0c0aed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8f55bdb36e74997c99967a3c46d05187&auto=format&fit=crop&w=750&q=80");
    min-width: 100%;
    width: auto;
    min-height: 100%;
    -webkit-filter: blur(2px);
    -o-filter: blur(2px);
    filter: blur(2px);
    z-index: -100;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    transform: scale(1.1);
  }

  #header-bg {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2.75em;
  }

  .header {
    position: absolute;
    top: 0.5em;
    right: 2em;
  }

  .header a {
    color: white;
    margin-left: 1em;
    font-weight: 500;
    opacity: 0.7;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .header a:hover {
    color: white;
    text-decoration: none;
    opacity: 1;
  }

  #title {
    position: absolute;
    top: 20%;
    width: 100%;
    margin: 0;
    font-size: 5rem;
    font-family: 'Cormorant', serif;
  }

  #description {
    position: absolute;
    top: calc(20% + 3rem + 3rem);
    width: 100%;
    margin: 0;
    font-size: 1.5rem;
  }

  #content a {
    color: white;
    top: calc(20% + 3rem + 2rem + 6rem);
    width: 13rem;
    padding: 0.4rem 0.3rem;
    font-size: 1.5rem;
    text-decoration: none;
    border: 1px solid white;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #content a:hover {
    color: white;
    background: #fe9001;
    border: 1px solid white;
    transition: all 0.3s linear;
  }
</style>
