<template>
  <div class="flex">
    <div class="flex-1">item1</div>
    <div class="flex-2">item2</div>
  </div>


  <div class="grid">
    <div class="grid-1">item1</div>
    <div class="grid-2">item2</div>
  </div>

  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
  </div>
</template>
<script setup lang="ts">
import { Subscribe } from './utils/subscrbe'
import { Observer, Subject } from './utils/observer'

const demo1 = () => {
  console.log('发布订阅模式')

  // 创建一个实例（调度中心）
  let sub = new Subscribe()

  // 订阅注册
  sub.on('工资', '糖家三少', function (content: any) {
    console.info(`工资发放了哟--通知，${content}`)
  })

  // 订阅注册
  sub.on('工资', '糖糖', function (content: any) {
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
  sub.on('放假', '111', function (content: any) {
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
    taskType: 'war',
    taskInfo: '猎杀时刻'
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
  console.log(fun(10, 20))
}


const demo44 = () => {
  eval(`console.log('hello world')`)   // hello world

  let value = 100
  eval(`console.log(${value}+100)`)   // 200
}

function f(x: number) {
  console.log(x)
  return x * 2
}
Function.prototype.once = function () {
  let l: any = null
  let self = this
  return function () {
    if (l) return l
    // 改变this指向
    // call 传入的是若干个参数
    // let res = self.call(self, ...arguments)

    // apply 传入的是若干个参数的数组
    // let res = self.apply(self, [...arguments])

    let res = f.bind(null, ...arguments)()
    l = res
    return l
  }
}

const demo5 = () => {

}

// demo1()
// demo2()
// demo3()
// demo4()
// demo44()

const ff: any = f.once()

let f1 = ff(3)
let f2 = ff(2)
let f3 = ff(1)

console.log(f1, f2, f3)

let f4 = f(10)
console.log(f4)


// 多维数组对象，将values转换为一维数组
const demo6 = () => {
  
let array= [
  {
    id: '1',
    value: 'aehyok'
  }, 
  {
    id: '2',
    value: 'leo'
  }
]


let newArray: any = []
array.forEach(item => {
  newArray = [...newArray, ...Object.values(item)]
})

console.log(newArray)

console.log([1, 2, [3, 4], [[5,6]]].flat(3))
}

const sleep = (time: number) => {
  return new Promise<void>((resolve, reject) =>{
    setTimeout(() => {
      resolve()
    }, time);
  })
}

sleep(5000).then(res=> {
    console.log(res, '1111111111111111111')
})

const executeCode = async() => {
  for(let i = 0; i<5; i++) {
    await sleep(1000)
    console.log(i+1)
  }
} 

// executeCode()


const { a, b: y} = {a: 3, b: 4}
console.log(a, y)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: grid;
  /* grid布局四格均分 */
  /* grid-template-columns: repeat(4, 1fr) */
  grid-template-columns: 200px  200px;
  grid-template-rows: 100px 1fr;
  border: 1px solid blue;
  grid-gap: 20px;
}

.item {
  width: 200px;
  border: 1px solid red;
  height: 100px;
}

.flex {
  width: 90vw;
  height: 300px;
  border: 1px solid blue;
  display: flex;
  /* flex-direction: row; */
}

.flex-1 {
  flex-basis: 100px;
  border: 1px solid red;
  height: 100px;
}

.flex-2 {
  flex: 1 1 auto;
  border: 1px solid red;
  height: 100px;
}

.grid {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: start;
    border: 1px solid red;
    height: 200px;
}

.wrapper-grid .left,
.wrapper-grid .right {
    box-sizing: border-box;
}

.grid .grid-1 {
    grid-column: 1;
    /* width: 150px; */
    border: 1px solid blue;
}

.grid .grid-2 {
    grid-column: 2;
    border: 1px solid blue;
}



</style>
