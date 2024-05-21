import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import config from "../../../config";

const ReqOtp = () => {
    const base_url = config.BASE_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "" });
    const [errors, setErrors] = useState({ email: "" });
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

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setProcessing(true);

            const postData = {
                email: formData.email
            }

            try {
                const response = await axios.post(base_url + "/send_recovery_otp", postData);
                const responseType = response.data.message_type;

                if (responseType === "error") {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
                } else {
                    // setMessage(response.data.message);
                    // setAlertType("alert alert-" + responseType);
                    // setShowAlert(true);
                    localStorage.setItem('recovery_email', formData.email);
                    navigate("/pass_otp");
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

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h6 className="text-center">Enter your email address to recieve an OTP.</h6>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">{processing ? "Submitting..." : "Submit"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReqOtp