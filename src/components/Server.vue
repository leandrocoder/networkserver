<template>
    <div v-if="app != null && server != null" class='server'>
        <div class='topline'></div>
        <div class='columns'>
            <div class='datacontainer'>
                <h1>Rooms</h1>
                <div class='item' v-for="(item, index) in rooms">{{item.name}}</div>
            </div>
            <div class='datacontainer'>
                <h1>Clients</h1>
                <div class='item' v-for="(item, index) in clients">{{item.id}}</div>
            </div>
            <div class='datacontainer messages'>
                <h1>Messages</h1>
                <div class='item' v-for="(item, index) in messageLog">{{item.message}}</div>
            </div>
        </div>
        <div class="sendbox">
            <input ref='input'></input>
            <button @click='onClickSend'>SEND</button>
        </div>
        <div class='footer'>
            <p>
                {{server.type}} ws://{{server.server.ip}}:{{server.config.port}}
            </p>

            <p style="left:unset;right:20px">
                {{connections}}
            </p>
        </div>
    </div>    
</template>

<script>
export default {

    data: () => ({
        connections:0,
        messageLog:[],
        rooms:[],
        clients:[]
    }),

    props: {
        app: {type: Object, default:() => {null}},
        server: {type:Object, default:() => {null}}
    },

    mounted() {

        this.$nextTick(() => {

            this.app.on('connect', (server) => { if (server.id == this.server.id) this.updateConnections() } )
            this.app.on('close', (server) => { if (server.id == this.server.id) this.updateConnections() } )
            this.app.on('message', (server) => { if (server.id == this.server.id) this.updateMessages() } )

            this.$nextTick(() => {
                this.updateAll();
            })
        })
    },

    computed: {

    },

    methods : {

        updateAll: function()
        {
            this.updateRooms();
            this.updateConnections();
            this.updateMessages();
        },

        updateConnections: function()
        {
            this.connections = this.server.server.clients.length;
        },

        updateRooms: function()
        {
            this.rooms = this.server.rooms;
            console.log("clients === ");
            console.log(this.rooms[0].clients);
            this.clients = this.rooms[0].clients;
        },

        updateMessages: function()
        {
            this.messageLog = this.server.messageLog;
        },

        getConnectionsText: function()
        {
            let size = this.connections;
            return size + ' connection' + (size != 1 ? 's' : '');
        },

        setServer: function(server)
        {
            this.server = server;
            console.log("set server", server.config);
        },


        onClickSend: function()
        {
            let data = this.$refs.input.value.trim();
            if (this.server != null && data.length > 0)
            {
                this.server.send(data);
            }
            this.$refs.input.value = "";
        }
    }
    
}
</script>

<style lang="scss" scoped>

    $blue: #4688F4;
    $yellow: #FFD04B;
    $white:#ffffff;

    .server {
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        height:100%;

        .topline {
            width: 100vw;
            height:10px;
            background-color: $blue;
        }

        .footer {
            position:absolute;
            left:0px;
            bottom: 0px;
            width:100vw;
            height:32px;
            background-color: $blue;
            color:$white;

            p {
                margin:0;
                padding: 0;
                position:absolute;
                left:20px;
                top:4px;
            }
        }

        .columns {
            position:relative;
            display: flex;
            height:calc(100% - 128px);
            padding-left:20px;
            padding-right:20px;
            padding-top:32px;
            padding-bottom: 10px;
        }

        .datacontainer {
            position: relative;
            background-color: #FFD04B;
            height:100%;
            width: 200px;
            margin-right:10px;
            h1 {
                position:absolute;
                top:-25px;
                left:0px;
                margin: 0;
                padding: 0;
                font-size: 14px;
                font-weight: 100;

            }

            .item {
                padding:4px;
                cursor: pointer;
            }

            .item:hover {
                padding:4px;
                background-color: rgba(255, 255, 255, 0.4);
            }
        }

        .messages {
            width: 100%;
            margin-right: 0px;
        }


        .sendbox {
            position: relative;
            height:32px;
            width:calc(100% - 40px);
            margin-left:20px;
            margin-right:20px;

            input {
                width:calc(100% - 125px);
                height: calc(100% - 4px);
                padding:0;
                padding-left:10px;
                margin:0;
            }

            button {
                width:100px;
                height:100%;
                position:absolute;
                top:0px;
                right:0px;
                background-color: $blue;
                border: none;
                cursor: pointer;
            }
        }
    }
</style>

