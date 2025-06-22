import { Player, Pos ,Animation, wait} from "./LIB.js";

let player = new Player("player",100,new Pos(20,16),1,[new Animation("idle",10,false),new Animation("run",16,false),new Animation("dash",4,true),new Animation("attack",7,true),new Animation("hurt",4,true)])
let playerelement = document.getElementById("player")
async function Game() {
    playerelement.style.backgroundImage = `url(${player.CurrentAnim.CurrentFrame})`
    playerelement.style.left = `${player.Pos.x * 32}px`
    playerelement.style.top = `${player.Pos.y * 32}px`
    playerelement.style.translate = `-50% -50%`
    await wait(10)
    Game()
}

addEventListener("keyup", (event) => {
    if (event.key === "a" || event.key === "d") {
        player.Status = 0
        player.SetAnim()
    }
})
addEventListener("keyup", (event) => {
    if (event.key == "w") {
        if (player.Pos.y == 16) {
            player.Jump()
        }
    }
    if (event.key == "q") {
        player.Attack()
    }
})

addEventListener("keydown", (event) => {
    switch (event.key) {
        

        case "a": 
            if (player.Pos.x*32 > (window.screen.width/playerelement.getBoundingClientRect().width+playerelement.getBoundingClientRect().width/2)){
                player.Move(-1)
                playerelement.style.transform = `scaleX(${player.Direction})`
            }      
            

            break;
        case "d":
            if (player.Pos.x*32 < (window.screen.width-playerelement.getBoundingClientRect().width/1.1)) {
                player.Move(1)
                playerelement.style.transform = `scaleX(${player.Direction})`
            }
            
            break;
        case "e":
            if (player.Pos.x*32 < (window.screen.width-playerelement.getBoundingClientRect().width/1.1)&&player.Pos.x*32 > (window.screen.width/playerelement.getBoundingClientRect().width+playerelement.getBoundingClientRect().width/2)) {
                player.Desh()
            }
            break

    }
})

window.onload = function(){
    window.player = player
    let rand = ["gif"]
    document.body.style.backgroundImage = `url(bg.${rand[Math.floor(Math.random()*rand.length)]})`
    player.AnimationPlayer()
    Game()
}