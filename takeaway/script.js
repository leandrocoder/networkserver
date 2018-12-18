module.exports = class Extension
{
    constructor(app)
    {
        console.log("THE TAKEAWAY SCRIPT WAS STARTED");
        this.app = app;
        this.server = this.app.getServer("Takeaway");

        this.server.on("message", (data, server) => {
            console.log(">>>>>", data);
            let json = null;
            try {
                json = JSON.parse(data);
            } catch (err) {}

            if (json && json.type == "takeaway")
            {
                let cmd = json.data.command;
                if (cmd == "start")
                {
                    this.startTakeAway();
                }
            }
        });

        this.server.on("open", () => {
            console.log("connection started");
        })

        this.server.on("close", () => {
            console.log("connection closed");
        })
    }

    startTakeAway()
    {
        let id = Date.now().toString(32);
        console.log("start take away system >", id);
        this.startRecord(id);
    }

    startRecord(id)
    {
        console.log("startRecord");
        setTimeout(() => this.stopRecord(), 1000);
    }

    stopRecord()
    {
        console.log("stopRecord");
        setTimeout(() => this.onCompleteGetAssest(), 1000);
    }

    onCompleteGetAssest()
    {
        console.log("onCompleteGetAssest");
        setTimeout(() => this.startPostProcess(), 1000);
    }

    startPostProcess()
    {
        console.log("startPostProcess");
        setTimeout(() => this.onCompletePostProcess(), 1000);
    }

    onCompletePostProcess()
    {
        console.log("onCompletePostProcess");
        setTimeout(() => this.share(), 1000);
    }

    share()
    {
        console.log("share");
        setTimeout(() => this.onCompleteShare(), 1000);
    }

    onCompleteShare()
    {
        console.log("onCompleteShare");
    }
}
