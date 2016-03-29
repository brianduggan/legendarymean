var app = angular.module('LegendaryApp', []);

app.controller('FormController', ['$scope', function($scope){
  $scope.showRandom = 0;
  $scope.choices = {'decks': [], 'players': 0};
  $scope.players = [2,3,4,5]
  $scope.sets = ['Core Set', 'Dark City'];
  $scope.randomized = {
    'heroes': [],
    'scheme': '',
    'mastermind': '',
    'villains': [],
    'henchmen': [],
    'bystanders': 0,
    'twists': 0,
    'notes': '',
    'wounds': 0,
    'heroTotal': 5,
    'villainTotal': 0,
    'henchTotal': 0
  }

  var reset = angular.copy($scope.randomized)

  var randomDraw = function(deck){
    var randomNum = Math.floor(Math.random() * deck.length );
    return deck.splice(randomNum, 1)[0];
  }

  var defaultSettings = function(players){
    var randomDeck = $scope.randomized;
    if (players == 2) {
      randomDeck.villainTotal = 2,
      randomDeck.henchTotal = 1,
      randomDeck.bystanders = 2
    } else if (players == 3) {
      randomDeck.villainTotal = 3,
      randomDeck.henchTotal = 1,
      randomDeck.bystanders = 8
    } else if (players == 4) {
      randomDeck.villainTotal = 3,
      randomDeck.henchTotal = 2,
      randomDeck.bystanders = 8
    } else if (players == 5) {
      randomDeck.villainTotal = 4,
      randomDeck.henchTotal = 2,
      randomDeck.bystanders = 12
    }
  }

  var schemeModifier = function(){
    var randomDeck = $scope.randomized;
    if (randomDeck.scheme == "Legacy Virus") {
      randomDeck.wounds = 6 * randomDeck.players;
      randomDeck.twists = 8;
    } else if (randomDeck.scheme == "Midtown Bank Robbery") {
      randomDeck.twists = 8;
      randomDeck.bystanders = 12;
    } else if (randomDeck.scheme == "Negative Zone Prison Breakout") {
      randomDeck.twists = 8;
      randomDeck.henchTotal += 1;
    } else if (randomDeck.scheme == "Portals to the Dark Dimensions"){
      randomDeck.twists = 7;
    } else if (randomDeck.scheme == "Replace Earth's Leaders with Killbots"){
      randomDeck.twists = 5;
      randomDeck.bystanders = 12;
      randomDeck.notes = "Place three additional twists next to the Scheme."
    } else if (randomDeck.scheme == "Secret Invasion of the Skrull Shapeshifters"){
      randomDeck.twists = 8;
      randomDeck.heroTotal = 6;
      randomDeck.notes = "Shuffle 12 random Heroes from the Hero Deck into the Villain Deck.";
      // Skrull villain group required // hmm.... ???
    } else if (randomDeck.scheme == "Super Hero Civil War"){
      if (randomDeck.players < 3){
        randomDeck.twists = 8;
      } else {
        randomDeck.twists = 5;
      }
      if (randomDeck.players == 2){
        randomDeck.heroTotal = 4;
      }
    } else if (randomDeck.scheme == "Unleash the Power of the Cosmic Cube"){
      randomDeck.twists = 8;
    }
  }

  var henchModifier = function(){
    var theDeck = $scope.randomized;
    if (theDeck.mastermind == "Dr. Doom" && !(theDeck.henchmen.includes("Doombot Legion"))){
      theDeck.henchmen.pop();
      theDeck.henchmen.push("Doombot Legion")
    }
  }

  var henchPicker = function(deck){
    $scope.randomized.henchmen = [];
    var henchTotal = $scope.randomized.henchTotal
    for (var i = 0; i < henchTotal; i++) {
      var hench = randomDraw(deck);
      $scope.randomized.henchmen.push(hench);
    }
    henchModifier();
  }

  var villainModifier = function(){
    var theDeck = $scope.randomized;
    if (theDeck.mastermind == "Loki" && !(theDeck.villains.includes("Enemies of Asgard"))){
      theDeck.villains.pop();
      theDeck.villains.push("Enemies of Asgard");
    }
    if (theDeck.mastermind == "Magneto" && !(theDeck.villains.includes("Brotherhood"))){
      theDeck.villains.pop();
      theDeck.villains.push("Brotherhood");
    }
    if (theDeck.mastermind == "Loki" && !(theDeck.villains.includes("HYDRA"))){
      theDeck.villains.pop();
      theDeck.villains.push("HYDRA");
    }
  }

  var villPicker = function(deck){
    $scope.randomized.villains = [];
    var villTotal = $scope.randomized.villainTotal
    for (var i = 0; i < villTotal; i++) {
      var vill = randomDraw(deck);
      $scope.randomized.villains.push(vill)
    }
    villainModifier();
  }

  $scope.playerPicker = function (value){
    $scope.choices.players = value;
  }

  $scope.deckPicker = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1){
      list.splice(idx,1)
    } else {
      list.push(item);
    }
  };

  $scope.getSettings = function(){
    console.log(reset);
    $scope.showRandom = 1;
    var chosenDecks = $scope.choices.decks,
        players     = $scope.choices.players,
        randomDeck  = $scope.randomized,
        masterDeck  = {
                        'heroes': [],
                        'schemes': [],
                        'masterminds': [],
                        'villains': [],
                        'henchmen': [],
                      };
    // these will be separate functions
    if (chosenDecks.includes('Core Set')){
      masterDeck.heroes.push.apply(masterDeck.heroes, decks.base.heroes)
      masterDeck.schemes.push.apply(masterDeck.schemes, decks.base.schemes)
      masterDeck.masterminds.push.apply(masterDeck.masterminds, decks.base.masterminds)
      masterDeck.villains.push.apply(masterDeck.villains, decks.base.villains)
      masterDeck.henchmen.push.apply(masterDeck.henchmen, decks.base.henchmen)
    }
    if (chosenDecks.includes('Dark City')){
      masterDeck.heroes.push.apply(masterDeck.heroes, decks.darkCity.heroes)
      masterDeck.schemes.push.apply(masterDeck.schemes, decks.darkCity.schemes)
      masterDeck.masterminds.push.apply(masterDeck.masterminds, decks.darkCity.masterminds)
      masterDeck.villains.push.apply(masterDeck.villains, decks.darkCity.villains)
      masterDeck.henchmen.push.apply(masterDeck.henchmen, decks.darkCity.henchmen)
    }
    defaultSettings(players);
    randomDeck.scheme = randomDraw(masterDeck.schemes);
    schemeModifier();
    randomDeck.mastermind = randomDraw(masterDeck.masterminds);
    henchPicker(masterDeck.henchmen);
    villPicker(masterDeck.villains);
    console.log(randomDeck);
  } //end get settings

}]);
