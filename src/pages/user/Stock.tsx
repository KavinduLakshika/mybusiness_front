import SideBar from "../Components/SideBar"
import Table from "../Components/Table"

const Stock = () => {
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
    <SideBar>
        <div className="container-fluid">
          <div className="col-md-12">
            <div className="row mt-2 p-2">
                <Table Data={data} Btn=""/>
            </div>
          </div>
        </div>
    </SideBar>
  )
}

export default Stock