import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import LogItem from './LogItem'

const App = () => {

	const [logs, setLogs] = useState([
		{
			id: 1,
			text: 'This is long one',
			priority: 'low',
			user: 'Brad',
			created: new Date().toString(),
		},

		{
			id: 2,
			text: 'This is long two',
			priority: 'high',
			user: 'Carolann',
			created: new Date().toString(),
		},
		
		{
			id: 3,
			text: 'This is long three',
			priority: 'moderate',
			user: 'Kate',
			created: new Date().toString(),
		}
	])



	return (
		<Container>
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
					{ logs.map((log) => (
						<LogItem />
					)) }
				</tbody>
			</Table>
		</Container>
	)
}

export default App
