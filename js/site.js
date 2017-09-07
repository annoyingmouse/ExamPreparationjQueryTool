var root = null;
$(function(){
    $.getJSON("custom.json", function(data){
        root = data.root;
        $.each(data.chapters, function(k, v){
            $("#tests").append($("<li></li>", {
                "class": (v.name === "Default") ? " active" : null
            }).append($("<a></a>", {
                "text": v.name,
                "data-value": root + "/" + v.file,
                "href": "#",
                "class": "test"
            })));
        });
    }).fail(function() {
        $("#default").empty().remove();
    });
    $.getJSON("example.json", function(exam){
        renderExternalTmpl({
            name: "exam", 
            selector: "#body", 
            data: exam
        });                        
    });
    $("#body").on("click", ".check", function(){
        var $question = $(this).closest(".question");
        $question.removeClass("panel-default panel-success panel-danger");
        var a1 = $.map($question.find("input:checked"), function(o){
            return $(o).val();
        }).sort();
        var a2 = $question.data("answer").split(",").sort();
        if(a1.length === a2.length && a1.every(function(v,i) { 
            return v === a2[i]
        })){
            $question.addClass("panel-success").data("success", true);
        }else{
            $question.addClass("panel-danger").data("success", false);
        }
    }).on("click", ".hint", function(){
        var $question = $(this).closest(".question");
        $.each($question.data("answer").split(","), function(k, v){
            $question
                .find("input[id$='_" + v + "']")
                .parent("label")
                .css("font-style", "italic");
        });
    }).on("click", ".reset", function(){
        $(".question")
            .removeClass("panel-success panel-danger")
            .addClass("panel-default")
            .removeData("success")
            .find("input")
                .prop("checked", false)
                .end()
            .find("label")
                .removeAttr("style");
        $(".alert-holder")
            .empty()
            .remove();
    }).on("click", ".show", function(){
        $(".question").each(function(){
            var correctAnswers = $(this).data("answer").split(",");
            $(this).find("input").each(function(){
                if($.inArray($(this).val(), correctAnswers) >= 0){
                    $(this).prop("checked", true);
                }else{
                     $(this).prop("checked", false);
                }
            });
        });
        $(".check").trigger("click");
    }).on("click", ".final", function(){
        $(".alert-holder").empty().remove();
        $(".check").trigger("click");
        var total = 0, 
            correct = 0, 
            percentage = 0.00, 
            message = {};
        $(".question").each(function(){
            total++;
            if($(this).data("success")){
                correct++
            }
        });
        percentage = (correct/total) * 100;
        message.score = percentage.toFixed(2);
        if(percentage >= 68){
            message.status = "alert-success";
            message.header = "Well done!";
        }else{
            message.status = "alert-danger";
            message.header = "Oh snap!";
        }
        renderExternalTmpl({
            name: "outcome", 
            selector: "div.score", 
            data: message
        });
    });                
});
$(".navbar").on("click", ".test", function(e){
    e.preventDefault();
    var $this = $(this);
    $(".test").parent("li").removeClass("active");
    $this.parent("li").addClass("active");
    $(".navbar-brand").find("small").text($this.text());
    $("#body").empty();
    $.getJSON($(this).data("value"), function(exam){
        renderExternalTmpl({
            name: "exam", 
            selector: "#body", 
            data: exam
        });                        
    });
});
$.views.helpers({
    getFields: function(object) {
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
var renderExternalTmpl = function(item) {
    var file = './templates/_' + item.name + '.tmpl.html';
    $.when($.get(file))
     .done(function(tmplData) {
         $.templates({ tmpl: tmplData });
         $(item.selector).append($.render.tmpl(item.data));
     });    
}