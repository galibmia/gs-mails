import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for show/hide
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password)
    }

    return (
        <div className='mx-auto login border border-gray-200 rounded-md'>
            <form onSubmit={handleLogin} className="flex max-w-md mx-auto flex-col gap-4">
                <div>
                    <h1 className='title text-center'>GS Mails</h1>
                    <h1 className='title-lg text-center'>Sign In</h1>
                </div>
                <div className='mt-10'>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput className='input custom-width'  name='email' id="email1" type="email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <div className="relative flex">
                        <TextInput id="password1" className='custom-width' name='password' type={showPassword ? "text" : "password"} required />
                        <button type="button" className="password-toggle-btn margin-left" onClick={handleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" className='checkbox focus:outline-none focus:ring-0' />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button className='btn focus:outline-none focus:ring-0 custom-width' type="submit">Login</Button>
            </form>
            <div>
                <h3 className='text-center font-bold margin-5'>Demo Login Credential Information.</h3>
                <p className='text-center'><span className='font-bold'>Email:</span> admin@example.com
                    <br /> <span className='font-bold'>Password:</span> 12345678
                </p>
            </div>
        </div>
    );
}

export default Login;
