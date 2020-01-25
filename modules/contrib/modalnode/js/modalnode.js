(function ($, Drupal) {
  Drupal.behaviors.modalnode = {
    attach: function (context, settings) {
      $('body', context).once('modalnode').each(function () {
        $returnVisitor = readCookie('return_visitor');
        if ($returnVisitor) { return; }
        createCookie('return_visitor', 1, 365);
        var delay = parseInt(settings.modalnode.timeout) * 1000;
        setTimeout(function() {
          overlay(settings.modalnode.close_message);
        }, delay);
      });
    }
  };

  function overlay(close_message) {
    var output = '<div id="modalnode-overlay">';
    output += '<iframe src="itu-form.html">';
    output += '</iframe>';
    output += '<a href="#" class="close">';
    output += close_message;
    output += '</a>';
    output += '</div>';
    $('body').prepend(output);
    $('#modalnode-overlay').fadeIn(1800);
    $('#modalnode-overlay .close').click(function() { $('#modalnode-overlay').remove(); });
  }

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

})(jQuery, Drupal);
