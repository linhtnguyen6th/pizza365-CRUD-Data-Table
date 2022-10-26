//import @mui
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

//import react, redux
import { useDispatch, useSelector } from "react-redux";

//import action types
import { FetchApiDrinks, getDrinkSelected } from "../../../actions/FetchApiActionTypes";
import { 
    pizzaSize, 
    pizzaType, 
    voucherIdInput, 
    nameInput, 
    phoneInput, 
    emailInput, 
    addressInput, 
    messageInput
} from "../../../actions/AddNewOrderActionTypes";


//import constants
import { BASE_URL_VOUCHERS, BASE_URL_ORDERS } from "../../../constants/BaseUrlApi";

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



function AddOrderModal ({openModalProps, closeModalProps, varReloadPageProps, varSetReloadPageProps}) {


    //Xử lý hiển thị alert
    const [alert, setAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const [statusAlert, setStatusAlert] = useState("");

    //Khai báo hàm đóng alert
    const handleCloseAlert = () => setAlert(false);


    //Xử lý hiển thị modal có orderCode 
    const [openOrderCodeModal, setOpenOrderCodeModal] = useState(false);
    //Hàm đóng modal
    const closeOrderCodeModal = () => setOpenOrderCodeModal(false);


    //Xử lý hiển thị orderCode
    const [showOrderCode, setShowOrderCode] = useState("");
    

    //Xử lý hiện thị các trường input liên quan đến select pizza size 
    const [duongKinh, setDuongKinh] = useState("");
    const [suon, setSuon] = useState("");
    const [salad, setSalad] = useState("");
    const [soLuongNuoc, setSoLuongNuoc] = useState("");
    const [thanhTien, setThanhTien] = useState("");


    const dispatch = useDispatch();

    //Khai báo hàm lưu giá trị vào drink state (reducers)
    const { drinks, drinkSelected } = useSelector((reduxData) => reduxData.GetDrinkReducers);
    const {
        kichCo,
        loaiPizza,
        maGiamGia,
        hoTen,
        soDienThoai,
        email,
        diaChi,
        loiNhan
    } = useSelector((reduxData) => reduxData.AddNewOrderReducers);

    //Khai báo hàm lưu giá trị vào voucher state (reducers)
    const { vouchers } = useSelector((reduxData) => reduxData.GetDrinkReducers);

    //Call API get drinks list, hiển thị vào ô select
    useEffect(() => {
        dispatch(FetchApiDrinks());
    }, [openModalProps]);


    //Khai báo hàm lưu giá trị khi có sự kiện users chọn loại nước uống vào state
    const drinkValueChangeHandler = (event) => {
        dispatch(getDrinkSelected(event.target.value));
    };


    //Khai báo hàm xử lý sự kiện lấy giá trị select pizza size hiển thị ra các trường inputs tương ứng
    const pizzaSizeChangeHandler = (event) => {
        let valuePizzaSize = event.target.value;

        dispatch(pizzaSize(valuePizzaSize));

        if (valuePizzaSize === "Small") {
            setDuongKinh(20);
            setSuon(2);
            setSalad(200);
            setSoLuongNuoc(2);
            setThanhTien(150000);
        }
        if (valuePizzaSize === "Medium") {
            setDuongKinh(25);
            setSuon(4);
            setSalad(300);
            setSoLuongNuoc(3);
            setThanhTien(200000);
        }
        if (valuePizzaSize === "Large") {
            setDuongKinh(30);
            setSuon(8);
            setSalad(500);
            setSoLuongNuoc(4);
            setThanhTien(250000);
        }
    };


    //Khai báo hàm hiển thị các giá trị input khi user nhập
    const pizzaTypeChangeHandler = (event) => {
        dispatch(pizzaType(event.target.value));
    };
    const voucherIdChangeHandler = (event) => {
        dispatch(voucherIdInput(event.target.value));
    };
    const nameChangeHandler = (event) => {
        dispatch(nameInput(event.target.value));
    };
    const phoneChangeHandler = (event) => {
        dispatch(phoneInput(event.target.value));
    };
    const emailChangeHandler = (event) => {
        dispatch(emailInput(event.target.value));
    };
    const addressChangeHandler = (event) => {
        dispatch(addressInput(event.target.value));
    };
    const messageChangeHandler = (event) => {
        dispatch(messageInput(event.target.value));
    };


    const fetchApiVoucher = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    const fetchApiCreateOrder = async (url, body) => {
        const res = await fetch(url, body);
        const data = await res.json();
        return data;
    };


    //Khai báo hàm xử lý sự kiện cho nút tạo đơn
    const onBtnAddOrderClick = () => {
        // console.log("Nút tạo đơn được click!");
        //B1: Khai báo đối tượng chứa dữ liệu
        var createOrderForm = {
                kichCoOrder: kichCo,
                duongKinhOrder: duongKinh,
                suonOrder: suon,
                saladOrder: salad,
                soLuongNuocOrder: soLuongNuoc,
                thanhTienOrder: thanhTien,
                loaiPizzaOrder: loaiPizza,
                loaiNuocUongOrder: drinkSelected,
                voucherIdOrder: maGiamGia,
                hoTenOrder: hoTen,
                soDienThoaiOrder: soDienThoai,
                emailOrder: email,
                diaChiOrder: diaChi,
                loiNhanOrder: loiNhan,
                phanTramGiamGiaOrder: -1,
                phaiThanhToanOrder: -1
        };

        //B2: Validate dữ liệu
        var validateOrderInput = checkOrderInput(createOrderForm);
        if(validateOrderInput) {
            // console.log(validateOrderInput);
            //B3: Nếu users có nhập mã voucher, gọi API, lấy ra dữ liệu theo maGiamGia để tính số tiền phải trả
            if(createOrderForm.voucherIdOrder !== "") {
                fetchApiVoucher(BASE_URL_VOUCHERS + createOrderForm.voucherIdOrder)
                    .then((data) => {
                        // console.log(data);
                        //Tính số tiền phải thanh toán sau khi nhập maGiamGia
                        createOrderForm.phanTramGiamGiaOrder = data.discount;
                        createOrderForm.phaiThanhToanOrder = createOrderForm.thanhTienOrder * (1 - createOrderForm.phanTramGiamGiaOrder / 100);
                        // console.log("Thông tin order:");
                        // console.log(createOrderForm);
                        setStatusAlert("success");
                        setAlert(true);
                        setTextAlert("Thông tin đơn hàng hợp lệ!");
                    })
                    .catch((error) => console.error(error.message))

            } else {
                createOrderForm.phanTramGiamGiaOrder = 0;
                createOrderForm.phaiThanhToanOrder = createOrderForm.thanhTienOrder * (1 - createOrderForm.phanTramGiamGiaOrder / 100);
                setStatusAlert("success");
                setAlert(true);
                setTextAlert("Thông tin đơn hàng hợp lệ!");
            };

            //B4: Gọi API, tạo mới đơn hàng, hiển thị modal chứa orderCode cho users
            const body = {
                method: "POST",
                body: JSON.stringify({
                        kichCo: createOrderForm.kichCoOrder,
                        duongKinh: createOrderForm.duongKinhOrder,
                        suon: createOrderForm.suonOrder,
                        salad: createOrderForm.saladOrder,
                        soLuongNuoc: createOrderForm.soLuongNuocOrder,
                        thanhTien: createOrderForm.thanhTienOrder,
                        loaiPizza: createOrderForm.loaiPizzaOrder,
                        idVourcher: createOrderForm.voucherIdOrder,
                        idLoaiNuocUong: createOrderForm.loaiNuocUongOrder,
                        hoTen: createOrderForm.hoTenOrder,
                        email: createOrderForm.emailOrder,
                        soDienThoai: createOrderForm.soDienThoaiOrder,
                        diaChi: createOrderForm.diaChiOrder,
                        loiNhan: createOrderForm.loiNhanOrder,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
            }
            fetchApiCreateOrder(BASE_URL_ORDERS, body)
                    .then((data) => {
                        // console.log(data);
                        setAlert(true);
                        setTextAlert("Tạo mới đơn hàng thành công!");
                        setStatusAlert("success");
                        // Hiển thị modal chứa orderCode
                        setOpenOrderCodeModal(true);
                        // Show orderCode
                        setShowOrderCode(data.orderCode);
                        //Đóng modal
                        closeModalProps();
                        // Refresh page
                        varSetReloadPageProps(varReloadPageProps + 1);
                    })
                    .catch((error) => {
                        console.error(error.message);
                        setAlert(true);
                        setTextAlert("Tạo mới đơn hàng thất bại!");
                        setStatusAlert("error");
                        //Đóng modal
                        closeModalProps();
                    })
        };
    };


    //Khai báo hàm validate dữ liệu
    const checkOrderInput = (paramCreateOrderForm) => {
        if(paramCreateOrderForm.kichCoOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa chọn kích cỡ pizza!");
            return false;
        }
        if(paramCreateOrderForm.loaiPizzaOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa chọn loại pizza!");
            return false;
        }
        if(paramCreateOrderForm.loaiNuocUongOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa chọn loại nước uống!");
            return false;
        }
        if(paramCreateOrderForm.hoTenOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa nhập tên!");
            return false;
        }
        if(paramCreateOrderForm.soDienThoaiOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa nhập số điện thoại!");
            return false;
        }
        var vRegexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!vRegexStr.test(paramCreateOrderForm.emailOrder)) {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa nhập email!");
            return false;
        }
        if(paramCreateOrderForm.diaChiOrder === "") {
            setStatusAlert("error");
            setAlert(true);
            setTextAlert("Bạn chưa nhập địa chỉ!");
            return false;
        }

        return true
    };




    return (
        <>
        {/* Modal Tạo mới đơn hàng*/}
        <Modal
            open={openModalProps}
            onClose={closeModalProps}
            aria-labelledby="modal-modal-order"
            aria-describedby="modal-modal-add-order"
            >
                <Container fullWidth>
                        <Box sx={style}>
                            <Typography variant="h5" component="h2">
                                <b>Tạo mới đơn hàng</b>
                            </Typography>
                            <Grid container mt={2}>
                                {/* Kích cỡ */}
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Kích cỡ</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Select</InputLabel>
                                        <Select 
                                            labelId="select-pizza-size"
                                            id="select-pizza-size"
                                            label="Kích cỡ"
                                            value={kichCo}
                                            onChange={pizzaSizeChangeHandler}
                                        >
                                            <MenuItem value="Small">Small</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="Large">Large</MenuItem>
                                        </Select>
                                    </FormControl>
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
                                    <FormControl fullWidth>
                                        <InputLabel>Select</InputLabel>
                                        <Select 
                                            labelId="select-pizza-type"
                                            id="select-pizza-type"
                                            label="loai-pizza"
                                            value={loaiPizza}
                                            onChange={pizzaTypeChangeHandler}
                                        >
                                            <MenuItem value="Seafood">Hải sản</MenuItem>
                                            <MenuItem value="Hawaiian">Hawaiian</MenuItem>
                                            <MenuItem value="Bacon">Thịt hun khói</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Voucher ID</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" onChange={voucherIdChangeHandler} value={maGiamGia}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Loại nước uống</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                <FormControl fullWidth>
                                        <InputLabel>Select</InputLabel>
                                        <Select 
                                            labelId="select-drinks"
                                            id="select-drinks"
                                            label="drinks"
                                            value={drinkSelected}
                                            onChange={drinkValueChangeHandler}
                                        >
                                        {
                                            drinks.map((drink, index) => {
                                                return <MenuItem key={index} value={drink.maNuocUong}>{drink.tenNuocUong}</MenuItem>
                                            })
                                        }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Họ tên</FormLabel>
                                </Grid>
                                <Grid item lg={10}>
                                    <TextField fullWidth variant="outlined" onChange={nameChangeHandler} value={hoTen}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Số điện thoại</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" onChange={phoneChangeHandler} value={soDienThoai}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Email</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" onChange={emailChangeHandler} value={email}></TextField>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Địa chỉ</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" onChange={addressChangeHandler} value={diaChi}></TextField>
                                </Grid>
                                <Grid item lg={2} textAlign="center" mt={2}>
                                    <FormLabel>Lời nhắn</FormLabel>
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField fullWidth variant="outlined" onChange={messageChangeHandler} value={loiNhan}></TextField>
                                </Grid>
                            </Grid>
                            {/* Buttons */}
                            <Grid container mt={2}>
                                <Grid item xs={12} textAlign="end">
                                    <Button color="success" variant="contained" className="me-1" onClick={onBtnAddOrderClick}>Tạo đơn</Button>
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
            {/* Modal hiển thị orderCode */}
            <Modal
                open={openOrderCodeModal}
                onClose={closeOrderCodeModal}
                aria-labelledby="modal-modal-order-code"
                aria-describedby="modal-modal-order-code"
            >
                <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            <b>Bạn đã đặt hàng thành công. Mã đơn hàng của bạn là:</b>
                        </Typography>
                        <Grid container mt={2}>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <FormLabel>Mã đơn hàng:</FormLabel>
                            </Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                <TextField fullWidth variant="outlined" value={showOrderCode} disabled></TextField>
                            </Grid>
                        </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default AddOrderModal;