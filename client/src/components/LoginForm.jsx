import { useState } from 'react'
import {placeholder} from 'tailwindcss'

import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userInputData, setUserInputData] = useState ({ email: '',password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUserInputData({ ...userInputData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropogation();
        }

        try {
            const response = await userLoginInfo(userInputData);

            if(!response.ok) {
                throw new Error('Oops! something is not right - please try again');
            }

            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        }   catch (err) { 
            console.error(err);
            setShowAlert(true); 
        }

        setUserInputData({
            username: '',
            email: '',
            password: '', 
        });
    };

    return ( 
        <> 
        <Form noValidate validated = {validated} onSubmit= {handleFormSubmit} >
           <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Your username or password is incorrect, please try again. </Alert> 
            
            <Form.Group className="placeholder" >
            <Form.Label html= "placeholder">Email</Form.Label>
            <Form.Control
             type= 'text'
             placeholder='Your email'
             name='email'
             onChange={handleUserInput}
             value={userInputData.email}
             required
             />

             <Form.Control.Feedback type= 'invalid'>An email address is required!</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className = "placeholder"    >
                    <Form.Label htmlFor= 'password'>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Your password'
                    name='password'
                    onChange={handleUserInput}
                    value={userFormData.password}
                    required
                    />
                <Form.Control.Feedback type= 'invalid'>A password is required!</Form.Control.Feedback>
               </Form.Group>
                <Button 
                disabled={!userFormData.email && userFormData.password}
                type='success'>
                Submit</Button>
                </Form>
                </>
            );
    };

    export default LoginForm; 
