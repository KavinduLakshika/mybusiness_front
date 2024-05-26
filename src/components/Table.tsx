import 'animate.css';
import { useEffect, useState } from 'react';

interface Props {
    data: any,
    columns: any
}

const Table = ({ data, columns }: Props) => {
    const [tableData, setTableData] = useState(data);
    const [tableColumns, setTableColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);


    const filteredData = tableData.filter((tableDatum: any) => {
        const query = searchQuery.toLowerCase();
        return tableDatum.some((item: any) => {
            // Check if item is not null or undefined before converting to string and checking the query
            return item != null && item.toString().toLowerCase().includes(query);
        });
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid p-2">
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search the table"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to the first page on search
                        }}
                    />
                </div>
            </div>

            <div className="mt-2">
                <div className="col-md-12">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                {tableColumns.map((item: string, index: number) => (
                                    <th id={index + ""}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((datum: any, rowIndex: any) => (
                                <tr key={rowIndex}>
                                    {datum.map((item: any, colIndex: any) => (
                                        <td key={colIndex}>{item}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row mt-2 justify-content-end">
                <div className="col-md-12">
                    <nav>
                        <ul className="pagination justify-content-end">
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Table;