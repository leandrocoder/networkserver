<template>
    <div class='tabs'>

        <div v-for="(item, index) in value" :class="'tab' + (active == index ? ' active' : '')" @click="onClickTab(index)">
            <p>{{item}}</p>
        </div>

    </div>
</template>

<script>
export default {
    data : () => ({

    }),

    props: {
        active: {default: 0},
        value: {
            type:Array,
            default: () => ["default server"]
        }
    },

    methods: {
        onClickTab: function(index)
        {
            this.$emit('click', index);
        }
    }
}
</script>

<style lang="scss" scoped>

    $blue: #4688F4;
    $darkBlue: #203F70;

    .tabs {
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        height:32px;
        display: flex;
        

        .tab {
            position: relative;
            width:150px;
            height:100%;
            background-color: $darkBlue;
            margin-right:5px;
            cursor: pointer;

            p {
                position:absolute;
                top:50%;
                left:10px;
                transform: translateY(-50%);
                margin:0;
                padding: 0;
            }
        }

        .active {
            background-color: $blue;
            color: white;
        }
    }
</style>
