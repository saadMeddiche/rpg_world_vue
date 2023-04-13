 //async /await : https://stackoverflow.com/questions/54955426/how-to-use-async-await-in-vue-js
//For...Of : https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loo
import axios from 'axios';

export async function get_server_status(that){

    if(that.game.name == 'MineCraft'){

      for(let server of that.filtredServers){

        let status = await get_server_status_minecraft(server.address);

        server["online"]=status.online;
        
        if(status.players){
          server["OnlinePlayers"]=status.players.online;
          server["MaxPlayers"]=status.players.max;
        } 
      }

    }

}

export async function get_server_status_minecraft(address){
    return axios.get('https://api.mcstatus.io/v2/status/java/' + address)
      .then((responce) =>  responce.data)
}