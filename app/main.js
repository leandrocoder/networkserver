const LCNetServer = require('lcnet/server');
const EventEmitter = require('events');
const Config = require("./config.json");

module.exports = class Main extends EventEmitter
{
    constructor()
    {
        super();
        this.server = [];

        for (let i = 0; i < Config.server.length; i++)
        {
            let s = new LCNetServer(Config.server[i].type, Config.server[i].port)
            s.id = i;
            s.messageLog = [];
            s.forwardMessages = Config.server[i].forwardmessages
            s.on("connect", (client) => this.onConnect(s, client))
            s.on("close", (client) => this.onConnect(s, client))
            s.on("message", (data, sender) => this.onMessage(s, data, sender))
            this.server.push(s);
        }
    }

    onConnect(server, client)
    {
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
