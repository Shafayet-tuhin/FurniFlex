import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../../assets/login & reg/logo.png';
import navLogo from '../../assets/Logo/logo.png';

const Login = () => {
    const { signIn, signWithGoogle, passReset } = useContext(AuthContext);
    const navigate = useNavigate();
    const [see, setSee] = useState(true);
    const [pass, setPass] = useState(true);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then((res) => {
                const user = res.user;
                navigate('/');
                Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                });
            })
            .catch((err) => console.log(err));
    };

    const handleGoogle = () => {
        signWithGoogle()
            .then((res) => {
                const { user } = res;
                navigate('/');
                Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                });
            })
            .catch((err) => console.log(err));
    };

    const handleSee = (e) => {
        e.preventDefault();
        setSee(!see);
        setPass(!pass);
    };

    const handleForget = (e) => {
        e.preventDefault();
        if (!email) {
            Swal.fire({
                title: "Please enter your email",
                icon: "warning"
            });
            return;
        }

        passReset(email)
            .then((res) => {
                Swal.fire({
                    title: "Password reset link has been sent to your email",
                    icon: "success"
                });
            })
            .catch((err) => console.log('Error in password reset', err));
    };

    return (
        <div className="flex h-screen">
            <div className="lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
                    <p className="text-center text-gray-500">Enter your credentials to access your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                name='email'
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
                                    name='password'
                                    required
                                />
                                <button className="absolute inset-y-0 right-3 top-3" onClick={handleSee}>
                                    {see ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <label className="label">
                                <a onClick={handleForget} href="#" className="label-text-alt link link-hover">Forgot Password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-4">
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" className="checkbox checkbox-primary" required />
                                <span>I agree to the <a href="#" className="link link-primary">Terms & Policy</a></span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Sign In</button>
                        </div>

                        <div className="divider">or</div>

                        <div className="flex justify-center gap-4">
                            <button className="btn btn-outline w-full" onClick={handleGoogle}>
                                <FcGoogle className="mr-2" /> Sign in with Google
                            </button>
                        </div>

                        <p className="text-center mt-4">Dont have an account? <Link to='/register' className="text-primary">Sign In</Link></p>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${logo})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full">
                    <img className='w-16 h-16 rounded-full' src={navLogo} alt="" />
                    <div className="text-center text-white space-y-4">
                        <h1 className="text-4xl font-bold">Furni<span className='text-[#1E99F5]'>Flex</span> </h1>
                        <p className="text-lg">Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
