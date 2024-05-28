import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    open: boolean,
    data: any[],
    handleClose: () => void
}

const ViewInvoiceItemsModal = ({ open, handleClose, data }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        p: 4,
    };

    useEffect(() => {
        setModalOpen(open);
    }, [open]);

  return (
    <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Modal
                        open={modalOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Invoice Items
                            </Typography>

                            <div className="row mt-2">
                                <div className="col-md-12">
                                <table className="table table-hover table-responsive">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Batch</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((item) => (
                                <tr>
                                  <td>{item.prod_name}</td>
                                  <td>{item.batch_id}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.unit_price}</td>
                                  <td>{item.total_price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                                </div>
                                </div> 
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
  )
}

export default ViewInvoiceItemsModal