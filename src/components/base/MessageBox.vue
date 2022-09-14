<template>
  <div
    class="m-dialog"
    v-bind:class="['m-dialog', showMsg == true ? 'showDialog' : '']"
  >
    <div class="m-messageBox">
      <div class="m-content-message">
        <div
          class="m-icon-messageBox-warning"
        ></div>
        <div class="m-content-messageBox">
          <span> Tên nhân viên không được phép để trống </span>
        </div>
      </div>
      <div class="m-content-button">
        <button class="m-btn m-btn-no" @click="cancelMsgBox">Không</button>
        <button class="m-btn m-btn-yes">Đồng ý</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../css/base/messageBox.css);
</style>