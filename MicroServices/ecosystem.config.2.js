module.exports = {
    "apps": [
        {
            "name": "admin",
            "script": "./AdminService/server.js",
            "interpreter": "ls"
        },
        {
            "name": "dispatch",
            "script": "./DispatchService/app.js",
            "interpreter": "ls"
        },
        {
            "name": "bid",
            "script": "./BidService/server.js",
            "interpreter": "ls"
        },
        {
            "name": "message",
            "script": "./MessageService/server.js",
            "interpreter": "ls"
        }
    ]
}