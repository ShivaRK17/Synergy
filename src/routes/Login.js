import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { AppContext } from '../context/AppContext';


// const baseUrl = "http://localhost:8000"

const Login = () => {
    const { setIsuserlogin,getUserDetails } = useContext(AppContext);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [submit, setSubmit] = useState("Submit")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit("Logging in...")
        try {
        const response = await fetch(`http://localhost:8000/api/auth/loginFarmer`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ phoneNumber, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.Success) {
            //Redirect to home  
            localStorage.setItem('authToken', json.authToken)
            await getUserDetails();
            // props.showAlert("Login Successful","success")
            setIsuserlogin(true)
            alert("Logged in success")
            navigate("/")
        }
        else {
            setSubmit("Submit")
            // alert("Invalid Creds")
            // props.showAlert("Invalid Credentials","danger")
            alert("Invalid Creds")
        }
    } catch (error) {
        console.log(error.message);
    }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form method='POST' className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="number"
                    id="phoneNumber"
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">{submit}</button>
            </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
        </div>
    );
};

export default Login;
