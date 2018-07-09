function handleQRcode(data){
    switch (data[0]){

        case 'login': login(data[1]);break;

    }

}

function login(param){

    const ident = randomString(16);
    console.log(ident);
    const openID = getCookie('openID');
    const secretKey = getCookie('secretKey');
    const socket = io.connect();//与服务器进行连接
    socket.emit('join', ident);
    socket.emit('private_message', ident, param, {openID, secretKey});
    socket.on("errmsg", function(msg){
        console.log('二维码已过期，请刷新二维码再扫码登录');
        socket.emit('exit', ident);
    });

}