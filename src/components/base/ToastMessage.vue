<template>
  <div class="m-toast_messenger" v-if="toastBoxMode == MISAenum.ToastMsg.AddSuccess">
    <div class="m-toast-icon-add"></div>
    <div class="m-toast-text">Thêm mới thành công</div>
    <div class="m-toast-close"><i class="fas fa-times"></i></div>
  </div>

  <div class="m-toast_messenger" v-if="toastBoxMode == MISAenum.ToastMsg.EditSuccess">
    <div class="m-toast-icon-edit"></div>
    <div class="m-toast-text">Chỉnh sửa thành công</div>
    <div class="m-toast-close"><i class="fas fa-times"></i></div>
  </div>

  <div class="m-toast_messenger m-toast-delete" v-if="toastBoxMode == MISAenum.ToastMsg.DeleteSuccess">
    <div class="m-toast-icon-delete"></div>
    <div class="m-toast-text">Xóa thành công</div>
    <div class="m-toast-close-delete"><i class="fas fa-times"></i></div>
  </div>
</template>

<style scoped>
@import url(../../css/base/toast.css);
</style>

<script>
export default {
    props: ["toastBoxMode"],
};
</script>

