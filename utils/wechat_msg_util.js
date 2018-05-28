const xml2js = require('xml2js');

const wx = {

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
    get : async (ctx) => {//获取xml格式的消息，返回json数据包
        await wx.xmlToJson(ctx);
        return ctx.req.body.xml;
    },
    send : (ctx, data) => {//发送消息
        let msg, result;
        msg = ctx.req.body ? ctx.req.body.xml : '';
        if(!msg){
            ctx.body = 'error request.';
            return;
        }

        result = wx.jsonToXml({xml: data});
        ctx.res.setHeader('Content-Type', 'text/xml');
        ctx.res.end(result);
    }
};

module.exports = wx;