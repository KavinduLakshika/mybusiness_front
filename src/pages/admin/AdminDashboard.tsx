import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar"
import Table from "../../components/Table"
import axios from "axios";
import config from "../../config";
import { faCheck, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: Props) => {
    const base_url = config.BASE_URL;

    const tableColumns = ["Name", "Email", "User Type", "User Status", "Business Name", "Address", "Phone", "Actions"];
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [obscure, setObscure] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [processing, setProcessing] = useState(false);
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

    useEffect(() => {
        const fetchUsers = async () => {
            await users();
        }

        fetchUsers();
    }, [])

    const users = async () => {
        try {
            setLoading(true);
            const response = await axios.post(base_url + "/api_get_all_users");

            if (response.data.message_type === "error") {

            } else {
                addTableData(response.data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const changeStatus = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.id;

        try {
            const postData = {
                email: id
            }

            const response = await axios.post(base_url + "/api_change_status", postData);

            if (response.data.message_type === "error") {
                setMessage(response.data.message);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            } else {
                setMessage(response.data.message);
                setAlertType("alert alert-success");
                setShowAlert(true);
                users();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addTableData = (users: any[]) => {
        const dataArray: any[] = [];

        for (let i = 0; i < users.length; i++) {
            dataArray.push([
                users[i]["name"],
                users[i]["email"],
                users[i]["user_type"],
                users[i]["user_status"],
                users[i]["business"] ? users[i]["business"].name : "-",
                users[i]["business"] ? users[i]["business"].address : "-",
                users[i]["business"] ? users[i]["business"].phone : "-",
                <button key={users[i]["email"]} id={users[i]["email"]} className="btn btn-primary" onClick={changeStatus}>Change User Status</button>
            ]);
        }

        setTableData(dataArray);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setProcessing(true);

            const postData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }

            try {
                const response = await axios.post(base_url + "/api_new_admin", postData);
                const responseType = response.data.message_type;

                if (responseType === "error") {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
                } else {
                    setMessage(response.data.message);
                    setAlertType("alert alert-success");
                    setShowAlert(true);
                    users();
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
        <SideBar onLogout={onLogout}>
            {
                loading ?
                    (
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <h3 className="text-center">
                                    Loading.....
                                </h3>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="container-fluid">
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <h4>System Users</h4>
                                                </div >
                                            </div >

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

                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <Table columns={tableColumns} data={tableData} />
                                                </div>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                            </div >

                            <div className="row mt-3 mb-3 justify-content-center">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mt-2">
                                                <div className="col-md-12">
                                                    <h4>Add New Admin</h4>
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
                                                        <button type="submit" className="btn btn-primary w-100">{processing ? "Submitting..." : "Save"}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
            }
        </SideBar >
    )
}

export default AdminDashboard