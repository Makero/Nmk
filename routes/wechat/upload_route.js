const router = require('koa-router')();
const multer = require('koa-multer');


const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split(".");
        cb(null, "MK_INV_QR."  + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({ storage: storage });


router.get('/', async (ctx, next) => {
    await ctx.render('wechat/upload')
});

router.post('/', upload.single('file'), async (ctx, next) => {

    await ctx.render('wechat/uploadSuccess',{result:ctx.req.file.filename});
});
module.exports = router;