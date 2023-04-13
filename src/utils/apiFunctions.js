import axios from 'axios';


//==============Show=================
export async function  fetch_server(that){
    //get the server id from local storage
    let server_id = localStorage.getItem('server')
    return axios.get('http://127.0.0.1:8000/api/V1/servers/'+server_id)
        .then((request) => that.server = request.data.server)    
}

export async function fetch_game(that){
    let game_id = localStorage.getItem('game')
    axios.get('http://127.0.0.1:8000/api/V1/games/'+game_id)
      .then((request) => that.game = request.data.game)
}


//==================Shows================
export async function fetch_servers(that){
    return axios.get('http://127.0.0.1:8000/api/V1/servers')
        .then((responce) => that.servers = responce.data.servers)
}

export async function fetch_games(that){
    return axios.get('http://127.0.0.1:8000/api/V1/games')
        .then((responce) => that.games = responce.data.games)
}
