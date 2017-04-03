<template>
    <div class="column column-4" style="padding:5px 0;">
        <div class="row" style="padding: 2.5px 0;">
            <div class="column column-6">
                <label class="formatted">Angemeldet als</label>
            </div>
            <div class="column column-6">
                <label class="formatted">{{appstate.user_loggedin.alias}}</label>
            </div>
        </div>
        <div class="row" style="padding: 2.5px 0;">
            <div class="column column-6">
                <button class="formatted" @click="profil()">Profil</button>
            </div>
            <div class="column column-6">
                <button class="formatted" @click="logout()">Abmelden</button>
            </div>
        </div>
    </div>
</template>

<script src="displayuser.js"></script>
<style src="../../../../public/main.css"></style>
<style scoped>
    .formatted {
        margin: 0 2.5%;
        width: 95%;
    }
</style>