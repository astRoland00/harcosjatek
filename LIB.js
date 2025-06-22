export function wait(num) {
    return new Promise(resolve => setTimeout(resolve, num));
}
export function waitUntil(conditionFunction, interval = 100) {
    return new Promise(resolve => {
      const checkCondition = () => {
        if (conditionFunction()) {
          resolve();
        } else {
          setTimeout(checkCondition, interval);
        }
      };
      checkCondition();
    });
  }
export class Player{
    
    constructor(name, health, pos,direction, animlist)
    {
        this.Name = name
        this.Pos = pos
        this.Health = health
        this.Direction = direction
        this.AnimList = animlist
        this.Status = 0
        this.CurrentAnim = this.AnimList[this.Status]
    }
    async SetAnim(){
        if (!this.CurrentAnim.Imp && (this.AnimList[this.Status].Imp || !this.AnimList[this.Status].Imp)) {
            this.CurrentAnim = this.AnimList[this.Status]
            this.SetAnim()
        }else{
            await waitUntil(()=> this.CurrentAnim.CurrentFrame == this.CurrentAnim.Frames[this.CurrentAnim.Frames.length-1])
            this.CurrentAnim = this.AnimList[this.Status]
            await wait((1000/10)*4)
            this.Status = 0
            this.SetAnim()

        }
    }
    async AnimationPlayer(){
        for (let i = 0; i < this.CurrentAnim.Frames.length; i++) {
            this.CurrentAnim.CurrentFrame = this.CurrentAnim.Frames[i]
            await wait(1000/10)
        }
        this.AnimationPlayer()
    }
    async Jump(){
        this.Status = 0
        this.SetAnim()
        for (let i = 0; i > -1; i-=0.1) {
            this.Pos.y += i
            await wait(40)
        }
        await wait(100)
        for (let i = 0; i < 1; i+=0.1) {
            this.Pos.y += i
            await wait(20)
        }
        
    }
    async Move(num){
        this.Status = 1
        this.SetAnim()
        this.Direction = num
        for (let i = 0; i < 20; i++) {
            this.Pos.x += num/10
            await wait(20)
        }
        
    }
    async Desh(){
        this.Status = 2
        this.SetAnim()
        await wait(100)
        this.Pos.x += this.Direction*8
        await wait(300) 
        this.Status = 0
        this.SetAnim()
    }
    async Attack(){
        this.Status = 3
        this.SetAnim()
        await wait(700)
        this.Status = 1
        this.SetAnim()
    }
}
export class Animation{
    constructor(name,length,imp)
    {
        this.Name = name
        this.Frames = []
        this.CurrentFrame
        this.Imp = imp
        for (let i = 0; i < length; i++) {
            this.Frames.push(`${name}/${name}${i}.png`)
        }
    }
}

export class Collider{
    constructor(width,heigth){
        this.ColliderData
    }   
}

export class Pos {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}