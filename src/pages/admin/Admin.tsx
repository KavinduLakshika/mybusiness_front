import Card from "../../components/Card"
import Table from "../../components/Table"

const Admin = () => {
const data = {
    "cols": [
        "Col 1", "Col 2", "Col 3", "Col 4"
    ],
    "data": [
        ["Val 1", "Val 2", "Val 3", "New Val"],
        ["Val 4", "Val 5", "Val 6", "New Val"],
        ["Val 7", "Val 8", "Val 9", "New Val"]
    ]
  };
  return (
    <div>
      <nav className="navbar bg-color" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">My Business</a>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row mt-2 justify-content-center">
          {/* <Card title="Members" amount="" prc=""></Card> */}
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Table Data={data} Btn="Add New Admin"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Admin