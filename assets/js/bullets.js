function Bullet(pos, heading) {
    //r = radius (size)
    //pos = [x,y] starting coordinate
    //heading = [x,y] direction & speed
    this.pos = [];
    if (pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    } else {
        this.pos.x = canvassize.x / 2;
        this.pos.y = canvassize.y / 2;
    }
    var bulletsize = 3;
    this.shape = [];
    this.shape[0] = [];
    this.shape[0].ang = 0;
    this.shape[0].len = 0;
    this.shape[1] = [];
    this.shape[1].ang = 0;
    this.shape[1].len = bulletsize;
    this.heading = [];
    if (heading) {
        this.heading.ang = heading.ang;
    } else {
        this.heading.ang = 0;
    }
    this.speed = [];
    var bulletspeed = 5;
    this.speed.x = bulletspeed * Math.cos(this.heading.ang);
    this.speed.y = bulletspeed * Math.sin(this.heading.ang);
    this.age = 1;
    this.update = function() {
        this.age += 0.1;
        this.pos.x = this.pos.x + this.speed.x;
        this.pos.y = this.pos.y + this.speed.y;
        if (this.pos.x > canvassize.x) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = canvassize.x;
        }
        if (this.pos.y > canvassize.y) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = canvassize.y;
        }
    }
    this.draw = function() {
        this.update();
        var ctx = myGameArea.context;
        var XY = xy(this.shape[0].ang, this.shape[0].len, this.heading.ang);
        ctx.beginPath();
        ctx.moveTo(this.pos.x + XY.x, this.pos.y + XY.y);
        for (var i = 1; i < this.shape.length; i++) {
            XY = xy(this.shape[i].ang, this.shape[i].len, this.heading.ang);
            ctx.lineTo(this.pos.x + XY.x, this.pos.y + XY.y);
            ctx.closePath();
        }
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
