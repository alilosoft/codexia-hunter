<template>
    <div id="app">
        <HelloWorld msg="Welcome" />
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        user: 'App',
        components: {
            HelloWorld
        }
    }
</script>

<style src="./style.css"></style>
