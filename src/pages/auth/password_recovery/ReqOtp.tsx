import { Link } from "react-router-dom"

const ReqOtp = () => {
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

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <h6 className="text-center">Enter your email address to recieve an OTP.</h6>
                            </div>
                        </div>

                        <form>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input className="form-control" type="email" name="email" id="email" placeholder="Enter email" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <Link to="/pass_otp">
                                        <button type="button" className="btn btn-primary w-100">Submit</button>
                                    </Link>
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