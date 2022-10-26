//imoprt @mui
import {
    Modal,
    Container,
    Grid,
    Typography,
    ButtonGroup,
    Button,
    Snackbar,
    Alert
} from "@mui/material";

//import react
import { useState } from "react";

//import constants
import { BASE_URL_ORDERS } from "../../../constants/BaseUrlApi";




function DeleteOrderModal ({openModalProps, closeModalProps, orderIdDeleteProps, varReloadPageProps, varSetReloadPageProps}) {
    
    const orderId = orderIdDeleteProps;
    // console.log("Order ID Delete Modal" + orderId);
    
    //Xử lý hiển thị alert
    const [alert, setAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const [statusAlert, setStatusAlert] = useState("");

    //Khai báo hàm đóng alert
    const handleCloseAlert = () => setAlert(false);


    //Khai báo hàm cho nút xác nhận xóa order
    const onBtnConfirmDeleteOrderClick = () => {
        // console.log("Nút xác nhận được click!");
        fetch(BASE_URL_ORDERS + "/" + orderId, { method: "DELETE" })
                .then(async res => {
                        const isJson = res.headers.get("content-type")?.includes("application/json");
                        const data = isJson && await res.json();
                        // Check for response error
                        if (!res.ok) {
                            // get error message from body or default to response status
                            const error = (data && data.message) || res.status;
                            return Promise.reject(error);
                        }
                        setAlert(true);
                        setTextAlert("Hủy đơn hàng thành công!");
                        setStatusAlert("success");
                        closeModalProps();
                        varSetReloadPageProps(varReloadPageProps + 1);
                })
                .catch((err) => {
                        console.error(err.message);
                        setAlert(true);
                        setTextAlert("Hủy đơn hàng thất bại!");
                        setStatusAlert("error");
                        closeModalProps();
                })
    };


    return(
        <>
            <Modal
                open={openModalProps}
                onClose={closeModalProps}
                aria-labelledby="modal-modal-delete-order"
                aria-describedby="modal-modal-delete-order"
                >
                    <Container fullWidth>
                        <Grid container sx={{display: "flex", justifyContent: "center", minHeight: "50vh"}}>
                            <Grid item xs={12} sm={12} md={6} lg={6} mt={3} padding={5} sx={{bgcolor: "#f9f9f9"}}>
                                <Grid container sx={{justifyContent: "center", alignItems: "center"}} mt={3} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                        <Typography variant="h3" component="div" style={{textAlign: "center"}}>
                                            Confirm hủy Order 
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
                                        <Typography variant="body2" component="div" style={{textAlign: "center"}}>
                                            Bạn có chắc chắn muốn xóa Order có ID: {orderId} không?
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} mt={4}>
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth="true" mt={5}>
                                            <Button color="error" onClick={onBtnConfirmDeleteOrderClick}>Hủy Order</Button>
                                            {" "}
                                            <Button onClick={closeModalProps} sx={{color: "#fff"}}>Cancel</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
            </Modal>
                {/* Alert */}
                <Snackbar
                    open={alert}
                    autoHideDuration={3000}
                    onClose={handleCloseAlert} 
                >
                <Alert onClose={handleCloseAlert} severity={statusAlert}>{textAlert}</Alert>
                </Snackbar>  
        </>
    );
};

export default DeleteOrderModal;