import { Link } from "react-router-dom"

const ShopDetails = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5 justify-content-center">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-center">Business Details</h3>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <h6 className="text-center">Enter your business data and complete your profile.</h6>
              </div>
            </div>

            <form>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label htmlFor="name">Business Name:</label>
                  <input className="form-control" type="text" name="name" id="name" placeholder="Enter business name" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label htmlFor="address">Address:</label>
                  <input className="form-control" type="text" name="address" id="address" placeholder="Enter address" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label htmlFor="contact">Contact Number:</label>
                  <input className="form-control" type="number" name="contact" id="contact" placeholder="Enter contact number" />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <Link to="/dashboard">
                    <button type="button" className="btn btn-primary w-100">Save</button>
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

export default ShopDetails