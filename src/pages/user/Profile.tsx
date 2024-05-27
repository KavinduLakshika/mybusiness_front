import { useState } from "react";
import SideBar from "../../components/SideBar";

interface Props {
  email: string | null
}

function Profile({ email }: Props) {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <SideBar>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h4>User Profile</h4>
                    <h5><small>Update user details</small></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <ul className="nav nav-tabs nav-fill" role="tablist">
              <li className="nav-item cursor-pointer" role="presentation">
                <a
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  aria-selected={activeTab === 'profile'}
                  role="tab"
                >
                  Update Profile
                </a>
              </li>

              <li className="nav-item cursor-pointer" role="presentation">
                <a
                  className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                  aria-selected={activeTab === 'password'}
                  role="tab"
                >
                  Update Password
                </a>
              </li>

              <li className="nav-item cursor-pointer" role="presentation">
                <a
                  className={`nav-link ${activeTab === 'business' ? 'active' : ''}`}
                  onClick={() => setActiveTab('business')}
                  aria-selected={activeTab === 'business'}
                  role="tab"
                >
                  Update Business Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <div className="tab-content">
              <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
                <div className="row justify-content-center">
                  <div className="col-md-3">
                    <div className="card mt-5">
                      <div className="card-body">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <h4 className="text-center">Update User Profile</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === 'password' ? 'show active' : ''}`} id="password" role="tabpanel">
                <div className="row justify-content-center">
                  <h4>Password</h4>
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === 'business' ? 'show active' : ''}`} id="business" role="tabpanel">
                <div className="row justify-content-center">
                  <h4>Business</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
