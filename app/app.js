const LCNetServer = require('lcnet/server');
const UDP = require('lcnet/udp');
const EventEmitter = require('events');

class Room  extends EventEmitter
{
    constructor(name)
    {
        super();
        this.name = name;
        this.clients = [];
    }

    addClient(client)
    {
        if (client.room != null) {
            client.room.removeClient(client);
        }
        
        for (let i = 0; i < this.clients.length; i++)
        {
            if (this.clients[i] != null && this.clients[i].id == client.id)
                return false;
        }

        client.room = this.name != 'all' ? this : null;
        this.clients.push(client);
        return true;
    }

    removeClient(client)
    {
        let index = -1;
        for (let i = 0; i < this.clients.length; i++)
        {
            if (this.clients[i].id == client.id)
            {
                index = i;
                break;
            }
        }

        if (index >= 0) this.clients.splice(index, 1);
        client.room = null;
        return index >= 0;
    }
}

module.exports = class App extends EventEmitter
{
    constructor(config)
    {
        super();
        this.server = [];

        for (let i = 0; i < config.server.length; i++)
        {
            if (config.server[i].type == 'udp')
            {
                let s = new UDP();
                s.config = config.server[i];
                s.id = i;
                s.clients = [];
                s.messageLog = [];
                s.rooms = [];
                s.name = s.config.name;
                s.server = {};
                s.server.type = 'udp';
                s.server.ip = s.getLocalIP();
                s.addListener(config.server[i].port, (data, sender) => {
                    console.log("remote:", sender);
                    this.onMessage(s, data, sender)
                })
                this.server.push(s);
            }
            else if (config.server[i].type == 'websocket')
            {
                let s = new LCNetServer(config.server[i].type, config.server[i].port);
                s.config = config.server[i];
                s.id = i;
                s.clients = [];
                s.messageLog = [];
                s.rooms = [];
                s.name = s.config.name;
                s.defaultRoom = new Room('all');
                s.getRoom = function(name)
                {
                    for (let j = 0; j < s.rooms.length; j++)
                    {
                        if (s.rooms[j].name == name)
                        {
                            return s.rooms[j];
                        }
                    }
                    return null;
                }

                for (let j = 0; j < s.config.rooms.length; j++)
                {
                    s.rooms.push(new Room(s.config.rooms[j].name));
                }       

                s.forwardMessages = config.server[i].forwardmessages
                s.on("connect", (client) => this.onConnect(s, client))
                s.on("close", (client) => this.onClose(s, client))
                s.on("message", (data, sender) => this.onMessage(s, data, sender))
                this.server.push(s);
            }
        }
    }

    getServer(name)
    {
        for (let i = 0; i < this.server.length; i++)
        {
            if (this.server[i] != null && this.server[i].config.name == name)
            {
                return this.server[i];
            }
        }
        return null;
    }

    onConnect(server, client)
    {
        client.name = "Guest " + client.id;
        server.defaultRoom.addClient(client);
        console.log("connect: client", client.id);
        this.emit("connect", server, client);
    }
    
    onMessage(server, data, sender)
    {
        console.log(server.config.type, "message >", data);

        console.log("type of message = ", typeof data);

        let json = null;
        try {
            json = JSON.parse(data);
        } catch (err) {}

        if (json && json.type == "server")
        {
            if (json.whoami)
            {
                sender.name = json.whoami;
            }
            else if (json.joinroom)
            {
                let room = server.getRoom(json.joinroom);
                if (room) room.addClient(sender);
            }
            else if (json.leaveroom)
            {
                if (sender.room) sender.room.removeClient(sender);
            }
            else if (json.requestconnection)
            {
                // this one need to be passed to all servers created

                for (let i = 0; i < this.server.length; i++)   
                {
                    let s = this.server[i];
                    console.log('name???', s.name, json.requestconnection);
                    if (s.name == json.requestconnection)
                    {
                        let response = {type:'connectiondata',  data:{type:s.type, host:s.ip, port:s.port}};
                        console.log("CONNECTION DATA =================");
                        console.log(response);
                        console.log(sender);
                        server.send(response);
                    }
                }
                
            }
        }
        
        let timestamp = Date.now();
        let time = new Date();
        time = time.getHours() + ":"  + time.getMinutes() + ":" + time.getSeconds();
        let messageData = {
            message:data,
            timestamp:timestamp,
            time:time
        }
        server.messageLog.push(messageData);
        this.emit("message", server, data, sender);
    }
    
    onClose(server, client)
    {
        if (client && client.room)
        {
            client.room.removeClient(client);
        }
        server.defaultRoom.removeClient(client);
        this.emit("close", server, client);
    }
}
