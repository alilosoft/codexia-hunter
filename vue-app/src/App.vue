<template>
  <div id="app">
    <div v-show="notifications.length > 0" class="notificationsPan">
      <div
        id="notif"
        v-for="(notif, index) in notifications"
        :key="index"
        :style="notif.style"
        class="notification"
      >
        {{ notif.message }}
      </div>
    </div>
    <Main msg="Welcome to Codexia Hunter" />
  </div>
</template>

<script>
  import Main from './components/Main.vue'
  //import firebase from '../data/firebase'
  export default {
    user: 'App',
    components: {
      Main
    },
    data() {
      return {
        notifStyle: {
          INFO: { backgroundColor: '#b8e49d' },
          WARN: { backgroundColor: '#ff9800' },
          ERROR: { backgroundColor: 'crimson', color: 'white' }
        },
        notifications: [] // {message: "", style: css}
      }
    },
    methods: {
      showNotification(msg, type) {
        // type: INFO, WARN, ERROR
        const notif = {
          message: msg,
          style: type
        }
        this.notifications.push(notif)
        setTimeout(() => {
          const index = this.notifications.indexOf(notif)
          this.notifications.splice(index, 1)
        }, 10000)
      },
      showInfo(msg) {
        console.info(msg)
        this.showNotification(msg, this.notifStyle.INFO)
      },
      showWarn(msg) {
        console.warn(msg)
        this.showNotification(msg, this.notifStyle.WARN)
      },
      showError(msg) {
        console.error(msg)
        this.showNotification(msg, this.notifStyle.ERROR)
      }
    }
  }
</script>

<style>
  #app {
    /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  div.notificationsPan {
    position: sticky;
    top: 2rem;
  }
  div.notification {
    font-size: medium;
    padding: 3px;
  }
</style>
