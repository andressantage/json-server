let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opc[e.submitter.dataset.accion](data)    
})

const opc = {
    "GET": () => getUserAll(),
    "PUT": (data) => putUser(data),
    "DELETE": (data) => deleteUser(data),
    "SEARCH": (data) => searchUser(data),
    POST: function(data){
        return postUser(data)
    }
}
// config.body = JSON.stringify();
let config = {
    headers:new Headers({//espera que el API le envuelva un JSON // para decirle que la informacion que le va a mandar es json
        "Content-Type": "application/json"
    }), 
};
const getUserAll = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let res = await ( await fetch("http://localhost:4001/usuarios",config)).json();//await es para esperar que algo suceda
    //.json() convierte el archivo a json// 
    console.log(res);
}
const postUser = async(data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);//config.body = JSON.stringify(data) // convierte un objeto literal en json
    let res = await ( await fetch("http://localhost:4001/usuarios",config)).json();
    console.log(res);
}
const putUser = async(data)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await ( await fetch(`http://localhost:4001/usuarios/${data.id}`,config)).json();
    console.log(res);
}
const deleteUser = async(data)=>{
    config.method = "DELETE";
    let res = await ( await fetch(`http://localhost:4001/usuarios/${data.id}`,config)).json();
    console.log(res);
}
const searchUser = async(data)=>{
    config.method = "GET";
    let res = await ( await fetch(`http://localhost:4001/usuarios?q=${Object.values(data).join("")}`,config)).json();
    console.log(res);
}