import { useState } from "react";
import SideBar from "../../components/SideBar";

function Profile() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <SideBar>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="d-flex justify-content-center align-items-center" style={{ width: '150px', height: '150px' }}>
              <img src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" className="rounded-circle shadow-4-strong border" alt="Profile Picture" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
              aria-selected={activeTab === 'home'}
              role="tab"
            >
              Profile
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              aria-selected={activeTab === 'profile'}
              role="tab"
            >
              Business Profile
            </a>
          </li>
        </ul>
        <div id="myTabContent" className="tab-content mt-3">
          <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="home" role="tabpanel">
            <div className="col-md-12 d-flex justify-content-center">
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="alert alert-danger">
                    "Error: Error connecting to the server: Axios error: Server Timeout"
                  </div>
                </div>
              </div>
              {/* <div className="col-md-5">
                <div className="row  container-fluid">
                  <form className="border p-3">
                    <fieldset>
                      <div>
                        <label className="form-label mt-4">User Name*</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter User Name" />
                      </div>
                      <div>
                        <label className="form-label mt-4">Email*</label>
                        <input type="email" className="form-control" placeholder="Enter Email" autoComplete="on" />
                      </div>
                      <div>
                        <label className="form-label mt-4">Telephone Number*</label>
                        <div className="input-group mb-3">
                          <span className="input-group-text">+94</span>
                          <input type="text" className="form-control" placeholder="Telephone Number" />
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <form className="border p-3">
                    <fieldset>
                      <div>
                        <label className="form-label mt-4">Current Password*</label>
                        <input type="password" className="form-control" placeholder="Password" autoComplete="off" />
                      </div>
                      <div>
                        <label className="form-label mt-4">New Password*</label>
                        <input type="password" className="form-control" placeholder="Password" autoComplete="off" />
                      </div>
                      <div>
                        <label className="form-label mt-4">Confirm New Password*</label>
                        <input type="password" className="form-control" placeholder="Confirm Password" autoComplete="off" />
                      </div>
                      <div className="mt-5">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="submit" className="btn btn-secondary m-2">Cancel</button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
            <div className="col-md-12 d-flex justify-content-center">
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="alert alert-danger">
                    "Error: Error connecting to the server: Axios error: Server Timeout"
                  </div>
                </div>
              </div>
              {/* <div className="col-md-5">
                <div className="row  container-fluid">
                  <form className="border p-3">
                    <fieldset>
                      <div>
                        <label className="form-label mt-4">Business Name*</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Business Name"/>
                      </div>
                      <div>
                        <label className="form-label mt-4">Address Line*</label>
                        <input type="email" className="form-control" placeholder="Address Line" autoComplete="on"/>
                      </div>
                      <div>
                        <label className="form-label mt-4 ">Address Line 2</label>
                          <input type="text" className="form-control" placeholder="Address Line 2"/>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div> */}
              {/* <div className="col-md-5">
                <div className="row">
                  <form className="border p-3">
                    <fieldset>
                      <div>
                        <label className="form-label mt-4">City</label>
                        <input type="text" className="form-control" placeholder="City" autoComplete="off"/>
                      </div>
                      <div>
                        <label className="form-label mt-4">Postal Code</label>
                        <input type="text" className="form-control" placeholder="Postal Code" autoComplete="off"/>
                      </div>
                      <div className="mt-5">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="submit" className="btn btn-secondary m-2">Cancel</button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
