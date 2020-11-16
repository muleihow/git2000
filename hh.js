
var box = document.querySelector('.box');
// var z = document.querySelector(".z");
var ck = document.querySelector('.pp');
var d = document.querySelectorAll('.kk');
var btn = document.querySelector('.s button');
var ipt = document.querySelector('.s input');
var ul = document.querySelector('.z ul');
var del = document.querySelectorAll('.z .ss');// 删除按钮
var bianji = document.querySelectorAll('.z .sp1');//编辑按钮
var ulx = document.querySelector('.x ul'); //已完成列表的ul


//事件委托, 所有 z 内部的点击事件
box.addEventListener('click', function (e) {
  var x = e.target;


  //1. 实现多选功能
  if (x.className == 'kk') {
    d = document.querySelectorAll('.kk'); //判断当前单选按钮的个数
    var hh = true;
    for (var i = 0, let = d.length; i < let; i++) {
      if (!d[i].checked) {
        hh = false;
        break;
      }
    }
    ck.checked = hh;
  }

  if (x.className == ck.className) {
    d = document.querySelectorAll('.kk');  //判断当前单选按钮的个数
    for (var i = 0, let = d.length; i < let; i++) {
      d[i].checked = ck.checked;
    }
  }

  //2. 添加功能
  if (x.innerHTML == '添加') {
    if (ipt.value) {
      var newli = document.createElement("li")
      newli.innerHTML = `
    <input type="checkbox" class="kk">
      <span class="ss">删除</span>
      <i>${ipt.value}</i>
      <input type="text" class="hh">
      <span class="sp1">编辑</span>
    `;
      //如果点击了全选按钮, 为 true, 这个也要勾选
      if (ck.checked) {
        newli.children[0].checked = true;
      }
      ul.appendChild(newli);
      ipt.value = '';
    }
  }

  //3. 删除功能
  if (x.innerHTML == del[0].innerHTML) {
    ul.removeChild(x.parentNode);
  }

  //4. 编辑功能
  if (x.innerHTML == bianji[0].innerHTML) {
    x.previousElementSibling.style.display = 'block';
    x.previousElementSibling.focus();

    x.previousElementSibling.onblur = function () {
      x.previousElementSibling.style.display = 'none';
      if (!x.previousElementSibling.value) {
        return;
      }
      x.previousElementSibling.previousElementSibling.innerHTML = x.previousElementSibling.value;
    }

    x.previousElementSibling.onkeyup = function (e) {
      if (e.keyCode == 13) {
        x.previousElementSibling.blur();
      }
    }
  }

  //5. 添加任务已处理功能
  if (x.innerHTML == "处理") {

    d = document.querySelectorAll('.kk');  //判断当前单选按钮的个数
    for (var i = 0; i < d.length; i++) {
      if (d[i].checked) {
        //添加任务到已完成列表, 删除当前列表的任务
        ulx.appendChild(d[i].parentNode.children[2]);
        ul.removeChild(d[i].parentNode);
      }
    }
  }

  //清除以处理任务功能实现
  var is;
  if (x.innerHTML == "清除以处理任务") {
    is = ulx.children;
    var num = is.length
    for (var i = 0; i < num; i++) {
      ulx.removeChild(is[0]);
    }
  }

});


//键盘回车添加功能实现
var tianjia = document.querySelector('.s button');
ipt.onkeyup = function (e) {
  if (e.keyCode == 13) {
    tianjia.click();
  }
}


//阻止文字在 box 中的选中的默认事件
box.addEventListener('selectstart', function (e) { e.preventDefault(); });  