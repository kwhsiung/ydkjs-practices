// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apB.md#closure-part-3

function calculator() {
  // ..
  var computes = []
  return function (value) {
    if (value !== '=') {
      computes.push(value)
      return value
    }
  }
}

var calc = calculator();

function useCalc(calc, keys) {
  return [...keys].reduce(
    function showDisplay(display, key) {
      var ret = String(calc(key));
      return (
        display +
        (
          (ret != "" && key == "=") ?
            "=" :
            ""
        ) +
        ret
      );
    },
    ""
  );
}

useCalc(calc, "4+3=");           // 4+3=7
useCalc(calc, "+9=");            // +9=16
useCalc(calc, "*8=");            // *5=128
useCalc(calc, "7*2*3=");         // 7*2*3=42
useCalc(calc, "1/0=");           // 1/0=ERR
useCalc(calc, "+3=");            // +3=ERR
useCalc(calc, "51=");            // 51