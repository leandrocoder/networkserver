<template>
    <div class='tabs'>

        

        <div v-for="(item, index) in value" :class="'tab' + (active == index ? ' active' : '')" @click="onClickTab(index)">
            <p>{{item}}</p>
        </div>

        <div class='bg' ref='bg'></div>

        <div class="windowbuttons">
            <div @click="minimize" class='winbtn' style="background-color:#ffba3c"><p>-</p></div>
            <div @click="close" class='winbtn' style="background-color:#ff5e5b;"><p>X</p></div>
        </div>


    </div>
</template>

<script>

const remote = window.require('electron').remote;

export default {
    data : () => ({

    }),

    props: {
        active: {default: 0},
        value: {
            type:Array,
            default: () => ["default server"]
        }
    },

    methods: {
        onClickTab: function(index)
        {
            this.$emit('click', index);
        },

        minimize: function()
        {
            remote.BrowserWindow.getFocusedWindow().minimize();
        },

        close: function()
        {
            remote.BrowserWindow.getFocusedWindow().close();
        }


    },

    mounted()
    {
        this.$refs.bg.style.webkitAppRegion = "drag"
    }
}
</script>

<style lang="scss" scoped>

    $blue: #4688F4;
    $darkBlue: #203F70;

    .tabs {
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        height:32px;
        display: flex;

        background-color: white;

        .bg {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: white;
        }

        .windowbuttons {
            position:relative;
            height:100%;
            width:64px;
            display: flex;
            margin-right: 20px;
            justify-content:space-between;
        }

        .winbtn {
            width:  18px;
            height: 18px;
            background-color: yellow;
            border-radius: 100px;
            position:relative;
            top:50%;
            transform: translateY(-50%);
            margin-left:10px;
            cursor: pointer;

            p {
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%, -50%);
                margin: 0;
                padding: 0;
                font-size: 12px;
            }
        }


        .title {
            position:absolute;
            margin: 0;
            padding: 0;
            right:20px;
            top:50%;
            transform: translateY(-50%);
        }

        

        .tab {
            position: relative;
            width:128px;
            min-width: 128px;
            height:100%;
            background-color: $darkBlue;
            margin-right:5px;
            cursor: pointer;

            p {
                position:absolute;
                top:50%;
                left:10px;
                transform: translateY(-50%);
                margin:0;
                padding: 0;
            }
        }

        .active {
            background-color: $blue;
            color: white;
        }
    }
</style>
