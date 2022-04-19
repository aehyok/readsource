
type EventType = '工资' | '放假'

// let eventType: EventType = '发放'   // 报错
let eventType1: EventType = '工资'  // OK 赋值只能为“工资”或“放假”


interface IEventType {
    name: '工资' | '放假'
}

// let iType1: IEventType = {}
// iType1.name= '工资'    // OK 赋值只能为“工资”或“放假”
// iType1.name = '测试'  // 报错

export class Subscribe {
    list: any
    constructor() {
        this.list = []
    }

    // 订阅
    on(name: EventType, user: any, fun: any) {
        console.log(`用户【${user}】订阅了类型【${name}】事件`)
        this.list.push({
            "name": name,
            "user": user,
            "fun": fun
        })
    }

    // 取消订阅
    off(name: EventType, user: any) {
        this.list.forEach((item: any, index: number) => {
            if(item.name === name && item.user === user) {
                this.list.splice(index, 1)
            }
        })
    }

    // 触发订阅事件执行
    emit(name: EventType,content: any) {
        this.list.forEach((item: any) => {
            if(item.name === name) {
                console.warn(`开始准备给【${item.user}】发消息`)
                item.fun(content)
            }
        })
    }
}