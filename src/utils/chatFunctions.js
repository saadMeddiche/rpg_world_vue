import firebase from '@/firebase.js';


export function update_scroll_height(element){
    //source:: https://stackoverflow.com/questions/47634258/what-is-nexttick-and-what-does-it-do-in-vue-js
    this.$nextTick(() => {
        if(element != null && element)
            element.scrollTop = element.scrollHeight;
    });
}

export function chat_show_more(loaded_messages ,messages, that) {
    let endIndex = loaded_messages.length + 5;
    that.loaded_messages = messages.slice(-endIndex);
}

export function chat_send_message(that,type){

    let messageRef = firebase.database().ref(type + that.server.id)

    if(that.message_in_field == '' || that.message_in_field == null){
        return;
    }

    const message = {
        username:'Saad Meddiche',
        content:that.message_in_field
    }

    messageRef.push(message)

    that.message_in_field=""
}

export function chat_fetch_messages(that,type){

    let messageRef = firebase.database().ref(type+that.server.id)

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
            
        }
    
    })

}