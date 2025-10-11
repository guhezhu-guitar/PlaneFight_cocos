import { _decorator, Component, Label, Node, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class PauseUI extends Component {

   
    start() {

    }

    update(deltaTime: number) {
        
    }
    showPauseUI(a) {     
       if(a==0){
        return this.node.active =true;
       }
        else{
            return this.node.active =false;
        }

    }
}


