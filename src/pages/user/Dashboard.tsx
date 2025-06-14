import Card from "../../components/Card";
import SideBar from "../../components/SideBar";
import Table from "../../components/Table";
import { useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";

interface Props {
    email: string | null
}

const Dashboard = ({ email }: Props) => {
    const base_url = config.BASE_URL;

    const cols = [
        "Col 1", "Col 2", "Col 3", "Col 4"
    ];

    const data = [
        ["Val 1", "Val 2", "Val 3", "New Val"],
        ["Val 4", "Val 5", "Val 6", "New Val"],
        ["Val 7", "Val 8", "Val 9", "New Val"]
    ];

    const [reportData, setReportData] = useState({
        lifetimeSales: "0",
        salesMonth: "0",
        salesWeek: "0",
        salesToday: "0",
        lifetimeRevenue: 0,
        revenueMonth: 0,
        revenueWeek: 0,
        revenueToday: 0,
        lifetimeProfit: 0,
        profit_month: 0,
        profit_week: 0,
        profitToday: 0,
        dailySales: [],
        dailyRevenue: [],
        dailyProfits: []
    });
    const [invoicesData, setInvoicesData] = useState({});

    useEffect(() => {
        const data = {
            email: email
        }

        invoicesData;

        const reports = () => {
            axios.post(base_url + '/api_get_reports', data)
                .then(response => {
                    setReportData(response.data.message);
                })
                .catch(error => {
                    // Handle the error
                    console.error('Error:', error);
                });
        }

        const invoices = () => {
            axios.post(base_url + '/api_get_all_invoices', data)
                .then(response => {
                    setInvoicesData(response.data.message);
                })
                .catch(error => {
                    // Handle the error
                    console.error('Error:', error);
                });
        }

        reports();
        invoices();
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

    const chart_data = <T, K extends keyof T>(data: T[] | undefined, chart_data_type: K): (T[K] | undefined)[] => {
        if (!Array.isArray(data)) {
            console.error("Data is not an array:", data);
            return [];
        }

        const returnData: (T[K] | undefined)[] = [];

        for (let i = 0; i < data.length; i++) {
            returnData.push(data[i][chart_data_type]);
        }

        return returnData;
    }

    return (
        <SideBar>
            <div className="container-fluid">
                <div className="row mt-2">
                    <Card title="Sales"
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
                    />
                </div>

                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="rom mb-2">
                                    <div className="col-md-12">
                                        <h4>Invoices</h4>
                                    </div>
                                </div>
                                <Table columns={cols} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar>
    );
};

export default Dashboard;
