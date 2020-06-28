// export function api(type, userData) {
    
//     // Base URL
//     let baseURL = "http://localhost/proctorapp/rest-api/api/"

//     return new Promise((resolve, reject) => {
//         fetch(baseURL + type + ".php", {
//             method: 'POST',
//             body: JSON.stringify(userData)
//         })
//         .then((response) => response.json())
//         .then((res) => {
//             resolve(res)
//         })

//         .catch((error) => {
//             reject(error)
//         })
//     })
// }

import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost/proctorapp/rest-api/api', 
});


