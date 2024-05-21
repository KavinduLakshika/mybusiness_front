import {LineChart, lineElementClasses} from "@mui/x-charts/LineChart";

interface Props {
    title: string;
    lifetime: string;
    monthly: string;
    weekly: string;
    daily: string;
    key_str: string;
    uData: any;
    xLabels: any;
    chart_color: string;
    // amount: string;
    // prc: string;
    // children?: ReactNode;
}

const Card = ({title, lifetime, monthly, weekly, daily, key_str, uData, xLabels, chart_color}: Props) => {

    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{title}</h2>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <h6>Lifetime</h6>
                            <h5>{lifetime}</h5>
                        </div>

                        <div className="col-md-6">
                            <h6>Last 30 days</h6>
                            <h5>{monthly}</h5>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-6">
                            <h6>Last 7 days</h6>
                            <h5>{weekly}</h5>
                        </div>

                        <div className="col-md-6">
                            <h6>Today</h6>
                            <h5>{daily}</h5>
                        </div>
                    </div>

                    <hr/>

                    <div className="row mt-2">
                        <div className="col-md-12">
                            <LineChart
                                height={200}
                                series={[{
                                    data: uData,
                                    label: `${key_str}`,
                                    area: true,
                                    showMark: false,
                                    color: `${chart_color}`
                                }]}
                                xAxis={[{scaleType: 'point', data: xLabels}]}
                                sx={{
                                    [`& .${lineElementClasses.root}`]: {
                                        display: 'none',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
