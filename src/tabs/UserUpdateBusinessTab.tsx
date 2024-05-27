import React, { useEffect, useState } from 'react'
import config from '../config';
import axios from 'axios';

interface Props {
    email: string | null,
    userData: any
}

const UserUpdateBusinessTab = ({ email, userData }: Props) => {
    const base_url = config.BASE_URL;

    const [formData, setFormData] = useState({ name: "", address: "", city: "", postal: "", phone: "" });
    const [errors, setErrors] = useState({ name: "", address: "", city: "", postal: "", phone: "" });
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setFormData({
            name: userData.business.name,
            address: userData.business.address,
            city: userData.business.city,
            postal: userData.business.postal,
            phone: userData.business.phone
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
        let tempErrors = { name: "", address: "", city: "", postal: "", phone: "" };
        let isValid = true;

        if (!formData.name) {
            tempErrors.name = "Business name is required";
            isValid = false;
        }

        if (!formData.address) {
            tempErrors.address = "Business address is required";
            isValid = false;
        }

        if (!formData.city) {
            tempErrors.city = "City is required";
            isValid = false;
        }

        if (!formData.postal) {
            tempErrors.postal = "Postal code is required";
            isValid = false;
        }

        if (!formData.phone) {
            tempErrors.phone = "Contact number is required";
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
                name: formData.name,
                address: formData.address,
                city: formData.city,
                postal: formData.postal,
                phone: formData.phone,
            }

            try {
                const response = await axios.post(base_url + "/update_business", postData);

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
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="text-center">Update Business Details</h4>
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
                                    <label htmlFor="name">Business Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter business name"
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Enter address"
                                        onChange={handleChange}
                                        value={formData.address}
                                    />
                                    {errors.address && <small className="text-danger">{errors.address}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="city">City:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Enter city"
                                        onChange={handleChange}
                                        value={formData.city}
                                    />
                                    {errors.city && <small className="text-danger">{errors.city}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="postal">Address:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="postal"
                                        id="postal"
                                        placeholder="Enter postal code"
                                        onChange={handleChange}
                                        value={formData.postal}
                                    />
                                    {errors.postal && <small className="text-danger">{errors.postal}</small>}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="phone">Contact Number:</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter contact number"
                                        onChange={handleChange}
                                        value={formData.phone}
                                    />
                                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
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

export default UserUpdateBusinessTab