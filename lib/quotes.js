var quotes = [
  //"You gotta be a wolf out here to get this motherfucking money",
  "A horse is muscle and nerves and not much else",
  "The Ballad of Raymond Meade",
  "Wakeup, Duckman! You've been dreaming this whole time! These seedy cases aren't going to close themselves",
  "I kiss ashes",
  "Cooked",
  "A wondrous world",
  "I dreamed I was the family therapist for the Simpsons",
  "A boglike place",
  "A place not dissimilar to a cockpit",
  "A loud place",
  "A dense place"
];

exports.randomQuote = function() {
  var index = Math.floor( Math.random() * quotes.length);
  return quotes[index];
};
