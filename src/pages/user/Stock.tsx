import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import SideBar from "../../components/SideBar"
import config from "../../config";
import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import EditStockModal from '../../modals/EditStockModal';

interface Props {
  email: string | null,
  onLogout: () => void;
}

const Stock = ({ email, onLogout }: Props) => {
  const base_url = config.BASE_URL;
  const tableColumns = [
    "Product Name", "Batch ID", "Available Quantity", "Buying Price", "Selling Price", "Man. Date", "Exp. Date", "Actions"
  ];

  const [formData, setFormData] = useState({
    prod_name: "",
    batch_id: "",
    qty: "",
    buying_price: "",
    selling_price: "",
    mfd: "",
    exp: ""
  });
  const [errors, setErrors] = useState({ prod_name: "", batch_id: "", qty: "", buying_price: "", selling_price: "" });
  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      await products();
    };

    fetchProducts();
  }, []);

  const products = async () => {
    try {
      setProcessing(true);

      const postData = {
        email: email
      }

      const response = await axios.post(base_url + "/api_get_products", postData);

      if (response.data.message_type === "error") {
        setMessage(response.data.message);
        setAlertType("alert alert-danger");
        // setShowAlert(true);
      } else {
        const productsData = response.data.message[0].products;
        addOptions(productsData);
        addTableData(productsData);
      }
    } catch (error) {
      setMessage("Error submitting form:" + error);
      setAlertType("alert alert-danger");
      setShowAlert(true);
    } finally {
      setProcessing(false);
    }
  }

  const addOptions = (productList: any) => {
    let optionsArray: string[] = [];

    for (let i = 0; i < productList.length; i++) {
      optionsArray.push(productList[i]["prod_name"]);
    }

    setOptions(optionsArray);
  }

  const addTableData = (productList: any[]) => {
    let dataArray: any[] = [];

    for (let i = 0; i < productList.length; i++) {
      for (let j = 0; j < productList[i]["batches"].length; j++) {
        dataArray.push([
          productList[i]["prod_name"],
          productList[i]["batches"][j]["batch_id"],
          productList[i]["batches"][j]["qty"],
          productList[i]["batches"][j]["buying_price"],
          productList[i]["batches"][j]["selling_price"],
          productList[i]["batches"][j]["mfd"] ? new Date(productList[i]["batches"][j]["mfd"]).toISOString().split('T')[0] : "-",
          productList[i]["batches"][j]["exp"] ? new Date(productList[i]["batches"][j]["exp"]).toISOString().split('T')[0] : "-",
          <button key={productList[i]["batches"][j]["_id"]} id={productList[i]["batches"][j]["_id"]} className="btn btn-primary w-100" onClick={(event) => handleTableButton(event, productList)}>Update</button>
        ]);
      }
    }

    setTableData(dataArray);
  }

  const handleTableButton = (event: React.MouseEvent<HTMLButtonElement>, data: any[]) => {
    const id = event.currentTarget.id;

    for (const product of data) {
      for (const batch of product.batches) {
        if (id === batch._id) {
          setUpdateData(batch);
          setModalOpen(true);
        }
      }
    }
  }

  const handleModalClose = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = () => {
    let tempErrors = { prod_name: "", batch_id: "", qty: "", buying_price: "", selling_price: "" };
    let isValid = true;

    if (!formData.prod_name.trim()) {
      tempErrors.prod_name = "Product name is required";
      isValid = false;
    }

    if (!formData.batch_id) {
      tempErrors.batch_id = "Batch ID is required";
      isValid = false;
    }

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

    setErrors(tempErrors);
    return isValid;
  };

  const handleTypeaheadChange = (selected: string | any[]) => {
    const updatedFormData = {
      ...formData,
      prod_name: selected.length > 0 ? selected[0] : ''
    };

    setFormData(updatedFormData);
  };

  const handleTypeaheadInputChange = (text: any) => {
    const updatedFormData = {
      ...formData,
      prod_name: text
    };

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setProcessing(true);

      const postData = {
        email: email,
        product: {
          prod_name: formData.prod_name,
          batches: [
            {
              batch_id: formData.batch_id,
              qty: formData.qty,
              buying_price: formData.buying_price,
              selling_price: formData.selling_price,
              mfd: formData.mfd,
              exp: formData.exp
            }
          ]
        }
      }

      try {
        const response = await axios.post(base_url + "/api_save_product", postData);
        const responseType = response.data.message_type;

        if (responseType === "error") {
          setMessage(response.data.message);
          setAlertType("alert alert-danger");
          setShowAlert(true);
        } else {
          setMessage(response.data.message);
          setAlertType("alert alert-" + responseType);
          setShowAlert(true);
          products();
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

  return (
    <SideBar onLogout={onLogout}>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Add to stock</h4>
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
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <label htmlFor="prod_name">Product Name:</label>
                      <Typeahead
                        id="prod_name"
                        labelKey="prod_name"
                        options={options}
                        selected={formData.prod_name ? [formData.prod_name] : []}
                        onChange={handleTypeaheadChange}
                        onInputChange={handleTypeaheadInputChange}
                      />
                      {errors.prod_name && <small className="text-danger">{errors.prod_name}</small>}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="batch_id">Batch ID:</label>
                      <input
                        id="batch_id"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                      />
                      {errors.batch_id && <small className="text-danger">{errors.batch_id}</small>}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="qty">Quantity:</label>
                      <input
                        id="qty"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                      />
                      {errors.qty && <small className="text-danger">{errors.qty}</small>}
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-3">
                      <label htmlFor="buying_price">Buying Price <small>(per unit)</small>:</label>
                      <input
                        id="buying_price"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                      />
                      {errors.buying_price && <small className="text-danger">{errors.buying_price}</small>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="selling_price">Selling Price <small>(per unit)</small>:</label>
                      <input
                        id="selling_price"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                      />
                      {errors.selling_price && <small className="text-danger">{errors.selling_price}</small>}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="mfd">Manufactured Date:</label>
                      <input
                        id="mfd"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="exp">Expiry Date:</label>
                      <input
                        id="exp"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 justify-content-end">
                    <div className="col-md-3">
                      <button type="submit" className="btn btn-primary w-100">{processing ? "Saving..." : "Save"}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Stock</h4>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-12">
                    <Table columns={tableColumns} data={tableData} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditStockModal open={modalOpen} handleClose={handleModalClose} data={updateData} email={email} updateTable={products} />
    </SideBar>
  )
}

export default Stock