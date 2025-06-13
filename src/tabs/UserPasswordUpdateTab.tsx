import { faCheck, faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import config from '../config';
import axios from 'axios';

interface Props {
    email: string | null
}

const UserPasswordUpdateTab = ({ email }: Props) => {
    const base_url = config.BASE_URL;

    const [formData, setFormData] = useState({ password: "", cpassword: "" });
    const [errors, setErrors] = useState({ password: "", cpassword: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [processing, setProcessing] = useState(false);
    const [obscure, setObscure] = useState(true);
    const obscureIcon = obscure ? faEye : faEyeSlash;
    const inputType = obscure ? "password" : "text";


    const handleObscure = () => setObscure(!obscure);

    

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
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card mt-5 mb-5">
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <h4 className="text-center">Update Password</h4>
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
                                    <button type="submit" className="btn btn-primary w-100">{processing ? "Submitting..." : "Save"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPasswordUpdateTab