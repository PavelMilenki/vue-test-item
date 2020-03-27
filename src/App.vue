<template>
    <div id="app">
        <Home/>
    </div>
</template>

<style lang="scss">
    @import '~materialize-css/dist/css/materialize.min.css';

    #app {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }

    .main {
        display: flex;
        flex-direction: column;
    }

    .formData {
        display: flex;
        justify-content: space-around;
        width: 800px
    }

    .textOut {
        font-size: 20px;
    }

    .helper-text.invalid {
        color: #f44336
    }

    .error {
        font-size: 20px;
        font-weight: bold;
        color: red;
        max-width: 100%;
    }
</style>
<script>
    import Home from "./views/Home";

    export default {
        components: {Home}
    }
</script>
