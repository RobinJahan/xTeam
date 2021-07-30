<template>
    <img alt="Xstate logo" src="./assets/xState.png" width="80"/>
    <h2>Xteam</h2>
    <Form/>
    <XForm/>
</template>

<script>
import Form from './components/Form.vue'
import XForm from './components/XForm.vue'

export default {
    name: 'App',
    components: {
        Form, XForm
    }
}
</script>
