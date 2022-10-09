import { StatusBar } from 'expo-status-bar';
import React ,{useState}from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View,Platform,TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

import Task from './Components/Task';

export default function App() {

  const [task, setTask]= useState();

  const [taskItems, setTaskItems] = useState([]);

  const handleAddText=() =>{

    Keyboard.dismiss();
    setTaskItems([...taskItems,task]); // yeh line ky karega jo bhi pahle taskItem tha usko new array mai dalega phir task wala append karega
    setTask(null);
    
  }

  const completeTask = (index)=>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>

          {

            taskItems.map((item,index) =>{
             return (
             
             <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
              <Task  text={item}/>
             </TouchableOpacity>

             )
            })
          }


        </View>

      </View>


      <KeyboardAvoidingView
      behavior={Platform.OS==="ios"? "padding": "height"}
      style={styles.writeTextWrapper}
      >

     <TextInput style={styles.input} placeholder={'Write a Task'} value={task} onChangeText ={text =>setTask(text)}/>


     <TouchableOpacity onPress ={() => handleAddText()}> 

      <View style={styles.addWrapper}>
        <Text style = {styles.addText}>+</Text>

      </View>
     </TouchableOpacity>
      </KeyboardAvoidingView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  sectionTitle:{
    fontSize:40,
    fontWeight:"bold",
    fontStyle:"italic",
    marginBottom:25
  },
  items:{
    marginTop:20,
  },
  writeTextWrapper:{
    position:"absolute",
    bottom:60,
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    width:250,
    backgroundColor:"#fff",
    borderRadius:60,
    borderColor:"#C0C0C0",
    borderWidth:1,
    fontSize:20
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:"#fff",
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#C0C0C0",
    borderWidth:1,
  },
  addText:{
    fontSize:24
  }
});
