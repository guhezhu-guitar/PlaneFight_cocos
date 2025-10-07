import { _decorator, Animation, animation, Collider2D, Component, Contact2DType, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed:number = 300;
    @property(Animation)
    anim:Animation =null;
    start() {
        //播放动画
        // this.anim.play();

        //注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    update(deltaTime: number) {
        const p = this.node.position;
        this.node.setPosition(p.x,p.y-deltaTime*this.speed,p.z);
    }
}


