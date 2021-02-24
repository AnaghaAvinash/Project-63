import React, { Component } from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,Image,} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: '',
      word: '',
      definition: '',
    };
  }

  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var responseObject = response;

        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].word;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#906CCF'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: {
              color: 'white',
              fontSize: 20,
              fontFamily: 'times new roman',
            },
          }}
        />
         <Image
          style={{
          width:150,
    height:170,
    marginLeft:100,
    marginTop:30
          }}
          source={require('./assets/dic.png')}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchbutton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttontext}> Search </Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}> Word :{''} </Text>
          <Text style={{ fontSize: 18 }}> {this.state.word} </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.detailsTitle}> Definition :{''} </Text>
          <Text style={{ fontSize: 18 }}> {this.state.definition} </Text>
        </View>

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    width: '75%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    borderRadius: 5,
    backgroundColor: '#C3B1E1',
    marginTop: 20,
    marginLeft: 45,
    shadowColor: 'purple',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.54,
    shadowRadius: 30.32,
    elevation: 16,
  },

  searchbutton: {
    width: '30%',
    height: 20,
    alignSelf: 'center',
    padding: 20,
    margin: 15,
    marginTop:10,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttontext: {
    height: 70,
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    borderWidth: 3,
    width: 135,
    fontFamily: 'quicksand',
  },

  detailsContainer: {
    fontWeight: 'bold',
  },

  detailsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'purple',
  },
});
