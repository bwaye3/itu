<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
const FORM_TIME_START = Math.floor((new Date).getTime() / 1000);
let formElement = document.getElementById("tfa_0");
if (null === formElement) {
formElement = document.getElementById("0");
}
let appendJsTimerElement = function () {
let formTimeDiff = Math.floor((new Date).getTime() / 1000) - FORM_TIME_START;
let cumulatedTimeElement = document.getElementById("tfa_dbCumulatedTime");
if (null !== cumulatedTimeElement) {
let cumulatedTime = parseInt(cumulatedTimeElement.value);
if (null !== cumulatedTime && cumulatedTime > 0) {
formTimeDiff += cumulatedTime;
}
}
let jsTimeInput = document.createElement("input");
jsTimeInput.setAttribute("type", "hidden");
jsTimeInput.setAttribute("value", formTimeDiff.toString());
jsTimeInput.setAttribute("Name", "tfa_dbElapsedJsTime");
jsTimeInput.setAttribute("id", "tfa_dbElapsedJsTime");
jsTimeInput.setAttribute("autocomplete", "off");
if (null !== formElement) {
formElement.appendChild(jsTimeInput);
}
};
if (null !== formElement) {
if (formElement.addEventListener) {
formElement.addEventListener('submit', appendJsTimerElement, false);
} else if (formElement.attachEvent) {
formElement.attachEvent('onsubmit', appendJsTimerElement);
}
}
});
</script>
<script type="text/javascript" src="https://itusj.tfaforms.net/wForms/3.10/js/wforms.js?v=512-13"></script>
<script type="text/javascript">
wFORMS.behaviors.prefill.skip = false;
</script>
<script type="text/javascript" src="https://itusj.tfaforms.net/wForms/3.10/js/localization-en_US.js?v=512-13"></script>
<script type="text/javascript">
$(document).ready(function () {
makeSchoolpicker("5");
verifyFieldMatch(3, 4);
preventPaste(4);
});
</script>
<script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"></script>
  <script>
  grecaptcha.ready(function() {
      grecaptcha.execute('reCAPTCHA_site_key', {action: 'homepage'}).then(function(token) {
         ...
      });
  });
  </script>
