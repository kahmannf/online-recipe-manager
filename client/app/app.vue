<style>
    .red {
        color: #f00;
    }

    body {
        margin: 0;
        background-color: #f5f5f5;
    }
</style>

<template>
    <div class="row">
        <div class="row">
            <div class="column column-12">
                <app_header :appstate="appstate" v-if="appstate.user_loggedin"></app_header>
            </div>
        </div>
        <div class="row">
            <div class="column column-12">
                <app_body :appstate="appstate" :view="view"></app_body>
            </div>
        </div>
    </div>
</template>

<script src="app.js"></script>
<style src="../../public/main.css"></style>
