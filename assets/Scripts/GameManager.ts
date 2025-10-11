import { _decorator, AudioClip, Component, director, Node } from 'cc';
import { BoomUI } from './UI/BoomUI';
import { scoreUI } from './UI/scoreUI';
import { Player } from './Player';
import { GameOverUI } from './UI/GameOverUI';
import { AudioMgr } from './AudioMgr';
import { PauseUI } from './PauseUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static instance: GameManager;
    //通过方法去访问instance
    public static getInstance(): GameManager {        //静态方法,返回的是实例对象,类型是GameManager类型
        return this.instance;
    }

    //设置炸弹的数量
    @property
    private boomNumber: number = 0;      //为了安全性设成私有的
    @property(BoomUI)
    boomUI: BoomUI = null;
    //设置分数
    @property()
    private score: number = 0;
    //对scoreUI进行持有
    @property(scoreUI)
    scoreUI: scoreUI = null;
    //持有对palyer的引用
    @property(Player)
    player: Player = null;
    //对按钮的持有
    @property(Node)
    pauseButtonNode: Node = null;
    @property(Node)
    resumeButtonNode: Node = null;
    //对结束界面ui的持有
    @property(GameOverUI)
    gameOverUI: GameOverUI = null;

    //创建音乐的引用
    @property(AudioClip)
    gameMusic:AudioClip =null;

    //对暂停按钮的引用
    @property(Node)
    cuntinueButton:Node =null;
    @property(Node)
    quitButton:Node =null;

    //对暂停界面ui的持有
    @property(PauseUI)
    pauseUI:PauseUI = null;

    protected onLoad(): void {
        GameManager.instance = this;
    }

    protected start():void {
        AudioMgr.inst.play(this.gameMusic,0.2);
    }

    update(deltaTime: number) {

    }
    //添加炸弹
    public AddBoom() {
        this.boomNumber += 1;
        // this.node.emit("onBoomChange");      //发起事件的这个方式走不通

        //当ui数量发生改变时更新ui
        this.boomUI.updateUI(this.boomNumber);
    }
    //通过这个方法对boomnumber进行调用,更加的安全
    public GetBoomNumber(): number {
        return this.boomNumber;
    }
    //设置分数增加方法
    public addScore(s: number) {
        this.score += s;
        this.scoreUI.updateUI(this.score);
    }
    //暂停按钮被点击时候触发的事件
    onPauseButtonClick() {
        director.pause();
        this.player.disableControl();
        this.pauseButtonNode.active = false;
        this.resumeButtonNode.active = true;
        this.pauseUI.showPauseUI(0);
        
    }
    //继续按钮被点击时触发的事件
    onResumeButtonClick() {
        director.resume();
        this.player.enableControl();
        this.pauseButtonNode.active = true;
        this.resumeButtonNode.active = false;
    
    }
    //设置游戏结束
    gameOver() {
        //在游戏结束的时候对画面进行暂停
        this.onPauseButtonClick();

        //显示gameover ui 更新分数

        //对数据进行读取
        const bs = localStorage.getItem("BestScore");       //字符串类型的
        let bsInt = 0;

        if (bs !== null) {
            bsInt = parseInt(bs, 10);       //将bestscore转换成整数     (x,10)里面的10是几进制的数字
        } 

        //对历史最高分进行存储
        if(this.score>bsInt){
            localStorage.setItem("BestScore",this.score.toString());
        }

            this.gameOverUI.showGameOverUI(bsInt,this.score);
    }

    //注册点击事件(重新开始)
    onRestartButtonClick(){
        //重新加载
        this.onResumeButtonClick();
        director.loadScene(director.getScene().name);
    }

    //注册点击事件(退出游戏)
    onQuitButtonClick(){
        //返回最开始界面
        director.loadScene('01-Start');         //此时按完之后是暂停的,要调用继续按钮的功能,使得玩家重新开始
       this.onResumeButtonClick();
    }

    isHaveBoom():boolean{
        if(this.boomNumber>0){
            return true;
        }
        else{
            return false;
        }
    }
    //炸弹减少的方法
    useBoom(){
        if(this.boomNumber>0){
             this.boomNumber -=1;
        }else
        {
            this.boomNumber = 0;
        }
       
        
        //当ui数量发生改变时更新ui
        this.boomUI.updateUI(this.boomNumber);
    }

    //设置暂停的ui显示
    onCuntinueButtonClick(){
        this.onResumeButtonClick();
        this.pauseUI.showPauseUI(1);
    }
    
}


