<template>
    <div>
    <div class='newtab'>
        <h3>New server</h3>
        <p>Type</p>
        <select name="cars" ref='type'>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
        </select>
        <button @click='onClickCreate'>Create</button>
        <p v-for="(index, value) in 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet lacinia turpis. Mauris et tortor ultricies, varius nibh ac, dignissim mauris. Duis diam nulla, lobortis non rhoncus eget, sodales quis libero. Duis lacinia a risus eget vehicula. Nullam malesuada nunc quis semper ultrices. Sed sapien lorem, tristique non nibh vel, vestibulum tristique diam. Praesent nisi mauris, congue nec magna vel, malesuada consequat risus.</p>
    </div>    
    </div>    
</template>

<script>
export default {


    methods: {
        onClickCreate: function() {
            console.log('create');
            console.log(this.$refs.type.value);
        }
    }
    
}
</script>

<style lang="scss" scoped>

    $blue: #4688F4;

    .newtab {
        position:absolute;
        top:0px;
        left:0px;
        width: calc(100% - 40px);
        height:100%;

        padding-left: 20px;
        padding-right: 20px;
    }

    button {
        padding:10px;
        background-color: $blue;
        border:none;
        cursor: pointer;
    }

    button:hover {
    }

    button:focus {
        border: none;
        outline: none;
    }
</style>

