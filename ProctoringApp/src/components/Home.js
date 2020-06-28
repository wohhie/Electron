import React, { Component, useState, useEffect } from 'react'
import { Table} from 'react-bootstrap'
const path = require('path');
const osu = require('node-os-utils');
import {publicIP} from './network.js'

const cpu = osu.cpu
const mem = osu.mem
const os = osu.os



class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            hostName: os.hostname(),
            osType: `${os.type()} ${os.arch()}`,
            public_ip: ''
            
            
        }
    }

    componentWillMount (){
        const public_ip_address = publicIP()
        console.log(publicIP())
    }

    

    render(){
        console.log(this.state.public_ip)
        return(
            <div>
                {this.state.public_ip !== '' ? 
                
                <div>
                <div>
                    <h5><strong>Computer Name: </strong><span> {this.state.hostName} </span></h5>
                    <h5><strong>OS: </strong><span> { this.state.osType } </span></h5>
                    <h5><strong>Public IP Address: </strong><span>{ this.state.public_ip }</span></h5>
                    <h5><strong>Private IP Address: </strong><span></span></h5>
                    <h5><strong>Gateway IP Address: </strong><span></span></h5>
                    <h5><strong>Active Interface: </strong><span></span></h5>
                </div>

                <Table>
                    <thead>
                        <tr>
                            <th>Priority</th>
                            <th>Log Text</th>
                            <th>User</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* { logs.map((log) => (
                            <LogItem key={log._id} log={log} deleteItem={deleteItem} />
                        )) } */}
                    </tbody>
                </Table>

            </div>
                
                
                
                : <h1>Loading</h1> }
            </div>
        );
    }
    
}


export default Home
