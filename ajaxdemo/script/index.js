function $(id) {
    return document.getElementById(id);
}

function bindEvent() {
    var b = [[],[]],
        keyword = document.getElementById('keyword').value,
        textCt = ["textWP","textMP"],
        sexyCt = ["WL3","ML3"],
        ab = $('ab').value;
    keyword = keyword.replace("搜索", "").replace(/\"/g,"").replace(/\/\s/, "\/");
    var keywordArr = keyword.split("/");
    for (var i = 0; i < keywordArr.length; i++) {
        for (var j = 0; j < keywordArr[i].split("-").length; j++) {
            b[i][j] = keywordArr[i].split("-")[j];
        }
    }        
    textCt.forEach(function(currentvalue,index){
        render(currentvalue,b[index].join(""));
    })
    sexyCt.forEach(function(currentvalue,index){
        search_main(currentvalue,"WL3/add.php?wm=" + b[index][0] + "&name=" + b[index][1] + "&link=" + b[index][2] + "&dian=" + ab)
    })
}

function render(textval,val){
    $(textval).innerText = val;

}
function search_main(obj, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url)
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var data = JSON.parse(request.responseText);
            if (data.success) {
                if (data.xianding) {
                    if(data.msg == '?' || data.msg == '&'){
                        $(obj).value = '没有链接'
                    }else{
                        $(obj).value = data.msg + 'keyword=' + UrlEncode(data.text);    
                    }                     
                } else {
                    $(obj).value = data.msg;
                }
            } else {
                $(obj).value = "出现错误：" + data.msg;
            }
        }
    }
}



$('search').onclick = function(){
    bindEvent();
}