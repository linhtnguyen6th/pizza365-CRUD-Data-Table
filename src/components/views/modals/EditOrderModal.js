import {
    Modal,
    Container,
    Grid,
    TextField, 
    Typography,
    Box,
    Button,
    FormLabel,
    Snackbar,
    Alert,
    InputLabel,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";

//import react
import { useEffect, useState } from "react";


//import constants
import { BASE_URL_ORDERS } from "../../../constants/BaseUrlApi";



//import react, redux
import { useDispatch, useSelector } from "react-redux";






const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function EditOrderModal ({openModalProps, closeModalProps, orderInfoEditProps, varReloadPageProps, varSetReloadPageProps}) {

    //Lấy orderId để thực hiện gọi API, update order, method PUT
    const orderId = orderInfoEditProps.id;
    // console.log(orderId);


    //Xử lý hiển thị alert
    const [alert, setAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const [statusAlert, setStatusAlert] = useState("");

    //Khai báo hàm đóng alert
    const handleCloseAlert = () => setAlert(false);



    const dispatch = useDispatch();


    //Khai báo state, useState cho các trường input và select
    const [orderID, setOrderID] = useState("");
    const [orderCode, setOrderCode] = useState("");

    const [kichCo, setKichCo] = useState("");
    const [duongKinh, setDuongKinh] = useState("");
    const [suon, setSuon] = useState("");
    const [salad, setSalad] = useState("");
    const [soLuongNuoc, setSoLuongNuoc] = useState("");
    const [thanhTien, setThanhTien] = useState("");

    const [loaiPizza, setLoaiPizza] = useState("");
    const [voucherId, setVoucherId] = useState("");
    const [loaiNuocUong, setLoaiNuocUong] = useState("");

    const [hoTen, setHoTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [email, setEmail] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [loiNhan, setLoiNhan] = useState("");
    const [trangThai, setTrangThai] = useState("");



    //Xử lý hiển thị thông tin order lên các trường input
    useEffect(() => {
        setOrderID(orderInfoEditProps.id);
        setOrderCode(orderInfoEditProps.orderCode);

        setKichCo(orderInfoEditProps.kichCo);
        setDuongKinh(orderInfoEditProps.duongKinh);
        setSuon(orderInfoEditProps.suon);
        setSalad(orderInfoEditProps.salad);
        setSoLuongNuoc(orderInfoEditProps.soLuongNuoc);
        setThanhTien(orderInfoEditProps.thanhTien);

        setLoaiPizza(orderInfoEditProps.loaiPizza);
        setVoucherId(orderInfoEditProps.idVourcher);
        setLoaiNuocUong(orderInfoEditProps.idLoaiNuocUong);

        setHoTen(orderInfoEditProps.hoTen);
        setSoDienThoai(orderInfoEditProps.soDienThoai);
        setEmail(orderInfoEditProps.email);
        setDiaChi(orderInfoEditProps.diaChi);
        setLoiNhan(orderInfoEditProps.loiNhan);
        setTrangThai(orderInfoEditProps.trangThai);
    }, [openModalProps]);


    //Xử lý sự kiện onChange cho ô select trạng thái
    const orderStatusChangeHandler = (event) => {
        let value = event.target.value;
        setTrangThai(value);
    };


    const fetchApiConfirmedOrder = async (url, body) => {
        const res = await fetch(url, body);
        const data = await res.json();
        return data;
    };



    //Khai báo hàm xử lý sự kiện cho nút xác nhận
    const onBtnConfirmedClick = () => {
        // console.log("Nút xác nhận được click!");
            //B1: Khai báo đối tượng chứa dữ liệu
            var confirmedOrderObject = {
                trangThai: "confirmed"
            }
            //B2: Validate (không cần)
            //B3: Gọi API, sửa thông tin order, method PUT
            const body = {
                method: "PUT",
                body: JSON.stringify({
                    trangThai: confirmedOrderObject.trangThai
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
        }
        fetchApiConfirmedOrder(BASE_URL_ORDERS + "/" + orderId, body)
                .then((data) => {
                    // console.log(data);
                    setAlert(true);
                    setTextAlert("Cập nhật đơn hàng thành công!");
                    setStatusAlert("success");
                    // Đóng modal
                    closeModalProps();
                    // Refresh page
                    varSetReloadPageProps(varReloadPageProps + 1);
                })
                .catch((error) => {
                    console.error(error.message);
                    setAlert(true);
                    setTextAlert("Cập nhật đơn hàng thất bại!");
                    setStatusAlert("error");
                    closeModalProps();
                })

    };



    return(
        <>
        {/* Modal Tạo mới đơn hàng*/}
        <Modal
            open={openModalProps}
            onClose={closeModalProps}
            aria-labelledby="modal-modal-edit-order"
            aria-describedby="modal-modal-edit-order"
            >
                <Container fullWidth>
                        <Box sx={style}>
                            <Typography variant="h5" component="h2">
                                <b>Thông tin đơn hàng</b>
                            </Typography>
                            <Grid container mt={2}>
                                {/* Order ID */}
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Order ID</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={orderID}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Order Code</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={orderCode}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={2}>
                                {/* Kích cỡ */}
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Kích cỡ</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={kichCo}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Đường kính</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={duongKinh}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Sườn</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={suon}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Salad</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={salad}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Số lượng nước</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={soLuongNuoc}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Thành tiền</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={thanhTien}></TextField>
                                </Grid>
                            </Grid>
                            {/* Loại pizza */}
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Loại pizza</FormLabel>
                                </Grid>
                                <Grid item lg={10}>
                                    <TextField fullWidth variant="outlined" disabled value={loaiPizza}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Voucher ID</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={voucherId}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Loại nước uống</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={loaiNuocUong}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Họ tên</FormLabel>
                                </Grid>
                                <Grid item lg={10}>
                                    <TextField fullWidth variant="outlined" disabled value={hoTen}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Số điện thoại</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={soDienThoai}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Email</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={email}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Địa chỉ</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={diaChi}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Lời nhắn</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" disabled value={loiNhan}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Trạng thái</FormLabel>
                                </Grid>
                                <Grid item lg={10}>
                                    <FormControl fullWidth>
                                        <InputLabel>Select</InputLabel>
                                        <Select 
                                            labelId="select-order-status"
                                            id="select-order-status"
                                            label="order-status"
                                            value={trangThai}
                                            onChange={orderStatusChangeHandler}
                                        >
                                            <MenuItem value="open">Open</MenuItem>
                                            <MenuItem value="cancel">Cancel</MenuItem>
                                            <MenuItem value="confirmed">Confirmed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Buttons */}
                            <Grid container mt={2}>
                                <Grid item xs={12} textAlign="end">
                                    <Button color="success" variant="contained" className="me-1" onClick={onBtnConfirmedClick}>Xác nhận</Button>
                                    <Button color="error" variant="contained" onClick={closeModalProps}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Box>
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

export default EditOrderModal;