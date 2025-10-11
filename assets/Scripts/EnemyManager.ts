import { _decorator, Component, input, Input, instantiate, math, Node, NodeEventType, Prefab, random } from 'cc';
import { GameManager } from './GameManager';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    //小飞机生成
    @property
    enemy0SpawnRate:number =1;
    @property(Prefab)
    enemy0Prefab:Prefab = null;
    //中飞机生成
     @property
    enemy1SpawnRate:number =3;
    @property(Prefab)
    enemy1Prefab:Prefab = null;
    //大飞机生成
     @property
    enemy2SpawnRate:number =10;
    @property(Prefab)
    enemy2Prefab:Prefab = null;

    //奖励物品的生成
     @property
    rewardSpawnRate:number =15;
    @property(Prefab)
    reward1Prefab:Prefab = null;
    @property(Prefab)
    reward2Prefab:Prefab = null;

    //双击时间间隔的检测
    doubleClickInterval:number =0.2
    //上次点击的时间
    lastClickTime:number =0;

    //定义一个数组来保存所有的敌人
    @property([Node])
    enemyArray:Node[] = [];

    //将enemymanager进行单例化
    private static instance :EnemyManager =null;

    //双击事件的检测
    protected onLoad(): void {
      this.lastClickTime =0;
      input.on(Input.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    start() {
      //对instance进行赋值
      EnemyManager.instance = this;
        //设置定时器
        this.schedule(this.enemy0Spown,this.enemy0SpawnRate);
        this.schedule(this.enemy1Spown,this.enemy1SpawnRate);
        this.schedule(this.enemy2Spown,this.enemy2SpawnRate);
        //奖励物品
         this.schedule(this.rewardSpown,this.rewardSpawnRate);
    }

    update(deltaTime: number) {
        
    }

    //取消定时器
    protected onDestroy(): void {
         this.unschedule(this.enemy0Spown);
         this.unschedule(this.enemy1Spown);
         this.unschedule(this.enemy2Spown);
         //取消双击触发事件
         input.off(Input.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    //小飞机生成
    enemy0Spown(){
      //将生成的敌机放入数组之中
      const emenyNode =  this.objectSpawn(this.enemy0Prefab,-215,215,450);      //得到一个enemy的节点
      //往数组中添加元素
      this.enemyArray.push(emenyNode);

        // this.objectSpawn(this.enemy0Prefab,-215,215,450);

        // //实例化飞机
        // const enemy0 =instantiate(this.enemy0Prefab);
        // this.node.addChild(enemy0);
        // //生成随机数.从-215到215之间,作为x轴
        // const randomX =math.randomRange(-215,215);
        // enemy0.setPosition(randomX,450,0);
        
    }

    //中飞机生成
       enemy1Spown(){
         const emenyNode =this.objectSpawn(this.enemy1Prefab,-200,200,475);
         this.enemyArray.push(emenyNode);
        // //实例化飞机
        // const enemy1 =instantiate(this.enemy1Prefab);
        // this.node.addChild(enemy1);
        // //生成随机数.从-200到200之间,作为x轴
        // const randomX =math.randomRange(-200,200);
        // enemy1.setPosition(randomX,475,0);
        
    }

    //大飞机生成
       enemy2Spown(){
          const emenyNode = this.objectSpawn(this.enemy2Prefab,-155,155,560);
          this.enemyArray.push(emenyNode);
        // //实例化飞机
        // const enemy2 =instantiate(this.enemy2Prefab);
        // this.node.addChild(enemy2);
        // //生成随机数.从-155到155之间,作为x轴
        // const randomX =math.randomRange(-155,155);
        // enemy2.setPosition(randomX,560,0);

    }
    
    //奖励物品的生成
       rewardSpown(){
       const randomNumber = math.randomRangeInt(0,2);       //设置0-2之间的随机数
       let prefab =null;
       if(randomNumber == 0){
        prefab = this.reward1Prefab;
       }else{
        prefab =this.reward2Prefab;
       }
         this.objectSpawn(prefab,-207,207,474);
       }

    //设置一个方法,总管这些飞机的生成 ==>有了奖励物品之后该方法是控制物品的生成
    objectSpawn(enemyPrefab:Prefab,minX:number,maxX:number,Y:number):Node{
         const enemy =instantiate(enemyPrefab);
        this.node.addChild(enemy);
        //生成随机数.从-200到200之间,作为x轴
        const randomX =math.randomRange(minX,maxX);
        enemy.setPosition(randomX,Y,0);

        //添加一个返回值,得到生成的敌人
        return enemy;
        
    }
    onTouchEnd(event){
      let currentTime = Date.now();     //每次触摸接触后取得当前的时间
      let timeDiff = (currentTime - this.lastClickTime)/1000;  //转换为秒

      //判断时间间隔
      if(timeDiff < this.doubleClickInterval){
      console.log("Detected a double click");
      this.onDoubleClick(event);
      }
      this.lastClickTime = currentTime;
    }

    onDoubleClick(event){
      //双击执行后的操作
      console.log("Double click action executed.");
      //判读是否有炸弹
      if(GameManager.getInstance().isHaveBoom() == false) return;

      GameManager.getInstance().useBoom();

      //遍历所有的敌人
      for(let e of this.enemyArray){
        const enemy = e.getComponent(Enemy);
        enemy.killNow();
      }
    }
     public static getInstance():EnemyManager{
      return this.instance;             //创建一个instance的实例对象

      
    }

    //将敌机从数组中移除
    removeEnemy(n:Node){
      const index = this.enemyArray.indexOf(n);     //得到数组的索引
      if(index !== -1){                             //数组的索引不为-1时表示数组里面有数
        this.enemyArray.splice(index,1);          //在index的位置删除数量为1的数组成员
      }
    }
}

   
