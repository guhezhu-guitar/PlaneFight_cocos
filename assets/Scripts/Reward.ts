import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//定义枚举来区分两个奖励
export enum RewardType{
    TwoShoot,
    Boom
}

@ccclass('Reward')
export class Reward extends Component {

    @property
    speed:number =100;

    @property
    rewardType:RewardType =RewardType.TwoShoot;

    start() {

    }

    update(deltaTime: number) {
        const p = this.node.position;
        this.node.setPosition(p.x,p.y-this.speed*deltaTime,p.z);
        //超出边界的进行销毁
        if(this.node.position.y<-580){
            this.node.destroy();
    }
}

}
