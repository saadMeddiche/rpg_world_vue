<template>
    <successMessage message="Account Updated Successfuly" path="Account"></successMessage>
    <errors></errors>
    <div class="Account">
        <div class="Info">
            <div class="Holder Name">
                <input type="text" placeholder="Name..." class="account-input" :disabled="mods.display_infomrations" v-model="info.name">
            </div>
            <div class="Holder Email">
                <input type="email" placeholder="Email..." class="account-input" :disabled="mods.display_infomrations" v-model="info.email">
            </div>
            <div class="Holder Current-Password" v-if="mods.update_infomrations" >
                <input type="text" placeholder="Current Password..." class="account-input" v-model="info.current_password">
            </div>  
            <div class="Holder Repeat-Password" v-if="mods.update_infomrations">
                <input type="text" placeholder="New Password..." class="account-input" v-model="info.new_password">
            </div>
            <div class="Holder New-Password" v-if="mods.update_infomrations">
                <input type="text" placeholder="Repeat New Password..." class="account-input" v-model="info.repeat_password">
            </div>
            <div class="Holder buttons">
                <button class="Modify" v-if="mods.display_infomrations" @click="when_modifications_btn_is_clicked">Modification</button>
                <button class="Update" v-if="mods.update_infomrations" @click="when_update_btn_is_clicked">Update</button>
                <button class="Cancel" v-if="mods.update_infomrations" @click="when_cancel_btn_is_clicked">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>

    import { get_user_information,update_user_informations } from '@/utils/apiFunctions'
    import successMessage from '@/components/successMessage.vue'
    import errors from '@/components/errors.vue'
    import * as account from '@/utils/accountFunctions'

    export default{
        components:{
            successMessage,
            errors
        },
        async mounted(){

            account.set_reference(this)

            this.info = await get_user_information()
        },
        data(){
            return {
                info:{
                    current_password:'',
                    new_password:'',
                    repeat_password:''
                },
                mods:{
                    display_infomrations:true,
                    update_infomrations: false,
                }
            }
        },
        methods:{
            when_modifications_btn_is_clicked(){
                account.switch_mod()
            },
            when_cancel_btn_is_clicked(){
                account.clear_inputs()
                account.switch_mod()

            }
            ,
            when_update_btn_is_clicked(){
                account.update_information()
            }
        }
    }
</script>
<style lang="scss" scoped>
    // Set variables for colors and font sizes
    $primary-color: #00ff84;
    $secondary-color: #0077ff;
    $thirdly-color: #ff6600;
    $fourthly-color: #999999;

    $font-size: 16px;

    // Style the container
    .Account {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 85vh;
        background-color: #f2f2f2;
    }

    // Style the inner content
    .Info {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        width: 500px;
    }

    // Style the input fields
    .account-input {
        padding: 10px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 2px solid $thirdly-color;
        font-size: $font-size;
        color:$thirdly-color;
        font-weight: bold;
        &::placeholder{
            color:$thirdly-color;
            font-weight: bold;
        }
    }

    // Style the buttons
    .buttons {
        border: none;
        border-radius: 5px;
        font-size: $font-size;
        gap:5px;        
        cursor: pointer;
        transition: all 0.3s ease-in-out;

    

        .Modify{
            background-color: $primary-color;
            border: none;
            color: white;
            padding: 10px;
            
            &:hover {
                background-color: darken($primary-color, 10%);
            }
        }

        .Update{
            background-color: $primary-color;
            border: none;
            color: white;
            padding: 10px;


            &:hover {
                background-color: darken($primary-color, 10%);
            }
        }

        .Cancel{
            background-color: $thirdly-color;
            border: none;
            color: white;
            padding: 10px;


            &:hover {
                background-color: darken($thirdly-color, 10%);
            }
        }

    
    }

    // Style the form fields
    .Holder {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }
</style>
