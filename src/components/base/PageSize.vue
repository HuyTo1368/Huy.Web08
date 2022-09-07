<template>
  <div class="m-page-size" :FieldName="items.FieldName">
    <input
      type="text"
      class="m-page-size-input"
      v-model="value"
      :placeholder="items.placeholder"
    />
    <div class="m-button-data" @click="onClickArrow">
      <button class="m-page-size-button" ></button>
    </div>
    <div class="m-page-size-data" v-show="isShowItem">
      <div
        class="m-page-size-item"
        v-bind:class="[value == item.name ? 'm-page-size-selected' : '']"
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
  name: "PageSizeComponent",

  props: ["items"],

  data() {
    return {
      itemSelected: {},
      isShowItem: false,
      value: "10 bản ghi trên một trang",

      active: false,
    };
  },

  methods: {
    /**
     * Mô tả : Mở/ đóng data pageSize
     * Created by: Hà Văn Huy
     */
    onClickArrow() {
      let me = this;
      me.isShowItem = !me.isShowItem;
    },

    /**
     * Mô tả : Chọn item trong pageSize
     * Created by: Hà Văn Huy
     */
    onClickItem(item) {
      this.itemSelected = item;
      this.onClickArrow();

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
  },
};
</script>