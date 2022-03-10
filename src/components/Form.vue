<template>
  <div class="divFlex">
    <div class="divLeft">
      <h3 v-show="!finish">Registration</h3>

      <h3 v-show="finish">Thank you !</h3>

      <div class="divMessage success" v-show="success && !finish">
        Successful registration ! <b>{{ name }}</b> is on the team
        <b>{{ team }}</b> !!!
      </div>
      <div
        class="divMessage error"
        v-show="start && !submit && !loading && !finish && !success && error"
      >
        Ho no ! there is an error, please try again !!!
      </div>

      <div class="divForm" v-show="start && !submit">
        <div class="divInput">
          <label for="name">Name : </label>
          <input type="text" id="name" v-model="name" />
        </div>

        <div class="divInput">
          <label for="email">email : </label>
          <input type="text" id="email" v-model="email" />
        </div>

        <div class="divInput">
          <label>Team : </label>
          <div>
            <input
              type="radio"
              id="cat"
              name="team"
              value="Cat"
              v-model="team"
              checked
            />
            <label for="cat">Cat</label>
          </div>

          <div>
            <input
              type="radio"
              id="dog"
              name="team"
              value="Dog"
              v-model="team"
            />
            <label for="dog">Dog</label>
          </div>
        </div>
      </div>

      <div class="divBtn">
        <div v-show="!start" class="btn purple" @click="start = true">
          start
        </div>
        <div v-show="start && !submit" class="btn grey" @click="start = false">
          back
        </div>
        <div v-show="start && !submit" class="btn purple" @click="submitting">
          submit
        </div>
        <div
          v-show="start && submit && !loading && !finish"
          class="btn purple"
          @click="restart"
        >
          Again
        </div>
        <div
          v-show="start && submit && !loading && !finish"
          class="btn grey"
          @click="finish = true"
        >
          Finish
        </div>
      </div>

      <div class="loader" v-if="loading">
        <img class="loadingPic" src="../assets/xState.png" alt="loader" />
      </div>
    </div>
    <div class="divRight">
        <h3>Context : </h3>
      <div class="code">
        start: {{ start }},<br />
        submit: {{ submit }},<br />
        loading: {{ loading }},<br />
        success: {{ success }},<br />
        error: {{ error }}, <br />
        finish: {{ finish }},<br />
        <br />
        name: {{ name }},<br />
        email: {{ email }},<br />
        team: {{ team }},<br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      start: false,
      submit: false,
      loading: false,
      success: false,
      error: false,
      finish: false,

      name: "",
      email: "",
      team: "Cat",
    };
  },
  methods: {
    submitting() {
      if (
        !this.name ||
        "" === !this.name.trim() ||
        !this.email ||
        "" === !this.email.trim()
      ) {
        alert("all fields are required !");
      } else {
        this.submit = true;
        this.error = false;
        this.loading = true;

        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            const math = Math.random();
            math > 0.5 ? resolve("success") : resolve("fail");
          }, 2000);
        });

        promise.then((response) => {
          if ("success" === response) {
            this.loading = false;
            this.success = true;
          }
          if ("fail" === response) {
            this.loading = false;
            this.success = false;
            this.submit = false;
            this.error = true;
          }
        });
      }
    },
    restart() {
      this.submit = false;
      this.success = false;

      this.name = "";
      this.email = "";
      this.team = "Cat";
    },
  },
};
</script>

<style>
</style>
