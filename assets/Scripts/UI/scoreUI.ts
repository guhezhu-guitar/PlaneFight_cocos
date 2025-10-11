import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('scoreUI')
export class scoreUI extends Component {

    @property(Label)
    numberLabel:Label = null;
    start() {

    }

    update(deltaTime: number) {
        
    }
    updateUI(count:number){
        this.numberLabel.string = count.toString();
    }
}


