import firebase from '@/firebase.js';
import {get_user_information} from '@/utils/apiFunctions';

export function update_scroll_height(that){
    //source:: https://stackoverflow.com/questions/47634258/what-is-nexttick-and-what-does-it-do-in-vue-js
    that.$nextTick(() => {
        that.$refs.chatBox.scrollTop = 1000;
    });
}

export function chat_show_more(loaded_messages ,messages, that) {
    let endIndex = loaded_messages.length + 5;
    that.loaded_messages = messages.slice(-endIndex);
}

export async function chat_send_message(that,type){

    let messageRef = firebase.database().ref(type + that.server.id)

    if(that.message_in_field == '' || that.message_in_field == null){
        return;
    }

    let user = await get_user_information()

    const message = {
        username:user.name,
        content:that.message_in_field
    }

    messageRef.push(message)

    that.message_in_field=""

    update_scroll_height(that)

    that.user =  await get_user_information()


}

export async function chat_fetch_messages(that,type){

    let messageRef = firebase.database().ref(type+that.server.id)
    let runOneTime = false

    
    messageRef.on('value',snapshot =>{

        let data = snapshot.val();
        let messages = [];

        if(data){

            Object.keys(data).forEach(key =>{
                messages.push({
                    id:key,
                    username: data[key].username,
                    content: data[key].content
                })
            })

            //stock messages
            that.messages = messages

            //display only the last 5 messages
            that.loaded_messages = that.messages.slice(-5)

            
            update_scroll_height(that)

            if(!runOneTime){
                that.$store.commit('display_loading_message')
                runOneTime = true
            }

        }else{
            if(!runOneTime){
                that.$store.commit('display_loading_message')
                runOneTime = true
            }
        }
    
    })





}
