/**
 * Created by abjia on 15-6-26.
 */


var  answerList  = [];
var  Indicator = 0;
var  jj = 0;
var  tb = ["A","B","C","D"];


var UI = {
    AnswerLayer : $("#answerLayer")
}

var  Event = {

    init : function(){
        //加载数据
        this.data();

        //绑定答题选择
        UI.AnswerLayer.on("click",".answer-select li",function(){
            var $this = $(this);
            var answer  = $this.attr("data-option");
            $this.addClass("active").siblings().removeClass("active");

            if(answer == tb[Indicator]){
                jj++;
            }

            setTimeout(function(){
                nextAnswer();
            },600);
        });

    },
    data : function(){
        loadAnswerList();
    }
}

//渲染答题
var refreshAnswer = function(obj){

    //编号
    UI.AnswerLayer.find(".answer-num").html(obj.questionTitle);

    //内容
    UI.AnswerLayer.find(".answer-title").html(obj.questionDesc);


    //内容
    var $select = UI.AnswerLayer.find(".answer-select");


    //渲染选项
    var temp = "";
    for(var i =0 ; i<obj.questionOptions.length;i++){
        var s  = obj.questionOptions[i];
        var li = '<li class="" data-option="'+s.optionName+'">  <i class="ib select-active main-img"></i>';

        li += '<a href="javascript:void(0)">';
        li += '<span>'+ s.optionName+'</span>';
        li += s.optionValue;
        li += '</a></li>';

        temp += li;
    }

    $select.html(temp);
}


var loadAnswerList = function(){
    $.getJSON("./data/question.json",function(json){
        console.log("加载完问题列表...");
        answerList = json;
        refreshAnswer(answerList[Indicator]);
    })
}

var nextAnswer = function(){

    if( Indicator++ > 2){
        console.log("您答对了",jj);
        return;
    }

    refreshAnswer(answerList[Indicator]);
}





Event.init();