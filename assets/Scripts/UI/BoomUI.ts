import { _decorator, Component, Label, LabelComponent, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('BoomUI')
export class BoomUI extends Component {
    @property(Label)
    numberLabel:Label =null;

    start() {
        // GameManager.getInstance().node.on("onBoomChange",this.onBoomChange);         //这个走不通
    }

    update(deltaTime: number) {
        
    }

    updateUI(count:number){
        this.numberLabel.string = count.toString();
    }
 

    // onBoomChange(){
        //将炸弹的数量在ui中显示
        // this.numberLabel.string = GameManager.getInstance().GetBoomNumber().toString();
        // GameManager.getInstance().GetBoomNumber();      //得到炸弹的数量                 //这个方法走不通
    // }
}
