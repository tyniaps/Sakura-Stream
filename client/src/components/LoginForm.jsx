import { useState } from 'react'
import {placeholder} from 'tailwindcss'

import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userInputData, setUserInputData] = useState ({ email: '',password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);



    


    const [login, { error }] = useMutation(LOGIN_USER);
     useEffect(() => {

    if (error) {

      setShowAlert(true);

    } else {

      setShowAlert(false);

    }

  }, [error]);
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
            const { data } = await login({

                variables: { ...userFormData },
        
              });
        
              console.log(data);
        
              Auth.login(data.login.token);
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
    