/**
 * switchパターン
 * switchキーワードとcaseキーワードのインデントを揃えているのがポイント。
 */
(function () {
    var num = 1;
    switch (num) {
    case 0:
        console.log('zero');
        break;
    case 1:
        console.log('one');
        break;
    default:
        console.log('default');
        break;
    }
})();


/**
 * アンチパターン
 * eval()など、文字列を解析する方法は使わない。
 * パフォーマンスが悪いに決まっている。
 * 加えて、環境によっては動かないことも...?
 * jsFiddleでは、setTimeoutに文字列を渡す方法だと動作しなかった。
 *
 */
//evalを使う例
(function () {
    var person = {
        legs: 2,
        hands: 2,
        head: 1
    };
    var property = 'head';
    console.log(eval("person." + property));
})();

(function () {
    function doHoge () {
        console.log('hoge');
    }

    //こっちはNG。jsFiddleだと動かないー
    setTimeout('doHoge();', 1000);

    //こっちはOK。無名関数を使おう。
    setTimeout(function(){
        doHoge();
    }, 1000);
})();


/**
 * parseIntには、必ず基数パラメータを渡す
 */
(function () {
    console.log(parseInt('09', 8));   //0(8進数で表現できない形式なので不正な結果に)
    console.log(parseInt('09', 10));  //9
    console.log(parseInt('11', 16));  //17(16進数の11と解釈)
    console.log(parseInt('09'));      //アンチパターン。環境によっては8進数と解釈し、不正な結果に。
})();


/**
 * 空白の開け方
 */
(function () {
    //for
    for (var i = 0; i < 3; i++) {
        console.log(i);
    }

    //関数宣言 (関数名と波括弧の間は詰める)
    function sampleFunc() {
        console.log('fizz');
    }

    //無名関数 (関数名と波括弧の間にスペース)
    var sampleFunc2 = function () {
        console.log('buzz');
    }
})();


/**
 * やらないと思うけど、returnの途中で改行するとundefinedが返る。
 * jsが勝手にreturnの途中でセミコロンを付与してしまうため。
 */
console.log(
    (function () {
        //returnの途中で改行
        return
        {
            prop: 'hoge'
        };
    })()
);


/**
 * 命名規則諸々
 */
(function () {
    //関数・メソッドはキャメルケース
    function sampleFunc() {}

    //変数は、キャメルかアンスコ。
    var myName;
    var my_name;

    //コンストラクタは大文字
    var ConstructorSample = function () {
        //各プロパティはこんな感じにしてみては。
        this.publicProp       = 1;
        this._protectedProp   = 2;
        this.__privateProp    = 3;

        //内部プロパティってなんだろう...
        this.__internalProp__ = 4;
    };
})();