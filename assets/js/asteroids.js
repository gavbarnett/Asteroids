function Asteroid(r, pos, heading) {
    //r = radius (size)
    //pos = [x,y] starting coordinate
    //heading = [x,y] direction & speed
    if (r) {
        this.r = r;
    } else {
        var r_init = 30;
        this.r = r_init + Math.random() * r_init * 0.5;
    }
    this.pos = [];
    if (pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    } else {
        if (Math.random() > 0.5) {
            this.pos.x = canvassize.x * Math.round(Math.random());
            this.pos.y = Math.random() * canvassize.y;
        } else {
            this.pos.x = Math.random() * canvassize.x;
            this.pos.y = canvassize.y * Math.round(Math.random());
        }
    }
    this.shape = [];
    var points = 4 + Math.random() * 6;
    for (var i = 0; i < points; i++) {
        this.shape[i] = []; //x,y
        var angle = 2 * Math.PI / points * i - (2 * Math.PI / points * 0.8) + Math.random() * (2 * Math.PI / points * 0.8);
        var amplitude = this.r * 0.2 + Math.random() * this.r;
        this.shape[i].x = amplitude * Math.cos(angle);
        this.shape[i].y = amplitude * Math.sin(angle);
    }
    this.poly = [];
    this.heading = [];
    if (heading) {
        this.heading.x = heading.x;
        this.heading.y = heading.y;
    } else {
        var init_speed = 3;
        this.heading.x = -init_speed / 2 + Math.random() * init_speed;
        this.heading.y = -init_speed / 2 + Math.random() * init_speed;
    }
    this.update = function() {
        this.pos.x = this.pos.x + this.heading.x;
        this.pos.y = this.pos.y + this.heading.y;
        if (this.pos.x > (canvassize.x + this.r)) {
            this.pos.x = 0 - this.r;
        }
        if (this.pos.x < (0 - this.r)) {
            this.pos.x = canvassize.x + this.r;
        }
        if (this.pos.y > (canvassize.y + this.r)) {
            this.pos.y = 0 - this.r;
        }
        if (this.pos.y < (0 - this.r)) {
            this.pos.y = canvassize.y + this.r;
        }
    }
    this.hit = function() {
        for (len = bullets.length, j = (len - 1); j >= 0; j--) {
            if (cn_PnPoly(bullets[j].pos, asteroids[i].poly) == 1) {
                asteroids.splice(i, 1);
                bullets[j].age = 100;
            }
        }
    }
    this.draw = function() {
        this.update();
        var ctx = myGameArea.context;
        ctx.beginPath();
        this.poly[0] = [];
        this.poly[0].x = this.pos.x + this.shape[0].x;
        this.poly[0].y = this.pos.y + this.shape[0].y;
        this.poly[this.shape.length] = [];
        this.poly[this.shape.length].x = this.pos.x + this.shape[0].x;
        this.poly[this.shape.length].y = this.pos.y + this.shape[0].y;
        ctx.moveTo(this.poly[0].x, this.poly[0].y);
        //ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI, false);
        for (var i = 1; i < this.shape.length; i++) {
            this.poly[i] = [];
            this.poly[i].x = this.pos.x + this.shape[i].x;
            this.poly[i].y = this.pos.y + this.shape[i].y;
            ctx.lineTo(this.poly[i].x, this.poly[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#44bbbb';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = '#bbbbbb';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}
