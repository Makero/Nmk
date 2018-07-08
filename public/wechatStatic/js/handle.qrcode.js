function handleQRcode(data){

    switch (data[0]){

        case 'login': login(data[1]);break;

    }

}

function login(param){
    const ident = randomString(16);
    const socket = io.connect();//与服务器进行连接
    socket.emit('join', ident);
    socket.emit('private_message', ident, param, openid);
    socket.emit('exit', ident);
}