$(function () {
    var $paper = $("select#paper");
    var defVal = $paper.val();
    if (defVal != ""){
        prepareExam(defVal, "#examHolder");
    } else {
        prepareExam("test1.json", "#examHolder");
    }
    $paper.on("change", function () {
        var $val = $(this).val();
        $("#examHolder").empty();
        prepareExam($val, "#examHolder");
    });
    $("#examHolder").on("click", ".check", function(){
        var allVals = [];
        var $question = $(this).closest(".question");
        $question.attr("class", "question");
        $.each($question.find("input:checked"), function (x, y) {
            allVals.push($(y).attr("value"));
        });
        if ($(allVals).compare($question.data("answer").split(","))) {
            $question.addClass("pass").data("success", true);
        } else {
            $question.addClass("fail").data("success", false);
        }
    }).on("click", ".hint", function(){
        var $question = $(this).closest(".question");
        $.each($question.data("answer").split(","), function(k, v){
            $question.find("label[for$='" + v + "']").css("font-weight", "bold");
        });
    }).on("click", ".reset", function(){
        $(".question").removeData("success").attr("class", "question");
        $("input:checkbox").prop("checked", false);
        $(".pass, .fail").remove();
    }).on("click", ".show", function(){
        $(".question").each(function(){
            var correctAnswers = $(this).data("answer").split(",");
            $(this).find("input").each(function(){
                if($.inArray($(this).val(), correctAnswers) >= 0){
                    $(this).prop("checked",true);
                }else{
                     $(this).prop("checked",false);
                }
                
            });
        });
        $(".check").trigger("click");
    }).on("click", ".final", function(){
        $(".check").trigger("click");
        var total = 0, correct = 0;
        $(".question").each(function(){
            total++;
            if($(this).data("success")){
                correct++
            }
        });
        $("div.score").append($("<p></p>",{
            "text":"Total Score = "+(((correct/total) * 100).toFixed(2))+"%",
            "class": (((correct / total) * 100).toFixed(2) >= 68) ? "pass":"fail"
        }));
    });
});
function prepareExam(paper, target) {
    $.getJSON(paper, function (exam) {
        $(target).append($("#exam").render(exam));
        $(".check, .final, .reset, .show, .hint").button();
    });
}
function getCustomQuestionSet() {
    $.getJSON("custom.json", function (data) {
        $("select#paper").empty();
        $.each(data.chapters, function (k, v) {
            $("select#paper").append('<option value="'+v.file+'">'+v.name+'</option>');
        });
    }).fail(function (jqxhr, textStatus, error){
        var err = textStatus + " - " + error;
        console.log("status code: " + jqxhr.status + ", Request Failed: " + err);
    });
}
$.views.helpers({
    getFields: function( object ) {
        var key, value, fieldsArray = [];
        for (key in object) {
            if (object.hasOwnProperty(key)){
                value = object[key];
                fieldsArray.push({
                    key: key,
                    value: value
                });
            }
        }
        return fieldsArray;
    }
});
jQuery.fn.compare = function (t) {
    if (this.length != t.length) {
        return false;
    }
    var a = this.sort(), b = t.sort();
    for (var i = 0; t[i]; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};