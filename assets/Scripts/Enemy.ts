import { _decorator, Animation, animation, CCString, Collider2D, Component, Contact2DType, IPhysics2DContact, log, Node, Sprite } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed:number = 300;
    //对动画组件的引用
    @property(Animation)
    anim:Animation =null;

    @property
    hp:number = 1;
    //不同动画
    @property(CCString)
    animHit:string = "";
    @property(CCString)
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
        if(this.hp > 0){
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
        if(otherCollider.getComponent(Bullet)){
            otherCollider.enabled =false;       //在飞机和飞机之间的碰撞之后会禁用彼此之间的collider(此时是禁用子弹的collider)
            otherCollider.getComponent(Sprite).enabled =false;      //将sprite组件进行禁用,让子弹不进行显性
        }
        this.hp -=1;
        //判断此时的血量
        if(this.hp>0){
            this.anim.play(this.animHit);
        }else{
            this.anim.play(this.animDown);
        }
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
            //血量小于0的时候飞机进行销毁
            this.schedule(function(){
                this.node.destroy();
            },1);
           
        }
    }
        protected onDestroy(): void {
         //注册单个碰撞体的回调函数
        // this.collider = this.getComponent(Collider2D);
        if(this.collider){
            this.collider.off(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }
}


