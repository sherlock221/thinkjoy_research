/**
 * Created by abjia on 15-6-26.
 */


var  answerList  = [];
var  Indicator = 0;
var  jj = 0;
var  tb = ["A","B","C","D"];


var UI = {
    AnswerLayer : $("#answerLayer"),
    FirstLayer : $("#indexLayer"),
    SecondLayer : $("#secondLayer"),
    ThirdLayer : $("#thirdLayer")
}

var  Event = {

    init : function(){
        //加载数据
        this.data();

        //视差滚动
        var scene = document.getElementById('arrow-list');
        var parallax = new Parallax(scene);


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

        //1个ui动画
        Event.firstAni();

        //2个ui动画
        Event.secondAni();

        //var svg = new Walkway({
        //    selector: '#people-vivus',
        //    duration: '2000'
        //    // can pass in a function or a string like 'easeOutQuint'
        //
        //});
        //svg.draw();

        //svg 动画
        //new Vivus('people-vivus', {type: 'oneByOne', duration: 200, file: 'resources/svg/baishi-01.svg'}, function(res){
        //    console.log(res);
        //});
    },
    data : function(){
        loadAnswerList();
    },

    firstAni : function(){

        var $fontEdu = $("#font-education");
        var $fingerprint = $("#fingerprint");
        $fontEdu[0].addEventListener('webkitAnimationEnd', function(t){
            $fingerprint.removeClass("hide")
        }, false);

        //全部消失
        $fingerprint.bind("click",function(e){
            UI.FirstLayer.removeClass("out").addClass("out");
            //hide
            setTimeout(function(){
                UI.FirstLayer.addClass("hide");
                UI.SecondLayer.removeClass("hide");
            },500);
        });
    },

    secondAni : function(){
        var $bigringOut = UI.SecondLayer.find("#big-ring-out");
        $bigringOut[0].addEventListener('webkitAnimationEnd', function(t){
                console.log("end...");

                UI.ThirdLayer.removeClass("hide");
                UI.SecondLayer.addClass("hide");
        }, false);



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

//加载问题
var loadAnswerList = function(){
    $.getJSON("./data/question.json",function(json){
        console.log("加载完问题列表...");
        answerList = json;
        refreshAnswer(answerList[Indicator]);
    })
}

//下个问题
var nextAnswer = function(){
    if( Indicator++ > 2){
        console.log("您答对了",jj);
        return;
    }
    refreshAnswer(answerList[Indicator]);
}





Event.init();