<template>
  <div class="m-dialog" v-if="showMsg == true">
    <div class="m-messageBox" v-if="messageBoxMode === MISAenum.Msg.Warning">
      <div class="m-content-message">
        <div class="m-icon-messageBox-warning"></div>
        <div class="m-content-messageBox">
          <span> {{ message }} </span>
        </div>
      </div>
      <div class="m-content-button m-msg-warning">
        <button class="m-btn m-btn-no" @click="cancelMsgBox">Đóng</button>
        <!-- <button class="m-btn m-btn-yes">Đồng ý</button> -->
      </div>
    </div>

    <div class="m-messageBox" v-else-if="messageBoxMode === MISAenum.Msg.ConfirmDelete">
      <div class="m-content-message">
        <div class="m-icon-messageBox-warning"></div>
        <div class="m-content-messageBox">
          <span> {{ message }} </span>
        </div>
      </div>
      <div class="m-content-button">
        <button class="m-btn m-btn-no" @click="cancelMsgBox">Đóng</button>
        <button class="m-btn m-btn-yes">Đồng ý</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../css/base/messageBox.css);
</style>

<script>
export default {
  name: "message-box",
  props: {
    showMsg: Boolean,
    messageBoxMode: String,
    message: String,
  },

  methods: {
    /**
    * Mô tả : Đóng thông báo
    * Created by: Hà Văn Huy
    * Created date: 13:33 15/09/2022
    */
    cancelMsgBox() {
      this.$emit("cancelMsgBox", true);
    }
  }
};
</script>