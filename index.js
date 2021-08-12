const fs = require("fs");  // 引入fs模块
const QRCode = require('qrcode')

function delDir(path) { // 删除文件夹及里面的文件
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);  // 删除文件夹自身
  }
}
var opts = {
  type: 'image/png',
  quality: 0.3,
  margin: 1,
  color: {
    // dark:"#010599FF",
    light: '#0000' // Transparent background
  }
}
function makeCode(path = "image") {
  // QRCode.toFile('codeImages/filename.png', 'Some text', {
  //   margin: 1,
  //   color: {
  //     dark: '#00F',  // Blue dots
  //     light: '#0000' // Transparent background
  //   }
  // }, function (err) {
  //   if (err) throw err
  //   console.log('写入成功！')
  // })
  QRCode.toDataURL(path, opts, function (err, base_64_url) {
    var base64Data = base_64_url.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer.from(base64Data, 'base64'); //把base64码转成buffer对象，
    fs.writeFileSync(`codeImages/${path}.png`, dataBuffer, function (err) {//用fs写入文件
      if (err) {
        console.log(err);
      } else {
        console.log('写入成功！');
      }
    });
  })
}

// let j = 0
function makeCodeList(j=10) {
  // for (let i = (10 * j + 1); i < (10 * (j + 1) + 1); i++) {
    for (let i = 1; i < (j + 1); i++) {
    // console.log(`编号：${i}`)
    makeCode(`编号：${i}`)
  }
  // console.log(`编号：${10 * j + 1}-${10 * (j + 1) + 1}  的二维码已生成`)
  // j++
}

try {
  fs.mkdirSync('./codeImages') // mkdir $1
} catch (err) {
  delDir("codeImages")
  fs.mkdirSync('./codeImages') // mkdir $1
}
makeCodeList(1)
makeCode(`编号：${i}`)
// QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
//   console.log(url)
// })

