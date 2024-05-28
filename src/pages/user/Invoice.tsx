import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar"
import axios from "axios";
import config from "../../config";
import Table from "../../components/Table";
import ViewInvoiceItemsModal from "../../modals/ViewInvoiceItemsModal";

interface Props {
  email: string | null,
  onLogout: () => void;
}

const Invoice = ({ email, onLogout }: Props) => {
  const base_url = config.BASE_URL;

  const [processing, setProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [allProducts, setProducts] = useState([]);
  const [options, setOptions] = useState<string[]>([]);
  const [batches, setBatches] = useState<string[]>([]);
  const [selectedProdValue, setSelectedProdValue] = useState<string>('');
  const [selectedBatchValue, setSelectedBatchValue] = useState<string>('');
  const [formData, setFormData] = useState({ product: "", batch: "", qty: "" });
  const [errors, setErrors] = useState({ product: "", batch: "", qty: "" });
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [netTotal, setNetTotal] = useState(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const tableColumns = ["Date", "Total", "Items"];
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [singleInvoiceItems, setSingleInvoiceItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await products();
      await invoices();
    };

    fetchProducts();
  }, []);

  const invoices = async () => {
    try {
      setLoading(true);

      const postData = {
        email: email
      }

      const response = await axios.post(base_url + "/api_get_all_invoices", postData);

      if (response.data.message_type === "error") {
        setMessage(response.data.message);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } else {
        const invoiceData = response.data.message[0].invoices;
        addTableData(invoiceData);
      }
    } catch (error) {
      setMessage("Error submitting form:" + error);
      setAlertType("alert alert-danger");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  }

  const products = async () => {
    try {
      setLoading(true);

      const postData = {
        email: email
      }

      const response = await axios.post(base_url + "/api_get_products", postData);

      if (response.data.message_type === "error") {
        setMessage(response.data.message);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } else {
        const productsData = response.data.message[0].products;
        setProducts(productsData);
        addOptions(productsData);
      }
    } catch (error) {
      setMessage("Error submitting form:" + error);
      setAlertType("alert alert-danger");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  }

  const addOptions = (productList: any) => {
    let optionsArray: string[] = [];

    for (let i = 0; i < productList.length; i++) {
      optionsArray.push(productList[i]["prod_name"]);
    }

    setOptions(optionsArray);
  }

  const addBatches = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let batchesArray: string[] = [];
    const selectedProduct = event.target.value;
    setSelectedProdValue(selectedProduct);

    setFormData({
      ...formData,
      product: selectedProduct,
    });

    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i]["prod_name"] == selectedProduct) {
        const batches: any[] = allProducts[i]["batches"];
        for (let j = 0; j < batches.length; j++) {
          batchesArray.push(batches[j]["batch_id"]);
        }
      }
    }

    setBatches(batchesArray);
  }

  const selectedBatch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBatch = event.target.value;
    setSelectedBatchValue(selectedBatch);
    setFormData({
      ...formData,
      batch: selectedBatch,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = () => {
    let tempErrors = { product: "", batch: "", qty: "" };
    let isValid = true;

    if (!formData.product.trim()) {
      tempErrors.product = "Product name is required";
      isValid = false;
    }

    if (!formData.batch) {
      tempErrors.batch = "Batch ID is required";
      isValid = false;
    }

    if (!formData.qty) {
      tempErrors.qty = "Quantity is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const addInvoiceItems = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i]["prod_name"] == formData.product) {
          const batches: any[] = allProducts[i]["batches"];
          for (let j = 0; j < batches.length; j++) {
            if (batches[j]["batch_id"] == formData.batch) {
              const avQty = parseInt(batches[j]["qty"]);
              const invQty = parseInt(formData.qty);
              const unitPrice = parseFloat(batches[j]["selling_price"]);
              const totalPrice = unitPrice * invQty;

              if (avQty < invQty) {
                setMessage("Insufficient Stock");
                setAlertType("alert alert-danger");
                setShowAlert(true);
              } else {
                setShowAlert(false);

                const invoiceItem = {
                  batch_id: formData.batch,
                  prod_name: formData.product,
                  qty: formData.qty,
                  unit_price: unitPrice,
                  buying_price: batches[j]["buying_price"],
                  total_price: totalPrice
                };

                const net_total = netTotal + totalPrice;

                setNetTotal(net_total);
                setInvoiceItems((prevItems) => [...prevItems, invoiceItem]);
              }
            }
          }
        }
      }
    }
  }

  const removeInvoiceItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id);
    const total = netTotal - invoiceItems[index].total_price;
    setNetTotal(total);
    setInvoiceItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const saveInvoice = async () => {
    try {
      setProcessing(true);

      const postData = {
        email: email,
        invoice: {
          date: new Date().toISOString().split('T')[0],
          total: netTotal,
          items: invoiceItems
        }
      }

      console.log(postData);

      const response = await axios.post(base_url + "/api_save_invoice", postData);
      const responseType = response.data.message_type;

      if (responseType === "error") {
        setMessage(response.data.message);
        setAlertType("alert alert-danger");
        setShowAlert(true);
      } else {
        setMessage(response.data.message);
        setAlertType("alert alert-" + responseType);
        setShowAlert(true);
        setFormData({ batch: "", product: "", qty: "" });
        setSelectedBatchValue("");
        setSelectedProdValue("");
        setInvoiceItems([]);
        invoices();
      }
    } catch (error) {
      setMessage("Error submitting form:" + error);
      setAlertType("alert alert-danger");
      setShowAlert(true);
    } finally {
      setProcessing(false);
    }
  }

  const addTableData = (invoices: any[]) => {
    const dataArray: any[] = [];

    for (let i = 0; i < invoices.length; i++) {
      dataArray.push([
        new Date(invoices[i]["date"]).toISOString().split('T')[0],
        invoices[i]["total"],
        <button key={invoices[i]["_id"]} id={invoices[i]["_id"]} className="btn btn-primary" onClick={(event) => handleTableButton(event, invoices)}>View Items</button>
      ]);
    }

    setTableData(dataArray);
  }

  const handleTableButton = (event: React.MouseEvent<HTMLButtonElement>, data: any[]) => {
    const id = event.currentTarget.id;

    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        setSingleInvoiceItems(data[i]["items"]);
      }
    }

    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

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
                          <h4>New Invoice</h4>
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

                      <form onSubmit={addInvoiceItems}>
                        <div className="row mt-2">
                          <div className="col-md-4">
                            <label htmlFor="product">Select Product:</label>
                            <select name="product" id="product" className="form-control" value={selectedProdValue} onChange={addBatches}>
                              <option value="">- Select Product -</option>
                              {options.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            {errors.product && <small className="text-danger">{errors.product}</small>}
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="batch">Select Batch:</label>
                            <select name="batch" id="batch" className="form-control" value={selectedBatchValue} onChange={selectedBatch}>
                              <option value="">- Select Batch -</option>
                              {batches.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            {errors.batch && <small className="text-danger">{errors.batch}</small>}
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="qty">Quantity:</label>
                            <input type="number" name="qty" id="qty" className="form-control" onChange={handleChange} />
                            {errors.qty && <small className="text-danger">{errors.qty}</small>}
                          </div>
                        </div>

                        <div className="row mt-3 justify-content-end">
                          <div className="col-md-4">
                            <button className="btn btn-primary w-100" type="submit">Add Item</button>
                          </div>
                        </div>
                      </form>

                      <hr />

                      <div className="row mt-2">
                        <div className="col-md-12">
                          <table className="table table-hover table-responsive">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Batch</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceItems.map((item, index) => (
                                <tr>
                                  <td>{item.prod_name}</td>
                                  <td>{item.batch_id}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.unit_price}</td>
                                  <td>{item.total_price}</td>
                                  <td>
                                    <button type="button" className="btn btn-danger w-100" id={index + ""} onClick={removeInvoiceItem}>Remove</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <hr />

                      <div className="row mt-2 justify-content-end">
                        <div className="col-md-2">
                          <h4 className="text-end">Net Total:</h4>
                        </div>
                        <div className="col-md-2">
                          <h4 className="text-end">{netTotal}.00</h4>
                        </div>
                      </div>

                      <div className="row mt-3 justify-content-end">
                        <div className="col-md-4">
                          <button onClick={saveInvoice} type="button" className="btn btn-primary w-100">{processing ? "Saving..." : "Save Invoice"}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <h4>All Invoices</h4>
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
              <ViewInvoiceItemsModal data={singleInvoiceItems} handleClose={handleModalClose} open={modalOpen} />
            </div>
          )
      }
    </SideBar>
  )
}

export default Invoice