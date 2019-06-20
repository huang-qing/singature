var Singature = (function () {

    function Singature(options) {
        var _this = this,
            loadBase64Image = function () {
                var image = new Image();
                image.onload = function () {
                    _this.ctx.drawImage(image, 0, 0);
                };
                image.src = _this.base64Image;
            };

        this.linewidth = 2;
        this.color = "#000000";
        this.background = "#ffffff";
        this.readOnly = false;
        for (var i in options) {
            this[i] = options[i];
        };

        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.el.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.el.clientWidth;
        this.canvas.height = this.el.clientHeight;
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.linewidth;
        this.ctx.lineCap = "round";

        if (this.base64Image) {
            if (typeof this.displayToBase64Conver === "function") {
                this.base64Image = this.displayToBase64Conver(this.base64Image);
                loadBase64Image();
            }
        }

        this.start = function (e) {
            var x, y;
            x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
            y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
        }
        this.move = function (e) {
            var x, y;
            x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
            y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        this.end = function (e) {
            this.ctx.closePath();
        }


        if (!this.readOnly) {
            //APP
            //开始绘制
            this.canvas.addEventListener("touchstart", function (e) {
                this.start(e);
                e.preventDefault();
            }.bind(this), false);
            //绘制中
            this.canvas.addEventListener("touchmove", function (e) {
                this.move(e);
                e.preventDefault();
            }.bind(this), false);
            //结束绘制
            this.canvas.addEventListener("touchend", function (e) {
                this.end(e);
                e.preventDefault();
            }.bind(this), false);

            //PC
            this.isDraw = false;
            //开始绘制
            this.canvas.addEventListener("mousedown", function (e) {
                this.isDraw = true;
                this.start(e);
            }.bind(this), false);
            //绘制中
            this.canvas.addEventListener("mousemove", function (e) {
                if (this.isDraw) {
                    this.move(e);
                }
            }.bind(this), false);
            //结束绘制
            this.canvas.addEventListener("mouseup", function (e) {
                if (this.isDraw) {
                    this.end(e);
                }
                this.isDraw = false;
            }.bind(this), false);
        }

        //清除画布
        this.clear = function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        }

        //保存图片，直接转base64
        this.saveToBase64 = function () {
            var imgBase64 = this.canvas.toDataURL();
            if (typeof this.saveToBase64Conver === "function") {
                return this.saveToBase64Conver(imgBase64);
            }
            return imgBase64;
        }
    };

    return Singature;
})();