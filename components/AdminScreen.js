import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Button } from '@rneui/themed';
import { doc, addDoc, deleteDoc, getDocs, collection, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from './config'
import { Feather, AntDesign } from 'react-native-vector-icons'
import { Dropdown } from "react-native-element-dropdown";
import { Divider } from '@rneui/base';
import { color } from '@rneui/base/dist';



const AdminScreen = ({ navigation }) => {

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [day, setDay] = useState('Sunday');
  const [taskTxt, setTaskTxt] = useState('')
  const [tasks, setTasks] = useState([])
  const days = [
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
  ]

  useEffect(() => navigation.setOptions(
    {
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={{
            width: screenWidth * 0.08,
            height: screenWidth * 0.08,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="logout" size={25} color={'blue'} />
        </TouchableOpacity>
      ),
    },
    []
  )
  )
  useEffect(() => { readAll() }, [])

  useEffect(() => {
    const q = query(collection(db, 'tasks'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let temp = []
      querySnapshot.forEach((doc) => {
        if (doc.data().day === day) {
          temp.push({ id: doc.id, day: doc.data().day, task: doc.data().task })
        }
      })
      setTasks(temp)
    })
    return () => unsub()
  }, [day])

  const clear = () => {
    setTaskTxt()
  }

  const add = async () => {
    const docRef = await addDoc(collection(db, 'tasks'), { day: day, task: taskTxt })
    clear()
  }

  const readAll = async () => {
    const docs = query(collection(db, 'tasks'), where("day", "==", day))
    const querySnapshot = await getDocs(docs);
    const allData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        day: doc.data().day,
        task: doc.data().task,
      };
    });
    setTasks(allData)

  }

  const deleteTask = async (id) => {
    const restDoc = doc(db, 'tasks', id)
    await deleteDoc(restDoc)
  }


  return (
    <View style={styles.container}>

      <Card width={"90%"}>
        <Card.Title>ADD TASK</Card.Title>
        <Dropdown data={days}
          labelField="label"
          valueField="value"
          style={{ width: '100%' }}
          // maxHeight={200}
          search={true}
          value={day}
          selectedTextStyle={{ fontSize: 20 }}
          searchPlaceholder="Search..."
          onChange={(value) => setDay(value.label)}
        />
        <Card.Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            placeholder="Type your task"
            style={styles.input}
            value={taskTxt}
            autoCorrect={false}
            onChangeText={(text) => setTaskTxt(text)}
          />
          <Button
            color={""}
            style={{ width: 100, }}
            onPress={add}
          >
            Save
          </Button>
        </View>
      </Card>
      <View style={styles.days}>
        <TouchableOpacity onPress={() => setDay('Sunday')}>
          <Card>
            <Card.Title style={{ color: day == 'Sunday' ? 'red' : 'black' }}>Sun</Card.Title>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDay('Monday')}>
          <Card>
            <Card.Title style={{ color: day == 'Monday' ? 'red' : 'black' }}>Mon</Card.Title>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDay('Tuesday')}>
          <Card>
            <Card.Title style={{ color: day == 'Tuesday' ? 'red' : 'black' }}>Tue</Card.Title>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDay('Wednesday')}>
          <Card>
            <Card.Title style={{ color: day == 'Wednesday' ? 'red' : 'black' }}>Wed</Card.Title>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDay('Thursday')}>
          <Card>
            <Card.Title style={{ color: day == 'Thursday' ? 'red' : 'black' }}>Thu</Card.Title>
          </Card>
        </TouchableOpacity>

      </View>

      <Card width={'90%'} height={'60%'}>
        <Card.Title>{day}'s Tasks</Card.Title>

        <Card.Divider />
        <ScrollView width={'100%'} height={'90%'}>
          {tasks.map((t, index) => (
            <View key={index} style={{ justifyContent: 'space-between', }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text>{t.day}</Text>
                <Text>{t.task}</Text>
                <AntDesign name='delete' size={24} color={'red'} onPress={() => deleteTask(t.id)} />
              </View>
              <Card.Divider />
            </View>
          ))}
        </ScrollView>
      </Card>

    </View>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    flex: 1
  },
  input: {
    marginBottom: 10,
    padding: 1,
    width: 250
  },

  days: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '95%'
  },
})