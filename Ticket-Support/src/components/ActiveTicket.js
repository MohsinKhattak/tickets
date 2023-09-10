import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ActiveTicket(props) {
  return (
    <View style={styles.container}>
        <View style={styles.dateCon}>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <View style={styles.contentCon}>
            <Text style={[styles.text,{fontWeight: 'bold'}]}>{props.problem}</Text>
            <Text style={styles.text}>Department: {props.depart}</Text>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '95%',
        backgroundColor: 'white',
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