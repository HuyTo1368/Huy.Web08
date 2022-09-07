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
                {{ emp.EmployeeName }}
              </td>
              <td style="min-width: 64px; width: 64px">
                {{ emp.GenderName }}
              </td>
              <td style="min-width: 100px; width: 100px">huy</td>
              <td style="min-width: 138px; width: 138px">Nhân viên</td>
              <td style="min-width: 221px; width: 221px">
                {{ emp.DepartmentName }}
              </td>
              <td style="min-width: 150px; width: 150px">3067151</td>
              <td style="min-width: 151px; width: 151px">ACB</td>
              <td style="min-width: 180px; width: 180px">Hoạt động</td>
              <td style="min-width: 150px; width: 150px">Cầu Giấy</td>
              <td style="min-width: 120px; width: 120px; border-right: 0">
                <div class="m-table-func text-align-center">
                  <div class="m-func-name" @click="onClickFix(emp)">Sửa</div>
                  <div
                    class="btn-dropdown"
                    @click="showHideFunc(emp.EmployeeCode)"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="m-grid-paging">
        <div class="m-paging-left">
          <div>Tổng số : <span style="font-weight: 600">88</span> bản ghi</div>
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
      @closeOnClick="showHideDialog"
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

export default {
  name: "EmployeeList",

  components: {
    EmployeeDetail,
    PageSizeComponent,
  },

  data() {
    return {
      employees: [],
      employeeSelected: {},

      isShowDialog: false, // form thông tin nhân viên

       comboboxPageSize: Combobox.getPageSize("1")
    };
  },

  created() {
    let me = this;
    me.getEmployeePaging();
  },

  methods: {
    async getEmployeePaging() {
      try {
        let me = this;
        let res = await axios.get(`https://amis.manhnv.net/api/v1/Employees`);
        me.employees = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Thưc hiệm thêm nhân viên
     * Created by: Hà Văn Huy
     */
    onClickAdd() {
      let me = this;
      try {
        me.employeeSelected = {};
        me.showHideDialog(true);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả : Ẩn hiện form thông tin nhân viên
     * Created by: Hà Văn Huy
     */
    showHideDialog(isShow) {
      this.isShowDialog = isShow;
    },
  },
};
</script>