import { _decorator, Component, Node } from 'cc';
import { BoomUI } from './UI/BoomUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static instance:GameManager;
    //通过方法去访问instance
    public static getInstance():GameManager{        //静态方法,返回的是实例对象,类型是GameManager类型
        return this.instance;
    }

    //设置炸弹的数量
    @property
    private boomNumber:number = 0;      //为了安全性设成私有的
    @property(BoomUI)
    boomUI:BoomUI = null;
    
    protected onLoad(): void {
        GameManager.instance = this;
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
    //添加炸弹
    public AddBoom(){
        this.boomNumber +=1;
        // this.node.emit("onBoomChange");      //发起事件的这个方式走不通

        //当ui数量发生改变时更新ui
        this.boomUI.updateUI(this.boomNumber);
    }
    //通过这个方法对boomnumber进行调用,更加的安全
    public GetBoomNumber():number{
        return this.boomNumber;
    }
}


