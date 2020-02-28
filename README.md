# SCP SL Server List

A library to get servers from SCP SL Server List.

## Documentation

### Example

#### Get a server by IP

```js
const scpsl = require('scp-sl-server-list')
const serverList = scpsl.ServerList

serverList.getServerByIp('185.157.246.39', 7777).then((res) => {
    console.log(res) // It will print the wanted server
})
.catch((err) => {
    console.log(err) // If there is an error.
})

```

#### Search Server

```js
const scpsl = require('scp-sl-server-list')
const serverList = scpsl.ServerList

serverList.searchServer("Official", {limit : 2}).then((res) => {
    console.log(res) // It will print the server who has "Official" into their name
})
.catch((err) => {
    console.log(err) // If there is an error.
})

```

### Server Class

#### Field

|Name|Type|Description|
|----|----|-----------|
|serverId|number|The server ID of the server|
|accountId|number|The requester's account ID who request the verification|
|ip|string|The IP address of the server|
|port|string|The port of the server|
|players|string|The number of players connected on the server|
|distance|int|The distance between the requester and the server (in kilometer)|
|info|string|The name displayed into the server list without the color / size|
|pastebin|string|The pastebin ID of the info of the server|
|privateBeta|bool|If the server is a private beta (Patreon beta test for example)|
|friendlyFire|bool|If the server has the Friendly Fire activated|
|modded|bool|If the server is modded (EXILED / SMod 2 for example)|
|whitelist|bool|If the server is whitelisted|
|isoCode|string|The ISO Code of the country of the server|
|continentCode|string|The Continent Code of the contient of the server|
|latitude|number|The latitude who the server is located|
|longitude|number|The latitude who the server is located|
|official|string|If the server is official or not|

#### Function

|Name|Parameter|Return|Description|
|----|---------|------|-----------|
|getPastebinLink()|Nothing|string|Return the Pastebin Link of the server info|
|getPlayerNumber()|Nothing|number|Return the player number of the server|

### ServerList Class

#### Function

|Name|Parameter|Return|Description|
|----|---------|------|-----------|
|static getServerList()|Nothing|Promise\<Array\<Server>>|Return all the server list|
|static searchServer(filter, options?)|string filter : The search string \ SearchOptions options : The options of the search |Promise\<Array\<Server>>|Search a server by name / by info|
|static getServerByIp(ip, port)|string ip : The IP of the server \| number port : The port of the server|Promise\<Server>|Get a server by its IP address and port|
|static getServerById(id)|number id : The serverId of the server|Promise\<Server>|Get a server by its server ID|
|static getServersByAccountId(id)|number id : The accountId of the servers|Promise\<Array\<Server>>|Get servers by their account ID|
|static getServersByIsoCode(isoCode)|string isoCode : The isoCode of the servers|Promise\<Array\<Server>>|Get servers by their ISO code|
|static getServersByContinentCode(continentCode)|string continentCode : The continentCode of the servers|Promise\<Array\<Server>>|Get servers by their Continent code|

### SearchOptions Object

#### Field

|Name|Type|Description|
|----|----|-----------|
|limit|number|The limit of the given servers (Default `5`)|
|caseSensitive|bool|If the search is Case Sensitive or not (Default `false`)|