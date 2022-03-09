export const trimVal = (val) =>{
    console.log('val: ' + val)
    if(val == null)
        return ''    
    return val.trim();
    
}

export const LoadGrid = async (url) =>{
    
    //"http://172.17.26.47:8011/m3snpr/device/getAllUsers"; //svcUrl.webApiUrl+"/getdevicelist/nvr1";
    //        http://172.17.26.47:8011/m3snpr/device/getdevicelist/nvr1
    try {
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson);
        let jsonLst = resJson.map((item)=>
            {return {...item, expand:false}}
        )
        return jsonLst;
    } catch (error) {
        console.error(error);
        return 'error';
    }

}

export const LoadGridComn = async (url) =>{
    
    //"http://172.17.26.47:8011/m3snpr/device/getAllUsers"; //svcUrl.webApiUrl+"/getdevicelist/nvr1";
    //        http://172.17.26.47:8011/m3snpr/device/getdevicelist/nvr1
    try {
        const response = await fetch(url);
        const resJson = await response.json();
        
        return resJson;
    } catch (error) {
        console.error(error);
        return 'error';
    }

}
