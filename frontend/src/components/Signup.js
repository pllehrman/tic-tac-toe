import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const nagivate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/users`, { firstname, lastname, email });
      nagivate('/home'); // Redirect to the login page or dashboard after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const checkEmail = async (newEmail) => {
    try {
        console.log(newEmail);
        const response = await axios.get(`${apiUrl}/users/check-email`, {
            params: { email: newEmail}
        });

       
        const booleanVal = response.data.isUnique; //this holds whether the email is unique within the db
        console.log(response.data.isUnique);

        if (!booleanVal){
            setEmailMessage('Email is available.');
        } else {
            setEmailMessage('Email is already taken.');
        }
    } catch (error) {
        console.error('Error in validating email', error);
    }
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    debouncedCheckEmail(newEmail);
  }
  
  const debounce = (func, delay) => {
    let timer;

    return(...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
  };

  const debouncedCheckEmail = useCallback(debounce(checkEmail, 1000), []);

  const emailMessageClass = emailMessage === 'Email is available.'
    ? 'text-green-500'
    : 'text-red-500';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">
                First Name:
            </label>
            <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className={`text-sm mt-2 ${emailMessageClass}`}>{emailMessage}</p>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  

export default Signup;
