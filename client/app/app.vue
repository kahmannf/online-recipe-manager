<style>
    .red {
        color: #f00;
    }
</style>

<template>
    <div>
        <h1 id="content" class="red">{{msg}}</h1>
        <comp_header v-bind:menu="menu"></comp_header>
    </div>
</template>

<script src="app.js"></script>
