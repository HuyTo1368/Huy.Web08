<template>
  <div v-if="isShow == true" class="m-form-employee">
    <div class="m-detail-employee">
      <div class="m-dialog-header">
        <div class="m-header-right">
          <div class="m-dialog-title">THÔNG TIN NHÂN VIÊN</div>
          <div style="display: flex; align-items: center">
            <label class="m-checkbox"
              >Là khách hàng
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="m-checkbox"
              >Là nhà cung cấp
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="m-header-left">
          <div class="m-dialog-close" @click="onClickClose">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>

      <div class="m-dialog-content">
        <div class="m-infor-employee">
          <div class="m-infor-right">
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Mã <span style="color: red">*</span></label>
                <br />
                <input
                  type="text"
                  style="width: 151px"
                  placeholder="Nhập mã nhân viên"
                  v-model="employee.EmployeeCode"
                  id="txtEmployeeCode"
                  ref="employeeCodeInput"
                />
              </div>
              <div class="m-row-field">
                <label>Tên <span style="color: red">*</span></label>
                <br />
                <input
                  type="text"
                  style="width: 235px"
                  placeholder="Nhập họ tên"
                  v-model="employee.FullName"
                  ref="employeeNameInput"
                  id="txtEmployeeName"
                />
              </div>
            </div>
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Đơn vị <span style="color: red">*</span></label>
                <br />
                <combobox-component
                  :items="this.departments"
                  @bindDataForm="bindDataForm"
                ></combobox-component>
              </div>
            </div>
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Chức danh</label>
                <br />
                <input
                  type="text"
                  style="width: 392px"
                  placeholder="Nhập chức danh"
                />
              </div>
            </div>
          </div>
          <div class="m-infor-left">
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Ngày sinh</label>
                <br />
                <input type="date" style="width: 161px" v-model="dobformat" />
              </div>
              <div class="m-row-field" style="padding-left: 20px">
                <label>Giới tính</label>
                <br />
                <div class="m-gender">
                  <label class="m-radio_button"
                    >Nam
                    <input
                      type="radio"
                      name="radio"
                      value="0"
                      v-model="employee.Gender"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="m-radio_button"
                    >Nữ
                    <input
                      type="radio"
                      name="radio"
                      value="1"
                      v-model="employee.Gender"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="m-radio_button"
                    >Khác
                    <input
                      type="radio"
                      name="radio"
                      value="2"
                      v-model="employee.Gender"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Số CMND</label>
                <br />
                <input
                  type="text"
                  style="width: 245px"
                  placeholder="Nhập số CMND"
                />
              </div>
              <div class="m-row-field">
                <label>Ngày cấp</label>
                <br />
                <input type="date" style="width: 167px" />
              </div>
            </div>
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Nơi cấp</label>
                <br />
                <input
                  type="text"
                  style="width: 418px"
                  placeholder="Nhập nơi cấp"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-address-employee">
          <div class="m-infor-row">
            <div class="m-row-field">
              <label>Địa chỉ</label>
              <br />
              <input
                type="text"
                style="width: 841px"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
          <div class="m-infor-row">
            <div class="m-row-field">
              <label>ĐT di động</label>
              <br />
              <input type="text" style="width: 197px" />
            </div>
            <div class="m-row-field">
              <label>ĐT cố định</label>
              <br />
              <input type="text" style="width: 197px" />
            </div>
            <div class="m-row-field">
              <label>Email</label>
              <br />
              <input
                type="text"
                style="width: 203px"
                v-model="employee.Email"
              />
            </div>
          </div>
          <div class="m-infor-row">
            <div class="m-row-field">
              <label>Tài khoản ngân hàng</label>
              <br />
              <input type="text" style="width: 197px" />
            </div>
            <div class="m-row-field">
              <label>Tên ngân hàng</label>
              <br />
              <input type="text" style="width: 197px" />
            </div>
            <div class="m-row-field">
              <label>Chi nhánh</label>
              <br />
              <input type="text" style="width: 203px" />
            </div>
          </div>
        </div>
      </div>

      <div class="m-dialog-button">
        <div class="m-button-cancel">
          <button class="m-btn-form" @click="onClickClose">Hủy</button>
        </div>
        <div class="m-button-accpect">
          <button class="m-btn-form">Cất</button>
          <button class="m-btn-form m-btn-form-add" @click="btnSaveOnClick">
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
    <MessageBox
      :showMsg="isShowMsgBox"
      :message="message"
      :messageBoxMode="messageBoxMode"
      @cancelMsgBox="isShowMsgBox = !$event"
    />
  </div>
</template>

<script>
import axios from "axios";

import Combobox from "../../js/combobox";
import ComboboxComponent from "../base/Combobox.vue";
import MessageBox from "../base/MessageBox.vue";

import MISAenum from "../../js/enum";

export default {
  name: "EmployeeDetail",

  components: {
    ComboboxComponent,
    MessageBox,
  },

  props: ["isShow", "employeeSelectedInChild", "formMode"],

  data() {
    return {
      employee: {},

      //date of birth sau khi dinh dang
      dobformat: "",

      isShowMsgBox: false, // Hiển thị messageBox

      departments: Combobox.getDepartment("EmployeeList"),

      check: true,
    };
  },

  watch: {
    /**
     * Mô tả : Tự động thêm mã nhân viên và focus
     * Created by: Hà Văn Huy
     * Created date: 11:27 13/09/2022
     */
    employeeSelectedInChild: function (newEmp) {
      this.employee = newEmp;
      this.dobformat = this.formatDate(this.employee.DateOfBirth);
      setTimeout(() => {
        this.$refs.employeeCodeInput.focus();
      }, 100);
    },
  },

  methods: {
    /**
     * Mô tả : Tắt form thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 11:15 13/09/2022
     */
    onClickClose() {
      this.$emit("closeOnClick", false);
    },

    /**
     * Mô tả : Hiển thị cảnh báo
     * Created by: Hà Văn Huy
     * Created date: 08:46 15/09/2022
     */
    showWarningMsgBox(msg) {
      this.message = msg;
      this.messageBoxMode = MISAenum.Msg.Warning;
      this.isShowMsgBox = true;
    },

    /**
     * Mô tả : Kiểm tra các trường dữ liệu bắt buộc nhập
     * Created by: Hà Văn Huy
     * Created date: 13:38 15/09/2022
     */
    validateEmployee() {
      this.check = true;
      if (!this.employee.EmployeeCode) {
        this.showWarningMsgBox(MISAenum.MsgBox.InvalidEmployeeCode);
        this.check = false;
      } else if (!this.employee.FullName) {
        this.showWarningMsgBox(MISAenum.MsgBox.InvalidEmployeeName);
        this.check = false;
      } else if (!this.employee.DepartmentId) {
        this.showWarningMsgBox(MISAenum.MsgBox.InvalidDepartment);
        this.check = false;
      }
    },

    /**
     * Mô tả : Ấn cất thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 13:58 15/09/2022
     */
    btnSaveOnClick() {
      this.validateEmployee();
      if (this.check) {
        if (this.formMode == MISAenum.FormMode.Add) {
          this.postNewEmployee(); // Thêm một nhân viên
        } else if (this.formMode == MISAenum.FormMode.Update) {
          this.putEmployee(); // Sửa thông tin nhân viên
        }
      }
    },

    /**
     * Mô tả : Thêm mới một nhân viên
     * Created by: Hà Văn Huy
     * Created date: 21:23 14/09/2022
     */
    async postNewEmployee() {
      try {
        await axios.post(
          "https://cukcuk.manhnv.net/api/v1/Employees",
          this.employee
        );
        // Thêm mới thành công
        this.employee = {};
        this.onClickClose();
        this.reloadData();
      } catch (res) {
        this.showWarningMsgBox(res.response.data.devMsg);
      }
    },

    /**
     * Mô tả : Thêm mới một nhân viên
     * Created by: Hà Văn Huy
     * Created date: 21:45 14/09/2022
     */
     async putEmployee() {
      // try {
      //   await axios.put(
      //     "https://cukcuk.manhnv.net/api/v1/Employees",
      //     this.employee.id
      //   );
      //   this.employee = {};
      //   this.onClickClose();
      //   this.reloadData();
      // } catch (res) {
      //   this.showWarningMsgBox(res.response.data.devMsg);
      // }
    },

    /**
     * Mô tả : Load lại danh sách nhân viên
     * @param
     * @return
     * Created by: Hà Văn Huy
     * Created date: 21:29 14/09/2022
     */
    reloadData() {
      this.$emit("reloadData");
    },

    /**
     * Mô tả : Lấy dữ liệu từ các combobox
     * Created by: Hà Văn Huy
     * Created date: 01:16 15/09/2022
     */
    bindDataForm(data) {
      this.employee.DepartmentId = data.item.id;
    },

    /**
     * Mô tả : Fomat ngày tháng năm
     * Created by: Hà Văn Huy
     * Created date: 20:43 13/09/2022
     */
    formatDate(value) {
      if (value) {
        value = new Date(value);
        let day = value.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        let month = value.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let year = value.getFullYear();
        value = `${year}-${month}-${day}`;
        return value;
      } else {
        return "";
      }
    },
  },
};
</script>