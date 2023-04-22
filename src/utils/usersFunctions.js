import {assign_role,remove_role } from '@/utils/apiFunctions'

var that = ''

export function set_reference(ref){
 that = ref
}

export function display_or_hide_roles_modal(){
   that.display_modal = !that.display_modal
}

export function change_style_of_selected_role(event){
    //Get all the children of Roles
    let roles_elements = document.querySelectorAll('.Roles p')

    //Inactive Them All
    roles_elements.forEach( (role) => {
        role.classList.remove('active') 
    })

    //Active The Selected One
    event.target.classList.add('active') 
  
}

export async function assign_new_role_to_user(){

    if(!that.selected_role_id){
        return alert('Please Choose A Role First')
    }
    
    let missions_complete = await assign_role(that.selected_user.id , that.selected_role_id)

    if(missions_complete){
        switch_page()
        display_or_hide_roles_modal()

        that.success_message = "Role Added Successfuly"
        that.$store.commit('display_success_messag')
    }

}

export async function remove_role_from_user(){

    if(!that.selected_role_id){
        return alert('Please Choose A Role First')
    }

    let missions_complete = await remove_role(that.selected_user.id , that.selected_role_id)

    if(missions_complete){
        display_or_hide_roles_modal()
    
        that.success_message="Role Removed Successfuly"
        that.$store.commit('display_success_messag')
    }

}

export function remember_choosed_user(user){
    that.selected_user = user
}

export function remember_choosed_role(role_id){
    that.selected_role_id = role_id
}

export function forgot_choosed_user(){
    that.selected_user = {}
}

export function forgot_id_of_choosed_role(){
    that.selected_role_id = null
}

export function switch_page(){
    that.mod_switch = !that.mod_switch
}