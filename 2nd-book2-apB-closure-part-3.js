// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apB.md#closure-part-3

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

// 計算機有什麼功能，我們可以利用實體的計算機來想像
// 數字鍵：使用者可以透過按下數字鍵，看到所按下的數字串接至一個螢幕顯示的數字區上（而由於我們並沒有顯示的需求，可直接用變數代替）
// 運算符號鍵（加減乘除鍵）:
//   1. 當「不是處於運算中狀態時」，使用者按下運算符號會
//    1.1. 看到數字串列上的數字消失
//    1.2. 儲存該數字於內部
//    1.3. 計算機內部會知道目前正要做什麼運算（儲存目前的運算符號）
//   2. 當「處於運算狀態時」，使用者按下運算符號會
//    2.1. 看到數字串列上的數字消失
//    2.2. 等同於按下「等號」
//    2.3. 計算機內部會知道目前正要做什麼運算（儲存目前的運算符號）
// 等號鍵：使用者按下等號鍵時，會將上個輸入的數字串列與上上個輸入的數字串列，以記憶好的運算符號，做互相運算。
function calculator() {
  var currentTotal = 0;
  var currentVal = "";
  var currentOper = "=";

  return pressKey;

  // ********************

  function pressKey(key) {
    // number key?
    if (isTypingNumber(key)) {
      appendCurrentKey(key)
      return key;
    }
    // operator key?
    else if (isTypingOperator(key)) {
      // multiple operations in a series?
      if (
        isDoingOperation() &&
        isNumberTyped()
      ) {
        // implied '=' keypress
        pressKey("=");
      } else if (isNumberTyped()) {
        currentTotal = Number(currentVal);
      }
      setCurrentOper(key)
      clearCurrentVal()
      return key;
    }
    // = key?
    else if (
      isTypingCompute(key) &&
      isDoingOperation()
    ) {
      currentTotal = op(
        currentTotal,
        currentOper,
        Number(currentVal)
      );
      setCurrentOper('=')
      clearCurrentVal()
      return formatTotal(currentTotal);
    }
    return "";
  };

  function isTypingNumber(key) {
    return /\d/.test(key)
  }

  function isTypingOperator(key) {
    return  /[+*/-]/.test(key)
  }

  function isTypingCompute(key) {
    return key == '='
  }

  function isDoingOperation() {
    return currentOper != '='
  }

  function isNumberTyped() {
    return currentVal != ''
  }

  function appendCurrentKey(keu) {
    currentVal += key
  }

  function setCurrentOper(val) {
    currentOper = val
  }

  function clearCurrentVal() {
    currentVal = ''
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