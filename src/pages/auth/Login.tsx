import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/Firebase.js";
import GoogleSignIn from "../../components/GoogleSignIn.tsx";
import config from "../../config.ts";

interface LoginProps {
    onLogin: (name: string, email: string, token: string, user_status: string, user_type: string, profile_completed: boolean) => void,
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const base_url = config.BASE_URL;

    const [obscure, setObscure] = useState(true);
    const obscureIcon = obscure ? faEye : faEyeSlash;
    const inputType = obscure ? "password" : "text";
    const [formData, setFormData] = useState({ email: "", password: "", remember: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const handleObscure = () => setObscure(!obscure);
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        let tempErrors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
        }
        if (!formData.password) {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setProcessing(true);

            const postData = {
                email: formData.email,
                password: formData.password
            }

            try {
                const response = await axios.post(base_url + "/login", postData);
                const responseType = response.data.message_type;

                if (responseType === "error") {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
                } else {
                    // setMessage(response.data.message);
                    // setAlertType("alert alert-" + responseType);
                    // setShowAlert(true);
                    onLogin(response.data.name, response.data.email, response.data.token, response.data.user_status, response.data.user_type, response.data.profile_completed);
                }

            } catch (error) {
                setMessage("Error submitting form:" + error);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            } finally {
                setProcessing(false);
            }
        } else {
            console.log("Please correct the errors in the form.");
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle successful sign-in
            const user = result.user;

            const postData = {
                name: user.displayName,
                email: user.email,
                social: "Google",
                image: user.photoURL
            }

            const response = await axios.post(base_url + "/social_sign", postData);
            const responseType = response.data.message_type;

            if (responseType === "error") {
                setMessage(response.data.message);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            } else {
                // setMessage(response.data.message);
                // setAlertType("alert alert-" + responseType);
                // setShowAlert(true);
                onLogin(response.data.name, response.data.email, response.data.token, response.data.user_status, response.data.user_type, response.data.profile_completed);
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            // Handle errors
            setMessage("Error signing in with Google:" + error);
            setAlertType("alert alert-danger");
            setShowAlert(true);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="text-center"><Link to="/">My Business</Link></h3>
                            </div>
                        </div>

                        {showAlert ?
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <div className={alertType}>
                                        {message}
                                    </div>
                                </div>
                            </div> :
                            null
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email address"
                                        onChange={handleChange}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="password">Password:</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type={inputType}
                                            name="password"
                                            id="password"
                                            placeholder="Enter password"
                                            onChange={handleChange}
                                        />
                                        <button className="input-group-text cursor-pointer" type="button" id="obscure" onClick={handleObscure}>
                                            <FontAwesomeIcon icon={obscureIcon} />
                                        </button>
                                    </div>
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <Link to="/req_otp">
                                        <p><strong>Forgot Password?</strong></p>
                                    </Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <input type="checkbox" className="form-check-input mx-2" id="remember" onChange={handleChange} />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">{processing ? "Logging in..." : "Login"}</button>
                                </div>
                            </div>
                        </form>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <p className="text-center">Don't have an account? <Link to="/signup">Signup</Link></p>
                            </div>
                        </div>

                        <div className="row mt-1">
                            <div className="col-md-5">
                                <hr />
                            </div>
                            <div className="col-md-2 mt-1">
                                <p className="text-center">OR</p>
                            </div>
                            <div className="col-md-5">
                                <hr />
                            </div>
                        </div>

                        <div className="row mt-3 justify-content-center">
                            <div className="col-md-2">
                                <GoogleSignIn signIn={handleGoogleSignIn} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login