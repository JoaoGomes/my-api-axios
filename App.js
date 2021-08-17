import React from "react";
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

	function onPressAPIGet () {
		axios({
			method: 'get',
			url: 'https://reqresERRO.in/api/users'
	})
	.then(response => {
		setData(response.data.data);
	})
	.catch(err => {
		setError(true);
		console.log(err);
	});
}

const renderItem = ({ item }) => <Item fullName={item.first_name + ' ' + item.last_name} />;

return (
	<View style={styles.container}>
		<Text style={styles.header}>Teste de API</Text>
		<Button onPress={onPressAPIGet} title="API Get" color="#841584" />
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
