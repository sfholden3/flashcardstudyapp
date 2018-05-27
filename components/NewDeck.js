import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as APIFUNCS from '../utils/api.js';

class NewDeck extends Component {
  static propTypes = {
    saveNewDeck: PropTypes.func.isRequired
  };
  state = {
    currentTitle: ''
  };
  submit = () => {
    Promise.resolve(APIFUNCS.saveDeckTitle(this.state.currentTitle));
    const decks = Promise.resolve(APIFUNCS.getDecks());
    console.log(decks);
  };
  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentTitle => this.setState({ currentTitle })}
          value={this.state.currentTitle}
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewDeck;
