import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as APIFUNCS from '../utils/api.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';

class DeckList extends Component {
  static propTypes = {
    decks: PropTypes.object
  };
  state = {
    hasDecks: false
  };

  constructor(props) {
    super(props);
    console.log(props.decks);
  }
  onSelectDeck = currentDeckTitle => {
    //this.props.navigation.navigate('DeckDetailContainer', { deckTitle: currentDeckTitle });
    const decks = Promise.resolve(APIFUNCS.getDecks());
    console.log(decks);
  };
  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text>There are decks</Text>
        <TouchableOpacity onPress={() => this.onSelectDeck()}>
          <Text>Hello! {Object.keys(decks)}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckList;
