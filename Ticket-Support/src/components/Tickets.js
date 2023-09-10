import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function TicketsCom(props) {
    var navigation = props.Navigation;
    const openTicketDetails = ()=>
        navigation.navigate('TicketDetails',{
            id : props.id
        })
    
  return (
    <TouchableOpacity
        style={[
            styles.container,
            { backgroundColor: props.white ? 'white' : '#D8E4BCEB' }, 
        ]}
     onPress={openTicketDetails}>
        <View style={styles.dateCon}>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.contentCon}>
            <Text style={[styles.text,{fontWeight: 'bold'}]}>{props.problem}</Text>
            <View>
                <Text style={styles.text}>Department: {props.depart}</Text>
                <Text style={styles.text}>priority: {props.priority}</Text>
                <Text style={[styles.text,{color:'red'}]}>{props.phase}</Text>

            </View>

            
        </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '95%',
        margin:'2%',
        padding: '2%',
        flexDirection: 'row',
        borderRadius: 15
    },
    dateCon:{
        flex: 0.3,
        backgroundColor: '#FADA5E',
        color: 'black',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    date:{
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    contentCon:{
        flex:0.7,
        padding: '2%'
    },
    text:{
        color: 'black',
        marginBottom:'1%'
    }

});