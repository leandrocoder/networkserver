<template>
    <div class='error'>
        <h1>SORRY</h1>
        <p>Sorry, this app only run inside Electron.</p>    
    </div>
</template>

<script>
export default {
    
    mounter() {
        window.title = "Error";
    }

}
</script>

<style lang="scss">
    
$red: #DB4C2C;

    html, body {
        margin: 0;
        padding: 0;
        background-color: $red;
    }

    h1 {
        font-size: 64px;
        margin: 0;
        padding: 0;
    }

    p {
        font-size: 32px;
    }

    .error {
        position: absolute;
        color: white;
        text-align: center;
        left:50%;
        top:calc(50% - 32px);
        transform: translate(-50%, -50%);
        font-family: Arial, Helvetica, sans-serif;
    }
</style>

