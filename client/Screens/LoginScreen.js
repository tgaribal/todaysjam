import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Form, Image, TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';
import { Components } from 'exponent';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      errBoxInit: false
    };
  } // end constructor

  loginPressHandler() {
    // AJAX request to http://server_ip/api/users/login
    //'http://localhost:3000/api/users/login'
    fetch('https://todaysjam.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.Username,
        password: this.state.Password
      })
    })
    .then((res) => {
      if (res.status === 200) {
        //redirect into index, --> do something within session/token
        global._globalUserId = JSON.parse(res._bodyInit)._id;
        global._globalUsername = this.state.Username
        this.props.navigator.replace(Router.getRoute('rootNavigation'));
      } else if (res.status === 404) {
        // username doesn't exist
        console.log('incorect information');
        this.setState({errBoxInit: true});
      } else if (res.status === 409) {
        // incorrect password
        console.log('incorect information');
        this.setState({errBoxInit: true});
      }
    })
    .catch((err) => {
      console.log('error message: ', err);
    });
  } // end loginPressHandler

  render() {
    var hiddenText = this.state.errBoxInit ? "Incorrect Password or Username" : "";
    
    return (
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} 
        style={styles.viewContainer} >

        {/* View Image */}
        <View>
          <Image 
            // source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand} 
            />
        </View>

        <Text style={styles.title}>Login and Jam Out!</Text>
        {/* TextInput */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.setState({Username: text}); 
          }}
          value={this.state.Username}
          placeholder='Username'
        />

        {/* TextInput */}
        <TextInput 
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.setState({Password: text})}
          value={this.state.Password}
          placeholder='Password'
        />

        {/* Touchable */}
        <TouchableOpacity
          onPress={this.loginPressHandler.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Touchable */}
        <View>
          <TouchableOpacity
          //the navigator of the react native works like a stack
          //by pushing in a route, the view will switch to that page
            onPress={() => {
              this.props.navigator.push(Router.getRoute('SignUp'));
            }}
          >
            <Text style={styles.buttonText2}> Don't have an Account?</Text>
          </TouchableOpacity>
        </View>

        {/* Hidden view */}
        <View style={styles.errorMessageBox}>
          <Text style={styles.errorMessageBoxText}>{hiddenText}</Text>
        </View>

      </Components.LinearGradient>
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9e34a7'
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    fontSize: 16,
    height: 48,
    width: 200,
    textAlign: 'center',
    marginHorizontal: 10,
    alignItems: 'center',
    color: 'white',
    borderColor: 'white'
  },
  button: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 48,
    width: 160,
    marginTop: 25,
    paddingTop: 5,
    backgroundColor: '#00b33c'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  buttonText2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: 20
  },
  errorMessageBox: {
    alignItems: 'center',
    marginTop: 25
  },
  errorMessageBoxText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontStyle: 'italic'
  },
  brand: {
    width: 175,
    height: 85, 
    marginBottom: 50
  }
}); // end styles