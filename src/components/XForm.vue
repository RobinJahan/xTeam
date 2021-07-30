<template>
    <h3 v-show="['idle', 'form', 'submitting'].some(state.matches)">Registration with Xstate</h3>
    <h3 v-show="['success', 'end'].some(state.matches)">Thank you !</h3>

    <div class="divMessage success" v-show="state.matches('success')">
        Successful registration ! <b>{{state.context.name}}</b> is on the team <b>{{state.context.team}}</b> !!!
    </div>
    <div class="divMessage error" v-show="state.matches('form.invalid')">
        Ho no ! there is an error, please try again !!!
    </div>

    <div class="divForm" v-show="state.matches('form')">

        <div class="divInput">
            <label for="xname">Name : </label>
            <input type="text" class="form-control" id="xname" @input="(e) => machine.send({type: 'INPUT_NAME', value: e.target.value})" v-model="machine.state.context.name">
        </div>

        <div class="divInput">
            <label for="xemail" class="tk-label">email : </label>
            <input type="text" class="form-control" id="xemail" @input="(e) => machine.send({type: 'INPUT_MAIL', value: e.target.value})" v-model="machine.state.context.mail">
        </div>

        <div class="divInput">
            <label >Team : </label>
            <div>
                <input type="radio" id="xCat" name="xteam" value="Cat"
                       checked @input="(e) => machine.send({type: 'INPUT_TEAM', value: e.target.value})">
                <label for="xCat">Cat</label>
            </div>

            <div>
                <input type="radio" id="xDog" name="xteam" value="Dog" @input="(e) => machine.send({type: 'INPUT_TEAM', value: e.target.value})">
                <label for="xDog">Dog</label>
            </div>
        </div>
    </div>


    <div class="divBtn">
        <div v-show="state.matches('idle')" class="btn purple" @click="machine.send('SHOW_FORM')">start</div>
        <div v-show="state.matches('form')" class="btn grey" @click="machine.send('BACK')" >back</div>
        <div v-show="state.matches('form')" class="btn purple" @click="machine.send('SUBMIT')" >submit</div>
        <div v-show="state.matches('success')" class="btn purple" @click="machine.send('RESTART')" >Again</div>
        <div
            v-show="state.matches('success')"
            class="btn grey"
            @click="machine.send('FINISH')" >Finish
        </div>
    </div>

    <div class="loader" v-if="state.matches('submitting')">
        <img class="loadingPic" src="../assets/xState.png" alt="loader">
    </div>

    <div class="code">
        state: {{ machine.state.value }},
        <br>
        context: {{ machine.state.context }}
    </div>

</template>

<script>

import {formMachine} from "../machines/FormMachine";
import {interpret} from "xstate";

export default {
    name: 'XForm',
    data() {
        return {
            machine: interpret(formMachine),
            state: formMachine.initialState,
        };
    },
    created () {
        this.machine
            .onTransition(state => this.state = state)
            .start()
    },
    destroyed() {
        this.machine.stop()
    },
    methods:{
    // plus du tout de méthode !
    }
}
</script>

<style>
.divForm{
    width: 40%;
    margin-left: 30%;
    display: flex;
    flex-direction: column;
}
.divInput{
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;
}
.divBtn{
    display: flex;
    margin-top: 25px;
    width: 40%;
    margin-left: 30%;
    justify-content: space-around;
}
.divMessage{
    border-radius: 4px;
    width: 60%;
    margin-left: 20%;
    padding: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.success{
    background-color: #cbeccb;
    color: #2c3e50;

}
.error{
    background-color: #eccbce;
    color: #372c50;
}
.btn{
    padding: 10px;
    border-radius: 4px;
}

.purple{
    background-color: #6944a7;
    color: azure;
}
.purple:hover{
    background-color: #543686;
    color: azure;
}

.grey{
    background-color: #716b80;
    color: azure;
}
.grey:hover{
    background-color: #4a4653;
    color: azure;
}
.code{
    text-align: left;
    font-size: 12px;
}
.loader{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2c3e50;
    opacity: 0.8;
}

.loadingPic {
    margin-top: 30%;
    width: 50px;
    -webkit-animation: rotation 2s infinite linear;
}

@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(359deg);
    }
}

</style>
