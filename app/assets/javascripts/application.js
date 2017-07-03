// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require turbolinks
//= require_tree .

var test, $;
var Test = function () {

    this.data = $("#start_test").data('json');
    this.header = $('#testModal .modal-header .modal-title');
    this.body = $('#testModal .modal-body');

    this.refresh_step = function () {
        this.header[0].innerText = 'Вопрос ' + (this.step + 1);
        this.body[0].innerText = this.data[this.step]['Question'];
        this.set_answers();
    };

    this.set_answers = function () {
        var self = this;
        $.each(this.data[this.step]['Answers'], function (a, b) {
            self.body.append('</br><button class="btn btn-large btn-primary answer" data-answer="' + a + '">' + a + ')' + b + '</button>');
        });
    };

    this.next = function (){
        this.step += 1;
        if(this.check_last_question()){
            return this.done();
        }

        this.refresh_step();
    };

    this.right_answer_button = function () {
        return $("button.answer[data-answer=" + this.data[this.step]['Answer'] + "]");
    }

    this.answer_buttons = function () {
        return $('.btn.answer');
    }

    this.show_result = function () {
        buttons = this.answer_buttons();
        buttons.removeClass('btn-primary');
        buttons.addClass('btn-danger');
        this.right_answer_button().removeClass('btn-danger').addClass('btn-success');
        buttons.removeClass('answer');
    }

    this.reset = function () {
        this.step = 0;
        this.right_answers_count = 0;
        this.refresh_step();
    };

    this.done = function () {
        this.header[0].innerText = 'Готово!'
        this.body[0].innerText = 'Тест успешно пройден, результат: '+test.right_answers_count+' из '+test.data.length
    };

    this.check_last_question = function(){
        return this.step >= this.data.length
    }
    
    this.check_answer = function(answer){
        if(answer == this.data[this.step]['Answer'])
          this.right_answers_count+=1
        this.show_result()
    }

    this.reset();
}

$(document).ready(function () {
    test = new Test;
    test.refresh_step();

    $('body').on('click', 'button.answer', function () {
        test.check_answer($(this).data("answer"));
        setTimeout(function(){ test.next();}, 3000);
    });
    
    $('#start_test').on('click', function(){
        test.reset();
    })
})