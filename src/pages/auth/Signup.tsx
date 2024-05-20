import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import GoogleSignIn from "../../components/GoogleSignIn";
import config from "../../config";

const Signup = () => {
    const base_url = config.BASE_URL;

    const [obscure, setObscure] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        capital: false,
        simple: false,
        number: false
    });

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
        let tempErrors = { name: "", email: "", password: "", cpassword: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = "Name is required";
            isValid = false;
        }
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

            // Hash the password using bcrypt
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(formData.password, salt);

            const postData = {
                name: formData.name,
                email: formData.email,
                password: hashedPassword
            }

            try {
                const response = await axios.post(base_url + "/register", postData);
                const responseType = response.data.message_type;
                setMessage(response.data.message);
                responseType === "error" ? setAlertType("alert alert-danger") : setAlertType("alert alert-" + responseType);
                setShowAlert(true);
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
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        placeholder="Enter name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
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
                                            value={formData.password}
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
                                    <label htmlFor="cpassword">Confirm Password:</label>
                                    <input
                                        className="form-control"
                                        type={inputType}
                                        name="cpassword"
                                        id="cpassword"
                                        placeholder="Confirm entered password"
                                        value={formData.cpassword}
                                        onChange={handleChange}
                                    />
                                    {errors.cpassword && <small className="text-danger">{errors.cpassword}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">{processing ? "Submitting..." : "Signup"}</button>
                                </div>
                            </div>
                        </form>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
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
                                <GoogleSignIn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
