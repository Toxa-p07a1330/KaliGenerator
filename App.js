import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Button} from "react-native-web";

export default function App() {
  const [size, setSize] = useState("7");
  const [operation, setOperation] = useState("+");
  const [data, setData]=useState([]);
  let sizes = [1,2,3,4,5,6,7,8,9];
  let test = ['a', 'b', 'c'];
  let drawTable=()=>{
      if (data)
          return data.map((value, index)=>{
              return <View style={styles.tableRow}>
                  {
                      value.map(((range, index1, array) => {
                          let style = styles.tableCell;
                          if (index===0 || index1===0)
                              style = styles.tableBorderCell;
                          return <View style={style}>
                              <Text>{range}</Text>
                          </View>

                      }))
                  }
              </View>
              })
  }

  const onButtonPress=()=>{
      let tData=[];
      for (let i =0; i<size;i++)
      {
          tData.push([])
          for (let j=0; j<size; j++)
          {
            if (operation==='+')
                tData[i].push((i+j)%size)
              else {
                  if (i*j)
                    tData[i].push(i*j%size);
                  else
                      tData[i].push(i+j)
            }
          }
      }
      setData(tData)
  }
  return (
      <View style = {styles.root}>
          <View style={styles.header}>
            <Text style={{fontSize: 25}}>Kali table genetator</Text>
          </View>
          <View style = {styles.picker}>
              <Picker
              selectedValue={size}
              style={styles.pickerSelector}
              onValueChange={(itemValue, itemIndex) => {
                setSize(itemValue);
              }}
              mode="dropdown"
          >
            {sizes.map((value)=>{
              return <Picker.Item label={value+""} value={value} key={value}/>
            })}
          </Picker>
          <Picker selectedValue={operation}
                    style = {styles.pickerSelector}
                    onValueChange = {(value)=>{
                      setOperation(value)
                    }}
                    mode={"dropdown"}>
            <Picker.Item label={"+"} value={"+"}/>
            <Picker.Item label={"*"} value={"*"}/>
          </Picker>
              <TouchableOpacity
              onPress={onButtonPress}
              style={styles.genButton}>
                  <Text>Gen</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.tableContainer}>
            {drawTable()}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height:"5%",
    backgroundColor: "#aaaaaa",
    width:"95%",
    alignItems:"center",
    justifyContent: 'center',

  },
  picker:{
    flex: 1,
    height:"5%",
    width:"95%",
    backgroundColor: "#bbbbbb",
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:"row",

  },
  pickerSelector:{
    width:"20%",
    height:"90%"
  },
  tableContainer:{
    flex: 8,
    height:"5%",
    width:"95%",
    backgroundColor: "#cccccc",
  },
  tableRow:{
      flex:1,
      flexDirection:"row",
      width:"100%",
      alignItems:"center",
      justifyContent: 'space-around',

  },
    tableCell:{
        alignItems:"center",
        flex:1,
        justifyContent: 'space-around',
        height:"100%",
        borderWidth:1

    },
    genButton:{
      height:"100%",
      width:"25%",
      backgroundColor:"lightblue",
      justifyContent:"center",
      alignItems:"center"
    }
    ,
    tableBorderCell:{
        alignItems:"center",
        flex:1,
        justifyContent: 'space-around',
        backgroundColor:"lightblue",
        height:"100%",
        borderWidth:1

    },
  root:{
    top:"5%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:12,
    flex:1,


  }
});
