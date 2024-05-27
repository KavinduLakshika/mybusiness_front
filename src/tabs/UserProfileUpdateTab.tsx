import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";

interface Props {
    email: string | null,
    userData: any
}

const UserProfileUpdateTab = ({ email, userData }: Props) => {
    const base_url = config.BASE_URL;

    const [formData, setFormData] = useState({ name: "" });
    const [errors, setErrors] = useState({ name: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setFormData({
            name: userData.name
        })
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        let tempErrors = { name: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = "Name is required";
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
                name: formData.name
            }

            try {
                const response = await axios.post(base_url + "/change_name", postData);

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
            } finally {
                setProcessing(false);
            }
        } else {
            console.log("Please correct the errors in the form.");
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card mt-5 mb-5">
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <h4 className="text-center">Update User Profile</h4>
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

export default UserProfileUpdateTab