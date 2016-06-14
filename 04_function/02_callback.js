/**
 * コールバックを使わないNG実装
 */
//nodeを見つけて返す関数がある
var findNodes = function () {
    var i = 100000,
        nodes = [],
        foundNode;

    while (i){

        //ノードを見つける処理...

        nodes.push(foundNode);
        i -= 1;
    }

    return nodes;
};

//見つかったノードに対し、styleを書き換える関数がある
var hide = function (nodes) {
    var i = 0, max = nodes.length;

    for (; i < max; i += 1) {
        nodes[i].style.display = "none";
    }
};

//こんな感じで呼び出す
hide(findNodes());

//この実装は、以下の2点で問題がある
//1. findNodesでのループ -> hideでのループと2回回るので無駄
//2. findNodes関数の気が利いてない。ノードを列挙しながら何らかの処理が出来るようにしたい



/**
 * コールバックを使った実装
 */
//こんな感じの高階関数にする
var findNodes = function (callback) {
    var i = 100000,
        nodes = [],
        foundNode;

    if (typeof callback !== "function") {
        callback = false;
    }
    
    while (i){

        //ノードを見つける処理...
        
        //見つけたノードに対しコールバック実行
        if (callback) {
            callback(foundNode);
        } 

        nodes.push(foundNode);
        i -= 1;
    }

    return nodes;
};

//呼び出すときはこんな感じに。
//先ほどのhide関数が無名関数になるので、ロジックを使い捨てに出来るというメリットも。
//(把握すべきコードの量が節約できる)
findNodes(functon (node) {
    node.style.display = "none";
});


/**
 * オブジェクトにコールバックを使うには?
 * ->callメソッドを使おう。
 */
//このインスタンスに対し、コールバックを適用したい
var nodePainter = {
    color: "green",
    paint: function (node) { node.style.color = this.color; }
};


var findNodes = function (callback, callback_obj) {
    var i = 100000,
        nodes = [],
        foundNode;

    //こんな感じで、文字列から必要な関数オブジェクトを取得
    if (typeof callback === "string"){
        callback = callback_obj['callback'];
    }

    while (i){

        //ノードを見つける処理...

        //見つけたノードに対しコールバック実行
        if (typeof callback === "function") {
            callback.call(callback_obj, foundNode);
        }

        nodes.push(foundNode);
        i -= 1;
    }

    return nodes;
};

//呼び出し時はこんな感じ
findNodes("paint", nodePainter);



/**
 * その他のコールバック例
 */
//非同期イベントリスナ
document.addEventListener("click", console.log, false);

//タイムアウト時に発火する
var thePlotThickens = function () {
    console.log('500ミリ秒後...');
};
setTimeout(thePlotThickens, 500);

