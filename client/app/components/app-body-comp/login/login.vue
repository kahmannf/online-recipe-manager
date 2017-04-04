<template>
    <div class="login-border">
        <div class="row" style="padding: 5px 0;">
            <div class="column column-3">
                <label>Email</label>
            </div>
            <div class="column column-6">
                <input :class="email_color" @keyup.enter="login()" type="text" v-model="email" />
            </div>
        </div>
        <div class="row" style="padding: 5px 0;">
            <div class="column column-3">
                <label>Passwort</label>
            </div>
            <div class="column column-6">
                <input :class="password_color" @keyup.enter="login()" type="password" v-model="password" />
            </div>
            <div class="column column-3">
                <button @click="login()">Login</button>
            </div>
        </div>
        <div class="row" style="padding: 5px 0;">
            <div class="column column-3">
                <a href="/register.html">Registrieren</a>
            </div>
            <div class="column column-6">
                <a href="/resetpassword.html">Passwort zur&uuml;cksetzten</a>
            </div>
            <div class="column column-3">
                <a href="#" @click="appstate.changeview('home')">zur&uuml;ck</a>
            </div>
        </div>
        <div class="row">
            <div class="column column-12 red">
                <label>{{errormessage}}</label>
            </div>
        </div>
    </div>
</template>

<script src="login.js"></script>
<style src="../../../../../public/main.css"></style>
<style scoped>
    div {
        background-color: white;
    }

    div.column-6 input {
        width: 90%;
        margin: 0 5%;
    }
    
    div.column-6 a {
        width: 90%;
        margin: 0 5%;
    }

    button {
        margin: 0 auto;
        width: 100%;
    }

    .red {
        color: #d66;
    }

    .backred {
        background-color: #d66;
    }
    
    a { 
        color: #baa;
    }

    a:visited {
        color: #baa;
    }
</style>