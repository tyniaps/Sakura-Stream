import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    return (
        <>
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">SakuraStream</Link>
                    <div>
                        {Auth.loggedIn() ? (
                            <button onClick={Auth.logout} className="bg-pink-500 px-3 py-2 rounded hover:bg-pink-600 mr-2">Logout</button>
                        ) : (
                            <button onClick={() => setShowModal(true)} className="bg-blue-500 px-3 py-2 rounded hover:bg-blue-600">Login/Sign Up</button>
                        )}
                    </div>
                </div>
            </nav>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="flex justify-around mb-5">
                                <button
                                    className={`font-bold ${activeTab === 'login' ? 'underline' : ''}`}
                                    onClick={() => setActiveTab('login')}>Login</button>
                                <button
                                    className={`font-bold ${activeTab === 'signup' ? 'underline' : ''}`}
                                    onClick={() => setActiveTab('signup')}>Sign Up</button>
                            </div>
                            {activeTab === 'login' ? (
                                <Tab.Pane eventKey='login'>
                                    <LoginForm handleModalClose={() => setShowModal(false)} />
                                </Tab.Pane>
                            ) : (
                                <Tab.Pane eventKey='signup'>
                                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                                </Tab.Pane>
                            )}
                            <button onClick={() => setShowModal(false)} className="mt-3 bg-gray-300 px-3 py-2 rounded hover:bg-gray-400">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppNavbar;
