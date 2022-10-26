import {
    Container,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    Button,
    Pagination,
    Typography
} from "@mui/material";


//import react, react-redux 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//import modals
import AddOrderModal from "./modals/AddOrderModal";
import EditOrderModal from "./modals/EditOrderModal";
import DeleteOrderModal from "./modals/DeleteOrderModal";

//import function action types
import { FetchApiOrders, paginationChange } from "../../actions/FetchApiActionTypes";



function DataTable () {

    //Xử lý reload page
    const [reloadPage, setReloadPage] = useState(0);


    //Xử lý hiển thị modal khi ấn nút
        //Add Order
            //Mở modal
            const [openAddOrderModal, setOpenAddOrderModal] = useState(false);
            //Đóng modal
            const closeAddOrderModal = () => setOpenAddOrderModal(false);
        //Edit Order
            //Mở modal
            const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
            //Đóng modal
            const closeEditOrderModal = () => setOpenEditOrderModal(false);       
        //Delete Order
            //Mở modal
            const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
            //Đóng modal
            const closeDeleteOrderModal = () => setOpenDeleteOrderModal(false);



    //Xử lý lấy thông tin order theo orderCode khi ấn nút sửa, xóa
    const [orderInfoEdit, setOrderInfoEdit] = useState("");
    const [orderIdDelete, setOrderIdDelete] = useState("");



    //Hiển thị data lên table
    const dispatch = useDispatch();

    const { rows, currentPage, noPage } = useSelector((reduxData) => reduxData.GetOrdersReducers);
    // console.log("rows state:");
    // console.log(rows);

    //Khai báo hàm xử lý sự kiện change page
    const changePageHandler = (event, value) => {
        dispatch(paginationChange(value)); //value = số trang user click khi chuyển trang (1,2,3...)
    }

    useEffect(() => {
        dispatch(FetchApiOrders());
    }, [currentPage, reloadPage]);




    //Khai báo xử lý sự kiện khi ấn nút tạo mới order
    const onBtnAddOrderClick = () => {
        // console.log("Nút thêm mới order được click!");
        //Hiển thị modal
        setOpenAddOrderModal(true); 
    };



    //Khai báo xử lý sự kiện khi ấn nút sửa
    const onBtnEditOrdersClick = (row) => {
        // console.log("Nút sửa order được click!");
        // console.log(row);
        setOrderInfoEdit(row); //truyền tất cả các thông tin tương ứng khi ấn nút sửa lên modal
        // console.log(orderInfoEdit);
        setOpenEditOrderModal(true);
    };

    //Khai báo xử lý sự kiện khi ấn nút xóa
    const onBtnDeleteOrdersClick = (row) => {
        // console.log("Nút sửa order được click!");
        console.log(row.id);
        setOrderIdDelete(row.id); //truyền orderId tương ứng khi ấn nút xóa
        setOpenDeleteOrderModal(true);
    };





    return(
        <>
        {/* <Container fullWith> */}
            {/* Table */}
            <Grid container mt={5} px={5}>
                <Grid container justifyContent="center">
                    <Typography variant="h4">Orders List</Typography>
                </Grid>
                <Grid container my={4}>
                    <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add order</Button>
                </Grid>
                <Grid item sx={{width: "100%"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Order Code</TableCell>
                            <TableCell align="center">Kích Cỡ</TableCell>
                            <TableCell align="center">Loại Pizza</TableCell>
                            <TableCell align="center">VoucherID</TableCell>
                            <TableCell align="center">ID Nước Uống</TableCell>
                            <TableCell align="center">Số Lượng Nước</TableCell>
                            <TableCell align="center">Thành Tiền</TableCell>
                            <TableCell align="center">Họ tên</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Điện Thoại</TableCell>
                            <TableCell align="center">Địa Chỉ</TableCell>
                            <TableCell align="center">Trạng Thái</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.orderCode}</TableCell>
                                <TableCell align="left">{row.kichCo}</TableCell>
                                <TableCell align="center">{row.loaiPizza}</TableCell>
                                <TableCell align="left">{row.idVourcher}</TableCell>
                                <TableCell align="center">{row.idLoaiNuocUong}</TableCell>
                                <TableCell align="center">{row.soLuongNuoc}</TableCell>
                                <TableCell align="center">{row.thanhTien}</TableCell>
                                <TableCell align="center">{row.hoTen}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.soDienThoai}</TableCell>
                                <TableCell align="center">{row.diaChi}</TableCell>
                                <TableCell align="center">{row.trangThai}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => onBtnEditOrdersClick(row)}>Edit</Button>
                                    {" "}
                                    <Button color="error" variant="contained" onClick={() => onBtnDeleteOrdersClick(row)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>   
                </Grid>
            </Grid>
            {/* Pagination */}
            <Grid container justifyContent="flex-end" my={4}>
                <Grid item>
                    <Pagination count={noPage} defaultPage={currentPage} onChange={changePageHandler} variant="outlined" color="primary"></Pagination>
                </Grid>
            </Grid>
            {/* Create New Order Modal */}
            <AddOrderModal 
                openModalProps={openAddOrderModal}
                closeModalProps={closeAddOrderModal}
                varReloadPageProps={reloadPage}
                varSetReloadPageProps={setReloadPage}
            />
            {/* Edit Order Modal */}
            <EditOrderModal
                openModalProps={openEditOrderModal}
                closeModalProps={closeEditOrderModal}
                orderInfoEditProps={orderInfoEdit}
                varReloadPageProps={reloadPage}
                varSetReloadPageProps={setReloadPage}
            />
            {/* Delete Order Modal */}
            <DeleteOrderModal
                openModalProps={openDeleteOrderModal}
                closeModalProps={closeDeleteOrderModal}
                orderIdDeleteProps={orderIdDelete}
                varReloadPageProps={reloadPage}
                varSetReloadPageProps={setReloadPage}
            />
        {/* </Container> */}
        </>
    );
};

export default DataTable;