<template>
    <h3 v-show="!finish">Registration</h3>
    <h3 v-show="finish">Thank you !</h3>

    <div class="divMessage success" v-show="success && !finish">
        Successful registration ! <b>{{name}}</b> is on the team <b>{{team}}</b> !!!
    </div>
    <div class="divMessage error" v-show="start && !submit && !loading && !finish && !success && error">
        Ho no ! there is an error, please try again !!!
    </div>

    <div class="divForm" v-show="start && !submit">

        <div class="divInput">
            <label for="name">Name : </label>
            <input type="text" id="name" v-model="name">
        </div>

        <div class="divInput">
            <label for="email">email : </label>
            <input type="text" id="email" v-model="email">
        </div>

        <div class="divInput">
            <label >Team : </label>
            <div>
                <input type="radio" id="cat" name="team" value="Cat" v-model="team"
                       checked>
                <label for="cat">Cat</label>
            </div>

            <div>
                <input type="radio" id="dog" name="team" value="Dog" v-model="team">
                <label for="dog">Dog</label>
            </div>
        </div>
    </div>


    <div class="divBtn">
        <div v-show="!start" class="btn purple" @click="start = true">start</div>
        <div v-show="start && !submit" class="btn grey" @click="start = false" >back</div>
        <div v-show="start && !submit" class="btn purple" @click="submitting" >submit</div>
        <div v-show="start && submit && !loading && !finish" class="btn purple" @click="restart" >Again</div>
        <div
            v-show="start && submit && !loading && !finish"
            class="btn grey"
            @click="finish = true">Finish
        </div>

    </div>

    <div class="loader" v-if="loading">
        <img class="loadingPic" src="../assets/xState.png" alt="loader">
    </div>

    <div class="code">
        start: {{ start }},<br>
        submit: {{ submit }},<br>
        loading: {{ loading }},<br>
        success: {{ success }},<br>
        error: {{ error }}, <br>
        finish: {{ finish }},<br>
        <br>
        name: {{ name }},<br>
        email: {{ email }},<br>
        team: {{ team }},<br>
    </div>

</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            start: false,
            submit: false,
            loading: false,
            success: false,
            error: false,
            finish: false,

            name: '',
            email: '',
            team: 'Cat',
        }
    },
    methods:{
        submitting() {

            if(!this.name || '' === !this.name.trim() || !this.email || '' === !this.email.trim()){
                alert("all fields are required !");
            } else {
                this.submit = true;
                this.error = false;
                this.loading = true;

                const promise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const math = Math.random();
                        math > 0.5 ? resolve('success') : resolve('fail');
                    }, 2000);
                });

                promise.then((response)=> {
                    if ('success' === response) {
                        this.loading = false;
                        this.success = true;
                    }
                    if ('fail' === response) {
                        this.loading = false;
                        this.success = false;
                        this.submit = false;
                        this.error = true;
                    }
                })
            }
        },
        restart() {
            this.submit = false;
            this.success = false;

            this.name = '';
            this.email = '';
            this.team = 'Cat';
        }
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
