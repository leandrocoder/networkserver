<template>
    <div class='bg'>
        <div class='newtab' v-if='false'>
            <h3>New server</h3>
            <p>Type</p>
            <input ref='name' value="New Server" /><br>
            <select ref='socketType'>
                <option value="websocket">WebSocket</option>
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
            </select>
            <br>
            <input ref='port' value="5000" /><br>
            <checkbox ref="forwardMessages">Auto Forward Messages</checkbox>
            <br>
            <button @click='onClickCreate'>Create</button><br><br>
            <button @click='onClickShowError'>Show Error</button>
            <p v-for="(index, value) in 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet lacinia turpis. Mauris et tortor ultricies, varius nibh ac, dignissim mauris. Duis diam nulla, lobortis non rhoncus eget, sodales quis libero. Duis lacinia a risus eget vehicula. Nullam malesuada nunc quis semper ultrices. Sed sapien lorem, tristique non nibh vel, vestibulum tristique diam. Praesent nisi mauris, congue nec magna vel, malesuada consequat risus.</p>
        </div>    
        <div class='newtabwait'>
            <h3>Creation of custom server</h3>
        </div>
    </div>    
</template>


<script>

import Checkbox from './InputCheckbox.vue';

export default {

    data: () => ({
        app:null,
        electronWindow:null
    }),

    components: {
        Checkbox
    },

    methods: {

        onClickShowError: function() {
            //alert("show error now!");
            this.electronWindow.createModal('msgbox');
        },

        onClickCreate: function() {
            console.log('create');
            console.log(this.$refs.socketType.value);

            let serverConfig = {
                name: this.$refs.name.value,
                type: this.$refs.socketType.value,
                port: this.$refs.port.value,
                forwardmessages: this.$refs.forwardMessages.value,
                rooms: []
            }

            this.app.checkPort(serverConfig.port, (free) => {
                if (free == true) {
                    this.$emit('add', serverConfig);
                }
                else {
                    let msg = `port ${serverConfig.port} was in use.`;
                    alert(msg);

                }
            })

            
        }
    },

    mounted()
    {
        let remote = window.require('electron').remote;
        this.app = remote.getGlobal('app');
        this.electronWindow = remote.getGlobal('electronWindow');

        console.log("this.electronWindow", this.electronWindow);
    }


    
}
</script>

<style lang="scss" scoped>

    $blue: #4688F4;


    .newtab {
        position:absolute;
        top:0px;
        left:0px;
        width: calc(100% - 40px);
        height:100%;

        padding-left: 20px;
        padding-right: 20px;
    }

    button {
        padding:10px;
        background-color: $blue;
        border:none;
        cursor: pointer;
    }

    button:hover {
    }

    button:focus {
        border: none;
        outline: none;
    }

    .newtabwait {

        position:absolute;
        top:0px;
        left:0px;
        width: calc(100% - 40px);
        height:100%;

        h3 {
            position:absolute;
            top:calc(50% - 25px);
            font-size: 12px;
            left:50%;
            transform: translate(-50%, -50%);
        }

    }
</style>

