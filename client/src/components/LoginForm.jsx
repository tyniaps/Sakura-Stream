import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            {showAlert && (
                <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-3">
                    Your username or password is incorrect, please try again.
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="Your email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-email"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <button
                type="submit"
                className="w-full p-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:bg-pink-600"
            >
                Submit
            </button>
        </form>
    );
};


export default LoginForm;
