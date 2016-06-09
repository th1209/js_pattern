/**
 * 以下のような普通なforループは、jsでは悪。
 * forの度に、arrayのlengthにアクセスしてしまい、性能に影響。
 * DOM等をイテレートする場合は、もっと顕著な性能差が出る。
 */
(function () {
    var array = ['apple', 'banana', 'lemon'];
    console.log('hoge');

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
})();


/**
 * 以下のように、lengthはキャッシュすること。
 * 処理冒頭での初期化、forでの初期化も忘れずに。
 *
 */
(function () {
    var array = ['apple', 'banana', 'lemon'],
        i = 0,
        max = array.length;

    for (i = 0, max = array.length; i < max; i++) {
        console.log(array[i]);
    }
})();


/**
 * 配列の後ろからアクセスしてもいいなら、以下のように書くとスッキリ。
 */
(function () {
    var array = ['apple', 'banana', 'lemon'],
        i = array.length;

    while (i--){
        console.log(array[i]);
    }
})();


/**
 * 以下、for-inループに関するパターンを見ていく。
 * for-inループは順番を気にしないでpropertyを列挙するので、
 * オブジェクトのプロパティ列挙にのみ使用すること。
 */
(function () {
    
    //以下のようなクラス、サブクラスを例にとる
    var Animal = function () {};
    Animal.prototype.eat = function () {};
    
    var Person = function () {
        this.hands = 2;
        this.legs = 2;
        this.head = 1;
    };
    Person.prototype = new Animal();
    Person.prototype.talk = function () {};

    /**
     * 以下アンチパターン。
     * for-in文では、プロトタイプチェーン以降のプロパティも列挙してしまう
     */
    (function () {
        var person = new Person();
    
    
        for (var i in person) {
            console.log(i, ':', person[i]);  // hands, legs, head, talk, eat
        }
    })();


    /**
     * 以下Goodパターン。
     * hasOwnPropertyで、自クラスが持つプロパティのみ列挙できる
     *
     */
    (function () {
        var person = new Person(),
            i;
    
        for (i in person) {
            if (person.hasOwnProperty(i)) {
                console.log(i, ':', person[i]);  // hands, legs, head
            }
        }
    })();

    /**
     * hasOwnPropertyをcallで実行するのもあり。
     * この場合、hasOwnPropertyを上書きしちゃっていた場合にも正しく動作する。
     * (流石に、ここまで厳密にやらなくても良いと思うけど...。)
     * hasOwnPropertyで、自クラスが持つプロパティのみ列挙できる
     *
     */
    (function () {
        var person = new Person()
            i,
            hasOwn = Object.prototype.hasOwnProperty;
        for (i in person) {
            if (hasOwn(person, i)) {
                console.log(i, ':', person[i]);  // hands, legs, head
            }
        }
    })();
})();

