

class Vector {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Agent {
    constructor(x,y){
        this.pos = new Vector(x, y)
        this.vel = new Vector(randomRange(-1, 1), randomRange(-1, 1))
        this.radius = randomRange(4, 12)
    }

    draw(context){
        context.fillStyle = "black"
        
        context.save()
        context.translate(this.pos.x, this.pos.y)

        context.beginPath()
        context.arc(0, 0, this.radius,0, Math.PI * 2);
        context.fill()

        context.restore()
    }

    update(){
        if(this.pos.x + this.radius >= canvas.width || this.pos.x - this.radius <= 0 ){
            this.vel.x *=-1
        }
        if(this.pos.y + this.radius >= canvas.height || this.pos.y - this.radius <= 0 ){
            this.vel.y *=-1
        }
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}










const canvas = document.getElementById("canvas");
fitCanvasToContainer()
let context = canvas.getContext("2d");
    




const agents = []
for(let i=0; i<100; i++){
    
    const width = canvas.width
    const height = canvas.height
    
    const agent = new Agent(randomRange(0, width), randomRange(0, height))

    agents.push(agent)        
}




const animate = () => {

    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    agents.forEach(agent => {
        agent.update()
        agent.draw(context)

        for(let i=0; i<agents.length; i++){
            let distance = getDistanceBetweenTwoPoints(agent.pos.x, agent.pos.y,agents[i].pos.x, agents[i].pos.y)
            if(distance < 200){
                context.beginPath()
                context.moveTo(agent.pos.x, agent.pos.y)
                context.lineTo(agents[i].pos.x, agents[i].pos.y)
                context.lineWidth = 0.5
                context.stroke()
            }

            if(distance - agent.radius - agents[i].radius <= 0){
                agent.vel.x *= -1
                agent.vel.y *= -1
                agents[i].vel.x *= -1
                agents[i].vel.y *= -1
            }



        }

    });

    requestAnimationFrame(animate)

}
animate()





function fitCanvasToContainer(){
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight    
}



function randomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getDistanceBetweenTwoPoints(x1, y1, x2, y2){
    var distance = Math.sqrt((x1-x2)**2 + (y1-y2)**2)
    return distance

}