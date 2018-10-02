<template>
    <img v-if="iso" :src="flagIconSource" class="cute-flag-icon" alt="">
</template>
<script>
export default {
    name: 'cute-flag',
    props: {
        basePath: { type : String, default: "./static/flagpack/"},
        fileType: { type : String, default: ".svg"},
        iso: { type: String, default: null },
    },
    computed: {
        flagIconSource() {
            return this.basePath + this.iso.toUpperCase() + this.fileType;
        }
    }
}
</script>
<style lang="scss" scoped>
.cute-flag-icon {
    width: 32px;
    height: auto;
}
</style>