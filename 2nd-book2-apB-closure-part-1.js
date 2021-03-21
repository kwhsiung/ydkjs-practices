// The first part of this exercise is to use closure to implement a cache to remember the results of isPrime(..), so that the primality (true or false) of a given number is only ever computed once. Hint: we already showed this sort of caching in Chapter 6 with factorial(..).
//
// If you look at factorize(..), it's implemented with recursion, meaning it calls itself repeatedly. That again means we may likely see a lot of wasted calls to compute prime factors for the same number. So the second part of the exercise is to use the same closure cache technique for factorize(..).
//
// Use separate closures for caching of isPrime(..) and factorize(..), rather than putting them inside a single scope.
var isPrime = (function createIsPrime() {
  var cache = {}
  return function (v) {
    if (cache[v] !== undefined) {
      return cache[v]
    }
    var result = isPrime(v)
    cache[v] = result
    return result;
  }

  function isPrime(v) {
    if (v <= 3) {
      return v > 1;
    }
    if (v % 2 == 0 || v % 3 == 0) {
      return false;
    }
    var vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
      if (v % i == 0 || v % (i + 2) == 0) {
        return false;
      }
    }
    return true;
  }
})();

var factorize = (function createFactorize() {
  var cache = {}
  return function (v) {
    if (cache[v] !== undefined) {
      return cache[v]
    }
    var result = factorize(v)
    cache[v] = result
    return result
  };

  function factorize(v) {
    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));
      while (v % i != 0) {
        i--;
      }
      return [
        ...factorize(i),
        ...factorize(v / i)
      ];
    }
    return [v];
  }
})();