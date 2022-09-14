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
                <label>Mã (<font color="red">*</font>)</label>
                <br />
                <input
                  type="text"
                  style="width: 151px"
                  placeholder="Nhập mã nhân viên"
                  v-model="employee.EmployeeCode"
                  ref="employeeCodeInput"
                />
              </div>
              <div class="m-row-field">
                <label>Tên (<font color="red">*</font>)</label>
                <br />
                <input
                  type="text"
                  style="width: 235px"
                  placeholder="Nhập họ tên"
                  v-model="employee.FullName"
                  ref="employeeNameInput"
                />
              </div>
            </div>
            <div class="m-infor-row">
              <div class="m-row-field">
                <label>Đơn vị (<font color="red">*</font>)</label>
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
                <input
                  type="date"
                  style="width: 161px"
                  placeholder="Nhập mã nhân viên"
                  v-model="dobformat"
                />
              </div>
              <div class="m-row-field" style="padding-left: 20px">
                <label>Giới tính</label>
                <br />
                <div class="m-gender">
                  <label class="m-radio_button"
                    >Nam
                    <input type="radio" name="radio" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="m-radio_button"
                    >Nữ
                    <input type="radio" name="radio" />
                    <span class="checkmark"></span>
                  </label>
                  <label class="m-radio_button"
                    >Khác
                    <input type="radio" name="radio" />
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
  </div>
</template>

<script>
import Combobox from "../../js/combobox";

import ComboboxComponent from "../base/Combobox.vue";

export default {
  name: "EmployeeDetail",

  components: {
    ComboboxComponent,
  },

  props: ["isShow", "employeeSelectedInChild", "formMode"],

  data() {
    return {
      employee: {},

      departments: Combobox.getDepartment("EmployeeList"),
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
    }


  }
};
</script>