<template>
    <div class="row" style="margin-top:100px;">
        <div class="column column-4">
            &nbsp;
        </div>
        <div class="column column-4">
            <login_control :appstate="appstate" v-if="view == 'login'"></login_control>
            <p v-else>
                {{ 'view "' + (view || undefined) + '" is not yet implemented.'}}
                <br/>
                <br />
                <br />
                {{'Appstate:'}}
                <br />
                <br />
                {{JSON.stringify(appstate)}}
            </p>
        </div>
    </div>
</template>

<script src="app-body.js">
</script>

<style src="../../../public/main.css"></style>