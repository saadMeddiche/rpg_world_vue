<template>
    <div class="SideBare">
        <div class="Menus">
            <div class="Menu" v-for="(Menu ,key) in Menus" :key="key">
                <div class="Icon">{{ Menu.Icon }}</div>
                <div class="Title">{{ Menu.Title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                Menus:{
                    'Dashboard' : {Icon:'Dashboard', Title:'Dashboard'},
                    'Games' : {Icon:'Games', Title:'Games'},
                    'Servers' : {Icon:'Servers', Title:'Servers'},
                }
            }
        }
    }
</script>

<style>

</style>