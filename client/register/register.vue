<template>
    <div class="row" style="margin-top:100px;">
        <div class="column column-4">&nbsp;</div>
        <div class="column column-4 grey-border">
            <div class="row">
                <div class="column column-1">&nbsp;</div>
                <div class="column column-8">
                    <div :class="response_color">
                        {{response_message}}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column column-1">&nbsp;</div>

                <div class="column column-2">
                    <label :class="email_color">Email:</label>
                </div>

                <div class="column column-2">&nbsp;</div>

                <div class="column column-6">
                    <input class="clear" type="text" v-model="email">
                </div>
            </div>
            <div class="row">
                <div class="column column-1">&nbsp;</div>

                <div class="column column-2">
                    <label :class="alias_color">Alias/Forumname:</label>
                </div>

                <div class="column column-2">&nbsp;</div>

                <div class="column column-6">
                    <input class="clear" type="text" v-model="alias">
                </div>
            </div>
            <div class="row">
                <div class="column column-5">&nbsp;</div>

                <div class="column column-6">
                    <button @click="send_request" style="width:100%;">Schick mir eine Email!</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script src="register.js"></script>
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
</style>