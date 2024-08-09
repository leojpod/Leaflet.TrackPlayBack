var $gXNCa$leaflet = require("leaflet");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $db730eecc57661e0$export$a72db05017078ab0 = (0, ($parcel$interopDefault($gXNCa$leaflet))).Control.extend({
    options: {
        position: "topright",
        showOptions: true,
        showInfo: true,
        showSlider: true,
        autoPlay: false
    },
    initialize: function(trackplayback, options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).Control.prototype.initialize.call(this, options);
        this.trackPlayBack = trackplayback;
        this.trackPlayBack.on("tick", this._tickCallback, this);
    },
    onAdd: function(map) {
        this._initContainer();
        return this._container;
    },
    onRemove: function(map) {
        this.trackPlayBack.dispose();
        this.trackPlayBack.off("tick", this._tickCallback, this);
    },
    /**
   * 根据unix时间戳(单位:秒)获取时间字符串
   * @param  {[int]} time     [时间戳（精确到秒）]
   * @param  {[string]} accuracy [精度，日：d, 小时：h,分钟：m,秒：s]
   * @return {[string]}          [yy:mm:dd hh:mm:ss]
   */ getTimeStrFromUnix: function(time, accuracy = "s") {
        time = parseInt(time * 1000);
        let newDate = new Date(time);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
        let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
        let minuts = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
        let seconds = newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds();
        let ret;
        if (accuracy === "d") ret = year + "-" + month + "-" + day;
        else if (accuracy === "h") ret = year + "-" + month + "-" + day + " " + hours;
        else if (accuracy === "m") ret = year + "-" + month + "-" + day + " " + hours + ":" + minuts;
        else ret = year + "-" + month + "-" + day + " " + hours + ":" + minuts + ":" + seconds;
        return ret;
    },
    _initContainer: function() {
        var className = "leaflet-control-playback";
        this._container = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("div", className);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.disableClickPropagation(this._container);
        this._optionsContainer = this._createContainer("optionsContainer", this._container);
        this._buttonContainer = this._createContainer("buttonContainer", this._container);
        this._infoContainer = this._createContainer("infoContainer", this._container);
        this._sliderContainer = this._createContainer("sliderContainer", this._container);
        this._pointCbx = this._createCheckbox("show trackPoint", "show-trackpoint", this._optionsContainer, this._showTrackPoint);
        this._lineCbx = this._createCheckbox("show trackLine", "show-trackLine", this._optionsContainer, this._showTrackLine);
        this._playBtn = this._createButton("play", "btn-stop", this._buttonContainer, this._play);
        this._restartBtn = this._createButton("replay", "btn-restart", this._buttonContainer, this._restart);
        this._slowSpeedBtn = this._createButton("slow", "btn-slow", this._buttonContainer, this._slow);
        this._quickSpeedBtn = this._createButton("quick", "btn-quick", this._buttonContainer, this._quick);
        this._closeBtn = this._createButton("close", "btn-close", this._buttonContainer, this._close);
        this._infoStartTime = this._createInfo("startTime: ", this.getTimeStrFromUnix(this.trackPlayBack.getStartTime()), "info-start-time", this._infoContainer);
        this._infoEndTime = this._createInfo("endTime: ", this.getTimeStrFromUnix(this.trackPlayBack.getEndTime()), "info-end-time", this._infoContainer);
        this._infoCurTime = this._createInfo("curTime: ", this.getTimeStrFromUnix(this.trackPlayBack.getCurTime()), "info-cur-time", this._infoContainer);
        this._infoSpeedRatio = this._createInfo("speed: ", `X${this.trackPlayBack.getSpeed()}`, "info-speed-ratio", this._infoContainer);
        this._slider = this._createSlider("time-slider", this._sliderContainer, this._scrollchange);
        return this._container;
    },
    _createContainer: function(className, container) {
        return (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("div", className, container);
    },
    _createCheckbox: function(labelName, className, container, fn) {
        let divEle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("div", className + " trackplayback-checkbox", container);
        let inputEle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("input", "trackplayback-input", divEle);
        let inputId = `trackplayback-input-${(0, ($parcel$interopDefault($gXNCa$leaflet))).Util.stamp(inputEle)}`;
        inputEle.setAttribute("type", "checkbox");
        inputEle.setAttribute("id", inputId);
        let labelEle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("label", "trackplayback-label", divEle);
        labelEle.setAttribute("for", inputId);
        labelEle.innerHTML = labelName;
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.on(inputEle, "change", fn, this);
        return divEle;
    },
    _createButton: function(title, className, container, fn) {
        let link = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("a", className, container);
        link.href = "#";
        link.title = title;
        /*
     * Will force screen readers like VoiceOver to read this as "Zoom in - button"
     */ link.setAttribute("role", "button");
        link.setAttribute("aria-label", title);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.disableClickPropagation(link);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.on(link, "click", fn, this);
        return link;
    },
    _createInfo: function(title, info, className, container) {
        let infoContainer = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("div", "info-container", container);
        let infoTitle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("span", "info-title", infoContainer);
        infoTitle.innerHTML = title;
        let infoEle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("span", className, infoContainer);
        infoEle.innerHTML = info;
        return infoEle;
    },
    _createSlider: function(className, container, fn) {
        let sliderEle = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("input", className, container);
        sliderEle.setAttribute("type", "range");
        sliderEle.setAttribute("min", this.trackPlayBack.getStartTime());
        sliderEle.setAttribute("max", this.trackPlayBack.getEndTime());
        sliderEle.setAttribute("value", this.trackPlayBack.getCurTime());
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.on(sliderEle, "click mousedown dbclick", (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.stopPropagation).on(sliderEle, "click", (0, ($parcel$interopDefault($gXNCa$leaflet))).DomEvent.preventDefault).on(sliderEle, "change", fn, this).on(sliderEle, "mousemove", fn, this);
        return sliderEle;
    },
    _showTrackPoint (e) {
        if (e.target.checked) this.trackPlayBack.showTrackPoint();
        else this.trackPlayBack.hideTrackPoint();
    },
    _showTrackLine (e) {
        if (e.target.checked) this.trackPlayBack.showTrackLine();
        else this.trackPlayBack.hideTrackLine();
    },
    _play: function() {
        let hasClass = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.hasClass(this._playBtn, "btn-stop");
        if (hasClass) {
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.removeClass(this._playBtn, "btn-stop");
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.addClass(this._playBtn, "btn-start");
            this._playBtn.setAttribute("title", "stop");
            this.trackPlayBack.start();
        } else {
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.removeClass(this._playBtn, "btn-start");
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.addClass(this._playBtn, "btn-stop");
            this._playBtn.setAttribute("title", "play");
            this.trackPlayBack.stop();
        }
    },
    _restart: function() {
        // 播放开始改变播放按钮样式
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.removeClass(this._playBtn, "btn-stop");
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.addClass(this._playBtn, "btn-start");
        this._playBtn.setAttribute("title", "stop");
        this.trackPlayBack.rePlaying();
    },
    _slow: function() {
        this.trackPlayBack.slowSpeed();
        let sp = this.trackPlayBack.getSpeed();
        this._infoSpeedRatio.innerHTML = `X${sp}`;
    },
    _quick: function() {
        this.trackPlayBack.quickSpeed();
        let sp = this.trackPlayBack.getSpeed();
        this._infoSpeedRatio.innerHTML = `X${sp}`;
    },
    _close: function() {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.remove(this._container);
        if (this.onRemove) this.onRemove(this._map);
        return this;
    },
    _scrollchange: function(e) {
        let val = Number(e.target.value);
        this.trackPlayBack.setCursor(val);
    },
    _tickCallback: function(e) {
        // 更新时间
        let time = this.getTimeStrFromUnix(e.time);
        this._infoCurTime.innerHTML = time;
        // 更新时间轴
        this._slider.value = e.time;
        // 播放结束后改变播放按钮样式
        if (e.time >= this.trackPlayBack.getEndTime()) {
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.removeClass(this._playBtn, "btn-start");
            (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.addClass(this._playBtn, "btn-stop");
            this._playBtn.setAttribute("title", "play");
            this.trackPlayBack.stop();
        }
    }
});
const $db730eecc57661e0$export$7ed6aef16d962d47 = function(trackplayback, options) {
    return new $db730eecc57661e0$export$a72db05017078ab0(trackplayback, options);
};


(0, ($parcel$interopDefault($gXNCa$leaflet))).TrackPlayBackControl = (0, $db730eecc57661e0$export$a72db05017078ab0);
(0, ($parcel$interopDefault($gXNCa$leaflet))).trackplaybackcontrol = (0, $db730eecc57661e0$export$7ed6aef16d962d47);





function $622b5cfc0acef4a6$export$43bee75e5e14138e(arr) {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === "[object Array]";
}


const $b307d268df14f4b2$export$13921ac0cc260818 = (0, ($parcel$interopDefault($gXNCa$leaflet))).Class.extend({
    initialize: function(trackData = [], options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).setOptions(this, options);
        trackData.forEach((item)=>{
            // 添加 isOrigin 字段用来标识是否是原始采样点，与插值点区分开
            item.isOrigin = true;
        });
        this._trackPoints = trackData;
        this._timeTick = {};
        this._update();
    },
    addTrackPoint: function(trackPoint) {
        if ((0, $622b5cfc0acef4a6$export$43bee75e5e14138e)(trackPoint)) for(let i = 0, len = trackPoint.length; i < len; i++)this.addTrackPoint(trackPoint[i]);
        this._addTrackPoint(trackPoint);
    },
    getTimes: function() {
        let times = [];
        for(let i = 0, len = this._trackPoints.length; i < len; i++)times.push(this._trackPoints[i].time);
        return times;
    },
    getStartTrackPoint: function() {
        return this._trackPoints[0];
    },
    getEndTrackPoint: function() {
        return this._trackPoints[this._trackPoints.length - 1];
    },
    getTrackPointByTime: function(time) {
        return this._trackPoints[this._timeTick[time]];
    },
    _getCalculateTrackPointByTime: function(time) {
        // 先判断最后一个点是否为原始点
        let endpoint = this.getTrackPointByTime(time);
        let startPt = this.getStartTrackPoint();
        let endPt = this.getEndTrackPoint();
        let times = this.getTimes();
        if (time < startPt.time || time > endPt.time) return;
        let left = 0;
        let right = times.length - 1;
        let n;
        // 处理只有一个点情况
        if (left === right) return endpoint;
        // 通过【二分查找】法查出当前时间所在的时间区间
        while(right - left !== 1){
            n = parseInt((left + right) / 2);
            if (time > times[n]) left = n;
            else right = n;
        }
        let t0 = times[left];
        let t1 = times[right];
        let t = time;
        let p0 = this.getTrackPointByTime(t0);
        let p1 = this.getTrackPointByTime(t1);
        startPt = (0, ($parcel$interopDefault($gXNCa$leaflet))).point(p0.lng, p0.lat);
        endPt = (0, ($parcel$interopDefault($gXNCa$leaflet))).point(p1.lng, p1.lat);
        let s = startPt.distanceTo(endPt);
        // 不同时间在同一个点情形
        if (s <= 0) {
            endpoint = p1;
            return endpoint;
        }
        // 假设目标在两点间做匀速直线运动
        // 求解速度向量，并计算时间 t 目标所在位置
        let v = s / (t1 - t0);
        let sinx = (endPt.y - startPt.y) / s;
        let cosx = (endPt.x - startPt.x) / s;
        let step = v * (t - t0);
        let x = startPt.x + step * cosx;
        let y = startPt.y + step * sinx;
        // 求目标的运动方向，0-360度
        let dir = endPt.x >= startPt.x ? (Math.PI * 0.5 - Math.asin(sinx)) * 180 / Math.PI : (Math.PI * 1.5 + Math.asin(sinx)) * 180 / Math.PI;
        if (endpoint) {
            if (endpoint.dir === undefined) endpoint.dir = dir;
        } else endpoint = {
            lng: x,
            lat: y,
            dir: endPt.dir === undefined ? dir : endPt.dir,
            isOrigin: false,
            time: time
        };
        return endpoint;
    },
    // 获取某个时间点之前走过的轨迹
    getTrackPointsBeforeTime: function(time) {
        let tpoints = [];
        for(let i = 0, len = this._trackPoints.length; i < len; i++)if (this._trackPoints[i].time < time) tpoints.push(this._trackPoints[i]);
        // 获取最后一个点，根据时间线性插值而来
        let endPt = this._getCalculateTrackPointByTime(time);
        if (endPt) tpoints.push(endPt);
        return tpoints;
    },
    _addTrackPoint: function(trackPoint) {
        trackPoint.isOrigin = true;
        this._trackPoints.push(trackPoint);
        this._update();
    },
    _update: function() {
        this._sortTrackPointsByTime();
        this._updatetimeTick();
    },
    // 轨迹点按时间排序 【冒泡排序】
    _sortTrackPointsByTime: function() {
        let len = this._trackPoints.length;
        for(let i = 0; i < len; i++){
            for(let j = 0; j < len - 1 - i; j++)if (this._trackPoints[j].time > this._trackPoints[j + 1].time) {
                let tmp = this._trackPoints[j + 1];
                this._trackPoints[j + 1] = this._trackPoints[j];
                this._trackPoints[j] = tmp;
            }
        }
    },
    // 为轨迹点建立时间索引，优化查找性能
    _updatetimeTick: function() {
        this._timeTick = {};
        for(let i = 0, len = this._trackPoints.length; i < len; i++)this._timeTick[this._trackPoints[i].time] = i;
    }
});
const $b307d268df14f4b2$export$6b2a7d5132615086 = function(trackData, options) {
    return new $b307d268df14f4b2$export$13921ac0cc260818(trackData, options);
};





const $e2f7209eae6f2c31$export$40a0242a5dec07f5 = (0, ($parcel$interopDefault($gXNCa$leaflet))).Class.extend({
    initialize: function(tracks = [], draw, options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).setOptions(this, options);
        this._tracks = [];
        this.addTrack(tracks);
        this._draw = draw;
        this._updateTime();
    },
    getMinTime: function() {
        return this._minTime;
    },
    getMaxTime: function() {
        return this._maxTime;
    },
    addTrack: function(track) {
        if ((0, $622b5cfc0acef4a6$export$43bee75e5e14138e)(track)) for(let i = 0, len = track.length; i < len; i++)this.addTrack(track[i]);
        else if (track instanceof (0, $b307d268df14f4b2$export$13921ac0cc260818)) {
            this._tracks.push(track);
            this._updateTime();
        } else throw new Error("tracks must be an instance of `Track` or an array of `Track` instance!");
    },
    drawTracksByTime: function(time) {
        this._draw.clear();
        for(let i = 0, len = this._tracks.length; i < len; i++){
            let track = this._tracks[i];
            let tps = track.getTrackPointsBeforeTime(time);
            if (tps && tps.length) this._draw.drawTrack(tps);
        }
    },
    _updateTime: function() {
        this._minTime = this._tracks[0].getStartTrackPoint().time;
        this._maxTime = this._tracks[0].getEndTrackPoint().time;
        for(let i = 0, len = this._tracks.length; i < len; i++){
            let stime = this._tracks[i].getStartTrackPoint().time;
            let etime = this._tracks[i].getEndTrackPoint().time;
            if (stime < this._minTime) this._minTime = stime;
            if (etime > this._maxTime) this._maxTime = etime;
        }
    }
});
const $e2f7209eae6f2c31$export$7156f4d04fb8a47a = function(tracks, draw, options) {
    return new $e2f7209eae6f2c31$export$40a0242a5dec07f5(tracks, draw, options);
};



const $9a9040bba3d6edb6$export$9735c82c4bae3302 = (0, ($parcel$interopDefault($gXNCa$leaflet))).Class.extend({
    includes: (0, ($parcel$interopDefault($gXNCa$leaflet))).Evented.prototype,
    options: {
        // 播放速度
        // 计算方法 fpstime * Math.pow(2, this._speed - 1)
        speed: 12,
        // 最大播放速度
        maxSpeed: 65
    },
    initialize: function(trackController, options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).setOptions(this, options);
        this._trackController = trackController;
        this._endTime = this._trackController.getMaxTime();
        this._curTime = this._trackController.getMinTime();
        this._speed = this.options.speed;
        this._maxSpeed = this.options.maxSpeed;
        this._intervalID = null;
        this._lastFpsUpdateTime = 0;
    },
    start: function() {
        if (this._intervalID) return;
        this._intervalID = (0, ($parcel$interopDefault($gXNCa$leaflet))).Util.requestAnimFrame(this._tick, this);
    },
    stop: function() {
        if (!this._intervalID) return;
        (0, ($parcel$interopDefault($gXNCa$leaflet))).Util.cancelAnimFrame(this._intervalID);
        this._intervalID = null;
        this._lastFpsUpdateTime = 0;
    },
    rePlaying: function() {
        this.stop();
        this._curTime = this._trackController.getMinTime();
        this.start();
    },
    slowSpeed: function() {
        this._speed = this._speed <= 1 ? this._speed : this._speed - 1;
        if (this._intervalID) {
            this.stop();
            this.start();
        }
    },
    quickSpeed: function() {
        this._speed = this._speed >= this._maxSpeed ? this._speed : this._speed + 1;
        if (this._intervalID) {
            this.stop();
            this.start();
        }
    },
    getSpeed: function() {
        return this._speed;
    },
    getCurTime: function() {
        return this._curTime;
    },
    getStartTime: function() {
        return this._trackController.getMinTime();
    },
    getEndTime: function() {
        return this._trackController.getMaxTime();
    },
    isPlaying: function() {
        return !!this._intervalID;
    },
    setCursor: function(time) {
        this._curTime = time;
        this._trackController.drawTracksByTime(this._curTime);
        this.fire("tick", {
            time: this._curTime
        });
    },
    setSpeed: function(speed) {
        this._speed = speed;
        if (this._intervalID) {
            this.stop();
            this.start();
        }
    },
    // 计算两帧时间间隔，单位：秒
    _caculatefpsTime: function(now) {
        let time;
        if (this._lastFpsUpdateTime === 0) time = 0;
        else time = now - this._lastFpsUpdateTime;
        this._lastFpsUpdateTime = now;
        // 将毫秒转换成秒
        time = time / 1000;
        return time;
    },
    _tick: function() {
        let now = +new Date();
        let fpstime = this._caculatefpsTime(now);
        let isPause = false;
        let stepTime = fpstime * Math.pow(2, this._speed - 1);
        this._curTime += stepTime;
        if (this._curTime >= this._endTime) {
            this._curTime = this._endTime;
            isPause = true;
            this.fire("ended");
        }
        this._trackController.drawTracksByTime(this._curTime);
        this.fire("tick", {
            time: this._curTime
        });
        if (!isPause) this._intervalID = (0, ($parcel$interopDefault($gXNCa$leaflet))).Util.requestAnimFrame(this._tick, this);
    }
});
const $9a9040bba3d6edb6$export$8c9e255416017e56 = function(trackController, options) {
    return new $9a9040bba3d6edb6$export$9735c82c4bae3302(trackController, options);
};




const $8370b979f22c89e2$export$46d64d20d045db0a = (0, ($parcel$interopDefault($gXNCa$leaflet))).Renderer.extend({
    initialize: function(options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).Renderer.prototype.initialize.call(this, options);
        this.options.padding = 0.1;
    },
    onAdd: function(map) {
        this._container = (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.create("canvas", "leaflet-zoom-animated");
        var pane = map.getPane(this.options.pane);
        pane.appendChild(this._container);
        this._ctx = this._container.getContext("2d");
        this._update();
    },
    onRemove: function(map) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.remove(this._container);
    },
    getContainer: function() {
        return this._container;
    },
    getBounds: function() {
        return this._bounds;
    },
    _update: function() {
        if (this._map._animatingZoom && this._bounds) return;
        (0, ($parcel$interopDefault($gXNCa$leaflet))).Renderer.prototype._update.call(this);
        var b = this._bounds;
        var container = this._container;
        var size = b.getSize();
        var m = (0, ($parcel$interopDefault($gXNCa$leaflet))).Browser.retina ? 2 : 1;
        (0, ($parcel$interopDefault($gXNCa$leaflet))).DomUtil.setPosition(container, b.min);
        // set canvas size (also clearing it); use double size on retina
        container.width = m * size.x;
        container.height = m * size.y;
        container.style.width = size.x + "px";
        container.style.height = size.y + "px";
        if ((0, ($parcel$interopDefault($gXNCa$leaflet))).Browser.retina) this._ctx.scale(2, 2);
        // translate so we use the same path coordinates after canvas element moves
        this._ctx.translate(-b.min.x, -b.min.y);
        // Tell paths to redraw themselves
        this.fire("update");
    }
});


const $5dace5a9464e31c4$export$dca20402ebea5ece = (0, ($parcel$interopDefault($gXNCa$leaflet))).Class.extend({
    trackPointOptions: {
        isDraw: false,
        useCanvas: true,
        stroke: false,
        color: "#ef0300",
        fill: true,
        fillColor: "#ef0300",
        opacity: 0.3,
        radius: 4
    },
    trackLineOptions: {
        isDraw: false,
        stroke: true,
        color: "#1C54E2",
        weight: 2,
        fill: false,
        fillColor: "#000",
        opacity: 0.3
    },
    targetOptions: {
        useImg: false,
        imgUrl: "../../static/images/ship.png",
        showText: false,
        width: 8,
        height: 18,
        color: "#00f",
        fillColor: "#9FD12D"
    },
    toolTipOptions: {
        offset: [
            0,
            0
        ],
        direction: "top",
        permanent: false
    },
    initialize: function(map, options) {
        (0, ($parcel$interopDefault($gXNCa$leaflet))).extend(this.trackPointOptions, options.trackPointOptions);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).extend(this.trackLineOptions, options.trackLineOptions);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).extend(this.targetOptions, options.targetOptions);
        (0, ($parcel$interopDefault($gXNCa$leaflet))).extend(this.toolTipOptions, options.toolTipOptions);
        this._showTrackPoint = this.trackPointOptions.isDraw;
        this._showTrackLine = this.trackLineOptions.isDraw;
        this._map = map;
        this._map.on("mousemove", this._onmousemoveEvt, this);
        this._trackLayer = new (0, $8370b979f22c89e2$export$46d64d20d045db0a)().addTo(map);
        this._trackLayer.on("update", this._trackLayerUpdate, this);
        this._canvas = this._trackLayer.getContainer();
        this._ctx = this._canvas.getContext("2d");
        this._bufferTracks = [];
        if (!this.trackPointOptions.useCanvas) this._trackPointFeatureGroup = (0, ($parcel$interopDefault($gXNCa$leaflet))).featureGroup([]).addTo(map);
        // 目标如果使用图片，先加载图片
        if (this.targetOptions.useImg) {
            const img = new Image();
            img.onload = ()=>{
                this._targetImg = img;
            };
            img.onerror = ()=>{
                throw new Error("img load error!");
            };
            img.src = this.targetOptions.imgUrl;
        }
    },
    update: function() {
        this._trackLayerUpdate();
    },
    drawTrack: function(trackpoints) {
        this._bufferTracks.push(trackpoints);
        this._drawTrack(trackpoints);
    },
    showTrackPoint: function() {
        this._showTrackPoint = true;
        this.update();
    },
    hideTrackPoint: function() {
        this._showTrackPoint = false;
        this.update();
    },
    showTrackLine: function() {
        this._showTrackLine = true;
        this.update();
    },
    hideTrackLine: function() {
        this._showTrackLine = false;
        this.update();
    },
    remove: function() {
        this._bufferTracks = [];
        this._trackLayer.off("update", this._trackLayerUpdate, this);
        this._map.off("mousemove", this._onmousemoveEvt, this);
        if (this._trackLayer && this._map.hasLayer(this._trackLayer)) this._map.removeLayer(this._trackLayer);
        if (this._trackPointFeatureGroup && this._map.hasLayer(this._trackPointFeatureGroup)) this._map.removeLayer(this._trackPointFeatureGroup);
    },
    clear: function() {
        this._clearLayer();
        this._bufferTracks = [];
    },
    _trackLayerUpdate: function() {
        if (this._bufferTracks.length) {
            this._clearLayer();
            this._bufferTracks.forEach((function(element, index) {
                this._drawTrack(element);
            }).bind(this));
        }
    },
    _onmousemoveEvt: function(e) {
        if (!this._showTrackPoint) return;
        let point = e.layerPoint;
        if (this._bufferTracks.length) {
            for(let i = 0, leni = this._bufferTracks.length; i < leni; i++)for(let j = 0, len = this._bufferTracks[i].length; j < len; j++){
                let tpoint = this._getLayerPoint(this._bufferTracks[i][j]);
                if (point.distanceTo(tpoint) <= this.trackPointOptions.radius) {
                    this._opentoolTip(this._bufferTracks[i][j]);
                    return;
                }
            }
        }
        if (this._map.hasLayer(this._tooltip)) this._map.removeLayer(this._tooltip);
        this._canvas.style.cursor = "pointer";
    },
    _opentoolTip: function(trackpoint) {
        if (this._map.hasLayer(this._tooltip)) this._map.removeLayer(this._tooltip);
        this._canvas.style.cursor = "default";
        let latlng = (0, ($parcel$interopDefault($gXNCa$leaflet))).latLng(trackpoint.lat, trackpoint.lng);
        let tooltip = this._tooltip = (0, ($parcel$interopDefault($gXNCa$leaflet))).tooltip(this.toolTipOptions);
        tooltip.setLatLng(latlng);
        tooltip.addTo(this._map);
        tooltip.setContent(this._getTooltipText(trackpoint));
    },
    _drawTrack: function(trackpoints) {
        // 画轨迹线
        if (this._showTrackLine) this._drawTrackLine(trackpoints);
        // 画船
        let targetPoint = trackpoints[trackpoints.length - 1];
        if (this.targetOptions.useImg && this._targetImg) this._drawShipImage(targetPoint);
        else this._drawShipCanvas(targetPoint);
        // 画标注信息
        if (this.targetOptions.showText) this._drawtxt(`\u{822A}\u{5411}\u{FF1A}${parseInt(targetPoint.dir)}\u{5EA6}`, targetPoint);
        // 画经过的轨迹点
        if (this._showTrackPoint) {
            if (this.trackPointOptions.useCanvas) this._drawTrackPointsCanvas(trackpoints);
            else this._drawTrackPointsSvg(trackpoints);
        }
    },
    _drawTrackLine: function(trackpoints) {
        let options = this.trackLineOptions;
        let tp0 = this._getLayerPoint(trackpoints[0]);
        this._ctx.save();
        this._ctx.beginPath();
        // 画轨迹线
        this._ctx.moveTo(tp0.x, tp0.y);
        for(let i = 1, len = trackpoints.length; i < len; i++){
            let tpi = this._getLayerPoint(trackpoints[i]);
            this._ctx.lineTo(tpi.x, tpi.y);
        }
        this._ctx.globalAlpha = options.opacity;
        if (options.stroke) {
            this._ctx.strokeStyle = options.color;
            this._ctx.lineWidth = options.weight;
            this._ctx.stroke();
        }
        if (options.fill) {
            this._ctx.fillStyle = options.fillColor;
            this._ctx.fill();
        }
        this._ctx.restore();
    },
    _drawTrackPointsCanvas: function(trackpoints) {
        let options = this.trackPointOptions;
        this._ctx.save();
        for(let i = 0, len = trackpoints.length; i < len; i++)if (trackpoints[i].isOrigin) {
            let latLng = (0, ($parcel$interopDefault($gXNCa$leaflet))).latLng(trackpoints[i].lat, trackpoints[i].lng);
            let radius = options.radius;
            let point = this._map.latLngToLayerPoint(latLng);
            this._ctx.beginPath();
            this._ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);
            this._ctx.globalAlpha = options.opacity;
            if (options.stroke) {
                this._ctx.strokeStyle = options.color;
                this._ctx.stroke();
            }
            if (options.fill) {
                this._ctx.fillStyle = options.fillColor;
                this._ctx.fill();
            }
        }
        this._ctx.restore();
    },
    _drawTrackPointsSvg: function(trackpoints) {
        for(let i = 0, len = trackpoints.length; i < len; i++)if (trackpoints[i].isOrigin) {
            let latLng = (0, ($parcel$interopDefault($gXNCa$leaflet))).latLng(trackpoints[i].lat, trackpoints[i].lng);
            let cricleMarker = (0, ($parcel$interopDefault($gXNCa$leaflet))).circleMarker(latLng, this.trackPointOptions);
            cricleMarker.bindTooltip(this._getTooltipText(trackpoints[i]), this.toolTipOptions);
            this._trackPointFeatureGroup.addLayer(cricleMarker);
        }
    },
    _drawtxt: function(text, trackpoint) {
        let point = this._getLayerPoint(trackpoint);
        this._ctx.save();
        this._ctx.font = "12px Verdana";
        this._ctx.fillStyle = "#000";
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "bottom";
        this._ctx.fillText(text, point.x, point.y - 12, 200);
        this._ctx.restore();
    },
    _drawShipCanvas: function(trackpoint) {
        let point = this._getLayerPoint(trackpoint);
        let rotate = trackpoint.dir || 0;
        let w = this.targetOptions.width;
        let h = this.targetOptions.height;
        let dh = h / 3;
        this._ctx.save();
        this._ctx.fillStyle = this.targetOptions.fillColor;
        this._ctx.strokeStyle = this.targetOptions.color;
        this._ctx.translate(point.x, point.y);
        // this._ctx.rotate((Math.PI / 180) * rotate)
        this._ctx.beginPath();
        this._ctx.moveTo(0, 0 - h / 2);
        this._ctx.lineTo(0 - w / 2, 0 - h / 2 + dh);
        this._ctx.lineTo(0 - w / 2, 0 + h / 2);
        this._ctx.lineTo(0 + w / 2, 0 + h / 2);
        this._ctx.lineTo(0 + w / 2, 0 - h / 2 + dh);
        this._ctx.closePath();
        this._ctx.fill();
        this._ctx.stroke();
        this._ctx.restore();
    },
    _drawShipImage: function(trackpoint) {
        let point = this._getLayerPoint(trackpoint);
        let dir = trackpoint.dir || 0;
        let width = this.targetOptions.width;
        let height = this.targetOptions.height;
        let offset = {
            x: width / 2,
            y: height / 2
        };
        this._ctx.save();
        this._ctx.translate(point.x, point.y);
        // if (trackpoint.dir !== 0) {
        // this._ctx.rotate((Math.PI / 180) * dir)
        // }
        this._ctx.drawImage(this._targetImg, 0 - offset.x, 0 - offset.y, width, height);
        this._ctx.restore();
    },
    _getTooltipText: function(targetobj) {
        let content = [];
        content.push("<table>");
        if (targetobj.info && targetobj.info.length) for(let i = 0, len = targetobj.info.length; i < len; i++){
            content.push("<tr>");
            content.push("<td>" + targetobj.info[i].key + "</td>");
            content.push("<td>" + targetobj.info[i].value + "</td>");
            content.push("</tr>");
        }
        content.push("</table>");
        content = content.join("");
        return content;
    },
    _clearLayer: function() {
        let bounds = this._trackLayer.getBounds();
        if (bounds) {
            let size = bounds.getSize();
            this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
        } else this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (this._trackPointFeatureGroup && this._map.hasLayer(this._trackPointFeatureGroup)) this._trackPointFeatureGroup.clearLayers();
    },
    _getLayerPoint (trackpoint) {
        return this._map.latLngToLayerPoint((0, ($parcel$interopDefault($gXNCa$leaflet))).latLng(trackpoint.lat, trackpoint.lng));
    }
});
const $5dace5a9464e31c4$export$e529deb2bfd496dc = function(map, options) {
    return new $5dace5a9464e31c4$export$dca20402ebea5ece(map, options);
};



const $c3c07c19b1a0c30f$export$bf556031c59eeba6 = (0, ($parcel$interopDefault($gXNCa$leaflet))).Class.extend({
    includes: (0, ($parcel$interopDefault($gXNCa$leaflet))).Evented.prototype,
    initialize: function(data, map, options = {}) {
        let drawOptions = {
            trackPointOptions: options.trackPointOptions,
            trackLineOptions: options.trackLineOptions,
            targetOptions: options.targetOptions,
            toolTipOptions: options.toolTipOptions
        };
        this.tracks = this._initTracks(data);
        this.draw = new (0, $5dace5a9464e31c4$export$dca20402ebea5ece)(map, drawOptions);
        this.trackController = new (0, $e2f7209eae6f2c31$export$40a0242a5dec07f5)(this.tracks, this.draw);
        this.clock = new (0, $9a9040bba3d6edb6$export$9735c82c4bae3302)(this.trackController, options.clockOptions);
        this.clock.on("tick", this._tick, this);
        this.clock.on("ended", this._ended, this);
    },
    start: function() {
        this.clock.start();
        return this;
    },
    stop: function() {
        this.clock.stop();
        return this;
    },
    rePlaying: function() {
        this.clock.rePlaying();
        return this;
    },
    slowSpeed: function() {
        this.clock.slowSpeed();
        return this;
    },
    quickSpeed: function() {
        this.clock.quickSpeed();
        return this;
    },
    getSpeed: function() {
        return this.clock.getSpeed();
    },
    getCurTime: function() {
        return this.clock.getCurTime();
    },
    getStartTime: function() {
        return this.clock.getStartTime();
    },
    getEndTime: function() {
        return this.clock.getEndTime();
    },
    isPlaying: function() {
        return this.clock.isPlaying();
    },
    setCursor: function(time) {
        this.clock.setCursor(time);
        return this;
    },
    setSpeed: function(speed) {
        this.clock.setSpeed(speed);
        return this;
    },
    showTrackPoint: function() {
        this.draw.showTrackPoint();
        return this;
    },
    hideTrackPoint: function() {
        this.draw.hideTrackPoint();
        return this;
    },
    showTrackLine: function() {
        this.draw.showTrackLine();
        return this;
    },
    hideTrackLine: function() {
        this.draw.hideTrackLine();
        return this;
    },
    dispose: function() {
        this.clock?.off("tick", this._tick);
        this.clock?.off("ended", this._ended);
        this.draw?.remove();
        this.tracks = null;
        this.draw = null;
        this.trackController = null;
        this.clock = null;
    },
    _tick: function(e) {
        this.fire("tick", e);
    },
    _ended: function(e) {
        this.fire("ended", e);
    },
    _initTracks: function(data) {
        let tracks = [];
        if ($622b5cfc0acef4a6$export$43bee75e5e14138e(data)) {
            if ($622b5cfc0acef4a6$export$43bee75e5e14138e(data[0])) // 多条轨迹
            for(let i = 0, len = data.length; i < len; i++)tracks.push(new (0, $b307d268df14f4b2$export$13921ac0cc260818)(data[i]));
            else // 单条轨迹
            tracks.push(new (0, $b307d268df14f4b2$export$13921ac0cc260818)(data));
        }
        return tracks;
    }
});
const $c3c07c19b1a0c30f$export$34255f9031fac5e3 = function(data, map, options) {
    return new $c3c07c19b1a0c30f$export$bf556031c59eeba6(data, map, options);
};


(0, ($parcel$interopDefault($gXNCa$leaflet))).TrackPlayBack = (0, $c3c07c19b1a0c30f$export$bf556031c59eeba6);
(0, ($parcel$interopDefault($gXNCa$leaflet))).trackplayback = (0, $c3c07c19b1a0c30f$export$34255f9031fac5e3);




//# sourceMappingURL=leaflet.trackplayback.js.map
