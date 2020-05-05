<template>
  <div id="app">
    <Main msg="Welcome" />
    <div v-show="notifications.length > 0" class="notificationsPan">
      <div
        v-for="(notif, index) in notifications"
        :key="index"
        :style="notif.style"
        class="notification"
      >
        {{ notif.message }}
      </div>
    </div>
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
        notifType: {
          INFO: { backgroundColor: '#64dd17' },
          WARN: { backgroundColor: '#ff9800' },
          ERROR: { backgroundColor: 'crimson', color: 'white' }
        },
        notifications: [] // {message: "", color: color}
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
      }
    }
  }
</script>

<style src="./style.css"></style>
