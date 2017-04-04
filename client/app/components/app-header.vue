<template>
    <div v-if="appstate.user_loggedin" class="row header-style">
        <div class="column column-4 menuitemgroup">
            <button @click="appstate.changeview('search')" style="margin-left:10px;">Suche</button>
            <button @click="appstate.changeview('new_recipe')">Neues Rezept</button>
            <button @click="appstate.changeview('profil')">Profil</button>
        </div>
        <div class="column column-4">
            &nbsp;
        </div>
        <div class="column column-4 menuitemgroup">
            <div class="row">
                <div class="column column-4 formatted">
                    <label>Angemeldet als</label>
                </div>
                <div class="column column-4 formatted">
                    <label style="font-weight:bold;">{{appstate.user_loggedin.alias}}</label>
                </div>
                <div class="column column-4">
                    <button @click="logout()">Abmelden</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="row header-style">
        <div class="column column-11">
            &nbsp;
        </div>
        <div class="column-1 column" style="margin: 5px 0;">
            <div style="padding-right: 8px;">
                <a href="#" @click="appstate.changeview('login')">Login</a>
            </div>
        </div>
    </div>
</template>

<script src="app-header.js">
</script>
<style src="../../../public/main.css"></style>
<style scoped>

    .fill {
        width: 6%;
    }

    button {
        margin: 0;
        height: 29px;
        width: 100px;
    }

    .menuitemgroup {
        padding: 15px 0;
    }

    .formatted {
        margin-top: 7px;
    }

    a {
        color: #877;
        float: right;
    }

    a:visited {
        color: #877;
    }

</style>