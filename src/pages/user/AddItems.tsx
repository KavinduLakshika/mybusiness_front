function AddItems() {
  return (
    <div className="container-fluid">  
      <div className="row d-flex justify-content-center">
        <div className="mt-3">
          <h3 className="text-center">My Business</h3>
          <h4 className="text-center">Add Items</h4>
        </div>
        <div className="col-md-4 mt-1 p-2">
            <form>
              <fieldset>
                <div className="row mt-3">
                  <div className="col-md-12 form-floating">
                    <input type="text" id="itemname" className="form-control" placeholder="Item Name"/>
                    <label>Item Name</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 form-floating">
                    <input type="text" id="batchnumber" className="form-control" placeholder="Batch Number"/>
                    <label>Batch Number</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 form-floating">
                    <input type="date" id="mdfdate" className="form-control" placeholder="MDF Date"/>
                    <label>MDF Date</label>
                  </div>
                  <div className="col-md-6 form-floating">
                    <input type="date" id="expdate" className="form-control" placeholder="EXP Date"/>
                    <label>EXP Date</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 form-floating">
                    <input type="text" id="qty" className="form-control" placeholder="Item Name"/>
                    <label>Quantity</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6 form-floating">
                    <input type="text" id="billingprice" className="form-control" placeholder="Billing Price"/>
                    <label>Buying Price</label>
                  </div>
                  <div className="col-md-6 form-floating">
                    <input type="text" id="sellingprice" className="form-control" placeholder="Selling Price"/>
                    <label>Selling Price</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary d-grid w-100 waves-effect waves-light">
                      Add
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
