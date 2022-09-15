
// Các hàm dùng chung toàn chương trình
var Combobox = Combobox || {};

Combobox.getDepartment = function (Parent) {
    // let res = axios.get(
    //     `https://cukcuk.manhnv.net/api/v1/Departments`
    // );

    // let data = [];
    // for (let i=0; i < res.length; i++) {
    //     let temp = {id: res.data.DepartmentId, name: res.data.DepartmentName};
    //     data = [...temp];
    // }

    let data = [
        { id: "3f8e6896-4c7d-15f5-a018-75d8bd200d7c", name: "Phòng Công nghệ thông tin" },
        { id: "45ac3d26-18f2-18a9-3031-644313fbb055", name: "Phòng Hành chính" },
        { id: "78aafe4a-67a7-2076-3bf3-eb0223d0a4f7", name: "Phòng Nhân sự" },
        { id: "7c4f14d8-66fb-14ae-198f-6354f958f4c0", name: "Phòng Kế Toán" },
    ],
        placeholder = "Tên đơn vị",
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
        { id: "10", name: "10 bản ghi trên một trang" },
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