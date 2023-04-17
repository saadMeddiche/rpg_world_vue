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

    return axios.get('http://127.0.0.1:8000/api/V1/games/'+game_id)
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

//=====================Store=================
export async function store_game(that){
    //source :https://www.itsolutionstuff.com/post/laravel-vue-js-image-upload-example-with-demoexample.html
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('http://127.0.0.1:8000/api/V1/games', that.game, config)
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => that.$store.commit('add_errors' , AxiosError.response.data.errors))
}

export async function store_server(that){

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('http://127.0.0.1:8000/api/V1/servers', that.server, config)
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => that.$store.commit('add_errors' , AxiosError.response.data.errors))
}


//===================Update==================
export async function update_game(that){
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    }
    axios.post('http://127.0.0.1:8000/api/V1/games/' + that.game.id , that.game, config )
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => that.$store.commit('add_errors' , AxiosError.response.data.errors))
}

export async function update_server(that){

    const config = {
        headers: { 'content-type': 'multipart/form-data' },
    }
    axios.post('http://127.0.0.1:8000/api/V1/servers/' + that.server.id , that.server, config )
        .then( (responce) => that.$store.commit('display_success_messag'))
        .catch( (AxiosError) => that.$store.commit('add_errors' , AxiosError.response.data.errors))
}

//===================Destroy==================
export function destory(id , what){

    confirm('Are You Sure')

    return axios.delete('http://127.0.0.1:8000/api/V1/'+what+'/' + id)

}

//===================Counts===================
export function count(what , that){

    //Determine the path
    let paths = {
        'count_games' : 'countOfGames',
        'count_servers':'countOfServers'
    }
    what = paths[what]

    
    axios.get(`http://127.0.0.1:8000/api/V1/${what}`)
        .then( (responce) => {
            if(what == 'countOfGames'){
                that.count_games = responce.data.count
            }else{
                that.count_servers = responce.data.count
            }
        })
        .catch( (AxiosError) => that.$store.commit('add_errors' , AxiosError.response.data.errors))
}