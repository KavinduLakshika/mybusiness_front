import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import GoogleSignIn from "../../components/GoogleSignIn.tsx";

const Login = () => {
    const [obscure, setObscure] = useState(true);
    const obscureIcon = obscure ? faEye : faEyeSlash;
    const inputType = obscure ? "password" : "text";
    const [formData, setFormData] = useState({ email: "", password: "", remember: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const handleObscure = () => setObscure(!obscure);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData);
            console.log("Signup successful!");
            // Proceed with form submission (e.g., API call)
        } else {
            console.log("Please correct the errors in the form.");
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
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
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
                                <GoogleSignIn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login