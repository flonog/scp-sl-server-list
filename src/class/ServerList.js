const axios = require('axios')
const Server = require('./Server')

/**
 * The ServerList object
 */
class ServerList {

    /**
     * Get the entire Server List
     * @return {Promise<Array<Server>>}
     */
    
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

    /**
     * Search servers by their name
     * @param {String} name - The name of the server
     * @param {Object} [options] - The options of the server
     * @return {Promise<Array<Server>>}
     */

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

    /**
     * Search a server by its IP and Port
     * @param {String} ip - The IP address of the server
     * @param {Number} [port=7777] - The options of the server
     * @return {Promise<Server>}
     */


    static getServerByIp(ip, port = 7777){
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

    /**
     * Search a server by its ID
     * @param {Number} id - The ID of the server
     * @return {Promise<Server>}
     */

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

    /**
     * Get servers by their account ID
     * @param {Number} id - The account ID of the servers
     * @return {Promise<Array<Server>>}
     */

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

    /**
     * Get servers by their ISO Code
     * @param {String} isoCode - The ISO Code of the servers
     * @return {Promise<Array<Server>>}
     */

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

    /**
     * Get servers by their Continent Code
     * @param {String} continentCode - The Continent Code of the servers
     * @return {Promise<Array<Server>>}
     */

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