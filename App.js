import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

const Item = ({ fullName }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{fullName}</Text>
	</View>
);

export default function App() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
  const [postStatus, setPostStatus] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');
  const [patchStatus, setPatchStatus] = useState('');

  async function onPressAPIAll() {
    try {
      const promise1 = axios('https://reqres.in/api/users/1');
      const promise2 = axios('https://reqres.in/api/users/2');
      const [response1, response2] = await
      axios.all([promise1, promise2]);

      const arrayResponse = [];
      arrayResponse.push(response1.data.data);
      arrayResponse.push(response2.data.data);
      setData(arrayResponse);
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }

  async function onPressAPIPatch() {
    
    const user = {
      first_name: "Peter",
      job_title: "Apostolo",
    };

    try {
      const response = await
      axios.patch('https://reqres.in/api/users', user);
      setPatchStatus(response.status);
      console.log(response);
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }

  async function onPressAPIDelete() {
    try {
      const response  = await
      axios.delete("https://reqres.in/api/users/2");
      console.log(response);
      setDeleteStatus(response.status);
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }

  async function onPressAPIPost() {
    
    const user = {
      first_name: "John",
      last_name: "Lilly",
      job_title: "Software Engineer",
    };

    try {
      const response = await
      axios.post('https://reqres.in/api/users');
      setPostStatus(response.status);
      console.log(response);
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }
	
  async function onPressAPIGet () {
		try {
      const response = await
      axios.get('https://reqres.in/api/users');

      if(response.data.data.length > 1) {
        setData(response.data.data);
	    }
      else {
        const arrayResponse = [];
        arrayResponse.push(response.data.data);
        setData(arrayResponse);
      }
    }
    
    catch(err) {
		  setError(true);
		  console.log(err);
	  }
  }

const renderItem = ({ item }) => <Item fullName={item.first_name + ' ' + item.last_name} />;

return (
	<View style={styles.container}>
		<Text style={styles.header}>Teste de API</Text>
		<Button onPress={onPressAPIGet} title="API Get" color="#841584" />
    <Button onPress={onPressAPIPost} title="API Post" color="#459809" />
    <Button onPress={onPressAPIDelete} title="API Delete" color="#FF67AA" />
    <Button onPress={onPressAPIPatch} title="API Patch" color="#006644" />
    <Button onPress={onPressAPIAll} title="API All" color="#BBFA01" />
    <Text>Status DELETE: {deleteStatus}</Text>
    <Text>Status POST: {postStatus}</Text>
    <Text>Status Patch: {patchStatus}</Text>
    {error && <Text style={styles.error}>Ocorreu um erro ao chamar a API</Text>}
	  <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
	</View>
);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: "#aae2f9",
		textAlign: "center",
		padding: 20,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 22,
	},
	error: {
		color: "#FF0000",
		fontSize: 14,
		textAlign: "center",
	}
});
