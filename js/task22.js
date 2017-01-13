// 2017.1.13 xk 10:37
var box = document.getElementsByClassName('box')[0],
	preBtn = document.getElementById('preBtn'),
	inBtn = document.getElementById('inBtn'),
	postBtn = document.getElementById('postBtn'),
	timer,
	boxList = [];

preBtn.onclick = function () {
	reset();
	preOrder(box);
	changeColor();
}
inBtn.onclick = function () {
	reset();
	inOrder(box);
	changeColor();
}
postBtn.onclick = function() {
	reset();
	postOrder(box);
	changeColor();
}
// 初始化
function reset() {
	boxList.length = 0;
	clearInterval(timer);
	var div = document.getElementsByTagName('div');
	for (var i = 0; i < div.length; i++) {
		div[i].style.backgroundColor = "transparent";
	}
}
// 前序
function preOrder(node) {
	if (node != null) {
		boxList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}
// 中序
function inOrder(node) {
	if (node != null) {
		inOrder(node.firstElementChild);
		boxList.push(node);
		inOrder(node.lastElementChild);
	}
}
// 后序
function postOrder(node) {
	if(node != null){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		boxList.push(node);
	}
}
// 颜色变化
function changeColor() {
	var i = 0;	
	boxList[i].style.backgroundColor = "yellow";
	timer = setInterval(function() {
		i++;
		if (i<boxList.length) {
			boxList[i-1].style.backgroundColor = "transparent";
			boxList[i].style.backgroundColor = "yellow";
		}else {
			clearInterval(timer);
			boxList[i-1].style.backgroundColor = "transparent";
		}
	},500);
}
