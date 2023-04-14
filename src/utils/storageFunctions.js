export function stock(key , value){

    localStorage.setItem(key , value)
    
}

export function get(value){
    return localStorage.getItem(value)
}