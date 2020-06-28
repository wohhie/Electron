import React, { useState } from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'

const Login = ({ checkUserExist }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        checkUserExist({ email, password })
        // getting the user email address and password. 

        
        // Set everything to Null
        setEmail('')
        setPassword('')


        // Display Login Icon
        

    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className='my-4'>
                <Col>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Row>

            <Row className='my-3'>
                <Col>
                    <Form.Label>Password</Form.Label> 
                    <Form.Control placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Col>
            </Row>
            



            <Row className='my-3'>
                <Col>
                    <Button type='submit' variant='secondary' block>
                        Add Log
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Login
