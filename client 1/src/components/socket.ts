import {apiUrl} from "../helper";
let socket = new WebSocket(apiUrl);

export default ()=>({
    username:'alireza',
    connectionStatus:'',
    text:'' as string,
    messages:[] as string[],
    init(){
        socket.onopen=()=>{
            this.connectionStatus='connection established!'
        }
        socket.onerror = (error)=> {
            this.connectionStatus='connection is broken!'
        };
        socket.onmessage = (event) =>{
            //@ts-ignore
            this.messages.push(event.data as string)
        };
    },
    sendMessage(){
        //@ts-ignore
        socket.send(`${this.username}: ${this.text}`);
        //@ts-ignore
        this.messages.push(`${this.username}: ${this.text}`)
        this.text=''
    }
})