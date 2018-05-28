import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';
import NewDeck from '../components/NewDeck.js';

class NewDeckContainer extends Component {
  static propTypes = {
    saveNewDeck: PropTypes.func.isRequired
  };
  render() {
    const { saveNewDeck } = this.props;
    return (
      <View>
        <NewDeck saveNewDeck={saveNewDeck} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckContainer);
