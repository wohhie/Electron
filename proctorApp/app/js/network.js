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
console.log(osType)


setTimeout(function(){ 

    const hostName = document.getElementById('comp-name').innerHTML
    const osType = document.getElementById('os').innerHTML
    const publicIP = document.getElementById('public-ip').innerHTML
    const privateIP = document.getElementById('private-ip').innerHTML
    const gatewayIP = document.getElementById('getway-ip').innerHTML
    const activeInterface = document.getElementById('active-interface').innerHTML


    axios.post('http://localhost:8000/api/network_interfaces/', {
        pc_name: 'Windows - Sifat',
        os_type: osType,
        public_ip: publicIP,
        private_ip: privateIP,
        gateway_ip: gatewayIP,
        active_interface: activeInterface,
        user_id: 1
    })
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        console.error(error)
    })

    
}, 4000);




document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Check OS
// if os is not windows then display a notification!!
if(!osType.includes(requiredOS)){
    let myNotification = new Notification('Required Windows OS', {
        body: 'The application is only available for the windows user!'
    })
}




// Get Public IP Address
network.get_public_ip(function(err, ip) {
    document.getElementById('public-ip').innerText = ip
})

// Get private IP Address
network.get_private_ip(function(err, ip) {
    document.getElementById('private-ip').innerText = ip
})


// Get private IP Address
network.get_gateway_ip(function(err, ip) {
    document.getElementById('getway-ip').innerText = ip
})


network.get_active_interface(function(err, obj) {
    
    let type = obj.type
    let name = obj.name

    document.getElementById('active-interface').innerText = `${type} ${name}`
    /* obj should be:
    { name: 'eth0',
      ip_address: '10.0.1.3',
      mac_address: '56:e5:f9:e4:38:1d',
      type: 'Wired',
      netmask: '255.255.255.0',
      gateway_ip: '10.0.1.1' }
   
    */

  })



  // Send Notification
  function notifyUser(options){
      new Notification(options.title, options)
  }