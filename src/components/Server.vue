<template>
    <div v-if="app != null && server != null" class='server'>
        <div class='topline'></div>
        <div class='columns'>
            <div v-if="clientServer == true" class='datacontainer'>
                <h1>Rooms</h1>
                <div class='scoll'>
                <div class='container'>
                <div :class="index == selectedRoom ? 'itemselected' : 'item'" v-for="(item, index) in rooms" @click="onClickRoom(item, index)">{{item.name}}</div>
                </div>
                </div>
            </div>
            <div v-if="clientServer == true"class='datacontainer'>
                <h1>Clients</h1>
                <div class='scoll'>
                <div class='container'>
                <div :class="index == selectedClient ? 'itemselected' : 'item'" v-for="(item, index) in clients" v-if="item != null" @click="onClickClient(item, index)">{{item.name}}</div>
                </div>
                </div>
            </div>
            <div class='datacontainer messages'>
                <h1>Messages</h1>
                <div class='scoll'>
                    <div class='container'>
                        <div class='item' v-for="(item, index) in messageLog">{{item.time}} - {{item.message}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sendbox">
            <div class="targetbox"><p>Sending to {{sendTarget}}</p></div>
            <input ref='input'></input>
            <button @click='onClickSend'>SEND</button>
        </div>
        <div class='footer'>
            <p>
                {{server.type}} ws://{{server.server.ip}}:{{server.config.port}}
            </p>

            <p style="left:unset;right:20px">
                {{getConnectionsText()}}
            </p>
        </div>
    </div>    
</template>

<script>
export default {

    data: () => ({

        selectedRoom:0,
        selectedClient:-1,
        sendTarget:"[ all ]",
        clientServer:false,

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

            

            this.app.on('connect', (server) => { if (server.id == this.server.id) this.updateAll() } )
            this.app.on('close', (server) => { if (server.id == this.server.id) this.updateAll() } )
            this.app.on('message', (server) => { if (server.id == this.server.id) this.updateAll() } )

            this.$nextTick(() => {
                console.log('server type', this.server.config.type);
        
                this.updateAll();
            })

            
        })
    },

    computed: {

    },

    methods : {

        isClientServer: function()
        {
            this.clientServer = this.server.config.type != 'udp';
            console.log('isclient server?', this.clientServer)
            return this.clientServer;
        },

        onClickClient: function(client, index)
        {
            this.selectedClient = index;
            let room = this.server.rooms[this.selectedRoom];
            this.sendTarget = "[ " + room.name + " ] > " + client.name;
        },

        onClickRoom: function(room, index)
        {
            this.selectedRoom = index;
            this.selectedClient = -1;
            this.clients = room.clients;

            this.sendTarget = "[ " + room.name + " ]";
       },

        updateAll: function()
        {
            this.updateRooms();
            this.updateConnections();
            this.updateMessages();
        },

        updateConnections: function()
        {
            console.log('updateConnections:', this.isClientServer(), this.server.config.type)
            if (this.isClientServer() == false) return;
            this.connections = this.server.server.clients.length;
            this.clients = this.rooms[this.selectedRoom].clients;
        },

        updateRooms: function()
        {
            if (this.isClientServer() == false) return;
            this.rooms = [this.server.defaultRoom];
            for (let i = 0; i < this.server.rooms.length; i++)
            {
                let r = this.server.rooms[i];
                this.rooms.push(r);
            }
            let r = this.rooms[this.selectedRoom];
            this.clients = r ? this.rooms[this.selectedRoom].clients : [];
        },

        updateMessages: function()
        {
            this.messageLog = this.server.messageLog;
        },

        getConnectionsText: function()
        {
            if (this.clientServer == false) return "";

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
            if (this.server == null || data.length == 0) return;
            
            let list = [];
            if (this.selectedClient > 0)
            {
                list.push(this.clients[this.selectedClient]);
            }
            else
            {
                list = this.clients;
            }

            for (let i = 0; i < list.length; i++)
            {
                console.log("sending to " + list[i].id);
                this.server.send(data, list[i]);
            }
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
            height:calc(100% - 164px);
            padding-left:20px;
            padding-right:20px;
            padding-top:32px;
            padding-bottom: 10px;
        }

        .scoll {
            position:relative;
            width: 100%;
            height:100%;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .datacontainer {
            position: relative;
            background-color: #FFD04B;
            height:100%;
            width: 200px;
            margin-right:10px;
            
            color: black;

            container {
                position:relative;
                height:100%;
                width: 100%;
            }


            h1 {
                position:absolute;
                top:-25px;
                left:0px;
                margin: 0;
                padding: 0;
                font-size: 14px;
                font-weight: 100;
                color:black;

            }

            .item {
                padding:4px;
                cursor: pointer;
            }

            .item:hover {
                background-color: rgba(255, 255, 255, 0.4);
            }

            .itemselected {
                padding:4px;
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.25);
            }

            .itemselected:hover {
                background-color: rgba(255, 255, 255, 0.6);
            }

            
        }

        .messages {
            width: 100%;
            margin-right: 0px;
        }


        .sendbox {
            position: relative;
            height:64px;
            width:calc(100% - 40px);
            margin-left:20px;
            margin-right:20px;

            .targetbox
            {
                position:absolute;
                top:0px;
                left:0px;
                color:black;
                p {
                    margin:0; padding: 0;
                }
            }

            input {
                position: absolute;
                bottom:0px;
                
                width:calc(100% - 125px);
                height: calc(32px - 4px);
                padding:0;
                padding-left:10px;
                margin:0;
            }

            button {
                width:100px;
                height:32px;
                position:absolute;
                bottom:0px;
                right:0px;
                background-color: $blue;
                border: none;
                cursor: pointer;
                color:white;
            }
        }
    }
</style>

