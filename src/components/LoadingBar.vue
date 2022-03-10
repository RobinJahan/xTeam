<template>
  <div class="divFlex">
    <div class="divLeft">
      <h3>Exemple : loading bar with xstate</h3>
        <div class="loadingBar"><div class="progress" :style="'width:' + (state.context.count * 100 / 3 ) + '%;'"></div></div>

        <div v-show="state.matches('loading')">
            LOADING : {{state.context.messageError}}
        </div>

        <div v-show="state.matches('loaded')">
            LOADED !!! 
        </div>

      <div class="divBtn">
        <div
          class="btn purple"
          @click="machine.send('RESTART')"
        >
          reload
        </div>
      </div>
    </div>

    <div class="divRight">
      <h3>Context</h3>
      <div class="code">
        state : {{ state.value }}<br>
        data1 : {{state.context.data1}}<br>
        data2 : {{state.context.data2}}<br>
        data3 : {{state.context.data3}}<br>

        message : {{state.context.messageError}}<br>

      </div>
    </div>
  </div>
</template>

<script>
import { loadingMachine } from "../machines/LoadingMachine.js";
import { interpret } from "xstate";

export default {
  name: "XForm",
  data() {
    return {
      machine: interpret(loadingMachine),
      state: loadingMachine.initialState,
    };
  },
  created() {
    this.machine.onTransition((state) => (this.state = state)).start();
  },
  destroyed() {
    this.machine.stop();
  },
};
</script>

<style scoped>
.loadingBar{
    height: 30px;
    width: 60%;
    background-color: #a29ab6;
}
.progress{
    height: 28px;
    background-color: #a17edf;
}
</style>