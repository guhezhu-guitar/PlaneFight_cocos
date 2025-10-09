import { _decorator, Component, instantiate, math, Node, Prefab, random } from 'cc';
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
    start() {
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
    }

    //小飞机生成
    enemy0Spown(){
        this.objectSpawn(this.enemy0Prefab,-215,215,450);
        // //实例化飞机
        // const enemy0 =instantiate(this.enemy0Prefab);
        // this.node.addChild(enemy0);
        // //生成随机数.从-215到215之间,作为x轴
        // const randomX =math.randomRange(-215,215);
        // enemy0.setPosition(randomX,450,0);
        
    }

    //中飞机生成
       enemy1Spown(){
         this.objectSpawn(this.enemy1Prefab,-200,200,475);
        // //实例化飞机
        // const enemy1 =instantiate(this.enemy1Prefab);
        // this.node.addChild(enemy1);
        // //生成随机数.从-200到200之间,作为x轴
        // const randomX =math.randomRange(-200,200);
        // enemy1.setPosition(randomX,475,0);
        
    }

    //大飞机生成
       enemy2Spown(){
         this.objectSpawn(this.enemy2Prefab,-155,155,560);
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
    objectSpawn(enemyPrefab:Prefab,minX:number,maxX:number,Y:number){
         const enemy =instantiate(enemyPrefab);
        this.node.addChild(enemy);
        //生成随机数.从-200到200之间,作为x轴
        const randomX =math.randomRange(minX,maxX);
        enemy.setPosition(randomX,Y,0);
        
    }
}

   
