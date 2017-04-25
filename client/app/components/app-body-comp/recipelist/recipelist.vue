<template>
    <div class="row">
        <recipelist_item v-for="recipe in recipes" :recipe="recipe">
        </recipelist_item>
    </div>
</template>

<script src="recipelist.js"></script>

<style src="../../../../../public/main.css"></style>