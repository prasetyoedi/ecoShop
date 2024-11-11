import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const dummyUsers = [
            { username: 'admin', password: 'admin', role: 'admin' },
        ];
        const user = dummyUsers.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('role', user.role);
            Swal.fire('Login Success!', 'Welcome back!', 'success');
            navigate('/manage-products');
        } else {
            Swal.fire('Login Failed', 'Invalid username or password', 'error');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">Login</h2>
            <form onSubmit={handleLogin} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
