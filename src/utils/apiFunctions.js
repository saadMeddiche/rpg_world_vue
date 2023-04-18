import axios from 'axios';
import {config_headers} from '@/utils/storageFunctions';

//==============Show=================
export async function  fetch_server(that){
    //get the server id from local storage
    let server_id = localStorage.getItem('server')
    return axios.get('http://127.0.0.1:8000/api/V1/servers/'+server_id, config_headers())
        .then((request) => that.server = request.data.server)
        .catch((AxiosError) => action_when_error(AxiosError.response.data , that))  
}

export async function fetch_game(that){
    let game_id = localStorage.getItem('game')

    return axios.get('http://127.0.0.1:8000/api/V1/games/'+game_id, config_headers())
      .then((request) => that.game = request.data.game)
      .catch((AxiosError) => action_when_error(AxiosError.response.data , that))  

}


//==================Shows================
export async function fetch_servers(that){

    return axios.get('http://127.0.0.1:8000/api/V1/servers',config_headers())
        .then((responce) => that.servers = responce.data.servers)
        .catch((AxiosError) => action_when_error(AxiosError.response.data , that))
}

export async function fetch_games(that){
    return axios.get('http://127.0.0.1:8000/api/V1/games')
        .then((responce) => that.games = responce.data.games)
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}

//=====================Store=================
export async function store_game(that){ 

    axios.post('http://127.0.0.1:8000/api/V1/games', that.game, config_headers())
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}

export async function store_server(that){

    axios.post('http://127.0.0.1:8000/api/V1/servers', that.server, config_headers())
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}


//===================Update==================
export async function update_game(that){

    axios.post('http://127.0.0.1:8000/api/V1/games/' + that.game.id , that.game, config_headers() )
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}

export async function update_server(that){

    axios.post('http://127.0.0.1:8000/api/V1/servers/' + that.server.id , that.server, config_headers() )
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}

//===================Destroy==================
export function destory(id , what){

    confirm('Are You Sure')

    return axios.delete('http://127.0.0.1:8000/api/V1/'+what+'/' + id , config_headers())
            .catch((AxiosError) => action_when_error(AxiosError.response.data , that))

}

//===================Counts===================
export async function count(what , that){

    //Determine the path
    let paths = {
        'count_games' : 'countOfGames',
        'count_servers':'countOfServers',
        'count_users' : 'countOfUsers'
    }

    what = paths[what]

    
    return axios.get(`http://127.0.0.1:8000/api/V1/${what}` , config_headers())
        .then( (responce) => {
            if(what == 'countOfGames'){
                that.count_games = responce.data.count
            }else if (what == 'countOfServers'){
                that.count_servers = responce.data.count
            }else{
                that.count_users = responce.data.count
            }
        })
        .catch( (AxiosError) => action_when_error(AxiosError.response.data , that))
}


function action_when_error(data , that){
    if(data.errors){
        that.$store.commit('add_errors' , data.errors)
    }else{
        localStorage.removeItem('token')
        that.$router.push('/Opsy')
    }
}