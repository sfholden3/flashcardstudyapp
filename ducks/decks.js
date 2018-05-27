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
  return dispatch => {
    const decks = api.getDecks();
    dispatch(decksFetched(decks));
  };
}

function decksFetched(decks) {
  return { type: FETCH_DECKS, payload: decks };
}

export function fetchCurrentDeck(title) {
  console.log(title);
  return dispatch => {
    const currentDeck = api.getDeck(title);
    dispatch(currentDeckFetched(currentDeck));
  };
}

function currentDeckFetched(deck) {
  return { type: FETCH_CURRENT_DECK, payload: deck };
}

export function saveNewDeck(title) {
    console.log("ducks/decks savenewtitle")
  return dispatch => {
      console.log("ducks/deck savenewdeck dispatch" );
    const newDecks = api.saveDeckTitle(title);
    console.log("new decks in ducks: "+newDecks);
    dispatch(saveNewDecks(newDecks));
  };
}

function saveNewDecks(newDecks) {
  return { type: SAVE_NEW_DECK, payload: newDecks };
}
