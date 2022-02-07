
const webAppUrl = "http://172.17.26.47:5005";
const wsUrl = "ws://172.17.26.47:7008";

export const MCmdMgr = () =>{
    RunPlayer2();    
}

function RunPlayer2(){
//    alert("you have clicked the function her2e");
    RunPlayer('Cam_26',null,'',true);
}

/////////////////////////////////////////////////////////////////////////////
    // Start streaming
function RunPlayer(sCam, iWnd, encPrm, sTm) {
        let wsMode = "ws://", sType = 'L', sDiv = 'wsp-' + iWnd;
        // if (this.aWnds[iWnd].oPlayr != null) {
        //     return;
        // }
        // var wndMngr = this;
        console.log(sTm)
        if (sTm) {
            sType = 'V';
        }
      //  this.aWnds[iWnd].oPlayr = new WebSocketPlayer(sDiv, iWnd, this, function (sId, sErr) { wndMngr.OnClose(sId, sErr); });
        // if (encPrm == "") {
        //     let iWnds = this.iWnds;
        //     if (iWnds >= 16) {
        //         encPrm = "640:-1:-1.0";
        //     }
        //     else if (iWnds >= 9) {
        //         encPrm = "1280:-1:-1.0";
        //     }
        //     else if (iWnds >= 1) {
        //         encPrm = "1920:-1:-1.0";
        //     }
        // }
        encPrm = "1920:-1:-1.0";
        // if (location.protocol === 'https:') {
        //     wsMode = "wss://";
        // }
        console.log('RunPlayer');
        
        //let 
        console.log(`${webAppUrl}/vm/vmd/gbvd?dv=${sCam}&vt=${sType}`);
        getWebKey(`${webAppUrl}/vm/vmd/gbvd?dv=${sCam}&vt=${sType}`);
        


        // $.ajax({ type: "POST", url: `{webAppUrl}/vm/vmd/gbvd?dv=${sCam}&vt=${sType}`, dataType: "json" })
        //     .done(function (data) {
        //     let obj = data;
        //     if (obj['errors'] && Array.isArray(obj['errors'])) {
        //        // wndMngr.ErrorCleanup(obj['errors'], iWnd, sDiv);
        //        console.log(obj['errors']);
        //         return;
        //     }
        //     if (obj['sw']) {
        //         let adrip = obj['sw'], flgs = obj['sf'];
        //         console.log(`Server to connect: ${adrip}`, `Flags: ${flgs.toString(16)}`);
        //         wndMngr.aWnds[iWnd].oPlayr.openStreamFromHTMLReq(wsMode + adrip, sType, sCam, flgs, sTm, encPrm);
        //         return;
        //     }
        //     wndMngr.ErrorCleanup(null, iWnd, sDiv);
        // })
        //     .fail(function () {
        //     wndMngr.ErrorCleanup(null, iWnd, sDiv);
        // });
    }

    const getWebKey = async(uri) =>{
        try {
            const response = await fetch(uri,{
               // mode: 'no-cors',
            });
            const json = await response.json();
            console.log(json);
           // this.setState({ data: json.movies });
          } catch (error) {
            console.log(error);
          } finally {
            ////this.setState({ isLoading: false });
          }

    }