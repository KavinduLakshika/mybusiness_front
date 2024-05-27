import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

interface Props {
    open: boolean,
    data: any,
    email: string | null,
    handleClose: () => void,
    updateTable: () => Promise<void>
}

const EditStockModal = ({ open, handleClose, data, email, updateTable }: Props) => {
    const base_url = config.BASE_URL;

    const [modalOpen, setModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({ qty: "", buying_price: "", selling_price: "", _id: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        qty: "",
        buying_price: "",
        selling_price: "",
        mfd: "",
        exp: "",
        _id: ""
    });
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        p: 4,
    };

    useEffect(() => {
        setModalOpen(open);
        if (open) {
            setErrors({ qty: "", buying_price: "", selling_price: "", _id: "" });
            setShowAlert(false);
            populateForm();
        }
    }, [open]);

    const populateForm = () => {
        setFormData({
            qty: data.qty || "",
            buying_price: data.buying_price || "",
            selling_price: data.selling_price || "",
            mfd: data.mfd || "",
            exp: data.exp || "",
            _id: data._id || ""
        });
    }

    const formatDate = (date: string | number | Date) => {
        if (date != null) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
            const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if needed
            return `${year}-${month}-${day}`;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) {
            try {
                setProcessing(true);

                const postData = {
                    email: email,
                    _id: formData._id,
                    data: {
                        qty: formData.qty,
                        buying_price: formData.buying_price,
                        selling_price: formData.selling_price,
                        mfd: formData.mfd,
                        exp: formData.exp
                    }
                }

                const response = await axios.post(base_url + "/api_update_batch", postData);

                if (response.data.message_type === "error") {
                    setMessage(response.data.message);
                    setAlertType("alert alert-danger");
                    setShowAlert(true);
                } else {
                    setMessage(response.data.message);
                    setAlertType("alert alert-success");
                    setShowAlert(true);
                    await updateTable();
                }
            } catch (error) {
                setMessage("Error submitting form:" + error);
                setAlertType("alert alert-danger");
                setShowAlert(true);
            } finally {
                setProcessing(false);
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        let tempErrors = { qty: "", buying_price: "", selling_price: "", _id: "" };
        let isValid = true;

        if (!formData.qty) {
            tempErrors.qty = "Quantity is required";
            isValid = false;
        }

        if (!formData.buying_price) {
            tempErrors.buying_price = "Buying price is required";
            isValid = false;
        }

        if (!formData.selling_price) {
            tempErrors.selling_price = "Selling price is required";
            isValid = false;
        }

        if (!formData._id) {
            tempErrors._id = "Document id is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Modal
                        open={modalOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update the stock
                            </Typography>

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
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        {errors._id && <small className="text-danger">{errors._id}</small>}
                                        <label htmlFor="qty">Quantity:</label>
                                        <input
                                            id="qty"
                                            type="number"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.qty}
                                        />
                                        {errors.qty && <small className="text-danger">{errors.qty}</small>}
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="buying_price">Buying Price <small>(per unit)</small>:</label>
                                        <input
                                            id="buying_price"
                                            type="number"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.buying_price}
                                        />
                                        {errors.buying_price && <small className="text-danger">{errors.buying_price}</small>}
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="selling_price">Selling Price <small>(per unit)</small>:</label>
                                        <input
                                            id="selling_price"
                                            type="number"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.selling_price}
                                        />
                                        {errors.selling_price && <small className="text-danger">{errors.selling_price}</small>}
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label htmlFor="mfd">Manufactured Date:</label>
                                        <input
                                            id="mfd"
                                            type="date"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(formData.mfd)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="exp">Expiry Date:</label>
                                        <input
                                            id="exp"
                                            type="date"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(formData.exp)}
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3 justify-content-end">
                                    <div className="col-md-3">
                                        <button type="submit" className="btn btn-primary w-100">{processing ? "Saving..." : "Save"}</button>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default EditStockModal