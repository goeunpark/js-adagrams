const Adagrams = {
  scoreChart: {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
  },
  pool: {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1
  },

  drawLetters() {
    let letterArray = [];
    let randomTen = [];

    for ( const letter in Adagrams.pool ){
      for ( let i = 0; i < Adagrams.pool[letter]; i ++ ){
        letterArray.push(letter);
      }
    }

    for ( let i = 0; i < 10; i ++){
      let selectLetter = letterArray[Math.floor(Math.random() * letterArray.length)];

      letterArray = Adagrams.removeLetter(selectLetter, letterArray);
      randomTen.push(selectLetter);
    }
    return randomTen
  },

  usesAvailableLetters(input, lettersInHand) {
    input = input.toUpperCase().split('');
    let result = true;

    input.forEach(inputLetter => {
      if (lettersInHand.includes(inputLetter)) {
        lettersInHand = Adagrams.removeLetter(inputLetter, lettersInHand);
      } else {
        result = false;
      }
    });
    return result
  },

  scoreWord(word) {
    if ( word.length === 0 ) return 0;

    word = word.toUpperCase().split('');
    let total_points = [];

    word.forEach( letter => {
      total_points.push(Adagrams.scoreChart[letter]);
    });

    const add = (a, b) => a + b;
    const sum = total_points.reduce(add);
    return total_points.length >= 7 ? sum + 8 : sum
  },

  highestScoreFrom(words) {
    const allScores = Adagrams.findAllScores(words);
    const maxScores = Adagrams.findMaxScores(allScores);
    return Adagrams.tiebreaker(maxScores)
  },

  findAllScores(unscoredWords) {
    let allScores = {}
    unscoredWords.forEach (word => {
      allScores[word] = Adagrams.scoreWord(word);
    });
    return allScores
  },

  findMaxScores(allScores) {
    const scores = Object.values(allScores)
    let maxScores = {}
    let max = Math.max.apply(Math, scores)
    for ( let word in allScores ){
      if ( allScores[word] === max ){
        maxScores[word] = allScores[word];
      }
    }
    return maxScores
  },

  tiebreaker(maxScoredWords) {
    let words = Object.keys(maxScoredWords);
    let scores = Object.values(maxScoredWords);
    if ( words.length === 1 ){
      return {'word': words[0], 'score': scores[0]}
    }

    for(let word in maxScoredWords){
      if (word.toUpperCase().split('').length === 10){
        return {'word': word, 'score': maxScoredWords[word]}
      }
    }

    const shortestWord = Adagrams.minBy(words)
    return {'word': shortestWord, 'score': maxScoredWords[shortestWord]}
  },

  removeLetter(letter, letterArray){
    for ( let i = 0; i < letterArray.length-1; i++){
      if ( letterArray[i] == letter ) {
        letterArray.splice(i, 1);
        break;
      }
    }
    return letterArray
  },

  minBy(array){
    let result = array.map(function (el) { return el.length; });
    let min = Math.min.apply(null, result);
    return array[result.indexOf(min)];
  }
};

// Do not remove this line or your tests will break!
export default Adagrams;
