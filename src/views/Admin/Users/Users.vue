<template>
    <successMessage :message="success_message" path="Users"></successMessage>
    <errors></errors>

    <div class="Users">
        <div class="User" v-for="(user,key) in users" :key="key">
            <div class="Name">
                <p><span class="Tit">Name:</span> {{ user.name }}</p>
            </div>
            <div class="Email">
                <p><span class="Tit">Email:</span> {{ user.email }}</p>
            </div>
            <div class="Roles">
               <button @click="when_roles_is_clicked(user)">Roles</button>
            </div>
            
        </div>
    </div>

    <div class="modal" v-if="display_modal">

        <!-- modal's content -->
        <div class="content">

            <!-- Title -->
            <div class="title">
                Roles Of {{ selected_user.name }}
            </div>

            <!-- Page Number 1 -->
            <div class="body" v-if="mod_switch">

                <div class="Roles">
                    <p v-for="(role , key) in selected_user.roles" :key="key" @click="when_role_is_choosed($event)" :value="role.id">
                    {{ role.name }}
                    </p>
                </div>
                <div class="Controle">
                    <button @click="when_add_role_is_clicked"> Add Role</button>
                    <button @click="when_remove_role_is_clicked"> Remove Role</button>
                </div>
                
            </div>

            <!-- Page Number 2 -->
            <div class="body" v-if="!mod_switch">

                <div class="Roles">
                    <p v-for="(role , key) in roles" :key="key" @click="when_role_is_choosed($event)" :value="role.id">
                    {{ role.name }}
                    </p>
                </div>

                <div class="Controle">
                   <button @click="when_affect_role_is_clicked">Affect</button>
                   <button @click="when_cancel_is_clicked">Cancel</button>
                </div>

            </div>

            <!-- Footer -->
            <div class="footer" v-if="mod_switch">
                <button @click="when_ok_is_clicked">Ok</button>
            </div>
        </div>
    </div>
</template>

<script>
    import successMessage from '@/components/successMessage.vue'
    import errors from '@/components/errors.vue';
    import {get_users_information ,fetch_roles } from '@/utils/apiFunctions'
    import * as usersFunctions from '@/utils/usersFunctions'

    export default{
        components:{
            successMessage,
            errors,
        },
        async mounted(){
            this.$store.commit('display_loading_message')

            usersFunctions.set_reference(this)
            this.users = await get_users_information()
            this.roles = await fetch_roles(this)

            this.$store.commit('display_loading_message')
        },
        data(){
            return {
                users:{},
                display_modal:false,
                selected_role_id:null,
                selected_user:null,
                mod_switch:true,
                roles:{},
                success_message:null
            }
        },
        methods:{
            when_roles_is_clicked(user){
                usersFunctions.remember_choosed_user(user)
                usersFunctions.display_or_hide_roles_modal()
            },
            when_ok_is_clicked(){
                usersFunctions.forgot_choosed_user()
                usersFunctions.forgot_id_of_choosed_role()
                usersFunctions.display_or_hide_roles_modal()
            },
            when_add_role_is_clicked(){
                usersFunctions.forgot_id_of_choosed_role()
                usersFunctions.switch_page()
            },
            when_cancel_is_clicked(){
                usersFunctions.forgot_id_of_choosed_role()
                usersFunctions.switch_page()
            },
            when_role_is_choosed(e){
                usersFunctions.remember_choosed_role(e.target.getAttribute('value') )
                usersFunctions.change_style_of_selected_role(e)
            },
            async when_affect_role_is_clicked(){
                usersFunctions.assign_new_role_to_user()
                this.users = await get_users_information()
            },
            async when_remove_role_is_clicked(){
                usersFunctions.remove_role_from_user()   
                this.users = await get_users_information()
            }
            
        }
    }
</script>

<style lang="scss" scoped>

  $primary-color: #0077ff;
  $secondary-color: #ff6600;
  $tertiary-color: #999999;

  .Tit{
    color: white;
    font-weight: bold;
  }
  .active{
    color: red;
  }
    .Users{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 10px;
        text-align: start;
        word-wrap: break-word;
        .User{
            background-color: rgb(96, 144, 179);
            border-radius: 5px;
            border: 2px solid $primary-color;

            width: 30%;
            padding: 10px;
        }
    }

    .modal {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        

        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 5px;
            width: 500px;
            max-height: 80%;
            border:2px solid $primary-color;
            overflow-y: auto;
            
            .title{
                font-size: 26px;
                font-weight: bold;
                padding: 10px;
                border-bottom: 2px solid $primary-color;

                color:$primary-color;
                text-shadow: 1px 1px $secondary-color;
            }

            .body{
                margin: 10px;
                display: flex;
                gap:10px;
                .Roles{
                    overflow-y: auto;
                    width:235px;
                    max-height: 50px;
                    p{
                        margin:0px;
                        padding: 4px;
                        border-bottom: 2px solid $tertiary-color;

                        &:focus{
                            color: red;
                        }
                    }
                }

                .Controle{
                    width:235px;
                    display: flex;
                    flex-wrap: wrap;
                    gap:5px;
                    button{
                        width:100%;
                    }

                }
            }

            .footer{
                display: flex;
                gap:10px;
                padding: 10px;
                border-top: 2px solid $primary-color;
            }
        }
    }

</style>