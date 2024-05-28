import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>


            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    {/* Navigation Bar */}
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">My Business</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarColor04">
                                <ul className="navbar-nav me-auto">

                                </ul>
                                <form className="d-flex">
                                    <Link to="/login"><button className="btn btn-secondary my-2 my-sm-0 mx-2" type="button">Login</button></Link>
                                    <Link to="/signup"><button className="btn btn-secondary my-2 my-sm-0" type="button">Signup</button></Link>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* Banner Section */}
                <div className='row mt-5 justify-content-center'>
                    <div className='col-md-12'>
                        <h1 className="banner-title text-center">Expand your business with us</h1>
                    </div>
                </div>
                <div className='row mt-2 mb-5 justify-content-center'>
                    <div className='col-md-1'>
                    <Link to="/signup"><button type='button' className="btn btn-primary banner-btn w-100">Join us</button></Link>
                    </div>
                </div>
                {/* About Section  */}
                <div className="about" id="about">
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h3 className="mt-2 mb-2">About</h3>
                            <p>Welcome to My Business. We are dedicated to empowering small businesses with the tools they need to efficiently manage sales and grow their business. Our platform offers a seamless and intuitive experience for business owners and their teams.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center mt-2 ">
                            <div className="section-heading">
                                <h3>Our Story</h3>
                            </div>
                            <p>Founded by a team of passionate developers and business experts, My Business was created to bridge the gap between complex enterprise-level sales management systems and the needs of small businesses. We believe that every business, no matter how small, deserves access to the best tools and technologies to help them succeed. Join us on this journey and see how My Business can transform the way you manage your sales, streamline your operations, and drive your business forward.</p>
                        </div>
                    </div>
                    <div id="service">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="mt-3 text-center">Servicers</h3>
                                <p className="text-center">At My Business, we understand the challenges small businesses face in managing their sales effectively. That's why we offer a range of comprehensive services tailored to meet the unique needs of your business. Our goal is to streamline your sales processes, boost efficiency, and help you achieve sustainable growth.</p>
                                <ul className="offer-list mt-2 mb-2">
                                    <li>
                                        <h5>Sales Management System</h5>
                                        <p>Our intuitive sales management system empowers you to track leads, manage contacts, and monitor sales activities all in one place. Say goodbye to spreadsheets and manual data entry – with our system, you can automate repetitive tasks and focus on closing deals.</p>
                                    </li>
                                    <li>
                                        <h5>Inventory Management</h5>
                                        <p>Keep track of your inventory levels in real-time with our inventory management solution. From stock alerts to automated reordering, we've got you covered. Say goodbye to stockouts and missed opportunities – with My Business, you'll always stay one step ahead.</p>
                                    </li>
                                    <li>
                                        <h5>Analytics and Reporting</h5>
                                        <p>Gain valuable insights into your sales performance with our advanced analytics and reporting features. Track key metrics, identify trends, and make data-driven decisions to drive your business forward. With My Business analytics, you'll have the clarity you need to optimize your sales strategy.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home