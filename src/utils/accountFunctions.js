import {get_user_information ,update_user_informations} from '@/utils/apiFunctions'

var that = ''

export function set_reference(reference){
    that = reference
}

export function switch_mod(){
    that.mods.display_infomrations = !that.mods.display_infomrations
    that.mods.update_infomrations = !that.mods.update_infomrations
}

export function clear_inputs(){
    that.info.current_password = ''
    that.info.new_password= ''
    that.info.repeat_password= ''
}

export async function update_information(){

    let successfyl_update = await update_user_informations(that.info ,that)

    if(successfyl_update){
        that.info = await get_user_information()
        switch_mod()
        clear_inputs()
        that.$store.commit('display_success_messag')

    }
}