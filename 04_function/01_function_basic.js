/**
 * 関数は3種類。
 * 変数への代入、セミコロンの有無等に注目
 */
//関数宣言
function triangle(base, height) {
    return (base * height / 2);
}

//関数式(無名関数)
var triangle = function (base, height) {
    return (base * height / 2);
};


//名前付き関数式
var triangle = function triangle(base, height) {
    return (base * height / 2);
};


/**
 * 3種の関数の違い
 * 関数式(無名関数)以外はnameプロパティが使える
 */
function foo() {}
var bar  = function () {};
var baz = function baz() {};

console.log(foo.name);  //foo
console.log(bar.name);  //an empty string
console.log(baz.name);  //baz


/**
 * 3種の関数の違い
 * 関数宣言の場合、実装も巻き上げられる。
 * 関数式、名前付き関数式の場合、実装は巻き上げられない。
 */
function foo() { console.log('global foo'); }
function bar() { console.log('global bar'); }

(function () {
    foo();
    bar();

    function foo() { console.log('local foo'); }
    var bar = function bar() { console.log('local bar'); }
})();