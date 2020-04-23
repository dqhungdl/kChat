import React, { useState } from 'react';
import {
    useLocation,
    Link,
    Redirect
} from 'react-router-dom';
import AuthContainer from './AuthContainer.jsx';
import ClientInstance from '../../Client.js';
import Checkbox from '../Checkbox.jsx';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [didAgree, setDidAgree] = useState(false);
    const [redirectToReferer, setRedirectToReferer] = useState(false);
    const [errored, setErrored] = useState(false);

    let handleResponse = (response) => {
        console.log(response.data.detail);
        setRedirectToReferer(true);
    }   

    let handleError = (error) => {
        setErrored(true);
        console.log('An error occurred: ' + error);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        if (!didAgree) return;
        ClientInstance.postSignup(username, email, password, repassword, firstName, lastName)
            .then(handleResponse)
            .catch(handleError);
    }

    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    if (redirectToReferer) {
        return (
            <Redirect to={from}/>
        )
    }

    return (
        <AuthContainer authName="register">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-head">
                            <Link to="/" className="logo">
                                <img src="../../../public/assets/images/logo.svg" className="img-fluid" alt="logo"/>
                            </Link>
                        </div>                                        
                        <h4 className="text-primary my-4">Sign Up !</h4>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                id="re-password"
                                placeholder="Re-Type Password"
                                value={repassword}
                                onChange={e => setRePassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="form-row mb-3">
                            <div className="col-sm-12">
                                <Checkbox
                                    name={"I Agree to Terms & Conditions of Gappa"}
                                    showName={true}
                                    style="custom-checkbox text-left"
                                    checked={didAgree}
                                    onChange={(e) => {setDidAgree(e.target.checked)}}
                                />                             
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg btn-block font-18">Register</button>
                    </form>
                    <p className="mb-0 mt-3">{"Already have an account? "}
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </AuthContainer>
    )
}