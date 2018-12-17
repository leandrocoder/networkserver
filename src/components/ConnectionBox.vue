<template>
    <div class='box'>
        {{type}}
        <div class='ballon'>{{count}}</div>
    </div>
</template>

<script>
export default {
    props: {
        type:{default:"default"},
        count:{default:0}
    }
}
</script>

<style lang="scss" scoped>

    .box {
        position:relative;
        background-color: yellow;
        margin: 0px;
        margin-bottom:10px;
        padding:6px;
        border-radius: 6px;
        width: 100%;
        font-size: 12px;
    }

    .ballon {
        position: absolute;
        bottom: calc(100% - 10px);
        right:-5px;
        background-color: red;
        color: white;
        border-radius: 100px;
        padding-left:8px;
        padding-right:8px;
        padding-bottom: 2px;
    }

</style>


