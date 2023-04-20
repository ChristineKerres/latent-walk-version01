function gradioClient(domain) {
    let _this = this;
    this.url = "wss://" + domain + "/queue/join"

    //"wss://t2.nonlinearform.com/queue/join"

    this.predict = async (param_list) => {
        const process = new Promise((resolve, reject) => {
            const session_hash = Math.random().toString(36).substring(2);
            const websocket = new WebSocket(this.url);
            websocket.onmessage = function (event) {
                const _data = JSON.parse(event.data)
                if (_data.msg === "send_hash") {
                    websocket.send(JSON.stringify({
                        fn_index: 0,
                        session_hash
                    }));
                }
                if (_data.msg === "send_data") {
                    websocket.send(JSON.stringify({
                        fn_index: 0,
                        data: param_list,
                        "event_data": null,
                        session_hash
                    }));
                }
                if (_data.msg === "process_completed") {
                    resolve(_data.output.data[0]);
                }
                console.log(_data.msg);
            }
        });

        var result = await process;
        return result

    }


}