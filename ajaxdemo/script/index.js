function _(id) {
    return document.getElementById(id);
}

function bindEvent() {
    var b = [[],[]],
        keyword = document.getElementById('keyword').value,
        textCt = ["textWP","textMP"],
        sexyCt = ["WL3","ML3"],
        ab = _('ab').value;
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
    _(textval).innerText = val;

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
                        _(obj).value = '没有链接'
                    }else{
                        _(obj).value = data.msg + 'keyword=' + UrlEncode(data.text);    
                    }                     
                } else {
                    _(obj).value = data.msg;
                }
            } else {
                _(obj).value = "出现错误：" + data.msg;
            }
        }
    }
}



_('search').onclick = function(){
    bindEvent();
}

// 模态框逻辑
!function(){
    var pageSelect = _('pageSelect'),
        pageSelectlist = _('pageSelectlist'),
        pageSelectOption = {
            "--请选择类别--": "",
            "WL3":"WL3",
            "ML3":"ML3",
            "通栏":"TL"
        },
        pageSelectlistOption = {            
            "women": {
                "外套": "外套",
                "T恤背心": "T恤背心",
                "衬衫": "衬衫",
                "SPORTS": "SPORTS",
                "针织衫": "针织衫",
                "牛仔裤": "牛仔裤",
				"束脚裤": "束脚裤",
				"紧身裤": "紧身裤",
				"裙子·裙裤": "裙子·裙裤",
				"连衣裙": "连衣裙"
            },
            "men":{
                "外套": "外套",
                "T恤背心": "T恤背心",
                "休闲衬衫": "休闲衬衫",
                "商务衬衫": "商务衬衫",
                "SPORTS": "SPORTS",
                "长裤": "长裤",
				"束脚裤":'束脚裤'
            },
            "限定": {
                "W限定L3": "W限定L3",
                "M限定L3": "M限定L3"
            }
        }
        pageSelectArr = [],
        pageSelectlistArr = [],
        womenlistArr = [],
        menlistArr = [],
        limitedlistArr = [];

        for(var key in pageSelectOption){
            pageSelectArr.push(new Option(key,pageSelectOption[key]))
        }       
        pageSelectArr.forEach(function(currentvalue,index){
            pageSelect.options[index] = currentvalue;
        })     

        pushArr(pageSelectlistOption["women"],womenlistArr);
        pushArr(pageSelectlistOption["men"],menlistArr);
        pushArr(pageSelectlistOption["限定"],limitedlistArr);
       

        pageSelectlistArr.push(new Array(new Option("--请选择--","")))
        pageSelectlistArr.push(womenlistArr)
        pageSelectlistArr.push(menlistArr)
        pageSelectlistArr.push(limitedlistArr)
        
        pageSelect.addEventListener('change',function(e){
            pageSelectlist.options.length = 0;
            var index = e.target.selectedIndex;
            for(var i = 0; i< pageSelectlistArr[index].length;i++){
                pageSelectlist.options[i] = pageSelectlistArr[index][i];
            }        
        })

        function pushArr(obj,arr){
            for(var key in obj){
                arr.push(new Option(key,obj[key]))
            }
        }

}()

// 保存按钮逻辑
_('saveBtn').addEventListener('click',function(e){
    var shoplist = _('shoplist').value,
        pageSelect = _('pageSelect').value,
        pageSelectlist = _('pageSelectlist').value,
        linkname = _('linkname').value,
        linkaddress = _('linkaddress').value,
        url;
        if(pageSelect != 'TL'){
            if(linkaddress.split('?')[1] && linkaddress != linkname){
                url = linkaddress.split('?')[0] + '#' + linkaddress.split('?')[1].split('#')[1]; 
            }else{
                url = linaddress.split('?')[0]
            }
        }else{
            if(shoplist == 'b'){
                var bLink = linkaddress.split("scid=");
                url = "http://www.uniqlo.cn/search.htm?scid=" + bLink[1].split('&')[0];
            }else{
                url = linkaddress.split('?')[0]
            }
        }
        saveData(url,shoplist,pageSelect,pageSelectlist,linkname);
})

function saveData(link,shoplist,pageSelect,pageSelectlist,linkname){
    var request = new XMLHttpRequest();	
	request.open("POST", "WL3/add.php");
	var data = "&dian=" + shoplist +
				"&wm=" + pageSelect + 
				"&biao=" + pageSelectlist + 
				"&name=" + linkname + 
				"&link=" + link;
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(data);
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				var data = JSON.parse(request.responseText);
				if (data.success) { 
					_("infoResult").innerHTML = data.msg;
                    _("inforResult").display = "block";
				} else {
					_("infoResult").innerHTML = "出现错误：" + data.msg;
                    _("infoResult").className = "alert alert-danger mT"
                    _("inforResult").display = "block";
				}
			} else {
				alert("发生错误：" + request.status);
				}
			} 
		}


}