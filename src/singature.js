var Singature = (function () {

    function Singature(options) {
        this.linewidth = 2;
        this.color = "#000000";
        this.background = "#ffffff";
        for (var i in options) {
            this[i] = options[i];
        };

        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.el.appendChild(this.canvas);
        this.cxt = this.canvas.getContext("2d");
        this.canvas.width = this.el.clientWidth;
        this.canvas.height = this.el.clientHeight;
        this.cxt.fillStyle = this.background;
        this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.cxt.strokeStyle = this.color;
        this.cxt.lineWidth = this.linewidth;
        this.cxt.lineCap = "round";

        this.start = function (e) {
            var x, y;
            x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
            y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;
            this.cxt.beginPath();
            this.cxt.moveTo(x, y);
        }
        this.move = function (e) {
            var x, y;
            x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
            y = e.changedTouches ? e.changedTouches[0].pageY : e.clientY;
            this.cxt.lineTo(x, y);
            this.cxt.stroke();
        }
        this.end = function (e) {
            this.cxt.closePath();
        }

        //APP
        //开始绘制
        this.canvas.addEventListener("touchstart", function (e) {
            this.start(e);
        }.bind(this), false);
        //绘制中
        this.canvas.addEventListener("touchmove", function (e) {
            this.move(e);
        }.bind(this), false);
        //结束绘制
        this.canvas.addEventListener("touchend", function (e) {
            this.end(e);
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

        //清除画布
        this.clear = function () {
            this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.cxt.fillStyle = this.background;
            this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width);
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