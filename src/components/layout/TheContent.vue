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
              <th>
                <label class="m-checkbox">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </th>
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
                style="min-width: 180px; width: 180px"
              >
                Số CMND
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
            <tr v-for="emp in employees" :key="emp.employeeID">
              <td>
                <label class="m-checkbox">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td style="min-width: 148px; width: 148px">
                {{ emp.employeeCode }}
              </td>
              <td style="min-width: 140px; max-width: 190px">
                {{ emp.fullName }}
              </td>
              <td style="min-width: 64px; width: 64px">
                {{ this.formatGender(emp.gender) }}
              </td>
              <td style="min-width: 100px; width: 100px">
                {{ this.formatDate(emp.dateOfBirth) }}
              </td>
              <td style="min-width: 180px; width: 180px">
                {{ emp.identityNumber }}
              </td>
              <td style="min-width: 138px; width: 138px">
                {{ emp.positionName }}
              </td>
              <td style="min-width: 221px; width: 221px">
                {{ emp.departmentName }}
              </td>
              <td style="min-width: 150px; width: 150px">
                {{ emp.bankAccountNumber }}
              </td>
              <td style="min-width: 151px; width: 151px">{{ emp.bankName }}</td>
              <td style="min-width: 150px; width: 150px">
                {{ emp.bankBranchName }}
              </td>
              <td style="min-width: 120px; width: 120px; border-right: 0">
                <div class="action-employee">
                  <div @click.prevent="onClickFix(emp)" class="default-action">
                    Sửa
                  </div>

                  <div
                    @click="showChoiceAction(emp.employeeID)"
                    class="icon-action"
                  ></div>
                </div>
              </td>
              <div
                v-bind:class="[
                  'choice-action',
                  choiceAction == true && choiceID == emp.employeeID
                    ? 'choices-show'
                    : '',
                ]"
              >
                <div class="choice-action-item" @click="onReplication(emp)">
                  Nhân bản
                </div>
                <div
                  @click.stop="showDialogDeleteEmployee(emp)"
                  class="choice-action-item"
                >
                  Xóa
                </div>
                <div class="choice-action-item">Ngưng sử dụng</div>
              </div>
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

    <MessageBox
      :showMsg="isShowMsgBox"
      :message="message"
      :messageBoxMode="messageBoxMode"
      @cancelMsgBox="cancelMsgBox"
      @deleteEmployee="deleteEmployee"
    />
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
import MessageBox from "../base/MessageBox.vue";
import MISAenum from "../../js/enum";

export default {
  name: "EmployeeList",

  components: {
    EmployeeDetail,
    PageSizeComponent,
    LoadingScreen,
    ToastMessage,
    MessageBox,
  },

  data() {
    return {
      employees: [],
      employeeSelected: {},

      isShowDialog: false, // form thông tin nhân viên

      isShowMsgBox: false, // hiện thông báo xóa

      formMode: this.MISAenum.FormMode.Add, // Chọn thêm sửa xóa

      comboboxPageSize: Combobox.getPageSize("1"), //Số lượng bản ghi

      choiceAction: false,
      choiceID: null,

      toastBoxMode: null,

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
          `https://localhost:7176/api/Employees/filter?pageNumber=${me.pageNumberCurrent}&pageSize=${me.pageSize}&employeeFilter=${me.quickSearch}`
        );
        me.employees = res.data.data;
        me.totalRecord = res.data.totalCount;
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
          .get(`https://localhost:7176/api/Employees/NewEmployeeCode`)
          .then(function (res) {
            me.employeeSelected.employeeCode = res.data;
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
      me.quickSearch = "";
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

    /**
     * Mô tả : Hiển thị thông báo
     * Created by: Hà Văn Huy
     * Created date: 14:17 10/10/2022
     */
    showToast(toast) {
      this.toastBoxMode = toast;
      setTimeout(() => {
        this.toastBoxMode = false;
      }, 3000);
    },

    /**
     * Mô tả : Mở bảng chức năng
     * Created by: Hà Văn Huy
     * Created date: 04:04 12/10/2022
     */
    showChoiceAction(employeeID) {
      this.choiceAction = !this.choiceAction;
      this.choiceID = employeeID;
    },

    onReplication(emp) {
      let me = this;
      me.choiceAction = !me.choiceAction;
      me.onClickAdd();
      let tmp = me.employeeSelected.employeeCode;
      me.employeeSelected = JSON.parse(JSON.stringify(emp));
      me.employeeSelected.employeeCode = tmp;
    },

    /**
     * Mô tả : Xóa thông tin nhân viên
     * Created by: Hà Văn Huy
     * Created date: 09:41 9/10/2022
     */
    showDialogDeleteEmployee(emp) {
      this.showConfirmDeleteMsgBox(emp.employeeCode);
      this.employeeSelected = emp;
    },

    /**
     * Mô tả : Hiển thị cảnh báo
     * Created by: Hà Văn Huy
     * Created date: 08:46 15/09/2022
     */
    showConfirmDeleteMsgBox(msg) {
      this.message = msg;
      this.messageBoxMode = MISAenum.Msg.ConfirmDelete;
      this.isShowMsgBox = true;
      this.choiceAction = false;
    },

    /**
     * Mô tả : tắt cảnh báo
     * Created by: Hà Văn Huy
     * Created date: 08:46 15/09/2022
     */
    cancelMsgBox() {
      this.isShowMsgBox = false;
    },

    async deleteEmployee() {
      let employeeID = this.employeeSelected.employeeID;
      try {
        await axios.delete(
          `https://localhost:7176/api/Employees/${employeeID}`
        );
        this.getEmployeePaging();
        this.employeeSelected = {};
        this.showToast(MISAenum.ToastMsg.DeleteSuccess);
      } catch (error) {
        console.log(error);
      }
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

    /**
     * Mô tả : Format giới tính
     * Created by: Hà Văn Huy
     * Created date: 10:10 13/10/2022
     */
    formatGender(value) {
      try {
        if (value == 0) {
          return "Nam";
        } else if (value == 1) {
          return "Nữ";
        } else {
          return "Khác";
        }
      } catch (error) {
        console.log(error);
        return "";
      }
    },
  },
};
</script>