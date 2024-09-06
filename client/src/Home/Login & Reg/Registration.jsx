import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../../assets/login & reg/logo.png';
import navLogo from '../../assets/Logo/logo.png';
import { updateProfile } from "firebase/auth";

const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        createUser(email, password)
            .then((res) => {
                const user = res.user;

              
                updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                })
                .then(() => {
                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                    });
                    navigate("/");
                })
                .catch((err) => console.log('Error updating profile:', err));

            })
            .catch((err) => console.log(err.message));
    };

    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };

    return (
        <div className="flex h-screen">
            <div className="lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center">Create Your Account</h1>
                    <p className="text-center text-gray-500">Fill in the details to get started</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="input input-bordered w-full"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="input input-bordered w-full"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Email address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={pass ? 'password' : 'text'}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button className="absolute inset-y-0 right-3 top-3" onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Register</button>
                        </div>

                        <div className="divider">or</div>

                        <p className="text-center mt-4">Already have an account? <Link to='/login' className="text-primary">Sign In</Link></p>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${logo})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full">
                    <img className='w-16 h-16 rounded-full' src={navLogo} alt="Logo" />
                    <div className="text-center text-white space-y-4">
                        <h1 className="text-4xl font-bold">Furni<span className='text-[#1E99F5]'>Flex</span> </h1>
                        <p className="text-lg">Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
