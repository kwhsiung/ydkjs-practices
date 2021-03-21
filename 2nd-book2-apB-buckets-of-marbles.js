// This exercise asks you to write a program—any program!—that contains nested functions and block scopes, which satisfies these constraints:
//
// If you color all the scopes (including the global scope!) different colors, you need at least six colors. Make sure to add a code comment labeling each scope with its color.
// BONUS: identify any implied scopes your code may have.
//
// Each scope has at least one identifier.
//
// Contains at least two function scopes and at least two block scopes.
//
// At least one variable from an outer scope must be shadowed by a nested scope variable (see Chapter 3).
//
// At least one variable reference must resolve to a variable declaration at least two levels higher in the scope chain.

var something = 'something'

f()()()()

function f() {
  const v = 'v1'
  var vv = 'vv'
  return function () {
    const v = 'v2'
    return function () {
      const v = 'v3'
      return function () {
        const v = 'v4'
        console.log(v)
        console.log(vv)
        {
          let l = 'l'
          console.log(l)
        }
        {
          let l = 'll'
          console.log(l)
        }
        console.log(something)
      }
    }
  }
}