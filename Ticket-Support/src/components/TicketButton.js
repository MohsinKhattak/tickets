import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'




export default function TicketButton(props) {

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPressFunc}>
        <View style={[styles.iconCon,{backgroundColor: props.bgColor}]} >
            <Image style={{width: '50%', height: '50%'}} source={props.iconPath} resizeMode='contain'/>
        </View>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height: '60%',
        backgroundColor: 'white',
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
    },
    iconCon:{
        flex:0.7,
        borderTopLeftRadius: 15, // Adjust this value as needed
        borderTopRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        flex: 0.3,
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        padding: '4%'
    }
})