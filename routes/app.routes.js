const express = require("express");
const fs            = require("fs");
const path          = require("path")
const router = express.Router();

//声明变量
let userArray = ""



/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /api/register:
 *  post:
 *      tags: [MainData]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: 55
 *                          password:
 *                              type: string
 *                              default: 551
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

router.post("/register",(req,res) => {
  //获取用户参数
  let {username,
      password,
      } = req.body
  console.log(username,password)

  //验证账号是否存在，存在直接报错
  for (let user of userArray) {
      if (user.username === username) {
          res.send({code:501,msg:"账号已经被占用"})
          return
      }
  }

  //创建一个新用户对象
  let user = {username,password}

  //保存到系统中，并提示注册成功
  userArray.push(user)
  saveData()

  res.send({code:200,msg:"注册成功"})
})


/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /api/login:
 *  post:
 *      tags: [MainData]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: 66
 *                          password:
 *                              type: string
 *                              default: 661
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

 router.post("/login",(req,res) => {
  //接受post参数
  let {username,password} = req.body
  //验证账号密码是否正确
  for (let user of userArray) {
      if (user.username ===username && user.password === password) {
          //登录成功；记录当前登录用户
          res.send("{'result':'ok'}");
          return //账号密码都正确，直接使用return结束了当前行数
      }
  }
  res.send("{'result':'INVALID'}");
})

//---------------------------------
function initData() {
  //读取系统中的user.json文件
  fs.readFile(path.join(__dirname,"../users.json"),"utf-8",(err,data) => {
      if (err) {
              // 如果出现错误，表示文件没有读取到；创建文件
              fs.writeFile(path.join(__dirname,"../users.json"),"[]", () => {
                  console.log("文件创建完成")
              })
      } else {
          //如果文件存在，直接写入系统变量内容，将读取到的文件内容转换成对象赋值
          userArray = JSON.parse(data)
      }
  })
}

function saveData() {
  //存储数据到文件的函数，在项目中修改了数据时再去调用
  fs.writeFile(path.join(__dirname,"../users.json"),
      JSON.stringify(userArray),(err) => {
          console.log("系统数据存储完成")
      })
}


//调用执行函数
initData()

module.exports = {
  router,
};
