/**
 * 単独varパターン。
 * jsでは、関数冒頭で以下のような初期化をしておこう。
 * 型が明確に分かるというメリットがあるし、
 * 後述する変数の巻き上げによるバグを防げる。
 *
 */
function sample() {
    var a = 1,
        b = 2,
        sum = a + b,
        myobject = {},
        i = 0,
        j = 0;
}

/**
 * 変数の宣言巻き上げと呼ばれるアンチパターン。
 */
var my_name = "global";
(function sample () {
    console.log(my_name); // undefined
    var my_name = "local";
    console.log(my_name); // local
})();