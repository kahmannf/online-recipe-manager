<template>
    <div>
        <ul>
            <li v-for="menuitem in menu">
                <menu_item v-bind:menu_item="menuitem"></menu_item>
            </li>
        </ul>
    </div>
</template>

<script src="comp_header.js"></script>