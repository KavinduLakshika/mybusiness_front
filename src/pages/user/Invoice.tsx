import SideBar from "../../components/SideBar";

function Invoice() {
  return (
    <SideBar>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="row mt-2">
              <div className="col-md-12">
                <div className="alert alert-danger">
                  "Error: Error connecting to the server: Axios error: Server Timeout"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Invoice;
