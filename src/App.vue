<template>
  <TheNavbar />
  <TheHeader />
  <TheContent />
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheContent from './components/layout/TheContent.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheHeader, TheContent
}
}
</script>

<style>
@import url(./css/main.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css);
</style>
