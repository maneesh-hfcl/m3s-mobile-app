// Video player controller
var isDebugMode = true;
class WebSocketPlayer {
    constructor(divId, iWnd, wm, callback) {
        this.closeCallback = callback;
        this.closeWin = false;
        this.iWnd = iWnd;
        this.divId = divId;
        this.wndMngr = wm;
        this.iCamFlgs = 0;
        this.thumbCircleRadius = 2;
        this.isCamIdVisible = true;
        this.isWaitingForNextStreamInfo = true;
    }
    /////////////////////////////////////////////////////////////////////////
    // Initialize player
    InitPlayer(iFlg) {
        if (this.player != undefined) {
            return;
        }
        this.iCamFlgs = iFlg;
        console.log(`FLAGS: ${iFlg.toString(16)}`);
        let playerHtml = '<button class="vidclose-btn" id="cb-' + this.iWnd + '"></button>';
        if ((iFlg & 0x10) == 0x10) { // PTZ controller
            playerHtml += `<button class="vidptz-btn" id="vptzb-${this.iWnd}"></button>
            <div id="vptzcp-${this.iWnd}" class="vptz-pane d-none">
                <p><span id="vptzch" class="k-icon k-i-unlink-horizontal">&nbsp;</span><span id="vptzch" class="k-icon k-i-arrow-chevron-right"></span></p>
                <table>
                    <tr>
                        <td data-id="vplu"><span class="vptz-ctrla vptz-btn vptz-btn01"></span></td>
                        <td data-id="vpup"><span class="vptz-ctrla vptz-btn vptz-btn02"></span></td>
                        <td data-id="vpru"><span class="vptz-ctrla vptz-btn vptz-btn03"></span></td>
                    </tr>
                    <tr>
                        <td data-id="vplf"><span class="vptz-ctrla vptz-btn vptz-btn04"></span></td>
                        <td data-id="vphm"><span class="vptz-ctrla vptz-btn vptz-btn05"></span></td>
                        <td data-id="vprt"><span class="vptz-ctrla vptz-btn vptz-btn06"></span></td>
                    </tr>
                    <tr>
                        <td data-id="vpld"><span class="vptz-ctrla vptz-btn vptz-btn07"></span></td>
                        <td data-id="vpdn"><span class="vptz-ctrla vptz-btn vptz-btn08"></span></td>
                        <td data-id="vprd"><span class="vptz-ctrla vptz-btn vptz-btn09"></span></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td data-id="vpzi"><span class="vptz-ctrla vptz-btna vptz-bta01"></span></td>
                        <td data-id="vpzo"><span class="vptz-ctrla vptz-btna vptz-bta02"></span></td>
                    </tr>
                    <tr>
                        <td data-id="vpfi"><span class="vptz-ctrla vptz-btna vptz-bta03"></span></td>
                        <td data-id="vpfo"><span class="vptz-ctrla vptz-btna vptz-bta04"></span></td>
                    </tr>
                </table>
            </div>`;
        }
        playerHtml += '<video class="video" id="v-' + this.iWnd + '" poster="/images/loader.gif" muted'
            + (this.wndMngr.mseSupport ? '' : ' type="application/vnd.apple.mpegurl" playsinline') + '></video>'
            + '<div class="cam-info" id="ci-' + this.iWnd + '"></div>'
            + '<div class="video-controls" id="vc-' + this.iWnd + '">'
            + '<canvas class="seek-canvas" id="sc-' + this.iWnd + '"></canvas>'
            + '<div class="video-info" id="vi-' + this.iWnd + '">'
            + '<button class="play-pause-btn" id="ppb-' + this.iWnd + '"></button>'
            + '<div class="time-info" id="ti-' + this.iWnd + '">'
            + '<span class="curtimetext" id="ctt-' + this.iWnd + '" >00:00:00</span>'
            + '<div class="durations-block" id="tb-' + this.iWnd + '">'
            + '<span class="begtimetext" id="btt-' + this.iWnd + '">00:00:00</span>'
            + '<span class="timeseparator" id="tms-' + this.iWnd + '"> - </span>'
            + '<span class="durtimetext" id="dtt-' + this.iWnd + '">00:00:00</span>'
            + '</div></div>'
            + '<button class="fullscreen-btn" id="fsb-' + this.iWnd + '"></button>'
            + '</div></div>';
        this.createHTMLPlayerControls(playerHtml, iFlg);
        calculateSeekCanvasSize(null, this);
    }
    /////////////////////////////////////////////////////////////////////////
    // Create player controls and assign to our members
    createHTMLPlayerControls(playerHtml, iFlg) {
        this.player = document.getElementById(this.divId);
        this.player.innerHTML = playerHtml;
        this.playerWidth = this.player.clientWidth;
        this.playerHeight = this.player.clientHeight;
        this.video = document.getElementById('v-' + this.iWnd);
        this.cameraInfo = document.getElementById('ci-' + this.iWnd);
        this.videoControls = document.getElementById('vc-' + this.iWnd);
        this.playBtn = document.getElementById('ppb-' + this.iWnd);
        this.closeBtn = document.getElementById('cb-' + this.iWnd);
        this.timeInfo = document.getElementById('ti-' + this.iWnd);
        this.seekCanvas = document.getElementById('sc-' + this.iWnd);
        this.timeBlock = document.getElementById('tb-' + this.iWnd);
        this.begTimeText = document.getElementById('btt-' + this.iWnd);
        this.curTimeText = document.getElementById('ctt-' + this.iWnd);
        this.durTimeText = document.getElementById('dtt-' + this.iWnd);
        this.timeSeparator = document.getElementById('tms-' + this.iWnd);
        this.fullScreenBtn = document.getElementById('fsb-' + this.iWnd);
        // assign event handlers
        let wsp = this;
        this.isAppleMobile = this.checkAppleDevicesFullScreenAPI(this.fullScreenBtn);
        this.playBtn.disabled = true;
        this.cameraInfo.addEventListener("click", function () { showHideCamId(wsp); }, false);
        this.video.addEventListener("click", function (e) { playPause(e, wsp); }, false);
        this.video.addEventListener("pause", function () { wsp.playBtn.style.background = "url(/images/vid/play.png)"; }, false);
        this.video.addEventListener("play", function () { wsp.playBtn.style.background = "url(/images/vid/pause.png)"; }, false);
        this.closeBtn.addEventListener("click", function (e) { closeWindow(e, wsp); }, false);
        this.video.addEventListener("dblclick", function (e) { toggleFullScreen(e, wsp); }, false);
        this.fullScreenBtn.addEventListener("click", function (e) { toggleFullScreen(e, wsp); }, false);
        this.playBtn.addEventListener("click", function (e) { playPause(e, wsp); }, false);
        if ((iFlg & 0x10) == 0x10) { // PTZ ctrl events
            let helm = document.getElementById("vptzb-" + this.iWnd);
            if (helm != null) {
                let spp = `#vptzcp-${this.iWnd}`;
                helm.addEventListener("click", function (e) { wsp.OnShowPtzPane(e, this); });
                // PTZ pane hide btn
                $(`${spp} span.k-i-arrow-chevron-right`).on("click", function (e) {
                    $(spp).hide(500);
                    $(helm).show(500);
                    $(wsp.closeBtn).show(500);
                });
                // PTZ release ctrl btn
                $(`${spp} span.k-i-unlink-horizontal`).on("click", function (e) {
                    wsp.wndMngr.OnPtzBtn(wsp.iWnd, null, -1);
                });
                // PTZ ctrl buttons
                $(`${spp} td`).each(function (i, el) {
                    $(el).on("mousedown", function (e) {
                        wsp.wndMngr.OnPtzBtn(wsp.iWnd, this, 1);
                    });
                });
                $(`${spp} td`).each(function (i, el) {
                    $(el).on("mouseup", function (e) {
                        wsp.wndMngr.OnPtzBtn(wsp.iWnd, this, 0);
                    });
                });
            }
        }
        window.addEventListener('resize', function (e) { resizePlayer(e, wsp); }, false);
        if (this.isAppleMobile) {
            this.video.addEventListener("webkitendfullscreen", function () { appleMobileDisableFullScreen(wsp); }, false);
        }
    }
    checkAppleDevicesFullScreenAPI(fullScreenBtn) {
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            fullScreenBtn.className += ' hidden';
            return true;
        }
        return false;
    }
    /////////////////////////////////////////////////////////////////////////
    // Open stream by HTML request received from the server
    openStreamFromHTMLReq(sWbsAddr, type, camId, flgs, time, encParams) {
        if (this.isError) {
            this.isError = false;
        }
        this.InitPlayer(flgs);
        if (sWbsAddr.endsWith(":")) {
            sWbsAddr += "7008";
        }
        this.wsAdress = sWbsAddr;
        this.streamInfo = { type: type, camId: camId, time: time, encParams: encParams };
        this.cameraInfo.innerHTML = camId;
        console.log('openStreamFromHTMLReq: this');
        console.log(this);
        if (this.streamInfo.type == "V" || this.streamInfo.type == "F") {
            this.setFile();
            calculateSeekCanvasSize(null, this);
        }
        else {
            this.setLive();
        }
        var slf = this;
        $.post(this.getWebServiceRequest())
            .done(function (data) {
            if (data['errors'] && Array.isArray(data['errors'])) {
                slf.closeCallback(slf.divId, data['errors'][1]);
                slf.isError = true;
                return;
            }
            if (isDebugMode) {
                console.log("Ticket received: " + data['sm']);
            }
            slf.streamInfo.time = slf.streamInfo.time.replace("i", "&");
            slf.initialRequest = data['sm'];
            slf.openStream(true);
        })
            .fail(function (data) {
            slf.closeCallback(slf.divId, "err-gen");
            slf.isError = true;
        });
    }
    /////////////////////////////////////////////////////////////////////////
    // Request for streaming preparation to NVR/VSS through web service
    getWebServiceRequest() {
        var sURL = "/vm/vmd/pvss?spc=" + (this.wndMngr.mseSupport ? "M" : "H") + ";" + this.streamInfo.type + ";" + this.streamInfo.camId;
        console.log('getWebServiceRequest');
        console.log(sURL);
        if (this.streamInfo.type === "V") {
            sURL += ";" + this.streamInfo.time;
        }
        if (this.streamInfo.encParams !== "") {
            sURL += ";" + this.streamInfo.encParams;
        }
        console.log(sURL);
        return sURL;
    }
    /////////////////////////////////////////////////////////////////////////
    // Close streaming
    closeStreamFromHTMLReq() {
        this.closeWin = true;
        this.isWaitingForNextStreamInfo = false;
        if (this.webSocket != undefined) {
            this.webSocket.close();
        }
        if (isDebugMode) {
            console.log("Connection closed on closeStreamFromHTMLReq");
        }
    }
    /////////////////////////////////////////////////////////////////////////
    // Open data streaming connection or continue existing one
    openStream(newConnection) {
        if (isDebugMode) {
            this.chunkNum = 0;
        }
        //this.video.poster = "/images/pxlm.gif";
        this.isWaitingForNextStreamInfo = true;
        this.initBuffers();
        if (this.webSocket === undefined || this.webSocket.readyState != 1 || newConnection) {
            var wsPlayer = this;
            console.log('openStream');
            console.log(this.wsAdress);
            this.webSocket = new WebSocket(this.wsAdress);
            this.isBufferActive = false;
            this.webSocket.addEventListener('error', function (e) { wsPlayer.wsOnError(wsPlayer.wndMngr.sVscerr + "!"); }, false);
            this.webSocket.addEventListener('open', function (e) { wsPlayer.wsOnOpen(e); }, false);
            this.webSocket.addEventListener('message', function (e) { wsPlayer.wsOnMessage(e); }, false);
            this.webSocket.addEventListener('close', function (e) { wsPlayer.wsOnClose(e); }, false);
        }
        else {
            let sRequest = this.getWebSoketContinueRequest();
            this.webSocket.send(sRequest);
        }
    }
    /////////////////////////////////////////////////////////////////////////
    getWebSoketContinueRequest() {
        let sRequest = "cont";
        if (this.streamInfo.type === "V") {
            sRequest += "?" + this.streamInfo.time;
        }
        if (this.streamInfo.encParams !== "") {
            sRequest += "?" + this.streamInfo.encParams;
        }
        return sRequest;
    }
    /////////////////////////////////////////////////////////////////////////
    // Prepare media source for MSE or HLS streaming
    initBuffers() {
        let wsPlayer = this;
        this.isBuffering = true;
        if (this.isBufferActive) {
            if (this.wndMngr.mseSupport) {
                this.isBufferActive = false;
                try {
                    this.mediaSource.removeSourceBuffer(this.sourceBuffer);
                }
                catch (e) {
                }
            }
        }
        if (this.wndMngr.mseSupport) {
            this.mediaSource = new MediaSource();
            this.reader = new FileReader();
            this.video.src = window.URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener('sourceopen', function (e) { mseOpenSource(e, wsPlayer); }, false);
            this.mediaSource.addEventListener('webkitsourceopen', function (e) { mseOpenSource(e, wsPlayer); }, false);
        }
        else {
            if (this.isBufferActive) {
                if (isDebugMode) {
                    console.log("Waiting for new source for HLS.");
                }
            }
            else {
                wsPlayer.video.addEventListener('canplay', function (e) { videoLoadedData(e, wsPlayer); }, false);
                wsPlayer.video.addEventListener("timeupdate", function (e) { playerUpdate(wsPlayer); }, false);
                if (isDebugMode) {
                    console.log("HLS initialized.");
                }
            }
        }
        this.isBufferActive = true;
    }
    /////////////////////////////////////////////////////////////////////////
    // Setup player controls - file
    setFile() {
        this.isLive = false;
        this.seekCanvas.hidden = false;
        this.isSeeking = false;
        this.isWaitingForNextStreamInfo = true;
        this.begTimeText.innerHTML = "00:00:00";
        this.curTimeText.innerHTML = "00:00:00";
        this.timeSeparator.innerHTML = " - ";
        this.durTimeText.innerHTML = "00:00:00";
        this.playBtn.style.background = "url(/images/vid/play.png)";
        var wsPlayer = this;
        this.seekCanvas.width = this.seekWidth = this.seekCanvas.getBoundingClientRect().width;
        this.seekCanvas.height = this.seekCanvas.getBoundingClientRect().height;
        this.seekCanvas.addEventListener(this.wndMngr.pointerDownEvent, function (e) {
            wsPlayer.video.pause();
            wsPlayer.isSeeking = true;
            wsPlayer.iTmoId = window.setInterval(playerUpdate, 10);
        }, false);
    }
    /////////////////////////////////////////////////////////////////////////
    // Setup player controls - live
    setLive() {
        var currentDate = new Date();
        this.isLive = true;
        this.seekCanvas.hidden = true;
        this.isSeeking = false;
        this.isWaitingForNextStreamInfo = true;
        this.begTimeText.innerHTML = "";
        this.curTimeText.innerHTML = "Buffering...";
        this.timeSeparator.innerHTML = "";
        this.durTimeText.innerHTML = "LIVE";
        this.playBtn.style.background = "url(/images/vid/play.png)";
        this.tmVidBeg = currentDate.getHours() * 60 * 60 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
    }
    calculatePlayerTimes(data) {
        var tmBegHour = data.substring(0, 2);
        var tmEndHour = data.substring(2, 4);
        var tmNowYear = data.substring(4, 8);
        var tmNowMonth = data.substring(8, 10);
        var tmNowDay = data.substring(10, 12);
        var tmNowHour = data.substring(12, 14);
        var tmNowMin = data.substring(14, 16);
        var tmNowSec = data.substring(16, 18);
        var shift = 20;
        this.tmAllBeg = parseInt(tmBegHour) * 60 * 60;
        this.tmAllEnd = parseInt(tmEndHour) * 60 * 60;
        if (this.tmAllEnd == 0) {
            this.tmAllEnd = 24 * 60 * 60 - 1;
        }
        this.tmVidBeg = this.tmNow = parseInt(tmNowHour) * 60 * 60 + parseInt(tmNowMin) * 60 + parseInt(tmNowSec);
        this.numSegments = parseInt(data.substring(18, 20));
        this.segmentsArray = [];
        for (var i = 0; i < this.numSegments; i++) {
            var tempSegment = { 'tmBeg': 0, 'tmEnd': 0 };
            tempSegment.tmBeg = parseInt(data.substring(shift, shift + 2)) * 60 * 60 + parseInt(data.substring(shift + 2, shift + 4)) * 60 + parseInt(data.substring(shift + 4, shift + 6));
            tempSegment.tmEnd = parseInt(data.substring(shift + 6, shift + 8)) * 60 * 60 + parseInt(data.substring(shift + 8, shift + 10)) * 60 + parseInt(data.substring(shift + 10, shift + 12));
            if (tempSegment.tmEnd < tempSegment.tmBeg && tempSegment.tmEnd == 0) {
                tempSegment.tmEnd = this.tmAllEnd;
            }
            this.segmentsArray[i] = tempSegment;
            shift += 12;
            if (tempSegment.tmBeg <= this.tmNow && tempSegment.tmEnd >= this.tmNow) {
                this.actualSegment = i;
            }
        }
        if (this.actualSegment === undefined && this.segmentsArray.length > 0) {
            this.actualSegment = 0;
        }
        this.streamInfo.time = tmNowYear + "-" + tmNowMonth + "-" + tmNowDay + "&" + tmNowHour + ":" + tmNowMin + ":" + tmNowSec;
        this.begTimeText.innerHTML = tmBegHour + ":00:00";
        if (this.tmAllEnd == 24 * 60 * 60 - 1) {
            this.durTimeText.innerHTML = "23:59:59";
        }
        else {
            this.durTimeText.innerHTML = tmEndHour + ":00:00";
        }
    }
    getPlayerTime() {
        if (this.isSeeking) {
            return this.playerThumbPos / this.seekWidth * (this.tmAllEnd - this.tmAllBeg) + this.tmAllBeg;
        }
        else if (this.tmNow >= this.segmentsArray[this.actualSegment].tmEnd) {
            if (this.actualSegment == (this.numSegments - 1) || this.tmNow >= this.tmAllEnd) {
                this.video.pause();
            }
            else {
                this.actualSegment++;
                this.tmNow = this.segmentsArray[this.actualSegment].tmBeg;
            }
        }
        return this.tmNow;
    }
    playerThumbUpdate() {
        if (!this.isSeeking) {
            this.playerThumbPos = (this.tmNow - this.tmAllBeg) / (this.tmAllEnd - this.tmAllBeg) * this.seekWidth;
        }
        else {
            this.playerThumbPos = this.wndMngr.pointerX - this.seekCanvas.getBoundingClientRect().left;
            if (this.playerThumbPos < 0) {
                this.playerThumbPos = 0;
            }
            else if (this.playerThumbPos > this.seekWidth) {
                this.playerThumbPos = this.seekWidth;
            }
        }
    }
    drawCurTime(curTime) {
        this.curTimeText.innerHTML = this.convertIntTimeToString(curTime);
    }
    drawSeekCanvas() {
        var ctx = this.seekCanvas.getContext("2d");
        var tmpFillBeg, tmpFillWidth;
        ctx.clearRect(0, 0, this.seekWidth, this.seekCanvas.height);
        ctx.fillStyle = 'rgba(80, 209, 245, 0.5)';
        for (var i = 0; i < this.numSegments; i++) {
            tmpFillBeg = ((this.segmentsArray[i].tmBeg - this.tmAllBeg) / (this.tmAllEnd - this.tmAllBeg)) * this.seekWidth;
            tmpFillWidth = ((this.segmentsArray[i].tmEnd - this.segmentsArray[i].tmBeg) / (this.tmAllEnd - this.tmAllBeg)) * this.seekWidth;
            ctx.fillRect(tmpFillBeg, 0, tmpFillWidth, this.seekCanvas.height);
        }
        ctx.fillStyle = 'rgba(16, 153, 175, 0.5)';
        if (this.video.buffered.length >= 1) {
            tmpFillBeg = (this.tmVidBeg + this.video.buffered.start(0) - this.tmAllBeg) / (this.tmAllEnd - this.tmAllBeg) * this.seekWidth;
            tmpFillWidth = (this.video.buffered.end(0)) / (this.tmAllEnd - this.tmAllBeg) * this.seekWidth;
            ctx.fillRect(tmpFillBeg, this.seekCanvas.height / 4, tmpFillWidth, this.seekCanvas.height / 2);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.ellipse(this.playerThumbPos, this.seekCanvas.height / 2, this.thumbCircleRadius, this.seekCanvas.height / 2, 0 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();
    }
    seekVideo() {
        var reqTime = this.playerThumbPos / this.seekWidth * (this.tmAllEnd - this.tmAllBeg) + this.tmAllBeg;
        for (var i = 0; i < this.numSegments; i++) {
            if (reqTime >= this.segmentsArray[i].tmBeg && reqTime <= this.segmentsArray[i].tmEnd) {
                break;
            }
            if (reqTime < this.segmentsArray[i].tmBeg) {
                reqTime = this.segmentsArray[i].tmBeg;
                break;
            }
            if (i === (this.numSegments - 1) && reqTime >= this.segmentsArray[this.numSegments - 1].tmEnd) {
                reqTime = this.segmentsArray[this.numSegments - 1].tmBeg;
            }
        }
        if (this.video.buffered.length > 0 && reqTime >= (this.tmVidBeg + this.video.buffered.start(0)) && reqTime <= (this.tmVidBeg + this.video.buffered.end(0))) {
            this.video.currentTime = reqTime - this.tmVidBeg;
            this.tmNow = this.tmVidBeg + this.video.currentTime;
            this.video.play();
        }
        else {
            this.makeNewStreamInfoTime(reqTime);
            this.playBtn.disabled = true;
            if (this.webSocket.readyState != 1) {
                this.streamInfo.time = this.streamInfo.time.replace("&", "i");
                var slf = this;
                $.post(this.getWebServiceRequest(), function (data) {
                    if (data.includes("ERROR:")) {
                        if (isDebugMode) {
                            console.log("WebService: " + data);
                        }
                        slf.isError = true;
                        return;
                    }
                    if (isDebugMode) {
                        console.log("Ticket received.");
                    }
                    slf.streamInfo.time = slf.streamInfo.time.replace("i", "&");
                    slf.initialRequest = data;
                    slf.openStream(true);
                });
            }
            else {
                this.openStream(false);
            }
            if (isDebugMode) {
                console.log("New file request sent.");
            }
        }
    }
    makeNewStreamInfoTime(reqTime) {
        var tokens = this.streamInfo.time.split('&');
        this.streamInfo.time = tokens[0] + '&' + this.convertIntTimeToString(reqTime);
    }
    convertIntTimeToString(time) {
        var tmHours, tmMins, tmSecs;
        var timeString;
        tmHours = Math.floor(time / 60 / 60);
        tmMins = Math.floor(time / 60 - tmHours * 60);
        tmSecs = Math.floor(time - tmMins * 60 - tmHours * 60 * 60);
        if (tmHours == 24 && tmMins == 0 && tmSecs == 0) {
            tmHours = 23;
            tmMins = 59;
            tmSecs = 59;
        }
        if (tmSecs < 10) {
            tmSecs = "0" + tmSecs;
        }
        if (tmMins < 10) {
            tmMins = "0" + tmMins;
        }
        if (tmHours < 10) {
            tmHours = "0" + tmHours;
        }
        timeString = tmHours + ":" + tmMins + ":" + tmSecs;
        return timeString;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Web Socket callbacks - error
    wsOnError(message) {
        let wsPlayer = this;
        this.isError = true;
        if (this.closeWin) {
            return;
        }
        this.webSocket.close();
        console.log("#### ERRRR ####");
        this.player.innerHTML = '<button class="vidclose-btn" id="cb-' + wsPlayer.iWnd + '"></button>' +
            '<div id="error-video" class="align-bottom alert alert-danger" role="alert"><p>' + message + '</p></div>';
        document.getElementById('cb-' + this.iWnd).addEventListener("click", function (e) { closeWindow(e, wsPlayer); }, false);
    }
    /////////////////////////////////////////////////////////////////////////////
    // Web Socket open callback
    wsOnOpen(e) {
        if (isDebugMode) {
            console.log(`WebSocket opened. Sending request size: ${this.initialRequest.length}`);
        }
        console.log(`wsOnOpen`);
        console.log(this.initialRequest);
        this.webSocket.send(this.initialRequest);
    }
    /////////////////////////////////////////////////////////////////////////////
    // Web Socket message callback
    wsOnMessage(e) {
        console.log('wsOnMessage: ');
        console.log(this.video.src);
        if (typeof e.data == "string") {
            if (isDebugMode) {
                console.log("### WS received a message - string");
            }
            if (e.data.includes("ERROR")) {
                this.wsOnError(e.data);
            }
            else if (!this.wndMngr.mseSupport && e.data.includes("m3u8")) {
                this.video.src = "hls/" + e.data.replace("\\", "/");
                this.video.load();
                if (isDebugMode) {
                    this.chunkNum = 0;
                }
            }
            else if (!this.wndMngr.mseSupport && e.data.includes("HLS_OK")) {
                if (isDebugMode) {
                    this.chunkNum += 3;
                    console.log("HLS_OK, chunk " + this.chunkNum);
                }
            }
            else {
                if (this.isWaitingForNextStreamInfo) {
                    this.isWaitingForNextStreamInfo = false;
                }
                if (!this.isLive) {
                    this.calculatePlayerTimes(e.data);
                    playerUpdate(this);
                }
            }
        }
        else {
            if (isDebugMode) {
                console.log(`WS received a message - binary`);
            }
            if (!this.closeWin) {
                if (!this.isWaitingForNextStreamInfo) {
                    this.reader.readAsArrayBuffer(e.data);
                }
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Web Socket close callbacks
    wsOnClose(e) {
        if (this.webSocket.readyState == 1) {
            this.webSocket.send("close");
        }
        if (this.wndMngr.mseSupport && typeof this.mediaSource !== undefined) {
            this.mediaSource.endOfStream();
        }
        if (isDebugMode) {
            console.log("Socket closed, end of stream");
        }
        if (this.isWaitingForNextStreamInfo && !this.isError) {
            this.wsOnError(this.wndMngr.sVscbrk + "!");
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // File Reader data loaded event handler
    rdrOnLoadEvt(e) {
        try {
            if (typeof this.reader.result == "object") {
                this.sourceBuffer.appendBuffer(new Uint8Array(this.reader.result));
                if (isDebugMode) {
                    console.log(`Append data to buffer - ${this.reader.result.byteLength}`);
                }
            }
        }
        catch (e) {
            if (this.isLive) {
                var currentDate = new Date();
                this.tmVidBeg = currentDate.getHours() * 60 * 60 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
                this.openStream(false);
            }
            else {
                this.makeNewStreamInfoTime(this.tmNow);
                this.openStream(false);
            }
            if (isDebugMode) {
                console.log("Full buffers - resetting.");
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Source buffer update end
    sbfUpdateEnd(e) {
        if (isDebugMode) {
            this.chunkNum++;
            console.log(`Chunk ${this.chunkNum} for player ${this.iWnd} loaded`);
        }
    }
    OnShowPtzPane(e, elm) {
        let spp = `#vptzcp-${this.iWnd}`;
        $(spp).removeClass("d-none");
        $(elm).hide();
        $(this.closeBtn).hide();
        $(spp).show(500);
    }
}
// Callbacks
function closeWindow(e, wsPlayer) {
    wsPlayer.closeStreamFromHTMLReq();
    wsPlayer.isWaitingForNextStreamInfo = false;
    wsPlayer.closeCallback(wsPlayer.divId);
}
function playPause(e, wsPlayer) {
    if (wsPlayer.playBtn.disabled) {
        return;
    }
    if (wsPlayer.video.paused) {
        if (wsPlayer.isLive) {
            if (wsPlayer.video.buffered.start(0) <= wsPlayer.video.buffered.end(0) - 4
                && wsPlayer.video.currentTime < wsPlayer.video.buffered.end(0) - 4) {
                wsPlayer.video.currentTime = wsPlayer.video.buffered.end(0) - 4;
                wsPlayer.tmNow = wsPlayer.tmVidBeg + wsPlayer.video.currentTime;
            }
        }
        wsPlayer.video.play();
    }
    else {
        wsPlayer.video.pause();
    }
}
function toggleFullScreen(e, wsPlayer) {
    if (wsPlayer.isAppleMobile) {
        if (wsPlayer.video.controls) {
            wsPlayer.video.controls = false;
            wsPlayer.video.playsinline = true;
        }
        else {
            wsPlayer.video.controls = true;
            wsPlayer.video.playsinline = false;
            setTimeout(appleMobileDisableFullScreen, 5000, wsPlayer);
        }
        return;
    }
    if (document.fullscreenElement || document['webkitFullscreenElement'] ||
        document['mozFullScreenElement'] || document['msFullscreenElement'] ||
        document['webkitDisplayingFullscreen']) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']();
        }
        else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        }
        else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
        }
        else if (document['webkitSupportsFullscreen']()) {
            document['webkitExitFullscreen']();
        }
    }
    else {
        if (wsPlayer.player.requestFullScreen) {
            wsPlayer.player.requestFullScreen();
        }
        else if (wsPlayer.player.webkitRequestFullScreen) {
            wsPlayer.player.webkitRequestFullScreen();
        }
        else if (wsPlayer.player.mozRequestFullScreen) {
            wsPlayer.player.mozRequestFullScreen();
        }
        else if (wsPlayer.player.msRequestFullscreen) {
            wsPlayer.player.msRequestFullscreen();
        }
        else if (document['webkitSupportsFullscreen']()) {
            document['webkitEnterFullscreen']();
        }
    }
}
function appleMobileDisableFullScreen(wsPlayer) {
    wsPlayer.video.controls = false;
    wsPlayer.video.playsinline = true;
}
function resizePlayer(e, wsPlayer) {
    if (document.fullscreenElement || document['webkitFullscreenElement'] ||
        document['mozFullScreenElement'] || document['msFullscreenElement']) {
        wsPlayer.player.style.width = "";
        wsPlayer.player.style.height = "";
        wsPlayer.video.style.top = "";
        wsPlayer.video.style.transform = "";
        wsPlayer.videoControls.style.transform = "translateY(100%) translateY(10px)";
    }
    else {
        wsPlayer.player.style.width = wsPlayer.playerWidth + "px";
        wsPlayer.player.style.height = wsPlayer.playerHeight + "px";
        wsPlayer.videoControls.style.transform = "translateY(100%)";
    }
    calculateSeekCanvasSize(e, wsPlayer);
    playerUpdate(wsPlayer);
}
function calculateSeekCanvasSize(e, wsPlayer) {
    wsPlayer.timeInfo.style.width = (wsPlayer.player.getBoundingClientRect().width - 80) + "px";
    wsPlayer.seekCanvas.width = wsPlayer.seekWidth = wsPlayer.player.getBoundingClientRect().width;
    wsPlayer.seekCanvas.height = wsPlayer.seekCanvas.getBoundingClientRect().height;
}
function mseOpenSource(e, wsPlayer) {
    console.log("MSE loadeding");
    wsPlayer.sourceBuffer = wsPlayer.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.640028"');
    wsPlayer.sourceBuffer.mode = 'sequence';
    //wsPlayer.sourceBuffer.appendWindowStart = 2.0;
    wsPlayer.reader.addEventListener('load', function (e) { wsPlayer.rdrOnLoadEvt(e); }, false);
    wsPlayer.sourceBuffer.addEventListener('updateend', function (e) { wsPlayer.sbfUpdateEnd(e); }, false);
    wsPlayer.video.addEventListener('loadeddata', function (e) { videoLoadedData(e, wsPlayer); }, false);
    wsPlayer.video.addEventListener("timeupdate", function (e) { playerUpdate(wsPlayer); }, false);
    if (isDebugMode) {
        console.log("MSE loaded.");
    }
}
function videoLoadedData(e, wsPlayer) {
    if (wsPlayer.playBtn.disabled) {
        wsPlayer.playBtn.disabled = false;
    }
    if (wsPlayer.isBuffering) {
        wsPlayer.isBuffering = false;
    }
    var promise = wsPlayer.video.play();
    if (promise !== undefined) {
        promise.then(_ => {
            return;
        }).catch(error => {
            console.log("Autoplay was prevented by browser.");
        });
    }
}
/////////////////////////////////////////////////////////////////////////////
// Status update on a player
function playerUpdate(wp) {
    if (wp == undefined) {
        return;
    }
    if (!wp.isWaitingForNextStreamInfo && !wp.isBuffering) {
        wp.tmNow = wp.tmVidBeg + wp.video.currentTime;
        if (!wp.isLive) {
            let curTimeInPlayer;
            wp.playerThumbUpdate();
            curTimeInPlayer = wp.getPlayerTime();
            wp.drawCurTime(curTimeInPlayer);
            wp.drawSeekCanvas();
        }
        else {
            wp.drawCurTime(wp.tmNow);
        }
    }
}
function showHideCamId(wsPlayer) {
    if (wsPlayer.isCamIdVisible) {
        wsPlayer.isCamIdVisible = false;
        wsPlayer.cameraInfo.style.color = "rgba(0,0,0,0)";
        wsPlayer.cameraInfo.style.background = "rgba(0,0,0,0)";
    }
    else {
        wsPlayer.isCamIdVisible = true;
        wsPlayer.cameraInfo.style.removeProperty("color");
        wsPlayer.cameraInfo.style.removeProperty("background");
    }
}
//# sourceMappingURL=vplyr.js.map