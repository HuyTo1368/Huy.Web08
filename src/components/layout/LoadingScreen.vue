<template>
    <div class="loading-body">
        <div class="loading-container">
            <!-- <div class="loading-icon"></div> -->
            <img src="../../assets/loading.svg" alt="loading">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .loading-body {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        background: rgba(0, 0, 0, 0.1);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .loading-container {
        display: flex;
        width: 100px;
        height: 100px;
        justify-content: center;
        align-items: center;
        position: relative;
        animation: rotate-loading 1s ease infinite;
    }

    .loading-icon {
        background: url('../../assets/loading.svg') no-repeat 0 0;
        width: 32px;
        height: 32px;
    }

    @keyframes rotate-loading {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>