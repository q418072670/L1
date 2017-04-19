function $(id) {
    return document.getElementById(id);
}

function bindEvent() {
    var b = [[],[]],
        keyword = document.getElementById('keyword').value;
    keyword = keyword.replace("搜索", "").replace(/\"/g,"").replace(/\s/g, "");
    var keywordArr = keyword.split("/");
    for (var i = 0; i < keywordArr.length; i++) {
        for (var j = 0; j < keywordArr[i].split("-").length; j++) {
            b[i][j] = keywordArr[i].split("-")[j];
        }
    }
    console.log(b)
    var ab = $('ab').value;
    render("textWP",b[0].join(""));
    search_main("WL3", "WL3/add.php?wm=" + b[0][0] + "&name=" + b[0][1] + "&link=" + b[0][2] + "&dian=" + ab);
    render("textMP",b[1].join(""));    
    search_main("ML3", "WL3/add.php?wm=" + b[1][0] + "&name=" + b[1][1] + "&link=" + b[1][2] + "&dian=" + ab);
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
                    $(obj).value = data.msg + 'keyword=' + UrlEncode(data.text);     
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