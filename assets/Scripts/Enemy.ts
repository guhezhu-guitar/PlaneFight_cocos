import { _decorator, Animation, animation, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed:number = 300;
    @property(Animation)
    anim:Animation =null;

    @property
    hp:number = 1;
    //不同动画
    @property(String)
    animHit:string = "";
    @property(String)
    animDown:string = "";

    collider:Collider2D =null;
    start() {
        //播放动画
        // this.anim.play();

        //注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if(this.collider){
            this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    update(deltaTime: number) {
        if(this.hp>0){
             const p = this.node.position;
        this.node.setPosition(p.x,p.y-deltaTime*this.speed,p.z);
        }
        //销毁超出边界的飞机
        if(this.node.position.y<-580){
            this.node.destroy();
        }
       
    }
    //on方法后加的东西是对子弹进行的一个销毁
    onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null){
        //对碰撞的子弹进行一个销毁
        otherCollider.enabled =false;
        this.hp -=1;
        //判断此时的血量
        if(this.hp>0){
            this.anim.play(this.animHit);
        }else{
            this.anim.play(this.animDown);
        }
        this.anim.play();
         this.collider = this.getComponent(Collider2D);
         //适用于小飞机
        // if(this.collider){
        //     //禁用collider
        //     this.collider.enabled =false;
        // }
        //当血量为0时候销毁
        if(this.hp<=0){
            //适用于所有的飞机
            if(this.collider){
            //禁用collider
            this.collider.enabled =false;
            }
            this.schedule(function(){
                this.node.destroy();
            },1);
        }
    }

        protected onDestroy(): void {
         //注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if(this.collider){
            this.collider.off(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }
}


