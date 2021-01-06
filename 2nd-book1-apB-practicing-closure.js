// The range(..) function takes a number as its first argument,
// representing the first number in a desired range of numbers.
// The second argument is also a number representing the end of the desired range (inclusive).
// If the second argument is omitted, then another function should be returned that expects that argument.

function range(start,end) {
  start = +start || 0
  if (end === undefined) {
    return function (end) {
      logRange(start, end)
    }
  }
  end = +end || 0
  logRange(start, end)

  function logRange(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    console.log(result)
  }
}

range(3,3);    // [3]
range(3,8);    // [3,4,5,6,7,8]
range(3,0);    // []

var start3 = range(3);
var start4 = range(4);

start3(3);     // [3]
start3(8);     // [3,4,5,6,7,8]
start3(0);     // []

start4(6);     // [4,5,6]