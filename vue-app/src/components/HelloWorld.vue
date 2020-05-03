<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h1>{{ user }}</h1>
        <button v-on:click="sayHi">Say Hi</button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                user: 'Alilo'
            }
        },
        methods: {
            sayHi() {
                alert('hi ' + this.user)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
