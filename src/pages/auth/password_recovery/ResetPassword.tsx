import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [obscure, setObscure] = useState(true);
    const obscureIcon = obscure ? faEye : faEyeSlash;
    const inputType = obscure ? "password" : "text";
    const handleObscure = () => setObscure(!obscure);

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

                        <form>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="password">New Password:</label>
                                    <div className="input-group">
                                        <input className="form-control" type={inputType} name="password" id="password" placeholder="Enter new password" />
                                        <button className="input-group-text cursor-pointer" type="button" id="obscure" onClick={handleObscure}>
                                            <FontAwesomeIcon icon={obscureIcon} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="cpassword">Confirm New Password:</label>
                                    <input className="form-control" type={inputType} name="password" id="cpassword" placeholder="Confirm entered password" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <Link to="/login">
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

export default ResetPassword