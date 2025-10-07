import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackGround')
export class BackGround extends Component {
    
    @property(Node)
     bg01: Node=null;
    @property(Node)
     bg02: Node=null;
    @property
     speed:number =100;
    start() {

    }

    update(deltaTime: number) {
        //控制画布的移动,来达到滚动的效果
        let position1 = this.bg01.position;
        this.bg01.setPosition(position1.x,position1.y-this.speed*deltaTime,position1.z);
        let position2 = this.bg02.position;
        this.bg02.setPosition(position2.x,position2.y-this.speed*deltaTime,position2.z);

        //得到两个背景的位置
        let p1 =this.bg01.position;
        let p2 =this.bg02.position;
        //判断是否离开这个屏幕
        if(this.bg01.position.y<-852){
            this.bg01.setPosition(p2.x,p2.y+852,p2.z);
        }
         if(this.bg02.position.y<-852){
            this.bg02.setPosition(p1.x,p1.y+852,p1.z);
        }
    }
}


