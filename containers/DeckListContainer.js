import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';
import DeckList from '../components/DeckList.js';
import { AppLoading } from 'expo';

class DeckListContainer extends Component {
  static propTypes = {
    fetchDecks: PropTypes.func.isRequired,
    decks: PropTypes.object,
    navigation: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.log("you're in component did mount of deck list container");
    this.props.fetchDecks()
    console.log('fetchedDecks: ');
    console.log(this.props.decks);
    if (typeof this.props.decks === 'undefined') {
      let emptyDeck = Object.assign({}, this.state.decks); //creating copy of object
      emptyDeck = 'No decks added yet'; //updating value
      this.setState({ emptyDeck });
    }
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <View>
        <DeckList decks={decks} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks.decks
});

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      ...decksActionCreators
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListContainer);
