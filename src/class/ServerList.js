const axios = require('axios')
const Server = require('./Server')

class ServerList {
    
    static getServerList(){
        return new Promise((resolve, reject) => {
            axios.default.get("https://api.scpslgame.com/lobbylist.php?format=json", {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0"
                }
            }).then(res => {
                var arr = new Array();
                for(var i in res.data){
                    arr.push(new Server(res.data[i]))
                }
                resolve(arr)
            }).catch(err => {
                reject("ServerList : " + err);
            })
        })
    }

    static searchServer(name, options) {
        return new Promise((resolve, reject) =>  {
            if(!options){
                options = {}
            }
            var limit = options.limit != undefined ? options.limit : 5
            var caseSensitive = options.caseSensitive
    
            var filter = caseSensitive ? name : name.toUpperCase()
            
            var arr = new Array()
            this.getServerList().then((serverlist) => {
                for(var i in serverlist){
    
                    var content = caseSensitive ? serverlist[i].info : serverlist[i].info.toUpperCase()
                    if(content.indexOf(filter) > -1){
                        arr.push(serverlist[i])
                        if(arr.length >= limit) 
                            break;
                    }
                }
                resolve(arr)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    static getServerByIp(ip, port){
        return new Promise((resolve, reject) => {            
            this.getServerList().then((serverlist) => {
                for(var i in serverlist){
                    if(serverlist[i].ip == ip && serverlist[i].port == port ){
                        resolve(serverlist[i])
                        return
                    }
                }
                resolve(null)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    static getServerById(id) {
        return new Promise((resolve, reject) => {            
            this.getServerList().then((serverlist) => {
                for(var i in serverlist){
                    if(serverlist[i].serverId == id){
                        resolve(serverlist[i])
                        return
                    }
                }
                resolve(null)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    static getServersByAccountId(id) {
        return new Promise((resolve, reject) => {            
            this.getServerList().then((serverlist) => {
                var arr = new Array()
                for(var i in serverlist){
                    if(serverlist[i].accountId == id){
                        arr.push(serverlist[i])
                    }
                }
                resolve(arr)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    static getServersByIsoCode(isoCode) {
        return new Promise((resolve, reject) => {            
            this.getServerList().then((serverlist) => {
                var arr = new Array()
                for(var i in serverlist){
                    if(serverlist[i].isoCode == isoCode){
                        arr.push(serverlist[i])
                    }
                }
                resolve(arr)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    static getServersByContinentCode(continentCode) {
        return new Promise((resolve, reject) => {            
            this.getServerList().then((serverlist) => {
                var arr = new Array()
                for(var i in serverlist){
                    if(serverlist[i].continentCode == continentCode){
                        arr.push(serverlist[i])
                    }
                }
                resolve(arr)
            }).catch((err) => {
                reject(err)
            });
        })
    }

}

module.exports = ServerList