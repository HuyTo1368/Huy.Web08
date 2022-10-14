<template>
  <div class="m-combobox" :FieldName="items.FieldName">
    <input
      type="text"
      v-bind:class="['m-combobox-input', this.errorInput == true ? 'm-row-error':'']"
      v-model="value"
      :placeholder="items.placeholder"
    />
    <div class="m-button-data" @click="onClickArrow">
      <button class="m-combobox-button"></button>
    </div>
    
    <div class="m-combobox-data" v-show="isShowItem">
      <div
        class="m-combobox-item"
        v-bind:class="[value == item.name ? 'm-combobox-selected' : '']"
        v-for="item in items.data"
        :key="item.id"
        :value="item.id"
        @click="onClickItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComboboxComponent",

  props: ["items", "valueSelectedID", "valueSelectedName", "errorDepartment"],

  data() {
    return {
      itemSelected: {},
      isShowItem: false,
      value: "",

      active: false,
      errorInput: false
    };
  },

  created() {
    if(this.valueSelectedID) {
      this.itemSelected = {id: this.valueSelectedID, name: this.valueSelectedName}
      this.value = this.itemSelected.name;
    }
  }, 

  methods: {
    /**
     * Mô tả : Mở/ đóng data combobox
     * Created by: Hà Văn Huy
     */
    onClickArrow() {
      let me = this;
      me.isShowItem = !me.isShowItem;
    },

    /**
     * Mô tả : Chọn item trong combobox
     * Created by: Hà Văn Huy
     */
    onClickItem(item) {
      this.itemSelected = item;
      this.onClickArrow();
      this.errorInput = false;

      let data = {
        fieldName: this.items.FieldName,
        item: this.itemSelected,
      };
      this.$emit("bindDataForm", data);
    },

    /**
     * Mô tả : Đóng mở combobox data
     * Created by: Hà Văn Huy
     */
    onClickAway(event) {
      console.log(event);
    },

    /**
     * Mô tả : Nhấp chuột ngoài combobox
     * Created by: Hà Văn Huy
     */
    onClickOutside() {
      this.active = false;
    },
  },

  watch: {
    itemSelected: function () {
      this.value = this.itemSelected.name;
    },

    errorDepartment: function (newEmp) {
      this.errorInput = newEmp;
    }
  },
};
</script>