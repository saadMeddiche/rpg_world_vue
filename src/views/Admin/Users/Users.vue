<template>
    <div class="Users">
        <div class="User" v-for="(user,key) in users" :key="key">
            <div class="Name">
                <p><span class="Tit">Name:</span> {{ user.name }}</p>
            </div>
            <div class="Email">
                <p><span class="Tit">Email:</span> {{ user.email }}</p>
            </div>
            <div class="Roles">
               <button @click="toggle_roles(user)">Roles</button>
            </div>
            
        </div>
    </div>

    <div class="modal" v-if="display_modal">
        <div class="content">
            <div class="title">
                Roles Of {{ modal.title }}
            </div>
            <div class="body">
                <div class="Roles">
                    <p v-for="(role , key) in modal.content" :key="key" @click="set_active($event)" :value="role.id">
                    {{ role.name }}
                    </p>
                </div>
                <div class="Controle">
                    <button> Affect Role</button>
                    <button> Remove Role</button>
                </div>
                
            </div>
            <div class="footer">
                <button @click="toggle_roles()">Ok</button>
            </div>
        </div>
    </div>
</template>

<script>
import {get_users_information} from '@/utils/apiFunctions'
    export default{
        async mounted(){
            this.users = await get_users_information()
        }
        ,
        data(){
            return {
                users:{},
                display_modal:false,
                modal:{
                    title:'',
                    content:{},  
                },
                selected_role_id:null
            }
        },
        methods:{
            toggle_roles(user){
                if(user){
                    this.modal.title = user.name
                    this.modal.content = user.roles
                }
                
                this.display_modal = this.display_modal ? false : true
            },
            set_active(e){
                //Get all the children of Roles
                let roles_element = document.querySelectorAll('.Roles p')

                //Inactive Them All
                roles_element.forEach( (role) => {
                    role.classList.remove('active') 
                })

                //Active The Selected One
                e.target.classList.add('active') 

                //Stock the id of selected Role
                //getAttribute :: https://stackoverflow.com/questions/38348258/how-to-get-the-value-from-an-event-target-in-js
                this.remember_choosed_role(e.target.getAttribute('value') )
            },
            remember_choosed_role(role_id){
                this.selected_role_id = role_id
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