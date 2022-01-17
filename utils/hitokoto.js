fetch('https://v1.hitokoto.cn/?c=d')
.then(function (res){
  return res.json();
})
.then(function (data) {
  var hitokoto = document.getElementById('hitokoto');
  hitokoto.innerText = data.hitokoto + '——' + data.from + '';
  hitokoto.onclick = function () {
    console.log(111)
    window.open('https://hitokoto.cn?uuid=' + data.uuid)  //新窗口打开
  }
})
.catch(function (err) {
  console.error(err);
})