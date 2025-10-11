import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    //设定最高分数和当前分数
    @property(Label)
    BestScoreLabel: Label = null;
    @property(Label)
    CurrentScoreLabel: Label = null;

    start() {

    }

    update(deltaTime: number) {

    }
    showGameOverUI(bestScore: number,currentScore:number) {     //最高分数和当前分数在gamemanager里面显示,所以方法要在gamemanager里面进行调用
        this.node.active =true;
        this.BestScoreLabel.string = bestScore.toString();
        this.CurrentScoreLabel.string = currentScore.toString();
    }
}


