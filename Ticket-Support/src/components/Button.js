import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button(props) {

  return (
    <TouchableOpacity style={styles.button} onPress={props.click}><Text style={styles.buttonText}>{props.title}</Text></TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"#FADA5E",
        width: "70%",
        flex: 0.6,
        justifyContent: 'center'

    },
    buttonText:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color:'#181A18'
    }


});;