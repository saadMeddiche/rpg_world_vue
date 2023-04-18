export function stock(key , value){

    localStorage.setItem(key , value)
    
}

export function get(value){
    return localStorage.getItem(value)
}

export function config_headers(){

    let token = get('token');

    let config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'multipart/form-data' 
        },
    }

    return config;
}