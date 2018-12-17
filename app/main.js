const LCNetServer = require('lcnet/server');
const EventEmitter = require('events');
const Config = require("./config.json");

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
        return index >= 0;
    }
}

module.exports = class Main extends EventEmitter
{
    constructor()
    {
        super();
        this.server = [];

        for (let i = 0; i < Config.server.length; i++)
        {
            let s = new LCNetServer(Config.server[i].type, Config.server[i].port)
            s.config = Config.server[i];
            s.id = i;
            s.clients = [];
            s.messageLog = [];
            s.defaultRoom = new Room('default');
            s.rooms = [
                s.defaultRoom
            ];

            for (let j = 0; j < s.config.rooms.length; j++)
            {
                s.rooms.push(new Room(s.config.rooms[j].name));
            }

            s.forwardMessages = Config.server[i].forwardmessages
            s.on("connect", (client) => this.onConnect(s, client))
            s.on("close", (client) => this.onConnect(s, client))
            s.on("message", (data, sender) => this.onMessage(s, data, sender))
            this.server.push(s);
        }
    }

    onConnect(server, client)
    {
        server.defaultRoom.addClient(client);
        console.log("connect: client", client.id);
        this.emit("connect", server, client);
    }
    
    onMessage(server, data, sender)
    {
        console.log("message >", data);
        
        let timestamp = Date.now();
        let time = new Date().toUTCString();
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
        console.log("close: client", client.id);
        this.emit("close", server, client);
    }
}
