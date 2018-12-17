<template>
    <div class='messagelog'>
        <box color="#ffffff">
            <h2>Message Log</h2>
            <div class="messagecontainer">
                <div class="message" v-for="(item, index) in messages">
                    {{item.readTime}} <br>
                    {{item.message}}
                </div>
            </div>
        </box>
    </div>
</template>

<script>

import Box from "./Box.vue";

export default {
    components: {
        Box
    },

    props:{
        messages:{
            type: Array,
            default: function () { return [] }
        }
    }
}
</script>

<style lang="scss" scoped>
    .messagelog {

        $height:330px;

        margin:20px;
        position:relative;
        width:100%;
        height:377px;
        max-height:calc(100% - 20px);

        .box {
            height:100%;
            max-height: 100%;
        }

        .messagecontainer {
            margin-top:5px;
            height:$height;
            max-height: $height;
            width:calc(100% + 10px);
            overflow-y: auto;
        }

        .message {
            width:calc(100% - 20px);
            border-radius: 4px;
            padding: 5px;
            background-color: #02aaf5;
            color:black;
            margin-top:5px;
            margin-bottom: 10px;
        }
    }
</style>

