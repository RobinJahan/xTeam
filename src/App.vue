<template>
  <div>
    <input v-model="form1" type="checkbox" id="form1" name="form1" checked />
    <label for="form1">form1</label>
  </div>

  <div>
    <input v-model="form2" type="checkbox" id="form2" name="form2" />
    <label for="form2">form2</label>
  </div>

  <div>
    <input v-model="exemple" type="checkbox" id="exemple" name="exemple" />
    <label for="exemple">exemple</label>
  </div>
  <div class="center">
    <img alt="Xstate logo" src="./assets/xState.png" width="80" />
    <h2>Xteam</h2>
  </div>

  <Form v-if="form1" />
  <XForm v-if="form2" />
  <LoadingBar v-if="exemple" />
</template>

<script>
import Form from "./components/Form.vue";
import XForm from "./components/XForm.vue";
import LoadingBar from "./components/LoadingBar.vue";

export default {
  name: "App",
  components: {
    Form,
    XForm,
    LoadingBar,
  },
  data: () => {
    return {
      form1: true,
      form2: true,
      exemple: false,
    };
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
