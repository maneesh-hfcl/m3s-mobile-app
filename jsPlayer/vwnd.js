// Video window management class
var ECONTYP;
(function (ECONTYP) {
    ECONTYP[ECONTYP["CNT_NONE"] = 0] = "CNT_NONE";
    ECONTYP[ECONTYP["CNT_LIVE"] = 1] = "CNT_LIVE";
    ECONTYP[ECONTYP["CNT_RECD"] = 2] = "CNT_RECD"; // recording connection
})(ECONTYP || (ECONTYP = {}));
class CWndMngr {
    constructor(kppNtf, aErrs) {
        this.iWnds = 1;
        this.sWndLyt = "";
        this.sGenErr = aErrs[0];
        this.sNetErr = aErrs[1];
        this.sUseErr = aErrs[2];
        this.sVscbrk = aErrs[3];
        this.sVscerr = aErrs[4];
        this.sGenDti = aErrs[5];
        this.sPtzCtt = aErrs[6];
        this.okppNtf = kppNtf;
        this.aWnds = Array(16).fill(undefined);
        this.bLastCams = false;
        this.InitBaseHandlers();
        let slf = this;
        setInterval(function () { slf.OnTimerWork(); }, 20 * 1000);
    }
    setRecDlg(oDlg) {
        this.oWndVbr = oDlg;
    }
    /////////////////////////////////////////////////////////////////////////
    // Create player divs with id starting from 'wsp-' than window number
    CreateWnds(r, c, ids) {
        let prnt = $(ids), slf = this;
        let iW = Math.floor((prnt[0].offsetWidth - (c - 1) * 2) / c), iH = Math.floor((prnt[0].offsetHeight - (r - 1) * 2) / r), i, j, iT, iL;
        prnt.empty();
        this.iWnds = r * c;
        this.sPrnt = ids;
        for (j = 0, iT = prnt[0].offsetTop + 1; j < r; j++) {
            for (i = 0, iL = prnt[0].offsetLeft + 1; i < c; i++) {
                let div = document.createElement('div'), iWnd = (j * c + i);
                div.id = "wsp-" + iWnd;
                div.className = "wsplayer";
                div.style.width = iW + 'px';
                div.style.height = iH + 'px';
                div.style.top = iT + "px";
                div.style.left = iL + "px";
                div.addEventListener('dragover', function (ev) { slf.OnWndDragOvr(ev, iWnd, div); }, false);
                div.addEventListener('drop', function (ev) { slf.OnWndDragDrop(ev, iWnd, div); }, false);
                prnt[0].appendChild(div);
                iL += iW + 2;
            }
            iT += iH + 2;
        }
        // clean our windows
        for (j = 0, i = r * c; j < i; j++) {
            this.aWnds[j] = { sCmdId: "", iConnt: 0, oPlayr: null };
        }
    }
    /////////////////////////////////////////////////////////////////////////
    // Create player divs with id starting from 'wsp-' than window number with layout
    CreateWndsLyt(r, c, ids, lyt) {
        let awd = this.InterpretMatrixDef(r, c, lyt);
        if (awd) {
            let prnt = $(ids), slf = this;
            let fW = (prnt[0].offsetWidth - (c - 1) * 2) / c, fH = (prnt[0].offsetHeight - (r - 1) * 2) / r, i, fT, fL, fX, fY;
            prnt.empty();
            this.sPrnt = ids;
            for (i = 0; i < awd.length; i++) {
                if (!awd[i]) {
                    break;
                }
                fT = prnt[0].offsetTop + 1 + awd[i].iT * (fH + 2);
                fY = fH * awd[i].iR + (awd[i].iR - 1) * 2;
                fL = prnt[0].offsetLeft + 1 + awd[i].iL * (fW + 2);
                fX = fW * awd[i].iC + (awd[i].iC - 1) * 2;
                let div = document.createElement('div'), iWnd = i;
                div.id = "wsp-" + i;
                div.className = "wsplayer";
                div.style.width = Math.floor(fX) + 'px';
                div.style.height = Math.floor(fY) + 'px';
                div.style.top = Math.floor(fT) + "px";
                div.style.left = Math.floor(fL) + "px";
                div.addEventListener('dragover', function (ev) { slf.OnWndDragOvr(ev, iWnd, div); }, false);
                div.addEventListener('drop', function (ev) { slf.OnWndDragDrop(ev, iWnd, div); }, false);
                prnt[0].appendChild(div);
            }
            this.iWnds = i;
            // clean our windows
            for (i = 0; i < this.iWnds; i++) {
                this.aWnds[i] = { sCmdId: "", iConnt: 0, oPlayr: null };
            }
        }
        else {
            this.CreateWnds(r, c, ids);
        }
    }
    /////////////////////////////////////////////////////////////////////////
    // Open live camera connection
    OpenLive(sCam) {
        let n = this.iWnds, i;
        for (i = 0; i < n; i++) {
            if (this.aWnds[i].iConnt == ECONTYP.CNT_NONE) {
                break;
            }
        }
        if (i < n) {
            this.aWnds[i].iConnt = ECONTYP.CNT_LIVE;
            this.aWnds[i].sCmdId = sCam;
            this.RunPlayer(sCam, i, "", "");
            this.UpdateLastCam(sCam);
            return true;
        }
        return false;
    }
    OpenLiveInWnd(sCam, iWnd) {
        if (this.aWnds[iWnd].iConnt == ECONTYP.CNT_NONE) {
            this.aWnds[iWnd].iConnt = ECONTYP.CNT_LIVE;
            this.aWnds[iWnd].sCmdId = sCam;
            this.RunPlayer(sCam, iWnd, "", "");
            this.UpdateLastCam(sCam);
            return true;
        }
        return false;
    }
    /////////////////////////////////////////////////////////////////////////
    // Open recording camera connection
    OpenRecording(sCam, iWnd, dtm) {
        let n = this.iWnds, i;
        if (iWnd >= 0 && iWnd < n) {
            if (this.aWnds[iWnd].iConnt != ECONTYP.CNT_NONE) {
                iWnd = -1;
            }
        }
        else {
            iWnd = -1;
        }
        if (iWnd == -1) {
            for (i = 0; i < n; i++) {
                if (this.aWnds[i].iConnt == ECONTYP.CNT_NONE) {
                    iWnd = i;
                    break;
                }
            }
        }
        if (iWnd >= 0 && iWnd < n) {
            this.aWnds[iWnd].iConnt = ECONTYP.CNT_RECD;
            this.aWnds[iWnd].sCmdId = sCam;
            this.RunPlayer(sCam, iWnd, "", dtm.toJSON());
            return true;
        }
        return false;
    }
    /////////////////////////////////////////////////////////////////////////
    // Open multiple recordings camera connections
    OpenRecordings(aCams, dtm) {
        let n = aCams.length, i, r = 0;
        for (i = 0; i < n; i++) {
            let iIdx = aCams[i].WndIx;
            if (iIdx < 0 || iIdx >= this.iWnds) {
                continue;
            }
            // skip if 
            if (this.aWnds[iIdx].iConnt != ECONTYP.CNT_NONE) {
                continue;
            }
            this.aWnds[iIdx].iConnt = ECONTYP.CNT_RECD;
            this.aWnds[iIdx].sCmdId = aCams[i].CamId;
            r++;
            this.RunPlayer(aCams[i].CamId, iIdx, "", dtm.toJSON());
        }
        return r > 0 ? true : false;
    }
    /////////////////////////////////////////////////////////////////////////
    // Cpen live camera connection
    CloseLive(sCam) {
        let n = this.iWnds, i;
        for (i = 0; i < n; i++) {
            if (this.aWnds[i].iConnt == ECONTYP.CNT_LIVE && this.aWnds[i].sCmdId == sCam) {
                break;
            }
        }
        if (i < n) {
            if (this.aWnds[i].oPlayr != undefined) {
                let sDv = this.aWnds[i].oPlayr.divId;
                this.aWnds[i].oPlayr.closeStreamFromHTMLReq();
                let dv = document.getElementById(sDv);
                $(dv).empty();
                this.aWnds[i].oPlayr = null;
            }
            this.aWnds[i].iConnt = 0;
            this.aWnds[i].sCmdId = "";
            return true;
        }
        return false;
    }
    /////////////////////////////////////////////////////////////////////////
    // Close all streams
    CloseAll() {
        let n = this.iWnds, i;
        for (i = 0; i < n; i++) {
            if (this.aWnds[i].iConnt != ECONTYP.CNT_NONE) {
                if (this.aWnds[i].oPlayr != undefined) {
                    let sDv = this.aWnds[i].oPlayr.divId;
                    this.aWnds[i].oPlayr.closeStreamFromHTMLReq();
                    let dv = document.getElementById(sDv);
                    $(dv).empty();
                    this.aWnds[i].oPlayr = null;
                }
                this.aWnds[i].iConnt = ECONTYP.CNT_NONE;
                this.aWnds[i].sCmdId = "";
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////
    // Open live camera connection
    OpenLiveOrClose(sCam) {
        let n = this.iWnds, i;
        for (i = 0; i < n; i++) {
            if (this.aWnds[i].iConnt == ECONTYP.CNT_LIVE && this.aWnds[i].sCmdId == sCam) {
                return this.CloseLive(sCam);
            }
        }
        return this.OpenLive(sCam);
    }
    /////////////////////////////////////////////////////////////////////////////
    // Start streaming
    RunPlayer(sCam, iWnd, encPrm, sTm) {
        debugger;
        let wsMode = "ws://", sType = 'L', sDiv = 'wsp-' + iWnd;
        if (this.aWnds[iWnd].oPlayr != null) {
            return;
        }
        var wndMngr = this;
        if (sTm) {
            sType = 'V';
        }
        this.aWnds[iWnd].oPlayr = new WebSocketPlayer(sDiv, iWnd, this, function (sId, sErr) { wndMngr.OnClose(sId, sErr); });
        if (encPrm == "") {
            let iWnds = this.iWnds;
            if (iWnds >= 16) {
                encPrm = "640:-1:-1.0";
            }
            else if (iWnds >= 9) {
                encPrm = "1280:-1:-1.0";
            }
            else if (iWnds >= 1) {
                encPrm = "1920:-1:-1.0";
            }
        }
        if (location.protocol === 'https:') {
            wsMode = "wss://";
        }
        console.log('RunPlayer');
        console.log(this);
        console.log(`/vm/vmd/gbvd?dv=${sCam}&vt=${sType}`);
        $.ajax({ type: "POST", url: `/vm/vmd/gbvd?dv=${sCam}&vt=${sType}`, dataType: "json" })
            .done(function (data) {
            let obj = data;
            if (obj['errors'] && Array.isArray(obj['errors'])) {
                wndMngr.ErrorCleanup(obj['errors'], iWnd, sDiv);
                return;
            }
            if (obj['sw']) {
                let adrip = obj['sw'], flgs = obj['sf'];
                console.log(`Server to connect: ${adrip}`, `Flags: ${flgs.toString(16)}`);
                wndMngr.aWnds[iWnd].oPlayr.openStreamFromHTMLReq(wsMode + adrip, sType, sCam, flgs, sTm, encPrm);
                return;
            }
            wndMngr.ErrorCleanup(null, iWnd, sDiv);
        })
            .fail(function () {
            wndMngr.ErrorCleanup(null, iWnd, sDiv);
        });
    }
    /////////////////////////////////////////////////////////////////////////////
    // On stream close handler - camera
    OnPtzBtn(iWnd, elm, updn) {
        if (iWnd >= 0 && iWnd < this.aWnds.length) {
            let sC = this.aWnds[iWnd].sCmdId;
            this.OnPtzBtnForCam(sC, elm, updn, iWnd);
        }
    }
    OnPtzBtnForCam(sCam, elm, updn, iWnd) {
        let sAct = (elm ? $(elm).data('id').substring(2) : ""), sCmd = "", sPrx = "oo";
        let slf = this;
        if (updn == 1) {
            if (!this.sPtzCam) { // take cam control
                sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=otb${sAct}`;
                sPrx = "ot";
            }
            else if (this.sPtzCam != sCam) { // release and take control
                sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=rtb${sAct}&dc=${this.sPtzCam}`;
                sPrx = "rt";
            }
            else {
                sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=oob${sAct}`;
            }
            this.ePtzBtn = elm;
        }
        else if (updn == -1) { // release cam control btn
            if (!this.sPtzCam) {
                return;
            }
            if (this.sPtzCam != sCam) {
                return;
            }
            sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=rooxo&dc=${sCam}`;
            sPrx = "oo";
        }
        else if (this.ePtzBtn) {
            sCmd = `/vm/vmd/ptzc?dv=${sCam}&cm=oos${sAct}`;
            this.ePtzBtn = null;
        }
        else {
            return;
        }
        $.ajax({ type: "POST", url: sCmd, dataType: "json" })
            .done(function (data) {
            let obj = data;
            if (obj['errors'] && Array.isArray(obj['errors'])) {
                if (sPrx != "oo") {
                    slf.okppNtf.show(obj['errors'][1], "error");
                }
                return;
            }
            if (obj['sm'] == "Ok") { // set active PTZ controlled camera
                if (sPrx[1] == "t") {
                    console.log(`Taken PTZ ${sCam}: ${sPrx}`);
                    if (slf.aWnds[iWnd].iConnt == 1 && slf.aWnds[iWnd].sCmdId == sCam) {
                        slf.okppNtf.show(slf.sPtzCtt.replace("{0}", sCam), "success");
                        slf.sPtzCam = sCam;
                    }
                }
            }
        })
            .fail(function () {
            if (sPrx != "oo") {
                slf.okppNtf.show(slf.sGenErr.replace("{0}", sCam), "error");
            }
        });
    }
    /////////////////////////////////////////////////////////////////////////////
    // On stream close handler - camera
    OnClose(sId, sErr) {
        let iWnd = this.GetNumFromName(sId);
        let sC = "";
        if (iWnd >= 0 && iWnd < this.aWnds.length) {
            sC = this.aWnds[iWnd].sCmdId;
            this.aWnds[iWnd].iConnt = 0;
            this.aWnds[iWnd].sCmdId = "";
            this.aWnds[iWnd].oPlayr = null;
        }
        let dv = document.getElementById(sId);
        //let iW = dv.offsetWidth + 4, iH = dv.offsetHeight + 4;
        if (sErr) {
            if (sErr == "err-gen")
                this.okppNtf.show(this.sGenErr.replace("{0}", sC), "error");
            else if (sErr == "err-net")
                this.okppNtf.show(this.sNetErr.replace("{0}", sC), "error");
            else
                this.okppNtf.show(sErr, "error");
        }
        $(dv).empty();
        //dv.style.width = iW + "px"; dv.style.height = iH + "px";
        //if (camName == m_IsPtz) {
        //    if (m_sAddrPort != "") {
        //        ReleaseControl2(m_sAddrPort + ";" + camName);
        //    }
        //    $(".p_ptz").hide();
        //    m_IsPtz = "";
        //}
        //LiveClosed(camName, 30008, m_sType);
    }
    /////////////////////////////////////////////////////////////////////////////
    /// Wnd drag over
    OnWndDragOvr(e, iWnd, des) {
        if (!e.dataTransfer) {
            return;
        }
        if (e.dataTransfer.types.length > 0) {
            if (e.dataTransfer.types[0] == "text/cam" || e.dataTransfer.types[0] == "text/vbc") {
                if (this.aWnds[iWnd].iConnt == ECONTYP.CNT_NONE) {
                    e.preventDefault();
                }
            }
            else if (e.dataTransfer.types.indexOf("text/lyt") != -1) {
                e.preventDefault();
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    /// Wnd drag drop
    OnWndDragDrop(e, iWnd, des) {
        let sData = e.dataTransfer.getData("text/cam");
        if (sData) {
            if (sData.startsWith("ic;") || sData.startsWith("lc_") || sData.startsWith("fc_")) {
                if (this.aWnds[iWnd].iConnt == ECONTYP.CNT_NONE) {
                    let sCam = sData.substring(3);
                    if (this.CheckCamRunning(sCam, true)) {
                        this.okppNtf.show(this.sUseErr.replace("{0}", sCam), "error");
                        return;
                    }
                    e.preventDefault();
                    this.OpenLiveInWnd(sCam, iWnd);
                }
            }
            return;
        }
        sData = e.dataTransfer.getData("text/vbc");
        if (sData) {
            if (sData.startsWith("ic;") || sData.startsWith("lc_") || sData.startsWith("fc_")) {
                if (this.aWnds[iWnd].iConnt == ECONTYP.CNT_NONE) {
                    let aSpl = sData.split('|', 2);
                    if (aSpl.length >= 2 && this.oWndVbr) {
                        let sCam = aSpl[0].substring(3), sDlg = this.oWndVbr.GetDlgId();
                        let oDlg = $(`#${sDlg}`);
                        e.preventDefault();
                        oDlg.removeClass("d-none");
                        this.oWndVbr._aCams = [{ WndIx: iWnd, CamId: sCam, Desc: aSpl[1] }];
                        this.oWndVbr._sCama = sCam;
                        oDlg.data("kendoWindow").center().open();
                    }
                }
            }
            return;
        }
        sData = e.dataTransfer.getData("text/lyt");
        if (sData) {
            if (sData.startsWith("ly_")) {
                this.CloseAll();
                this.ApplyLayout(sData.substring(3));
            }
            else if (sData.startsWith("lv_")) {
                this.CloseAll();
                this.ApplyLayoutVb(sData.substring(3));
            }
            return;
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Handle error cleanup
    ErrorCleanup(aErr, iWnd, sDiv) {
        let dv = document.getElementById(sDiv);
        //let iW = dv.offsetWidth + 4, iH = dv.offsetHeight + 4;
        let sC = "";
        if (iWnd >= 0) {
            this.aWnds[iWnd].oPlayr = null;
            sC = this.aWnds[iWnd].sCmdId;
            this.aWnds[iWnd].iConnt = 0;
            this.aWnds[iWnd].sCmdId = "";
        }
        if (aErr)
            this.okppNtf.show(aErr[1], "error");
        else
            this.okppNtf.show(this.sGenErr.replace("{0}", sC), "error");
        $(dv).empty();
        //dv.style.width = iW + "px"; dv.style.height = iH + "px";
    }
    /////////////////////////////////////////////////////////////////////////////
    // Update last camera on the list (depends on dragBegl(e) which should be on page)
    UpdateLastCam(sCam) {
        let lCams = $("#lc_" + sCam);
        console.log("Last: " + sCam);
        if (lCams.length) {
            let dtc = new Date();
            lCams.next()[0].dataset.val = dtc.toISOString();
            lCams.next().html(dtc.toLocaleDateString() + " " + dtc.toLocaleTimeString());
            lCams.parents("tbody").prepend(lCams.parent());
            this.bLastCams = true;
            this.SaveLastCams();
        }
        else { // remove if more then 50
            $("#tbLast tr:gt(50)").remove();
            // find camera on the tree
            lCams = $("#treeView li");
            if (lCams.length) {
                let sIds, sHtml = null;
                for (let i = 0; i < lCams.length; i++) {
                    sIds = lCams[i].dataset.id;
                    if (sIds.startsWith("ic;") && sIds.substring(3) == sCam) {
                        sHtml = lCams[i].textContent;
                        break;
                    }
                }
                // add new row at the top
                if (sHtml) {
                    let dtc = new Date();
                    let elm = $(`<tr class="font-weight-normal" draggable="true" ondragstart="dragBegl(event)>
                    <td id='lc_${sCam}' class="text-truncate" ><span class="px-ico-sm k-sprite pxi-cam-sm-n" ></span>${sHtml}</td>
                        <td data-val="${dtc.toISOString()}">${dtc.toLocaleDateString()} ${dtc.toLocaleTimeString()}</td></tr>`);
                    $("#tbLast tbody").prepend(elm);
                    this.bLastCams = true;
                    this.SaveLastCams();
                }
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Check if specific camera is running
    CheckCamRunning(sCam, bLive) {
        let n = this.iWnds, iChk = bLive ? ECONTYP.CNT_LIVE : ECONTYP.CNT_RECD;
        for (let i = 0; i < n; i++) {
            if (this.aWnds[i].iConnt == iChk && this.aWnds[i].sCmdId == sCam) {
                return true;
            }
        }
        return false;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Periodic timer on window manager
    OnTimerWork() {
        if (this.bLastCams) {
            this.bLastCams = false;
            //this.SaveLastCams();
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Save last cameras from the list
    SaveLastCams() {
        let jCams = $("#tbLast tr:gt(0)"), sCam;
        if (jCams.length) {
            let aLast = [], sCam, sDtm;
            for (let i = 0; i < jCams.length; i++) {
                let jCamc = $(jCams[i]).children();
                if (jCamc.length >= 2 && jCamc[0].id.startsWith("lc_")) {
                    sCam = jCamc[0].id.substring(3);
                    sDtm = jCamc[1].dataset.val;
                    aLast.push({ cam: sCam, dtm: sDtm });
                }
            }
            console.log("Items to save: " + aLast.length);
            console.log(`I0: ${aLast[0].cam} ${aLast[0].dtm}`);
            if (aLast.length > 0) {
                var slf = this;
                $.ajax({ type: "POST", url: "/vm/vmd/plsc", contentType: 'application/json', data: JSON.stringify(aLast) })
                    .done(function (data) {
                    let obj = data;
                    if (obj['errors'] && Array.isArray(obj['errors'])) {
                        slf.okppNtf.show(obj['errors'][1], "error");
                        return;
                    }
                    if (obj['sm']) {
                        console.log(`Last cams updated: ${obj['sm']}`);
                    }
                })
                    .fail(function () {
                    slf.okppNtf.show(slf.sNetErr.replace("{0}", "----"), "error");
                });
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Find list item element on the tree for given camera
    FindCamOnTree(sTree, sCam) {
        let er = null;
        $("#" + sTree + " li").each((idx, elm) => {
            let sItm = elm.dataset.id;
            if (sItm.startsWith("ic;") && sItm.substring(3) == sCam) {
                er = elm;
                return false;
            }
        });
        return er;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Initialize base handlers
    InitBaseHandlers() {
        window.MediaSource = window.MediaSource || window['WebKitMediaSource'];
        if (!!!window.MediaSource) {
            this.mseSupport = false;
        }
        else {
            this.mseSupport = true;
        }
        if (window.PointerEvent) {
            this.pointerMoveEvent = "pointermove";
            this.pointerUpEvent = "pointerup";
            this.pointerDownEvent = "pointerdown";
        }
        else {
            this.pointerMoveEvent = "touchmove";
            this.pointerUpEvent = "touchend";
            this.pointerDownEvent = "touchstart";
        }
        let wm = this;
        addEventListener(this.pointerMoveEvent, function (e) {
            wm.pointerX = e.x;
        }, false);
        addEventListener(this.pointerUpEvent, function (e) {
            let n = wm.iWnds;
            let wp = wm.aWnds;
            for (var i = 0; i < n; i++) {
                if (wp[i] == undefined || wp[i].oPlayr == undefined) {
                    continue;
                }
                if (wp[i].oPlayr.isSeeking) {
                    wp[i].oPlayr.seekVideo();
                    wp[i].oPlayr.isSeeking = false;
                    window.clearInterval(wp[i].oPlayr.iTmoId);
                }
            }
            console.log("Mouse UP: " + wm.ePtzBtn, "Cam: " + wm.sPtzCam);
            // PTZ handling
            if (wm.ePtzBtn) {
                wm.OnPtzBtnForCam(wm.sPtzCam, wm.ePtzBtn, 0, -1);
                wm.ePtzBtn = null;
            }
        }, false);
    }
    /////////////////////////////////////////////////////////////////////////////
    // Get number from ID e.g. num after first '-' (should be non negative)
    GetNumFromName(sIds) {
        let ip = sIds.indexOf("-");
        if (ip >= 0 && ip < sIds.length - 1) {
            return parseInt(sIds.substr(ip + 1));
        }
        return -1;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Apply layout to window
    ApplyLayout(spc) {
        let slf = this;
        $.ajax({ type: "POST", url: `/vm/vmd/lytd?im=${spc}`, dataType: "json" })
            .done(function (data) {
            let obj = data;
            if (obj['errors'] && Array.isArray(obj['errors'])) {
                slf.okppNtf.show(obj['errors'][1], "error");
                return;
            }
            if (obj['sm'] == "Ok") {
                slf.CreateWndsLyt(obj['rc'], obj['cc'], slf.sPrnt, obj['sw']);
                if (obj['ca'] && obj['ca'].length) {
                    slf.OpenCamsInWnds(obj['ca']);
                }
            }
        })
            .fail(function () {
            slf.okppNtf.show(slf.sGenErr.replace("{0}", "---"), "error");
        });
    }
    /////////////////////////////////////////////////////////////////////////////
    // Apply layout to window for recordings
    ApplyLayoutVb(spc) {
        let slf = this;
        $.ajax({ type: "POST", url: `/vm/vmd/lytdv?im=${spc}`, dataType: "json" })
            .done(function (data) {
            let obj = data;
            if (obj['errors'] && Array.isArray(obj['errors'])) {
                slf.okppNtf.show(obj['errors'][1], "error");
                return;
            }
            if (obj['sm'] == "Ok") {
                slf.CreateWndsLyt(obj['rc'], obj['cc'], slf.sPrnt, obj['sw']);
                if (obj['ca'] && obj['ca'].length) {
                    let aCam = obj['ca'];
                    let sDlg = slf.oWndVbr.GetDlgId();
                    let oDlg = $(`#${sDlg}`);
                    oDlg.removeClass("d-none");
                    slf.oWndVbr._aCams = Array(aCam.length).fill(undefined);
                    slf.oWndVbr._sCama = aCam[0].Sym;
                    for (let i = 0; i < aCam.length; i++) {
                        slf.oWndVbr._aCams[i] = { WndIx: aCam[i].Id, CamId: aCam[i].Sym, Desc: aCam[i].Name };
                    }
                    oDlg.data("kendoWindow").center().open();
                }
            }
        })
            .fail(function () {
            slf.okppNtf.show(slf.sGenErr.replace("{0}", "---"), "error");
        });
    }
    /////////////////////////////////////////////////////////////////////////////
    // Open cameras in respective windows
    OpenCamsInWnds(sCams) {
        let aTkn = sCams.split('|', this.iWnds), aWmp = Array(this.iWnds);
        let iWnd;
        aWmp.fill(0);
        for (let t of aTkn) {
            if (!t) {
                continue;
            }
            let aVls = t.split(';', 2);
            if (aVls.length != 2 || !aVls[0] || !aVls[1]) {
                continue;
            }
            iWnd = parseInt(aVls[0]);
            if (iWnd < 0 || iWnd >= this.iWnds) {
                continue;
            }
            if (aWmp[iWnd] != 0) {
                continue;
            }
            aWmp[iWnd] = 1;
            this.OpenLiveInWnd(aVls[1], iWnd);
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    // Interpret matrix window layout definition string
    InterpretMatrixDef(r, c, lys) {
        let i, j, k, l;
        let iWndCnt = 0, iWndIdx;
        let aiWndDef = Array(r * c), aiWndMap = Array(r * c);
        let aTmp = lys.split(',', r * c);
        i = j = 0;
        aiWndDef.fill(-1);
        aiWndMap.fill(0);
        for (let v of aTmp) {
            if (v) {
                if ((k = parseInt(v)) >= 0) {
                    aiWndDef[i++] = k;
                    j = k > j ? k : j;
                    if (i == aiWndDef.length) {
                        break;
                    }
                }
            }
        }
        if (i != r * c) {
            return null;
        }
        let aWndd = Array(j < 1 ? 1 : j);
        for (i = 0; i < r; i++) {
            for (j = 0; j < c; j++) {
                iWndIdx = aiWndDef[i * c + j];
                // check if already visited ?
                if (iWndIdx == -1) {
                    continue;
                }
                // check if order of reading is correct ?
                if (iWndIdx != iWndCnt) {
                    this.ReplaceWndDef(r, c, i, j, iWndIdx, iWndCnt, aiWndDef);
                }
                // such window was already defined ?
                if (aiWndMap[iWndIdx]) {
                    this.ReplaceWndDef(r, c, i, j, iWndIdx, ++iWndCnt, aiWndDef);
                }
                // read window
                for (k = i; k < r; k++) {
                    if (aiWndDef[k * c + j] != iWndIdx)
                        break;
                    for (l = j; l < c; l++) {
                        if (aiWndDef[k * c + l] == iWndIdx)
                            aiWndDef[k * c + l] = -1;
                        else
                            break;
                    }
                }
                aWndd[iWndCnt++] = { iT: i, iL: j, iR: k - i, iC: l - j };
            }
        }
        return aWndd;
    }
    /////////////////////////////////////////////////////////////////////////////
    // Change window definition index
    ReplaceWndDef(r, c, iT, iL, iWndIdx, iLastIdx, aiDef) {
        let k, l, iTmp = iLastIdx + 1;
        for (k = iT; k < r; k++) {
            for (l = iL; l < c; l++) {
                if (aiDef[k * c + l] == iWndIdx)
                    aiDef[k * c + l] = iTmp;
                else
                    break;
            }
        }
    }
}
//# sourceMappingURL=vwnd.js.map