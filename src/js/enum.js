let MISAenum = {
    FormMode: {
        Add: 1,
        Update: 2,
        Delete: 3
    }, 
    MsgBox: {
        InvalidEmployeeCode: "Mã nhân viên không được để trống",
        InvalidEmployeeName: "Tên nhân viên không được để trống",
        InvalidDepartment: "Phòng ban không được để trống",
        InvalidEmail: "Email không đúng định dạng",
        InvalidDateOfBirth: "Ngày sinh không đúng",
        InvalidPhoneNumber: "Số điện thoại chỉ chứa số",
        InvalidEmployeeCodeLength: "Mã nhân viên không quá 20 ký tự"
    },
    Msg: {
        Notify: "isNotifyMess",
        ConfirmDelete: "isConfirmDeleteMess",
        Warning: "isWarningMess"
    },
    ToastMsg: {
        DeleteSuccess: "Xóa nhân viên thành công.",
        AddSuccess: "Thêm mới nhân viên thành công.",
        EditSuccess: "Sửa thông tin nhân viên thành công."
    },
    ToastMode: {
        Success: "success",
        Warning: "warning",
        Error: "error",
        Notify: "notify"
    }
}

export default MISAenum;