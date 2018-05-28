import * as api from '../utils/api';

export const FETCH_DECKS = 'flascardstudyapp/decks/fetchDecks';
export const FETCH_CURRENT_DECK = 'flascardstudyapp/decks/fetchDeck';
export const SAVE_NEW_DECK = 'flascardstudyapp/decks/saveNewDeck';

const initialDeckState = {
  decks: {},
  currentDeck: {}
};

export default function decks(state = initialDeckState, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        decks: action.payload
      };
    case FETCH_CURRENT_DECK:
      return {
        ...state,
        currentDeck: action.payload
      };
    case SAVE_NEW_DECK:
      return {
        ...state,
        decks: action.payload
      };
    default:
      return state;
  }
}

export function fetchDecks() {
  console.log("Duck deck fetchdecks");
  return async dispatch => {
    console.log("in dispatch")
    await api.getDecks().then(decks => 
    dispatch(decksFetched(decks)));
  };
}

function decksFetched(decks) {
  console.log("decksFetched" + decks)
  return { type: FETCH_DECKS, payload: decks };
}

export function fetchCurrentDeck(title) {
  console.log(title);
  return dispatch => {
    api.getDeck(title).then(currentDeck => 
    dispatch(currentDeckFetched(currentDeck)));
  };
}

function currentDeckFetched(deck) {
  return { type: FETCH_CURRENT_DECK, payload: deck };
}

export function saveNewDeck(title) {
    console.log("ducks/decks savenewtitle")
  return dispatch => {
    api.saveDeckTitle(title).then(() =>
    api.getDecks().then(dispatch(saveNewDecks(newDecks))))
  };
}

function saveNewDecks(newDecks) {
  return { type: SAVE_NEW_DECK, payload: newDecks };
}
