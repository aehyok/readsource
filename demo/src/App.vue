<script setup lang="ts">
import { Subscribe } from './utils/subscrbe'
import { Observer, Subject } from './utils/observer'

const demo1 = () => {
  console.log('发布订阅模式')

  // 创建一个实例（调度中心）
  let sub = new Subscribe()

  // 订阅注册
  sub.on('工资', '糖家三少', function (content) {
    console.info(`工资发放了哟--通知，${content}`)
  })

  // 订阅注册
  sub.on('工资', '糖糖', function (content) {
    console.log(`工资发放了哟--通知，${content}`)
  })

  // 发布消息
  sub.emit('工资', '嘟嘟嘟')

  // 取消用户【糖家三少】 类型【工资】的订阅
  sub.off('工资', '糖家三少')

  //重新发布消息
  sub.emit('工资', '嘟嘟嘟')


  console.log('============放假类型=========================')
  // 注册
  sub.on('放假', '111', function (content) {
    console.log(`公司准备放假了哟--通知，${content}`)
  })

  sub.emit('放假', '顶顶顶')
}

  const demo2 = () => {
    // 定义一个目标对象
    const subject = new Subject()
    // 观察者
    const stu1 = new Observer('弟子-无奈')

    // 观察者
    const stu2 = new Observer('弟子-无心')

    subject.addObserver(stu1)
    subject.addObserver(stu2)

    const warTask = {
      taskType :'war',
      taskInfo : '猎杀时刻'
    }

    subject.notify(warTask)
  }

// new Function
const demo3 = () => {

  let c = 30
  const getTemp = () => {
    return 60
  }
  let code = `return a + b+ ${c} + ${getTemp()}`

  let fun = new Function('a', 'b', code)
  console.log(fun(10, 20))
}

// eval使用
const demo4 = () => {
  let c = 30
  const getTemp = () => {
    return 60
  }
  let code = `(a,b) =>{
    return a + b+ ${c} + ${getTemp()} 
  }`

  const fun = eval(code)
  console.log(typeof fun)
  console.log(fun)
  console.log(fun(10,20))
}


const demo44 = () => {
  eval(`console.log('hello world')`)   // hello world

  let value = 100
  eval(`console.log(${value}+100)`)   // 200


}

// demo1()
// demo2()
// demo3()
demo4()
// demo44()
</script>

<template>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
