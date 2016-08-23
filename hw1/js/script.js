$(document).ready(function() {
  $('form').each(function() {
    var form = $(this),
        btn = form.find('.button__submit'),
        clearBtn = form.find('.button__clear');

    form.find('.form_field').addClass('empty_field');

    function checkInput() {
      form.find('.form_field').each(function() {
        if($(this).val() != '') {
          $(this).removeClass('empty_field');
        } else {
          $(this).addClass('empty_field');
        }
      });
    }

    function lightEmpty() {
      form.find('.empty_field').css({ 'border-color' : '#F56416' });

      setTimeout(function() {
        form.find('.empty_field').removeAttr('style');
      }, 1000);
    }

    setInterval(function() {
      checkInput();

      var countEmptys = form.find('.empty_field').length;

      if (countEmptys == form.find('.form_field').length) {
        if (clearBtn.hasClass('disabled_clear')) {
          return false;
        } else {
          clearBtn.addClass('disabled_clear');
        }
      } else {
        clearBtn.removeClass('disabled_clear');
      }

      if (countEmptys > 0) {
        if (btn.hasClass('disabled')) {
          return false;
        } else {
          btn.addClass('disabled');
        }
      } else {
        btn.removeClass('disabled');
      }

      checkInput();
    }, 0);

    btn.click(function() {
      if($(this).hasClass('disabled')) {
        lightEmpty();
        return false;
      } else {
        btn.submit();
      }
    });

    clearBtn.click(function() {
      if($(this).hasClass('disabled_clear')) {
        return false;
      } else {
        $(form)[0].reset();
      }
    });
  });
});