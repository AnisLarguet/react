import React, { Component } from 'react';
 
import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

import { StackNavigator } from 'react-navigation';


class Login extends Component {


  static navigationOptions =
   {
      title: 'LoginActivity',
   };
  constructor (props){
    super(props)
    this.state={
      usernameU:'',
      passwordU:''
    }
  }
  loginFunction =()=>{  
    const {usernameU}= this.state;
    const {passwordU}= this.state;
    fetch ('http://localhost/phpmyadmin/sql.php?db=helpdeskclient&table=cmk_ticket_login&pos=0', {
      method :'POST',
      header : {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body : JSON.stringify({
        username: usernameU,
        password: passwordU
      })
    }).then((response)=>response.JSON()).then((responseJSON)=>{
      if (responseJSON==='Data Matched')
      {
        this.props.navigation.navigate('Second', { user: usernameU });
      }
      else {
        Alert.alert(responseJSON);
      }
    }).catch((error)=>{
      console.log(error);
    });}
    render() {
      return(
        <View style={styles.MainContainer}>
          <Text style= {styles.TextComponentStyle}>User Login Form</Text>
  
  <TextInput
    
    // Adding hint in Text Input using Place holder.
    placeholder="Enter your username"

    onChangeText={usernameU => this.setState({usernameU})}

    // Making the Under line Transparent.
    underlineColorAndroid='transparent'

    style={styles.TextInputStyleClass}
  />

  <TextInput
    
    // Adding hint in Text Input using Place holder.
    placeholder="Enter User Password"

    onChangeText={passwordU => this.setState({passwordU})}

    // Making the Under line Transparent.
    underlineColorAndroid='transparent'

    style={styles.TextInputStyleClass}

    secureTextEntry={true}
  />

  <Button title="Click Here To Login" onPress={this.loginFunction} color="#2196F3" />



</View>
      
);
}

  }
  class Main extends Component
  {
    static navigationOptions =
    {
       title: 'ProfileActivity',
     
    };
     
  
    render()
    {
  
      const {goBack} = this.props.navigation;
  
       return(
          <View style = { styles.MainContainer }>
  
             <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.user } </Text>
  
             <Button title="Click here to Logout" onPress={ () => goBack(null) } />
  
          </View>
       );
    }
  
  }
  
  export default MainProject = StackNavigator(
    {
       First: { screen: Login },
       
       Second: { screen: Main }
     
    });