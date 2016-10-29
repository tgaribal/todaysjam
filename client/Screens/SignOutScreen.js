import exponent from 'exponent';
import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Router from '../Navigation/Router';

export default class SignOutScreen extends Component {
  constructor() {
    super();
  } // end constructor

  // verify if user really wants to log out
  signOutPressHandler() {
    //use getNavigator to get to the root level
    this.props.navigation.getNavigator('root').push(Router.getRoute('Login'));
  } // end signoutPressHandler

  // returns users to homepage if logout icon was accidentally clicked, they can also use the navbar this is just a convenience
  goBackPressHandler() {
    console.log('goback wired');
  } // end goBackPressHandler

  render() {
    return (
      <View style={styles.viewContainer}>

        {/* Image Header */}
        <Image 
            source={{uri: 'https://cdn.shopify.com/s/files/1/0015/2602/files/jamzheaderrrr.jpg?v=1472243694'}}
            style={{width: 100, height: 40, marginBottom: 212}} 
        />

        {/* Touchable */}
        <TouchableOpacity 
          onPress={this.goBackPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        {/* Touchable */}
        <TouchableOpacity
          onPress={this.signOutPressHandler.bind(this)}
          style = {styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

      </View> // end viewContainer
    )
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 10,
    height: 70,
    width: 200,
    marginTop: 25,
    marginBottom: 20,
    paddingTop: 5,
    backgroundColor: '#00b33c',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  }
}); // end styles