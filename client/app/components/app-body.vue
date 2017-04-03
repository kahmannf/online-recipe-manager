<template>
    <div class="row" style="margin-top:100px;" v-if="!appstate.user_loggedin">
        <div class="column column-4">
            &nbsp;
        </div>
        <div class="column column-4">
            <login_control :appstate="appstate"></login_control>
        </div>
    </div>
</template>

<script src="app-body.js">
</script>

<style src="../../../public/main.css"></style>