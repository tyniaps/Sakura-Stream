import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import Auth from '../utils/auth';
import sakuraIcon from '/sakuraicon.png';


const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    return (
        <>
            <nav className="bg-pink-500 bg-opacity-40 text-white p-4 search-title">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src={sakuraIcon}
                            alt="Sakura Stream"
                            className="w-8 h-8 sm:w-12 sm:h-12 md:w-24 md:h-24 rounded-full"
                        />
                        <Link to="/"
                            className="text-lg sm:text-xl md:text-2xl font-bold ml-2 search-title">
                            SakuraStream
                        </Link>
                    </div>
                    <div>
                        {Auth.loggedIn() ? (
                            <>
                                <Link to='/saved'
                                    className="bg-pink-600 px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-pink-700 text-white text-sm sm:text-base mr-2 inline-block">    Check my Animes
                                </Link>
                                <button
                                    onClick={Auth.logout}
                                    className="bg-pink-700 px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-pink-800 text-white text-sm sm:text-base">                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-pink-600 px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-pink-700 text-white text-sm sm:text-base">                                Login/Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center modal-overlay ">
                    <div className="relative bg-white p-5 border w-96 shadow-lg rounded-md">
                        <div className="text-center">
                            <div className="flex justify-around mb-5">
                                <button
                                    className={`font-bold ${activeTab === 'login' ? 'underline' : ''}`}
                                    onClick={() => setActiveTab('login')}>
                                    Login
                                </button>
                                <button
                                    className={`font-bold ${activeTab === 'signup' ? 'underline' : ''}`}
                                    onClick={() => setActiveTab('signup')}>
                                    Sign Up
                                </button>
                            </div>
                            {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-pink-600 px-3 py-2 rounded hover:bg-pink-700 mt-4 text-white">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default AppNavbar;
