const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();
const upload = multer({storage: multer.memoryStorage()});
/*const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname + '/uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
  })
});*/

const crypto = require('crypto');

app.use(async (ctx, next) => {
  console.log(ctx.path);
  await next();
});
router.post('/profile', upload.single('avatar'), async (ctx) => {
  console.log('==========', ctx.req.file);
  const sha = crypto.createHash('sha1');
  sha.update(ctx.req.file.buffer);
  console.log(sha.digest('hex'));
  ctx.redirect('/');
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(__dirname + '/public'));

app.listen(4000);
