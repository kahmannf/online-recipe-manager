<template>
    <div class="row" style="margin-top:100px;">
        <div class="column column-4">&nbsp;</div>
        <div class="column column-4 login-border" style="background-color:#fff;">
            <div class="row">
                <div class="column column-1">&nbsp;</div>
                <div class="column column-8">
                    <div :class="response_color">
                        {{response_message}}
                    </div>
                </div>
            </div>
            <div class="row" v-if="key_set">

                <div class="column column-4">
                    <label :class="email_color">Email:</label>
                </div>

                <div class="column column-8">
                    {{email}}
                </div>
            </div>
            <div class="row" v-if="key_set">

                <div class="column column-4">
                    <label :class="alias_color">Alias/Forumname:</label>
                </div>

                <div class="column column-8">
                    {{alias}}
                </div>
            </div>
            <div class="row" v-if="key_set">
                <div class="column column-4">
                    <label :class="alias_color">Passwort:</label>
                </div>

                <div class="column column-8">
                    <input class="clear" type="password" v-model="password">
                </div>
            </div>
            <div class="row" v-if="key_set">
                <div class="column column-6">&nbsp;</div>

                <div class="column column-6">
                    <button @click="send_request" style="width:100%;">Passwort festlegen</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script src="password.js"></script>
<style src="../../public/main.css"></style>

<style scoped>
    .red {
        color: #f00;
    }

    .black {
        color: #000;
    }

    .green {
        color: #0a0;
    }

    .row {
        padding: 5px 0;
    }
</style>