import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

interface RegOtpProps {
    email: string | null,
    changeStatus: (user_status: string) => void
}

const RegOtp: React.FC<RegOtpProps> = ({ email, changeStatus }) => {
    const base_url = config.BASE_URL;

    const [seconds, setSeconds] = useState<number>(30);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [formData, setFormData] = useState({ otp: "" });
    const [errors, setErrors] = useState({ otp: "" });
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setSeconds(30);
            setIsRunning(false);
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, seconds]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        let tempErrors = { otp: "" };
        let isValid = true;

        if (!formData.otp) {
            tempErrors.otp = "OTP is required";
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
                otp: formData.otp
            }

            try {
                const response = await axios.post(base_url + "/verify", postData);

                if (response.data.message_type === "success") {
                    changeStatus("active");
                } else {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
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
    }

    const resendOtp = async () => {
        setIsRunning(true);

        const postData = {
            email: email
        }

        try {
            const response = await axios.post(base_url + "/resend_otp", postData);

            if (response.data.message_type === "success") {
                setMessage(response.data.message);
                setAlertType("alert alert-success");
                setShowAlert(true);
            } else {
                setMessage(response.data.message);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            }
        } catch (error) {
            setMessage("Error submitting form:" + error);
            setAlertType("alert alert-danger");
            setShowAlert(true);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="text-center">Confirm OTP</h3>
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
                                <h6 className="text-center">Check your email and enter the OTP we've sent you.</h6>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        onChange={handleChange}
                                    />
                                    {errors.otp && <small className="text-danger">{errors.otp}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">{processing ? "Submitting..." : "Submit"}</button>
                                </div>
                            </div>
                        </form>

                        <hr />

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <button type="button" className="btn btn-outline-primary w-100" disabled={isRunning} onClick={resendOtp}>{isRunning ? "Wait " + seconds + " seconds" : "Resend OTP"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegOtp