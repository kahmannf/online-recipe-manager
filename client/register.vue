<template>
    <div>
        <input type="text" v-bind="email">
        <input type="button" v-on:onclick="send_request(email)">
    </div>
</template>

<script src="register.js"></script>