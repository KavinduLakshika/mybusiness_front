import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PassOtp = () => {
    const [seconds, setSeconds] = useState<number>(30);
    const [isRunning, setIsRunning] = useState<boolean>(true);

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

    const resendOtp = () => {
        setIsRunning(true);
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

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h6 className="text-center">Check your email and enter the OTP we've sent you.</h6>
                            </div>
                        </div>

                        <form>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input className="form-control" type="number" name="otp" id="otp" placeholder="Enter OTP" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <Link to="/reset_pass">
                                        <button type="button" className="btn btn-primary w-100">Submit</button>
                                    </Link>
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

export default PassOtp