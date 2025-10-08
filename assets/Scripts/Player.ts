import { _decorator, Animation, CCString, Collider2D, Component, Contact2DType, EventKeyboard, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

//表示两种子弹的状态
enum shootType{
    OneShoot,
    TwoShoot
};

@ccclass('Player')
export class Player extends Component {
    //设置子弹的发射时间
    @property
    shootRate:number = 0.5;

    shootTime:number = 0;

    //获取第一种子弹的预制体;
    @property(Prefab)
    bullet1Prefab:Prefab =null;

    @property(Node)
    bulletParent:Node =null;

    //用来定位位置
    @property(Node)
    position1:Node = null;

    @property
    shootType:shootType =shootType.OneShoot;

    //设置玩家的碰撞
    collider:Collider2D =null;

    //第二个子弹的信息
     @property(Prefab)
    bullet2Prefab:Prefab =null;
     @property(Node)
    position2:Node = null;
     @property(Node)
    position3:Node = null;

    //添加玩家的血量
    @property
    lifeCount:number =3;
    //对动画组件的引用
    @property(Animation)
    anim:Animation =null;
    //不同动画
    @property(CCString)
    animHit:string = "";
    @property(CCString)
    animDown:string = "";
    //表示无敌的时间
    @property
    invincibleTime:number =1;
    //无敌时间的计时器
    invincibleTimer:number =0;
    //设置表示是否处于无敌时间的状态
    isinvincible:boolean =false;
    
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);

        //注册单个碰撞体的回调函数
                this.collider = this.getComponent(Collider2D);
                if(this.collider){
                    this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
                }
    }

    //on方法后加的东西是对子弹进行的一个销毁
    //方法回调之后是对于碰撞之后的动作进行编写
        onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null){
            //处于无敌状态直接跳过
            if(this.isinvincible)return;

            this.isinvincible =true;
            this.lifeCount -=1;
            //血量变化时进行的动画播放
            if(this.lifeCount >0){
                this.anim.play(this.animHit);
                console.log("this.anim.play(this.animHit)")
            }else{
                this.anim.play(this.animDown);
            }
            //血量为0的时候摧毁
            if(this.lifeCount<=0){
                if(this.collider){  //如果是自身的collider就运行
                    this.collider.enabled =false;   //将自身的collider进行禁用
                }

            }
        }

    start() {

    }


    protected onDestroy(): void {
        //对输入事件进行注销
    input.off(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    //对碰撞体的回调函数进行注销
            if(this.collider){
             this.collider.off(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
                }
    }
    onTouchMove(event:EventTouch){
        //当生命值小于1的时候,停止飞机的运行
        if(this.lifeCount<1)return;

        const p = this.node.position;
        //得到x和y的偏移
        // this.node.setPosition(p.x+event.getDeltaX(),p.y+event.getDeltaY(),p.z);

        const targetPosition = new Vec3(p.x+event.getDeltaX(),p.y+event.getDeltaY(),p.z)

        //控制移动的边界
        if(targetPosition.x<-230){
            targetPosition.x = -230;
        }
        if(targetPosition.x>230){
            targetPosition.x = 230;
        }
        if(targetPosition.y<-380){
            targetPosition.y = -380;
        }
        if(targetPosition.y>380){
            targetPosition.y = 380;
        }
        this.node.setPosition(targetPosition);
    }

    update(deltaTime: number) {
        //对发射子弹的类型进行判断
        switch(this.shootType){
            case shootType.OneShoot:
                this.oneShoot(deltaTime);
                break;
            case shootType.TwoShoot:
                this.twoShoot(deltaTime);
            break;

        }
        // this.shootTime += deltaTime;
        // if(this.shootTime>=this.shootRate){
        //     this.shootTime = 0;  //将发射时间归零
        //    const bullet1 = instantiate(this.bulletPrefab);
        //    this.bulletParent.addChild(bullet1);
        //    bullet1.setWorldPosition(this.bullet1Position.worldPosition);
        // }

        //处于无敌状态时要进行计时
        if(this.isinvincible){
            this.invincibleTimer += deltaTime;
            //无敌时间达到持续的时间
            if(this.invincibleTimer>this.invincibleTime){
                this.isinvincible =false;
            }
        }
    }
    //定义第一种子弹的发射类似
    oneShoot(deltaTime: number){
        this.shootTime += deltaTime;
        if(this.shootTime>=this.shootRate){
            this.shootTime = 0;  //将发射时间归零
           const bullet1 = instantiate(this.bullet1Prefab);
           this.bulletParent.addChild(bullet1);
           bullet1.setWorldPosition(this.position1.worldPosition);

    }
}
    twoShoot(deltaTime: number){
        this.shootTime += deltaTime;
        if(this.shootTime>=this.shootRate){
            this.shootTime = 0;  //将发射时间归零
            //要实例化两个子弹
           const bullet1 = instantiate(this.bullet2Prefab);
           const bullet2 = instantiate(this.bullet2Prefab);
           this.bulletParent.addChild(bullet1);
           this.bulletParent.addChild(bullet2);
           bullet1.setWorldPosition(this.position2.worldPosition);
           bullet2.setWorldPosition(this.position3.worldPosition);

    }
    }
}

