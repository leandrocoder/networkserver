<template>
    <div class="box" :style="boxStyle">
        <div class="head"><h1>{{title}}</h1></div>
        <div class="value">{{value}}</div>
        <div class="message"><slot></slot></div>
    </div>
</template>

<script>
export default {
    
    data () {
        return {

        }
    },

    props: {
        title: {default:"Title"},
        value: {default:0},
        message: {default:"message"},
        bg: {default:"#3ae4a6"},
        color: {default:"#ffffff"},
        width: {default: 200},
        height: {default: 270}
    },

    computed: {
        boxStyle: function()
        {
            let obj = {};
            let literal = this.width.indexOf("px") > 0 || this.width.indexOf("%") > 0;
            obj.width = literal == true ? this.width : this.width > 1 ? this.width + "px" : (this.width * 100) + "%";
            obj.height = this.height + "px";
            obj["background-color"] = this.bg;
            obj.color = this.color;
            return obj;
        }
    }

}
</script>

<style lang="scss" scoped>

    .box {
        position:relative;
        margin: 10px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .head {
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        height:60px;
        background-color: rgba(0, 0, 0, 0.1);

        h1 {
            position: absolute;
            padding: 0;
            margin: 0;
            font-size: 20px;
            left:50%;
            top:50%;
            transform: translate(-50%, -50%);
        }
    }

    .value {
        position:absolute;
        font-size:80px;
        left:50%;
        margin-top:60px;
        top:calc(50% - 35px);
        transform: translate(-50%, -50%);
    }

    .message {
        position:absolute;
        font-size:20px;
        left:50%;
        bottom:30px;
        transform: translate(-50%);
        text-transform: uppercase;
    }

</style>

