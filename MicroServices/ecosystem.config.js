module.exports = {
    "apps": [
    {
        "name": "admin",
        "script": "./AdminService/server.js",
        "exec_mode": 'cluster',
        "instances": 2,
        "interpreter": "docker exec -i admin /usr/local/bin/node"
    },
    {
        "name": "dispatch",
        "script": "./DispatchService/app.js",
        "exec_mode": 'cluster',
        "instances": 2,
        "interpreter": "docker exec -i dispatch /usr/local/bin/node"
    },
    {
        "name": "bid",
        "exec_mode": 'cluster',
        "instances": 2,
        "script": "./BidService/server.js",
        "interpreter": "docker exec -i bid /usr/local/bin/node"
    },
    {
        "name": "message",
        "exec_mode": 'cluster',
        "instances": 2,
        "script": "./MessageService/server.js",
        "interpreter": "docker exec -i ok /usr/local/bin/node"
    }
]
}