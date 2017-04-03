<template>
    <div class="login-border">
        <div class="row" style="padding: 5px 0;">
            <div class="column column-3">
                <label>Email</label>
            </div>
            <div class="column column-6">
                <input :class="email_color" type="text" v-model="email" />
            </div>
            <div class="column column-3">
                <button @click="login()">Login</button>
            </div>
        </div>
        <div class="row" style="padding: 5px 0;">
            <div class="column column-3">
                <label>Passwort</label>
            </div>
            <div class="column column-6">
                <input :class="password_color" type="password" v-model="password" />
            </div>
            <div class="column column-3">
                <button @click="register()">Registrieren</button>
            </div>
        </div>
        <div class="row" style="padding: 5px 0;">
            <div class="column column-6">
                <a href="/resetpassword.html">Passwort zur&uuml;cksetzten</a>
            </div>
            <div class="column column-6 red">
                <label>{{errormessage}}</label>
                <label v-if="!errormessage">&nbsp;</label>
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

    button {
        margin: 0 auto;
        width: 100%;
    }

    .red {
        color: #f00;
    }

    .login-border {
        padding: 5%;
        border-style: solid;
        border-color: lightgray;
        border-width: 2px;
    }
</style>