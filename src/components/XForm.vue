<template>
  <div class="divFlex">
    <div class="divLeft">
      <h3 v-show="['idle', 'form', 'submitting'].some(state.matches)">
        Registration with Xstate
      </h3>
      <h3 v-show="['success', 'end'].some(state.matches)">Thank you !</h3>

      <div class="divMessage success" v-show="state.matches('success')">
        Successful registration ! <b>{{ state.context.name }}</b> is on the team
        <b>{{ state.context.team }}</b> !!!
      </div>
      <div class="divMessage error" v-show="state.matches('form.invalid')">
        Ho no ! there is an error, please try again !!!
      </div>

      <div class="divForm" v-show="state.matches('form')">
        <div class="divInput">
          <label for="xname">Name : </label>
          <input
            type="text"
            class="form-control"
            id="xname"
            @input="
              (e) => machine.send({ type: 'INPUT_NAME', value: e.target.value })
            "
            v-model="machine.state.context.name"
          />
        </div>

        <div class="divInput">
          <label for="xemail" class="tk-label">email : </label>
          <input
            type="text"
            class="form-control"
            id="xemail"
            @input="
              (e) => machine.send({ type: 'INPUT_MAIL', value: e.target.value })
            "
            v-model="machine.state.context.mail"
          />
        </div>

        <div class="divInput">
          <label>Team : </label>
          <div>
            <input
              type="radio"
              id="xCat"
              name="xteam"
              value="Cat"
              checked
              @input="
                (e) =>
                  machine.send({ type: 'INPUT_TEAM', value: e.target.value })
              "
            />
            <label for="xCat">Cat</label>
          </div>

          <div>
            <input
              type="radio"
              id="xDog"
              name="xteam"
              value="Dog"
              @input="
                (e) =>
                  machine.send({ type: 'INPUT_TEAM', value: e.target.value })
              "
            />
            <label for="xDog">Dog</label>
          </div>
        </div>
      </div>

      <div class="divBtn">
        <div
          v-show="state.matches('idle')"
          class="btn purple"
          @click="machine.send('SHOW_FORM')"
        >
          start
        </div>
        <div
          v-show="state.matches('form')"
          class="btn grey"
          @click="machine.send('BACK')"
        >
          back
        </div>
        <div
          v-show="state.matches('form')"
          class="btn purple"
          @click="machine.send('SUBMIT')"
        >
          submit
        </div>
        <div
          v-show="state.matches('success')"
          class="btn purple"
          @click="machine.send('RESTART')"
        >
          Again
        </div>
        <div
          v-show="state.matches('success')"
          class="btn grey"
          @click="machine.send('FINISH')"
        >
          Finish
        </div>
      </div>

      <div class="loader" v-if="state.matches('submitting')">
        <img class="loadingPic" src="../assets/xState.png" alt="loader" />
      </div>
    </div>

    <div class="divRight">
        <h3>Context</h3>
      <div class="code">
        state: {{ machine.state.value }},
        <br />
        context: {{ machine.state.context }}
      </div>
    </div>
  </div>
</template>

<script>
import { formMachine } from "../machines/FormMachine";
import { interpret } from "xstate";

export default {
  name: "XForm",
  data() {
    return {
      machine: interpret(formMachine),
      state: formMachine.initialState,
    };
  },
  created() {
    this.machine.onTransition((state) => (this.state = state)).start();
  },
  destroyed() {
    this.machine.stop();
  },
  methods: {
    // plus du tout de méthode !
  },
};
</script>

<style>
</style>
