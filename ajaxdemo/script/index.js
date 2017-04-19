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
                "牛仔裤": "牛仔裤"
            },
            "men":{
                "外套": "外套",
                "T恤背心": "T恤背心",
                "休闲衬衫": "休闲衬衫",
                "商务衬衫": "商务衬衫",
                "SPORTS": "SPORTS",
                "长裤": "长裤"
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

       
        for(var key in pageSelectlistOption["women"]){            
            womenlistArr.push(new Option(key,pageSelectlistOption["women"][key]))           
        }
        for(var key in pageSelectlistOption["men"]){            
            menlistArr.push(new Option(key,pageSelectlistOption["men"][key]))     
        }
        for(var key in pageSelectlistOption["限定"]){            
            limitedlistArr.push(new Option(key,pageSelectlistOption["限定"][key]))     
        }

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

}()