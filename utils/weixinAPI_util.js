const crypto = require('crypto');
const xml2js = require('xml2js');

const wx = {
    token : 'lkyn20180403',
    signature : null,
    bool : false,
    getSignature : (timestamp,nonce) => {//获取token加密签名
        let str = [wx.token,timestamp,nonce].sort().join('');//字典排序拼装成字符串
        let sha1 = crypto.createHash('sha1');
        sha1.update(str);
        wx.signature = sha1.digest('hex');
    },
    checkSignature : (param) => {//检测token加密签名是否正确
        wx.getSignature(param.timestamp,param.nonce);
        if(wx.signature === param.signature){
            wx.bool = true;
        }
        return wx.bool;
    },

    xmlTempJson : (str) => {
        return new Promise((resolve, reject) => {
            const parseString = xml2js.parseString;
            parseString(str, (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    },
    xmlToJson : async (ctx) => {//将xml数据包转化成json
        let promise = new Promise((resolve, reject) => {
            let buf = '';
            ctx.req.setEncoding('utf8');
            ctx.req.on('data', (chunk) => {
                buf += chunk;
            });
            ctx.req.on('end', () => {
                wx.xmlTempJson(buf).then(resolve).catch(reject);
            });
        });

        await promise.then((result) => {
            ctx.req.body = result;
        }).catch((e) => {
            e.status = 400;
        });
    },
    jsonToXml : (obj) => {//将json转化成xml数据包
        const builder = new xml2js.Builder();
        return builder.buildObject(obj);
    },
    getMessage : async (ctx) => {
        await wx.xmlToJson(ctx);
        return ctx.req.body.xml.Content[0];
    },
    sendMessage : (ctx, content) => {
        let msg,MsgType,result;
        msg = ctx.req.body ? ctx.req.body.xml : '';
        if(!msg){
            ctx.body = 'error request.';
            return;
        }
        MsgType = msg.MsgType[0];
        switch(MsgType){
            case 'text': result = wx.jsonToXml({
                xml:{
                    ToUserName : msg.FromUserName,
                    FromUserName : msg.ToUserName,
                    CreateTime : Date.now(),
                    MsgType : msg.MsgType,
                    Content : content
                }
            });break;
            default:
                result = 'success';
        }
        ctx.res.setHeader('Content-Type', 'text/xml');
        ctx.res.end(result);
    }
};

module.exports = wx;