
const network = require('network')

// Get Public IP Address
export function publicIP(){
    const ip = network.get_public_ip(function(err, ip) {
        return ip
    })

    return ip
}

 