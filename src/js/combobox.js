
// Các hàm dùng chung toàn chương trình
var Combobox = Combobox || {};

Combobox.getDepartment = function (Parent) {
    let data = [
        { id: "", name: "Tất cả phòng ban"},
        { id: "11452b0c-768e-5ff7-0d63-eeb1d8ed8cef", name: "Phòng Công nghệ thông tin" },
        { id: "142cb08f-7c31-21fa-8e90-67245e8b283e", name: "Phòng Sản xuất" },
        { id: "17120d02-6ab5-3e43-18cb-66948daf6128", name: "Phòng Đào tạo" },
        { id: "469b3ece-744a-45d5-957d-e8c757976496", name: "Phòng Nhân sự" },
        { id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c", name: "Phòng Tuyển dụng" },
    ],
        placeholder = "Tất cả phòng ban",
        FieldName = "Department",
        NameId = "DepartmentId";

    return {
        data,
        placeholder,
        FieldName,
        NameId,
        Parent,
    }
}

Combobox.getPageSize = function (Parent) {
    let data = [
        { id: "10", name: "10 bản ghi trên một trang"},
        { id: "20", name: "20 bản ghi trên một trang" },
        { id: "30", name: "30 bản ghi trên một trang" },
        { id: "50", name: "50 bản ghi trên một trang" },
        { id: "100", name: "100 bản ghi trên một trang" },
    ],
        placeholder = "Tất cả phòng ban",
        FieldName = "PageSize",
        NameId = "PageSizeId";

    return {
        data,
        placeholder,
        FieldName,
        NameId,
        Parent,
    }
}

export default Combobox;