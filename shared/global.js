
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginVertical:0,
    },
    content:{
        margin:5,
            fontSize:13,
        color:'gray',
        flex:1,
    },
    headerTitle:{
        fontSize:18,
        color:'#eee',
        fontWeight:'bold'
    },
    text:{
        marginTop:5,
        marginBottom:5
    },
    inputLogin:{
        borderColor:'#c4c4c4',
        borderWidth:1,
        padding:5,
        marginBottom:10,
        borderRadius:5,
    },
    vwMarginOnly:{
        marginTop:5,
        marginBottom:10
    },
    modalContent:{
        height:'60%',
        backgroundColor:'#fff',
        bottom:0,
        position:'absolute',
        width:'100%',  
        borderTopWidth:1,
        elevation:3,
        borderColor:'gray',
        shadowOffset:{width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,      
    },
    modalClose:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10,
        fontWeight:'bold',
    },
    vwTileText:{
        flexDirection:'row',    

    },
    lnkText:{
        color:'blue'
    },
    vwMarginTwice:{
        marginTop:20,
        marginBottom:10
    },
    vwBottom:{
        position:'absolute',
        bottom:0,
        width:'100%',
        marginBottom:100,

        justifyContent:"flex-end",
        alignContent:"flex-end"
        
    },
    titleIndx:{
        fontSize:14,
        color:'gray',

    },
    titleText:{
        color:'#4f4f4f',
        textAlign:'left',
        width:'80%',
    },
    vwRow:{
        flexDirection:'row',
        alignItems:"flex-start",
        justifyContent:"space-between",
        textAlign:"right",
        marginVertical:3,
        marginHorizontal:5       
    },
    gridTitle:{
        color:'#9e9e9e'
    },
    vwSubmenuHeader:{
        justifyContent:'center', 
        alignItems:'center',
        marginHorizontal:5,
        borderWidth:0,
        borderRadius:15,
        backgroundColor:'#f7e1d5',
        borderColor:'#fac1a2',
        elevation:5,
        shadowOffset:{width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
    },
    vwSubmenuHeaderBottom:{
        borderBottomWidth:1,
        borderColor:'#50806d'
    }                      


})