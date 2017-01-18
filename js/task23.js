// 2017.1.18 20:56 xk 
var treeRoot = document.getElementsByClassName('box')[0],
	searchContent = document.getElementById('search'),
	body = document.getElementsByTagName('body')[0],
	indexBF = 0,
	len,
	timer = null,
	nodeList = [],
	flag = 0;

body.onclick = function (event) {
	var target = event.target;
	reset();
	switch(target.id){
		case "btnDF":
			traverseDF(treeRoot,nodeList);
			changeColor();
			break;
		case "btnBF":
			traverseBF(treeRoot,nodeList);
			changeColor();
			break;
		case "searchDF":
			traverseDF(treeRoot,nodeList);
			var content = searchContent.value;
			changeColor(content);
			break;
		case "searchBF":
			traverseBF(treeRoot,nodeList);
			var content = searchContent.value;
			changeColor(content);
			break;
	}
}

// 遇到问题，循环和setTimeout不好配合使用
function changeColor(value) {
	var i = 0;
	len = nodeList.length;
	if (nodeList[0].firstElementChild.innerHTML == value) {
		nodeList[0].style.backgroundColor = "red";
		flag = 1;
	}else {
		nodeList[0].style.backgroundColor = "yellow";
	}
	timer = setInterval(function () {
		i++;
		if (i<len) {
			nodeList[i-1].style.backgroundColor = "transparent";
			if (nodeList[i].firstElementChild.innerHTML == value) {
				nodeList[i].style.backgroundColor = "red";
				flag = 1;
			}else {
				nodeList[i].style.backgroundColor = "yellow";	
			}
		}else{
			nodeList[i-1].style.backgroundColor = "transparent";
			clearInterval(timer);	
			if (flag == 0) {
				alert ("can't find the node!");
			}
		}		
	},500);
}

function reset(){
	nodeList.length = 0;
	clearInterval(timer);
	var div = document.getElementsByTagName('div');
	for (var i = 0; i < len; i++) {
		div[i].style.backgroundColor = "transparent";
	}
}


// // 节点具有一个父节点和多个字节点 且本身包含数据
// // 没用到构造函数和原型！！！！！
// function Node(data) {
// 	this.data = data;
// 	this.parent = null;
// 	this.children = [];
// }
// // 树属性：具有根节点
// // 方法：深度遍历、广度遍历、添加节点、删除节点
// // 理论上把dom中的根节点赋值给tree，则其自动将dom结构构建成树..哈哈，目前我并不能
// function Tree(data) {
// 	var node = new Node(data);
// 	this._root = node;
// }


// Tree.prototype.traverseDF = function(node,nodeList) {
function traverseDF(node,nodeList) {
	if (node && node.tagName == "DIV") {
		nodeList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traverseDF(node.children[i],nodeList);
		}
	}
}

// Tree.prototype.traverseBF = function(node,nodeList) {
function traverseBF(node,nodeList) {
	if (node && node.tagName == "DIV") {
		nodeList.push(node);
		traverseBF(node.nextElementSibling,nodeList);
		node = nodeList[indexBF++];
		traverseBF(node.firstElementChild.nextElementSibling,nodeList);
	}
}

