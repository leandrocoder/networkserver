<template>
    <div class="box" :style="boxStyle">
        <div style="padding:10px;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        color: {default:"#3ae4a6"},
    },

    computed: {
        boxStyle: function()
        {
            let obj = {};
            obj["background-color"] = this.color;
            return obj;
        }
    }
}
</script>

<style lang="scss" scoped>
    .box {
        position: relative; width: 100%; height: 100%;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.3);
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
        height: unset;

        h1 {
            background-color: rgba(0, 0, 0, 0.1);
            width:100%;
            padding:10px;
            text-transform: uppercase;
            text-align: center;
            font-size: 14px;
            margin: -10px;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 14px;
            margin:0;
            color:#02aaf5;
        }

        p {
            position:relative;
            left:50%;
            width: 100%;
            text-align: center;
            margin-top:6px;
            transform: translate(-50%);
        }
    }
</style>

