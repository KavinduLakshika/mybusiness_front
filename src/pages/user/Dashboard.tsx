import Card from "../../components/Card";
import SideBar from "../../components/SideBar";
import Table from "../../components/Table";
import {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config";

const Dashboard = () => {
    const base_url = config.BASE_URL;

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

    const email = localStorage.getItem("email");
    const [reportData, setReportData] = useState({});

    useEffect(() => {
        console.log(email);
        const reports = () => {
            const data = {
                email: email
            }

            axios.post(base_url + '/api_get_reports', data)
                .then(response => {
                    setReportData(response.data.message);
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the error
                    console.error('Error:', error);
                });
        }

        reports();
        console.log(reportData);
    }, []);

    function formatNumber(num: number) {
        const options = {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        return new Intl.NumberFormat('en-US', options).format(num);
    }

    const chart_data = <T extends Record<string, never>>(data: T[], chart_data_type: keyof T): never[] => {
        const returnData: never[] = [];

        for (let i = 0; data.length > i; i++) {
            console.log(data[i][chart_data_type]);
            returnData.push(data[i][chart_data_type]);
        }

        console.log(data.length);

        return returnData;
    }

    return (
        <SideBar>
            <div className="container-fluid">
                <div className="row mt-2">
                    {/* <Card title="Sales"
                          lifetime={reportData.lifetimeSales}
                          monthly={reportData.salesMonth}
                          weekly={reportData.salesWeek}
                          daily={reportData.salesToday}
                          key_str="Sales - Last 7 days"
                          uData={chart_data(reportData.dailySales, "sales")}
                          xLabels={chart_data(reportData.dailySales, "date")}
                          chart_color="#e15759"
                    />
                    <Card title="Revenue"
                          lifetime={formatNumber(reportData.lifetimeRevenue)}
                          monthly={formatNumber(reportData.revenueMonth)}
                          weekly={formatNumber(reportData.revenueWeek)}
                          daily={formatNumber(reportData.revenueToday)}
                          key_str="Revenue - Last 7 days"
                          uData={chart_data(reportData.dailyRevenue, "revenue")}
                          xLabels={chart_data(reportData.dailyRevenue, "date")}
                          chart_color="#59a14f"
                    />
                    <Card title="Profits"
                          lifetime={formatNumber(reportData.lifetimeProfit)}
                          monthly={formatNumber(reportData.profit_month)}
                          weekly={formatNumber(reportData.profit_week)}
                          daily={formatNumber(reportData.profitToday)}
                          key_str="Profits - Last 7 days"
                          uData={chart_data(reportData.dailyProfits, "profit")}
                          xLabels={chart_data(reportData.dailyProfits, "date")}
                          chart_color="#4e79a7"
                    /> */}
                </div>

                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <Table Data={data} Btn="Add Products"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar>
    );
};

export default Dashboard;
