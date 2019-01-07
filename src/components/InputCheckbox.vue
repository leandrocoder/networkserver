<template>
    <div @click='onClick' class='checkbox'>
        <input class='ignoreinput' type="checkbox" ref="checkbox"><slot>Selected</slot>
    </div>    
</template>

<script>
export default {

    data: () => ({
        value: false
    }),
    
    methods: {
        onClick : function() {
            console.log('click');
            this.value = !this.value;
            this.$refs.checkbox.checked = this.value;
        }
    }

}
</script>

<style lang="scss" scoped>

    .checkbox {
        position: relative;
        cursor: pointer;
    }

    .ignoreinput {
        pointer-events: none;
    }

</style>

