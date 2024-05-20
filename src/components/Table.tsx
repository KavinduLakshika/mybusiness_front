// import 'animate.css';
import {ReactNode} from 'react';

interface Props {
    Btn: string;
    Data: object;
    Children?: ReactNode;
}

const Table = ({Btn, Data}: Props) => {
    return (
        <div className="container-fluid p-2">
            <div className="row">
                <div className='d-flex'>
                    <input className="form-control form-control-sm me-sm-2" type="text" style={{height: '35px'}}/>
                    <button className="btn btn-secondary btn-sm " type="submit" style={{height: '35px'}}>Search</button>
                    <div className='col-md-8 d-flex justify-content-end'>
                        <button className="btn btn-dark" type="button">
                            <span className="d-none d-sm-inline-block"> {Btn}</span>
                        </button>
                    </div>
                </div>
                <div>
                    <table className="table">
                        {/* <thead>
                        <tr style={{textAlign: "center"}}>
                            {data["cols"].map((item) => (
                                <th scope="col">{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data["data"].map((item) => (
                            <tr>
                                {item.map((val) => (
                                    <td>{val}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;
