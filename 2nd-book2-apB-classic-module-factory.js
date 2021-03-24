// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apB.md#modules
// As you work on this exercise,
// also spend some time considering the pros/cons of representing the calculator as a module as opposed to the closure-function approach from the previous exercise.
// pros:
// 1. 能夠使用哪些操作，全都定義在 publicApi 中，對使用者來說更明確、對設計者來說也更能掌控被使用行為。
// cons:
// 1. 比起 closure-function approach 來說，設計者更需要多花一份心力特別為 publicApi 作維護。
//
// 不管是 module factory 或者是 closure-function approach，兩者都利用到了 closure，只不過 inner function 的呈現方式不同而已（直接 expose 一個 function，或者是 expose 多個細部操作的 function）

function formatTotal(display) {
  if (Number.isFinite(display)) {
    // constrain display to max 11 chars
    let maxDigits = 11;
    // reserve space for "e+" notation?
    if (Math.abs(display) > 99999999999) {
      maxDigits -= 6;
    }
    // reserve space for "-"?
    if (display < 0) {
      maxDigits--;
    }

    // whole number?
    if (Number.isInteger(display)) {
      display = display
        .toPrecision(maxDigits)
        .replace(/\.0+$/, "");
    }
    // decimal
    else {
      // reserve space for "."
      maxDigits--;
      // reserve space for leading "0"?
      if (
        Math.abs(display) >= 0 &&
        Math.abs(display) < 1
      ) {
        maxDigits--;
      }
      display = display
        .toPrecision(maxDigits)
        .replace(/0+$/, "");
    }
  } else {
    display = "ERR";
  }
  return display;
}

function createCalculator() {
  var currentTotal = 0;
  var currentVal = "";
  var currentOper = "=";

  var publicAPI = {
    number,
    eq,
    plus() {
      return operator("+");
    },
    minus() {
      return operator("-");
    },
    mult() {
      return operator("*");
    },
    div() {
      return operator("/");
    }
  };

  return publicAPI;

  // ********************

  function number(key) {
    // number key?
    if (/\d/.test(key)) {
      currentVal += key;
      return key;
    }
  }

  function eq() {
    // = key?
    if (currentOper != "=") {
      currentTotal = op(
        currentTotal,
        currentOper,
        Number(currentVal)
      );
      currentOper = "=";
      currentVal = "";
      return formatTotal(currentTotal);
    }
    return "";
  }

  function operator(key) {
    // multiple operations in a series?
    if (
      currentOper != "=" &&
      currentVal != ""
    ) {
      // implied '=' keypress
      eq();
    } else if (currentVal != "") {
      currentTotal = Number(currentVal);
    }
    currentOper = key;
    currentVal = "";
    return key;
  }

  function op(val1, oper, val2) {
    var ops = {
      // NOTE: using arrow functions
      // only for brevity in the book
      "+": (v1, v2) => v1 + v2,
      "-": (v1, v2) => v1 - v2,
      "*": (v1, v2) => v1 * v2,
      "/": (v1, v2) => v1 / v2
    };
    return ops[oper](val1, val2);
  }
}

var calc = createCalculator()

function useCalc(calc, keys) {
  var keyMappings = {
    "+": "plus",
    "-": "minus",
    "*": "mult",
    "/": "div",
    "=": "eq"
  };

  return [...keys].reduce(
    function showDisplay(display, key) {
      var fn = keyMappings[key] || "number";
      var ret = String(calc[fn](key));
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

console.log(useCalc(calc, "4+3="));           // 4+3=7
useCalc(calc, "+9=");            // +9=16
useCalc(calc, "*8=");            // *5=128
useCalc(calc, "7*2*3=");         // 7*2*3=42
useCalc(calc, "1/0=");           // 1/0=ERR
useCalc(calc, "+3=");            // +3=ERR
useCalc(calc, "51=");            // 51