<template>
  <div class="m-content">
    <div class="m-header-content">
      <div class="m-title">Nhân viên</div>
      <button class="m-btn-add" @click="onClickAdd">Thêm mới nhân viên</button>
    </div>

    <div class="m-center-content">
      <div class="m-grid-header">
        <div class="m-search-infor">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã, tên nhân viên"
            class="m-input-infor"
            v-on:keyup.enter="onQuickSearch"
            v-model="quickSearch"
          />
          <div class="m-icon-search"></div>
        </div>
        <div class="m-btn m-icon-refresh" @click="btnRefresh()"></div>
      </div>
      <div class="m-grid-table">
        <table class="m-table">
          <thead>
            <tr>
              <th><input type="checkbox" name="" id="" /></th>
              <th
                class="text-align-left"
                style="min-width: 148px; width: 148px"
              >
                Mã nhân viên
              </th>
              <th
                class="text-align-left"
                style="min-width: 190px; max-width: 190px"
              >
                Tên nhân viên
              </th>
              <th class="text-align-left" style="min-width: 64px; width: 64px">
                Giới tính
              </th>
              <th
                class="text-align-left"
                style="min-width: 100px; width: 100px"
              >
                Ngày sinh
              </th>
              <th
                class="text-align-left"
                style="min-width: 138px; width: 138px"
              >
                Chức danh
              </th>
              <th
                class="text-align-left"
                style="min-width: 221px; width: 221px"
              >
                Tên đơn vị
              </th>
              <th
                class="text-align-left"
                style="min-width: 150px; width: 150px"
              >
                Số tài khoản
              </th>
              <th
                class="text-align-left"
                style="min-width: 151px; width: 151px"
              >
                Tên ngân hàng
              </th>
              <th
                class="text-align-left"
                style="min-width: 180px; width: 180px"
              >
                Trạng thái
              </th>
              <th
                class="text-align-left"
                style="min-width: 150px; width: 150px"
              >
                Chi nhánh
              </th>
              <th
                class="text-align-center"
                style="min-width: 120px; width: 120px; border-right: 0"
              >
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.EmployeeId">
              <td><input type="checkbox" name="" id="" /></td>
              <td style="min-width: 148px; width: 148px">
                {{ emp.EmployeeCode }}
              </td>
              <td style="min-width: 140px; max-width: 190px">
                {{ emp.FullName }}
              </td>
              <td style="min-width: 64px; width: 64px">
                {{ emp.GenderName }}
              </td>
              <td style="min-width: 100px; width: 100px">
                {{ this.formatDate(emp.DateOfBirth) }}
              </td>
              <td style="min-width: 138px; width: 138px">
                {{ emp.PositionName }}
              </td>
              <td style="min-width: 221px; width: 221px">
                {{ emp.DepartmentName }}
              </td>
              <td style="min-width: 150px; width: 150px">3067151</td>
              <td style="min-width: 151px; width: 151px">ACB</td>
              <td style="min-width: 180px; width: 180px">Hoạt động</td>
              <td style="min-width: 150px; width: 150px">Cầu Giấy</td>
              <td style="min-width: 120px; width: 120px; border-right: 0">
                <div class="action-employee">
                  <div @click.prevent="onClickFix(emp)" class="default-action">
                    Sửa
                  </div>

                  <div @click="showChoiceAction" class="icon-action"></div>

                  <!-- <div class="choice-action">
                    <div class="choice-action-item">Nhân bản</div>
                    <div
                      @click.stop="showDialogDeleteEmployee($event, emp)"
                      class="choice-action-item"
                    >
                      Xóa
                    </div>
                    <div class="choice-action-item">Sử dụng</div>
                  </div> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-grid-paging">
        <div class="m-paging-left">
          <div>
            Tổng số :
            <span style="font-weight: 600">{{ totalRecord }}</span> bản ghi
          </div>
        </div>
        <div class="m-paging-right">
          <div class="m-page-size">
            <PageSize-component
              :items="this.comboboxPageSize"
              @bindDataForm="bindDataForm"
            ></PageSize-component>
          </div>
          <div class="m-page-list">
            <div class="m-prev-page">Trước</div>
            <div class="m-number-list m-page-number-selected">1</div>
            <div class="m-number-list">2</div>
            <div class="m-number-list">3</div>
            <div class="m-number-list">4</div>
            <div class="m-prev-page">Sau</div>
          </div>
        </div>
      </div>
    </div>
    <EmployeeDetail
      :isShow="isShowDialog"
      :employeeSelectedInChild="employeeSelected"
      :formMode="formMode"
      :success="success"
      @closeOnClick="showHideDialog"
      @reloadData="btnRefresh"
      @clickSaveAndAdd="SaveAndAdd"
      @showToast="showToast"
    />

    <ToastMessage :toastBoxMode="toastBoxMode" />

    <loading-screen v-if="isLoading" />
  </div>
</template>

<style>
@import url(../../css/layout/content.css);
</style>

<script>
import axios from "axios";
import PageSizeComponent from "../base/PageSize.vue";
import EmployeeDetail from "../view/EmployeeDetail.vue";
import Combobox from "../../js/combobox";
import LoadingScreen from "../layout/LoadingScreen.vue";
import ToastMessage from "../base/ToastMessage.vue";

export default {
  name: "EmployeeList",

  components: {
    EmployeeDetail,
    PageSizeComponent,
    LoadingScreen,
    ToastMessage,
  },

  data() {
    return {
      employees: [],
      employeeSelected: {},

      isShowDialog: false, // form thông tin nhân viên

      formMode: this.MISAenum.FormMode.Add, // Chọn thêm sửa xóa

      comboboxPageSize: Combobox.getPageSize("1"), //Số lượng bản ghi

      choicheck: false,

      toastBoxMode: false,

      pageNumberCurrent: 1,
      pageNumberMin: 1,
      pageNumberLessMiddle: 2,
      pageNumberThanMiddle: 3,
      PageNumberMax: 4,
      jobpositionID: "",
      departmentID: "",
      pageSize: 10, // Số bản ghi trên trang
      totalRecord: 0, // Tổng số bản ghi
      quickSearch: "", // Tìm kiếm nhanh theo tên, mã nv
    };
  },

  created() {
    let me = this;
    me.getEmployeePaging();
  },

  methods: {
    /**
     * Mô tả : Lấy danh sách thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 11:53 13/09/2022
     */
    async getEmployeePaging() {
      this.isLoading = true;
      try {
        let me = this;
        let res = await axios.get(
          `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=${me.pageSize}&pageNumber=${me.pageNumberCurrent}&employeeFilter=${me.quickSearch}&departmentId=${me.departmentID}&positionId=${me.jobpositionID}`
        );
        me.employees = res.data.Data;
        me.totalRecord = res.data.TotalRecord;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    /**
     * Mô tả : Mở form thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 11:23 13/09/2022
     */
    onClickAdd() {
      let me = this;
      me.formMode = me.MISAenum.FormMode.Add;
      try {
        me.employeeSelected = {};
        me.showHideDialog(true);
        axios
          .get(`https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode`)
          .then(function (res) {
            me.employeeSelected.EmployeeCode = res.data;
          })
          .catch(function (res) {
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Chỉnh sửa thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 14:30 13/09/2022
     */
    onClickFix(emp) {
      this.showHideDialog(true);
      this.formMode = this.MISAenum.FormMode.Update;
      this.employeeSelected = JSON.parse(JSON.stringify(emp));
    },

    /**
     * Mô tả : Ẩn hiện form thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 11:25 12x/09/2022
     */
    showHideDialog(isShow) {
      this.isShowDialog = isShow;
    },

    /**
     * Mô tả : Enter tìm kiếm theo tên, mã nhân viên
     * Created by: Hà Văn Huy
     * Created date: 13:00 13/09/2022
     */
    onQuickSearch() {
      this.getEmployeePaging();
    },

    /**
     * Mô tả : Load lại danh sách nhân viên
     * Created by: Hà Văn Huy
     * Created date: 17:27 15/09/2022
     */
    btnRefresh() {
      let me = this;
      me.getEmployeePaging();
    },

    /**
     * Mô tả : Chọn số lượng bản ghi
     * Created by: Hà Văn Huy
     * Created date: 13:07 13/09/2022
     */
    bindDataForm(data) {
      let me = this;
      me.pageSize = data.item.id;
      me.getEmployeePaging();
    },

    /**
     * Mô tả : Cất và thêm
     * Created by: Hà Văn Huy
     * Created date: 00:31 21/09/2022
     */
    SaveAndAdd() {
      this.showHideDialog(false);
      setTimeout(() => {
        this.onClickAdd();
      }, 1000);
    },

    showToast(toast) {
      this.toastBoxMode = toast;
      setTimeout(() => {
        this.toastBoxMode = false;
      }, 3000);
    },

    /**
     * Mô tả : Fomat định dạng ngày tháng năm
     * Created by: Hà Văn Huy
     * Created date: 12:23 12/09/2022
     */
    formatDate(value) {
      try {
        if (value) {
          value = new Date(value);
          let date = value.getDate();
          let month = value.getMonth() + 1;
          let year = value.getFullYear();
          date = date < 10 ? `0${date}` : date;
          month = month < 10 ? `0${month}` : month;
          value = `${date}/${month}/${year}`;
        } else {
          value = "Chưa có";
        }
        return value;
      } catch (error) {
        console.log(error);
        return "";
      }
    },
  },
};
</script>