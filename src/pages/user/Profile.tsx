import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import UserProfileUpdateTab from "../../tabs/UserProfileUpdateTab";
import UserPasswordUpdateTab from "../../tabs/UserPasswordUpdateTab";
import UserUpdateBusinessTab from "../../tabs/UserUpdateBusinessTab";
import config from "../../config";
import axios from 'axios';

interface Props {
  email: string | null
}

function Profile({ email }: Props) {
  const base_url = config.BASE_URL;

  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const postData = {
          email: email
        }

        const response = await axios.post(base_url + "/get_user", postData);

        if (response.data.message_type === "success") {
          setUserData(response.data.message);
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

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
              {loading ? (
                <div className="row mt-5">
                  <div className="col-md-12">
                    <h3 className="text-center">
                      Loading.....
                    </h3>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
                    <UserProfileUpdateTab userData={userData} email={email} />
                  </div>

                  <div className={`tab-pane fade ${activeTab === 'password' ? 'show active' : ''}`} id="password" role="tabpanel">
                    <div className="row justify-content-center">
                      <UserPasswordUpdateTab email={email} />
                    </div>
                  </div>

                  <div className={`tab-pane fade ${activeTab === 'business' ? 'show active' : ''}`} id="business" role="tabpanel">
                    <div className="row justify-content-center">
                      <UserUpdateBusinessTab userData={userData} email={email} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
