import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [validated] = useState(false);

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

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      console.log(data);

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {showAlert && (
        <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-3">
          There seems to be an error with your signup details.
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={userFormData.username}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={userFormData.email}
          onChange={handleInputChange}
          required
          autoComplete="current-email"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
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
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;

