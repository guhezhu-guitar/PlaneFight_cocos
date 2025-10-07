import { _decorator, Component, EventKeyboard, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
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

    //第二个子弹的信息
     @property(Prefab)
    bullet2Prefab:Prefab =null;
     @property(Node)
    position2:Node = null;
     @property(Node)
    position3:Node = null;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }
    start() {

    }

    onTouchMove(event:EventTouch){
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

