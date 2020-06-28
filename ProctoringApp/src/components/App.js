import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Login from './Login'
import api from '../service/api'
import axios from 'axios'
import qs from 'qs'
import Home from './Home'


const App = () => {

	const [loggedIn, setLoggedIn] = useState('')
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success'
	})

	const [logs, setLogs] = useState([
		{
			_id: 1,
			text: 'This is long one',
			priority: 'low',
			user: 'Brad',
			created: new Date().toString(),
		},

		{
			_id: 2,
			text: 'This is long two',
			priority: 'high',
			user: 'Carolann',
			created: new Date().toString(),
		},
		
		{
			_id: 3,
			text: 'This is long three',
			priority: 'moderate',
			user: 'Kate',
			created: new Date().toString(),
		}
	])


	function addItem(item){
		// Store to the state
		if	(item.text === '' || item.user === '' || item.priority === ''){
			showAlert('Please enter all fields', 'danger')
			return false
		}


		item._id = Math.floor(Math.random() * 90000) + 10000
		item.created = new Date().toString()
		setLogs([...logs, item])
		showAlert('Log Added!')
	}


	function deleteItem(_id){
		setLogs(logs.filter((item) => item._id !== _id))
		
		showAlert('Log Removed!')
	}


	function showAlert(message, variant = 'success', seconds = 3000) {
		setAlert({
			show: true,
			message,
			variant
		})

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success'
			})
		}, seconds)
	}




	const checkUserExist = (userData) => {
		
		
		// fetch("http://localhost/proctorapp/rest-api/api/login.php", {  
		// method: "POST",
		// body: JSON.stringify({
		// 	'email': email,
		// 	'password': password
		// })
		// }).then(function(response) {
		// 	console.log(response.body)

		// 	return response.json()
		// }).then(function(data) {
		// 	console.log(data);
		// });

		
		axios({
            method: 'post',
            url: 'http://localhost/proctorapp/rest-api/api/login.php',
            data: userData,
        })
        .then(function (response) {
            //handle success
            setLoggedIn(response.data.message)
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
		
	}


	if (loggedIn !== 'loggedin'){
		return (
			<Home />
		)
	}

	return (
		
		<Container>
			<Login checkUserExist={checkUserExist} />
		</Container>
	)
}

export default App
