export class Observer {
    name: string
    constructor(name: string) {
        this.name = name
    }

    update({taskType, taskInfo}: {taskType: any, taskInfo: any}) {
        if(taskType === 'route') {
            console.log(`${this.name}不需要日常任务`)
            return ;
        }
        this.goToTaskHome(taskInfo)
    }

    goToTaskHome(info: any) {
        console.log(`${this.name}去任务大殿抢${info}任务`)
    }
}


export class Subject {
    observerList: any[]
    constructor() {
        this.observerList = []
    }

    addObserver(observer: any) {
        this.observerList.push(observer)
    }

    notify(task: any) {
        console.log('发布五星任务')
        this.observerList.forEach(observer => {
            observer.update(task)
        })
    }
}