<template>
  <div>{{state.msg}}</div>
  <HelloWorldVue :msg="state" />
  <div id="signatureBox" @touchmove.prevent>
    <canvas
      ref="myCanvas"
      id="canvas"
      width="400"
      height="300"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp()"
      @mouseleave="canvasLeave()"
      >抱歉，您的浏览器不支持canvas元素</canvas
    >
    <span class="mt-a" @click="clear">清除</span>
    <span class="mt-b" @click="ok">确认</span>
  </div>
  <div @click="save" v-if="data.imgSrc" class="save">保存图片</div>

  <!-- <div class="flex">
    <div class="flex-1">item1</div>
    <div class="flex-2">item2</div>
    <div class="flex-3">item2</div>
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
  </div> -->
</template>
<script setup lang="ts">
import { Subscribe } from './utils/subscrbe'
import { Observer, Subject } from './utils/observer'
import HelloWorldVue from './components/HelloWorld.vue';
import { ref, reactive, onMounted } from 'vue'
import { hierarchy, pack } from 'd3-hierarchy'

const state = reactive ({
  msg: 'aehyok'
})
// https://blog.csdn.net/qq_16151185/article/details/115766092
// https://segmentfault.com/a/1190000021921156
  const myCanvas = ref(null);

    const data = reactive({
      ctx: null,
      canvasMoveUse: false,
      imgSrc: "",
    });

    const clear = () => {
      data.ctx.clearRect(0, 0, data.ctx.canvas.width, data.ctx.canvas.height);
      data.imgSrc = "";
    };
    const ok = () => {
      var base64Img = myCanvas.value.toDataURL("image/jpg");
      data.imgSrc = base64Img;
    };
    const save = () => {
      var oA = document.createElement("a");
      oA.download = ""; // 设置下载的文件名，默认是'下载'
      oA.href = data.imgSrc;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除
      data.imgSrc = "";
    };
    //PC 端鼠标按下
    const canvasDown = (e) => {
      data.canvasMoveUse = true;
      const canvasX = e.offsetX;
      const canvasY = e.offsetY;
      data.ctx.beginPath(); // 移动的起点
      data.ctx.moveTo(canvasX, canvasY);
    };

    const touchStart = (e) => {
      e = e || event
      e.preventDefault()
      data.canvasMoveUse = true
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX - myCanvas.value.getBoundingClientRect().left,
          y: e.targetTouches[0].clientY - myCanvas.value.getBoundingClientRect().top
        }
        // this.drawStart(obj)
        console.log(obj, 'touchStart')
        data.ctx.beginPath(); // 移动的起点
        data.ctx.moveTo(obj.x, obj.y);
      }
    }

    const touchMove = (e) => {
      console.log('move', e)
        if (data.canvasMoveUse) {
        let canvasX;
        let canvasY;
        // canvasX = e.offsetX;
        canvasX = e.targetTouches[0].clientX - myCanvas.value.getBoundingClientRect().left

        // canvasY = e.offsetY;
        canvasY = e.targetTouches[0].clientY - myCanvas.value.getBoundingClientRect().top
        data.ctx.lineTo(canvasX, canvasY);
        // data.ctx.arc(0, 0, 5, 0, 2 * Math.PI)
        data.ctx.stroke();
      }
    }
    // PC端鼠标移动
    const canvasMove = (e) => {
      if (data.canvasMoveUse) {
        let canvasX;
        let canvasY;
        canvasX = e.offsetX;
        canvasY = e.offsetY;
        data.ctx.lineTo(canvasX, canvasY);
        // data.ctx.arc(0, 0, 5, 0, 2 * Math.PI)
        data.ctx.stroke();
      }
    };

    //PC端鼠标抬起
    const canvasUp = () => {
      data.canvasMoveUse = false;
      console.log('up over')
    };

    //PC端鼠标移出
    const canvasLeave = () => {
      data.canvasMoveUse = false;
      console.log('leave over')
    };

    onMounted(() => {
      data.ctx = myCanvas.value.getContext("2d");
      myCanvas.value.style.background = '#f2f3f7'
      data.ctx.lineWidth = 5;
      data.ctx.shadowColor = 'yellow'
      data.ctx.shadowOffsetX = 5;
      data.ctx.shadowOffsetY = 5
      data.ctx.strokeStyle = 'black'
    });



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

//eval 执行模版函数字符串
const demo5 = () => {
  eval(`console.log('hello world')`)   // hello world

  let value = 100
  eval(`console.log(${value}+100)`)   // 200
}

const demo6 = () => {
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

  const ff: any = f.once()

  let f1 = ff(3)
  let f2 = ff(2)
  let f3 = ff(1)

  console.log(f1, f2, f3)

  let f4 = f(10)
  console.log(f4)
}

// 多维数组对象，将values转换为一维数组
const demo7 = () => {

  let array = [
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

  console.log([1, 2, [3, 4], [[5, 6]]].flat(3))
}

//Promise settimeout封装睡眠函数
const demo8 = () => {
  const sleep = (time: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time);
    })
  }

  sleep(5000).then(res => {
    console.log(res, '1111111111111111111')
  })

  const executeCode = async () => {
    for (let i = 0; i < 5; i++) {
      await sleep(1000)
      console.log(i + 1)
    }
  }
}

const demo9 = async() => {
  const  dataSource = 'https://s5.ssl.qhres2.com/static/b0695e2dd30daa64.json'


   const data = await (await fetch(dataSource)).json();
  const regions = hierarchy(data)
    .sum((d: any) => 1)
    .sort((a: any, b: any) => b.value - a.value);

  const packs = pack()
    .size([1600, 1600])
    .padding(3);

  const root = packs(regions);

  console.log(root, 'demo 9')
}
// demo1()
// demo2()
// demo3()
// demo4()
// demo5()
// demo6()
// demo7()
// demo8()
demo9()

// executeCode()

{
const target = {}

let proxy = new Proxy(target, {
  get(obj: any, key: string) {
    return key in obj ? obj[key] : 'hello world'
  },
  set(obj: any, key: string, value: any) {
    obj[key] = value
    return true
  }
})

console.log(proxy, 'proxy')
console.log(proxy['test']);
proxy['liu'] = '刘'
console.log(proxy, 'liu');

}

{
  const target = {}
  let key = 'a'
  Object.defineProperty(target, key, {
    get() {
      return "ak"
    },
    set(val) {
      
    }
  })
}




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
  grid-template-columns: 200px 200px;
  grid-template-rows: 100px 1fr;
  border: 1px dashed blue;
  grid-gap: 20px;
}

.item {
  width: 200px;
  border: 1px dashed red;
  height: 100px;
}

.flex {
  width: 90vw;
  height: 300px;
  padding: 5px;
  border: 1px dashed blue;
  display: flex;
  /* flex-direction: row; */
}

.flex-1 {
  flex-basis: 50px;
  border: 1px dashed red;
  height: 100px;
}

.flex-2 {
  flex: 1 2 auto;
  border: 1px dashed red;
  height: 100px;
}

.flex-3 {
  flex: 2 1 auto;
  border: 1px dashed red;
  height: 100px;
}

.grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: start;
  border: 1px dashed red;
  height: 200px;
}

.wrapper-grid .left,
.wrapper-grid .right {
  box-sizing: border-box;
}

.grid .grid-1 {
  grid-column: 1;
  /* width: 150px; */
  border: 1px dashed blue;
}

.grid .grid-2 {
  grid-column: 2;
  border: 1px dashed blue;
}

* {
  touch-action: pan-y;
}
#signatureBox {
  z-index: 9999;
  background: #f2f3f7;
  position: relative;
}
#canvas {
  display: block;
  margin: 0 auto;
  background: #fff;
  cursor: default;
}
.mt-a {
  font-size: 50px;
  cursor: pointer;
}
.mt-b {
  margin: 20px;
  cursor: pointer;
  font-size: 50px;
}
.save {
  font-size: 28px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  color: red;
}
#canvas{
    border:1px solid #ccc;
    border-radius: 20px;
}
</style>
