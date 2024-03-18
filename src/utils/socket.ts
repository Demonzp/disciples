import { io, Socket } from 'socket.io-client';

class SocketInst{
    socket: Socket|null = null;

    init({url='/',path='',uid=''}){
        this.socket = io(url, {
            reconnection: false,
            path,
            auth:{uid}
        });
    }

    on<T>(event:string,callback:(args:T)=>void){
        this.socket?.on(event, callback);
    }

    emit(event:string,...args:any){
        this.socket?.emit(event, ...args);
    }
}

const socketInst = new SocketInst(); 

export default socketInst;