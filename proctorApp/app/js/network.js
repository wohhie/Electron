const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = require('electron')
const path = require('path');
const osu = require('node-os-utils');
const network = require('network')
const axios = require('axios')
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os


const requiredOS = 'Windows'


// Computer Name
document.getElementById('comp-name').innerText = os.hostname()


// OS
const osType = os.type()


// setTimeout(function() {

//     const osTypeT = document.getElementById('os').innerHTML
//     const hostName = document.getElementById('comp-name').innerHTML
//     var   publicIP = document.getElementById('public-ip').innerHTML
//     const privateIP = document.getElementById('private-ip').innerHTML
//     var   vpn_ip = document.getElementById('openvpn-ip').innerHTML
//     const gatewayIP = document.getElementById('getway-ip').innerHTML
//     const activeInterface = document.getElementById('active-interface').innerHTML
//     const mac_address = document.getElementById('mac-address').innerHTML


//     axios.post('http://localhost:8000/api/network_interfaces/', {
//         pc_name: hostName,
//         os_type: osTypeT,
//         public_ip: publicIP,
//         private_ip: privateIP,
//         vpn_ip: vpn_ip,
//         gateway_ip: gatewayIP,
//         active_interface: activeInterface,
//         mac_address: mac_address,
//         user_id: 1
//     })
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((error) => {
//         console.error(error)
//     })

    
// }, 6000);



/*          CURRENT LOGGEDIN USER INFORMATION
=============================================================

*/
// const currentUser = require('electron').remote.getGlobal('GlobalUserData').userdata
// console.log(currentUser.fullname)























setInterval(function() {
    
    document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;
    // Check OS
    // if os is not windows then display a notification!!
    if(!osType.includes(requiredOS)){
        let myNotification = new Notification('Required Windows OS', {
            body: 'The application is only available for the windows user!'
        })
    }


    // Get Public IP Address
    var connection_status = false

    network.get_public_ip(function(err, ip) {
        document.getElementById('public-ip').innerText = ip

        if(ip == "74.208.28.87"){
            connection_status = true

        }else{
            connection_status = false
        }
    })

    network.get_active_interface(function(err, obj) {
        
        let type = obj.type
        let name = obj.name

        document.getElementById('active-interface').innerText = `${type} ${name}`
        document.getElementById('private-ip').innerText = obj.ip_address
        document.getElementById('getway-ip').innerText = obj.gateway_ip
        document.getElementById('mac-address').innerText = obj.mac_address

    })

    network.get_interfaces_list(function(err, list) {
        // connected to vpn
        if(connection_status){
            for (const prop in list) {
                var ip_address = (list[prop].ip_address != undefined) ? list[prop].ip_address : ''
                if(ip_address.includes("10.8.")){    
                    document.getElementById("openvpn-ip").innerText = ip_address




                    const osTypeT = document.getElementById('os').innerHTML
                    const hostName = document.getElementById('comp-name').innerHTML
                    var   publicIP = document.getElementById('public-ip').innerHTML
                    const privateIP = document.getElementById('private-ip').innerHTML
                    var   vpn_ip = document.getElementById('openvpn-ip').innerHTML
                    const gatewayIP = document.getElementById('getway-ip').innerHTML
                    const activeInterface = document.getElementById('active-interface').innerHTML
                    const mac_address = document.getElementById('mac-address').innerHTML


                    axios.post('http://localhost:8000/api/network_interfaces/', {
                        pc_name: hostName,
                        os_type: osTypeT,
                        public_ip: publicIP,
                        private_ip: privateIP,
                        vpn_ip: vpn_ip,
                        gateway_ip: gatewayIP,
                        active_interface: activeInterface,
                        mac_address: mac_address,
                        user_id: 34
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    break
                }
            }


            
        }else{
            document.getElementById("openvpn-ip").innerText = "VPN Disconnected"
        }

        /* list should be:
       
        [{
          name: 'eth0',
          ip_address: '10.0.1.3',
          mac_address: '56:e5:f9:e4:38:1d',
          type: 'Wired',
          netmask: '255.255.255.0',
          gateway_ip: '10.0.1.1' 
         },
         { ... }, { ... }]
       
        */
    })



}, 10000);





// Send Notification
function notifyUser(options){
    new Notification(options.title, options)
}