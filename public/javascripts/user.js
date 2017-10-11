$('.preloader').fadeOut();

$.getJSON( "/details", function( data ) {
    $('#name').append(" "+data.name);
});

var language = 1;
ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/eclipse");
editor.getSession().setMode("ace/mode/c_cpp");
document.getElementById('editor').style.fontSize='16px';


function load_c() {
    if(language != 1 || language == 1){
        editor.getSession().setMode("ace/mode/c_cpp");
        language = 1;
        $("#dropdownMenu1").html('C');
    }
}

function load_cpp(){
    if(language != 2){
        editor.getSession().setMode("ace/mode/c_cpp");
        language = 2;
        $("#dropdownMenu1").html('C++');
    }
}

function load_java() {
    if(language != 3){
        editor.getSession().setMode("ace/mode/java");
        language = 3;
        $("#dropdownMenu1").html('Java');
    }
}

function load_py() {
    if(language != 30){
        editor.getSession().setMode("ace/mode/python");
        language = 30;
        $("#dropdownMenu1").html('Python 3.5');
    }
}

function load_theme(id) {
    if(id == 1){
        editor.setTheme("ace/theme/ambiance");
        $("#dropdownMenu2").html('Ambiance');
    }
    if(id == 2){
        editor.setTheme("ace/theme/chaos");
        $("#dropdownMenu2").html('Chaos');
    }
    if(id == 3) {
        editor.setTheme("ace/theme/chrome");
        $("#dropdownMenu2").html('Chrome');
    }
    if(id == 4){
        editor.setTheme("ace/theme/clouds");
        $("#dropdownMenu2").html('Clouds');
    }
    if(id == 5){
        editor.setTheme("ace/theme/clouds_midnight");
        $("#dropdownMenu2").html('Clouds Midnight');
    }
}

function submit_code() {
    $('.preloader').fadeIn(100);
    $("#error_box").hide();
    $("#out_2_box").hide();
    $("#out_1_box").hide();
    var req_url = "/compiler/compile";
    var src = editor.getValue();
    var t1 = $("#testcase_1").val();
    var t2 = $("#testcase_2").val();
    var post_data = {
        source: src,
        lang: language,
        testcase_1: t1,
        testcase_2: t2
    };
    console.log(post_data);
    $.post(req_url,
        post_data,
        function(data, status, jqXHR) {
            console.log('status: ' + status + ', data: ' + JSON.stringify(data.result));
            if(data.result.compilemessage.length > 2){
                $("#error_msg").html(data.result.compilemessage);
                $("#error_box").show();
            }
            if(data.result.stdout != null) {
                if (data.result.stdout[0].length > 0) {
                    if (language != 30) {
                        if (data.result.stdout[0] === $("#o_1").val()) {
                            $("#out_1").html("Successfully Executed :)");
                            $("#out_1").append('<br>Time Taken: ' + data.result.time[0]);
                        }
                        else {
                            $("#out_1").html("Execution Failed");
                        }
                    }
                    else {
                        if (data.result.stdout[0] === $("#o_1").val() + "\n") {
                            $("#out_1").html("Successfully Executed :)");
                            $("#out_1").append('<br>Time Taken: ' + data.result.time[0]);
                        }
                        else {
                            $("#out_1").html("Execution Failed");
                        }
                    }
                    $("#out_1_box").show();
                }
                if (data.result.stdout[1].length > 0) {
                    if (language != 30) {
                        if (data.result.stdout[1] === $("#o_2").val()) {
                            $("#out_2").html("Successfully Executed :)");
                            $("#out_2").append('<br>Time Taken: ' + data.result.time[1]);
                        }
                        else {
                            $("#out_2").html("Execution Failed");
                        }
                    }
                    else {
                        if (data.result.stdout[1] === $("#o_2").val() + "\n") {
                            $("#out_2").html("Successfully Executed :)");
                            $("#out_2").append('<br>Time Taken: ' + data.result.time[1]);
                        }
                        else {
                            $("#out_2").html("Execution Failed");
                        }
                    }
                    $("#out_2_box").show();
                }
            }
	        $('.preloader').fadeOut(200);
        })
        .done(function() {
            alert('Code Compiled Successfully!');
            
        })
        .fail(function(jqxhr, settings, ex) {
            alert('Failed to compile: ' + ex);
        });

}
