import { AsyncStorage } from 'react-native';
//import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar';

export const DECK_STORAGE_KEY = 'flashcardstudyapp:deck';

//getDecks: return all of the decks along with their titles, questions, and answers.

export function getDecks() {
  console.log("you've hit getdecks");
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    console.log("youre in the then!")
    if(results === null){
      console.log("results are null");
      return {title: 'no decks set'}
    }
    else {
      console.log("results are not null");
      const deckObj = JSON.parse(decks);
      console.log("parsed obj: "+deckObj);
      return deckObj;
    }
  });
}

//getDeck: take in a single id argument and return the deck associated with that id.

export function getDeck(deckTitle) {
  console.log("you've hit getdeck")
  console.log("deck to get: "+deckTitle)
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? { title: 'no decks' }
      : JSON.parse(decks)[deckTitle] === null
        ? { title: 'no deck with that title' }
        : JSON.parse(decks)[deckTitle];
  });
}

//saveDeckTitle: take in a single title argument and add it to the decks.

export function saveDeckTitle(newDeckTitle) {
  console.log("save deck title! ")
  console.log("new deck title: "+newDeckTitle);
  const newDeck = JSON.stringify({
    [newDeckTitle]: {
      title: newDeckTitle,
      questions: []
    }
  });
  console.log("new deck: "+newDeck)
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    console.log("we're in the then!")
    if (results === null) {
      console.log("the results are null. setting item to the new deck")
      AsyncStorage.setItem(DECK_STORAGE_KEY, newDeck);
    } else {
      console.log("results were not null. adding new deck to item")
      const decks = JSON.parse(decks);
      console.log("current decks without new item: "+decks)
      AsyncStorage.setItem(DECK_STORAGE_KEY, (decks += newDeck));
    }
  });
}

//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

export function addCardToDeck(deckTitle, question) {
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    if (results !== null) {
      const decksObj = JSON.parse(results);
      if (decksObj[deckTitle] != null) {
        console.log('deck: ' + decksObj[deckTitle]);
        console.log('questions: ' + decksObj[deckTitle].questions);
        decksObj[deckTitle].questions.push(question);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksObj));
      }
    }
  });
}

/*export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}*/
