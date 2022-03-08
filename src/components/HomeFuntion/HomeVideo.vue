<template>
    <div id="homeVideo">
        <video class="hv-video" controls>
            <source src="../../assets/video/test/000001.mp4" type="video/mp4">
            浏览器不支持 video 标签
        </video>
    </div>
</template>

<script>
export default {
    name: "HomeVideo",

}
</script>

<style lang="scss" scoped>
#homeVideo {
    width: 96%;
    height: 84%;
    margin: 1rem auto;
    background: red;
    .hv-video {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        background: #000;
    }
}
</style>