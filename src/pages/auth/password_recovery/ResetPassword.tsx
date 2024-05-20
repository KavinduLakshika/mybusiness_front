import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import config from "../../../config";

const ResetPassword = () => {
    const base_url = config.BASE_URL;
    const navigate = useNavigate();

    const [obscure, setObscure] = useState(true);
    const [login, setLogin] = useState(false);
    const obscureIcon = obscure ? faEye : faEyeSlash;
    const inputType = obscure ? "password" : "text";
    const handleObscure = () => setObscure(!obscure);
    const [formData, setFormData] = useState({ password: "", cpassword: "" });
    const [errors, setErrors] = useState({ password: "", cpassword: "" });
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const email = localStorage.getItem('recovery_email');
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        capital: false,
        simple: false,
        number: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));

        if (id === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password: string) => {
        setPasswordValidity({
            length: password.length >= 8,
            capital: /[A-Z]/.test(password),
            simple: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        });
    };

    const validate = () => {
        let tempErrors = { password: "", cpassword: "" };
        let isValid = true;

        if (!formData.password) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else {
            if (!passwordValidity.length) {
                tempErrors.password = "Password must be at least 8 characters";
                isValid = false;
            }
            if (!passwordValidity.capital) {
                tempErrors.password = "Password must contain at least 1 capital letter";
                isValid = false;
            }
            if (!passwordValidity.simple) {
                tempErrors.password = "Password must contain at least 1 simple letter";
                isValid = false;
            }
            if (!passwordValidity.number) {
                tempErrors.password = "Password must contain at least 1 number";
                isValid = false;
            }
        }
        if (formData.password !== formData.cpassword) {
            tempErrors.cpassword = "Passwords do not match";
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
                email: email,
                password: formData.password
            }

            try {
                const response = await axios.post(base_url + "/change_password", postData);
                const responseType = response.data.message_type;

                if (responseType === "error") {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
                } else {
                    setMessage(response.data.message);
                    setAlertType("alert alert-" + responseType);
                    setShowAlert(true);
                    setLogin(true);
                    // onLogin(response.data.name, response.data.email, response.data.token, response.data.user_status, response.data.user_type, response.data.profile_completed);
                }
            } catch (error) {
                setMessage("Error submitting form:" + error);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="text-center">Reset Password</h3>
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

                        {login ?
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <Link to="/login">
                                        <button type="button" className="btn btn-warning w-100">Go to Login</button>
                                    </Link>
                                </div>
                            </div> :
                            null
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="password">New Password:</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type={inputType}
                                            name="password"
                                            id="password"
                                            placeholder="Enter new password"
                                            onChange={handleChange}
                                        />
                                        <button className="input-group-text cursor-pointer" type="button" id="obscure" onClick={handleObscure}>
                                            <FontAwesomeIcon icon={obscureIcon} />
                                        </button>
                                    </div>
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                    <div className="mt-2">
                                        <p className={passwordValidity.length ? "text-success" : "text-danger"}>
                                            <FontAwesomeIcon icon={passwordValidity.length ? faCheck : faTimes} /> At least 8 characters
                                        </p>
                                        <p className={passwordValidity.capital ? "text-success" : "text-danger"}>
                                            <FontAwesomeIcon icon={passwordValidity.capital ? faCheck : faTimes} /> At least 1 capital letter
                                        </p>
                                        <p className={passwordValidity.simple ? "text-success" : "text-danger"}>
                                            <FontAwesomeIcon icon={passwordValidity.simple ? faCheck : faTimes} /> At least 1 simple letter
                                        </p>
                                        <p className={passwordValidity.number ? "text-success" : "text-danger"}>
                                            <FontAwesomeIcon icon={passwordValidity.number ? faCheck : faTimes} /> At least 1 number
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="cpassword">Confirm New Password:</label>
                                    <input
                                        className="form-control"
                                        type={inputType}
                                        name="cpassword"
                                        id="cpassword"
                                        placeholder="Confirm entered password"
                                        onChange={handleChange}
                                    />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword