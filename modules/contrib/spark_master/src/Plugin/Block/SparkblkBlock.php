<?php

/**
 * @file
 */
namespace Drupal\sparkblk\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Spark' Block
 * @Block(
 * id = "block_sparkblk",
 * admin_label = @Translation("Spark block"),
 * )
 */
class SparkblkBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function(){
            const FORM_TIME_START = Math.floor((new Date).getTime()/1000);
            let formElement = document.getElementById("tfa_0");
            if (null === formElement) {
                formElement = document.getElementById("0");
            }
            let appendJsTimerElement = function(){
                let formTimeDiff = Math.floor((new Date).getTime()/1000) - FORM_TIME_START;
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
                jsTimeInput.setAttribute("name", "tfa_dbElapsedJsTime");
                jsTimeInput.setAttribute("id", "tfa_dbElapsedJsTime");
                jsTimeInput.setAttribute("autocomplete", "off");
                if (null !== formElement) {
                    formElement.appendChild(jsTimeInput);
                }
            };
            if (null !== formElement) {
                if(formElement.addEventListener){
                    formElement.addEventListener(\'submit\', appendJsTimerElement, false);
                } else if(formElement.attachEvent){
                    formElement.attachEvent(\'onsubmit\', appendJsTimerElement);
                }
            }
        });
    </script>

   <script type="text/javascript" src="https://itusj.tfaforms.net/wForms/3.10/js/wforms_unpacked.js?v=507-2"></script>
    <script type="text/javascript">
        wFORMS.behaviors.prefill.skip = false;
    </script>
        <script type="text/javascript" src="https://itusj.tfaforms.net/wForms/3.10/js/localization-en_US.js?v=507-2"></script>

<div class="wFormContainer" style="max-width: 100%; width:auto;" >

    <div class=""><div class="wForm" id="tfa_0-WRPR" dir="ltr">
<div class="codesection" id="code-tfa_0"><script type="text/javascript">
  $(document).ready(function() {
    makeSchoolpicker("5");
    verifyFieldMatch(3,4) ;
    preventPaste(4);
  });
</script></div>
<form method="post" action="https://itusj.tfaforms.net/responses/processor" class="hintsBelow labelsAbove" id="tfa_0">
<div id="tfa_6" class="section inline group">
<div class="oneField field-container-D     " id="tfa_1-D">
<label id="tfa_1-L" for="tfa_1" class="label preField reqMark">FIRST NAME</label><br><div class="inputWrapper"><input type="text" id="tfa_1" name="tfa_1" value="" placeholder="" title="FIRST NAME" class="required"></div>
</div>
<div class="oneField field-container-D     " id="tfa_2-D">
<label id="tfa_2-L" for="tfa_2" class="label preField reqMark">LAST NAME&nbsp;</label><br><div class="inputWrapper"><input type="text" id="tfa_2" name="tfa_2" value="" placeholder="" title="LAST NAME " class="required"></div>
</div>
</div>
<div id="tfa_7" class="section group">
<div id="tfa_9" class="section inline group">
<div class="oneField field-container-D     " id="tfa_3-D">
<label id="tfa_3-L" for="tfa_3" class="label preField reqMark">EMAIL&nbsp;</label><br><div class="inputWrapper"><input type="text" id="tfa_3" name="tfa_3" value="" placeholder="" title="EMAIL " class="required"></div>
</div>
<div class="oneField field-container-D     " id="tfa_4-D">
<label id="tfa_4-L" for="tfa_4" class="label preField reqMark">CONFIRM EMAIL</label><br><div class="inputWrapper"><input type="text" id="tfa_4" name="tfa_4" value="" placeholder="" title="CONFIRM EMAIL" class="required"></div>
</div>
</div>
<div class="oneField field-container-D     " id="tfa_10-D">
<label id="tfa_10-L" for="tfa_10" class="label preField ">PRIMARY PHONE</label><br><div class="inputWrapper"><input type="text" id="tfa_10" name="tfa_10" value="" placeholder="" autoformat="(###) ###-####" title="PRIMARY PHONE" class="validate-custom /^([\(]{1}[0-9]{3}[\)]{1}[\.| |\-]{0,1}|^[0-9]{3}[\.|\-| ]?)?[0-9]{3}(\.|\-| )?[0-9]{4}$/"></div>
</div>
<div class="oneField field-container-D     " id="tfa_5-D">
<label id="tfa_5-L" for="tfa_5" class="label preField ">WHAT SCHOOL DID YOU LAST ATTEND?&nbsp;</label><br><div class="inputWrapper"><input type="text" id="tfa_5" name="tfa_5" value="" placeholder="" title="WHAT SCHOOL DID YOU LAST ATTEND? " class=""></div>
</div>
<div class="oneField field-container-D     " id="tfa_22-D">
<label id="tfa_22-L" for="tfa_22" class="label preField reqMark">PROGRAM OF INTEREST</label><br><div class="inputWrapper"><select id="tfa_22" name="tfa_22" title="PROGRAM OF INTEREST" class="required"><option value="">Please select...</option>
<option value="tfa_24" id="tfa_24" class="">Doctorate in Business Administration</option>
<option value="tfa_25" id="tfa_25" class="">Master of Science in Computer Science</option>
<option value="tfa_26" id="tfa_26" class="">Masters in Business Administration</option>
<option value="tfa_27" id="tfa_27" class="">Masters of Science in Computer Engineering</option>
<option value="tfa_28" id="tfa_28" class="">Masters of Science in Digital Arts</option>
<option value="tfa_29" id="tfa_29" class="">Masters of Science in Electrical Engineering</option>
<option value="tfa_30" id="tfa_30" class="">Masters of Science in Engineering Management</option>
<option value="tfa_31" id="tfa_31" class="">Masters of Science in Software Engineering</option>
<option value="tfa_32" id="tfa_32" class="">Open Campus</option>
<option value="tfa_33" id="tfa_33" class="">PhD in Electrical Engineering</option>
<option value="tfa_34" id="tfa_34" class="">Phd in Interdisciplinary Sciences</option>
<option value="tfa_35" id="tfa_35" class="">Masters of Science in Information Systems in Cybersecurity</option>
<option value="tfa_36" id="tfa_36" class="">Undecided</option></select></div>
</div>
</div>
<div id="tfa_20" class="section inline group">
<div class="oneField field-container-D     " id="tfa_12-D">
<label id="tfa_12-L" for="tfa_12" class="label preField ">INTENDED TRIMESTER START (IF UNKNOWN, SKIP THIS QUESTION)</label><br><div class="inputWrapper"><select id="tfa_12" name="tfa_12" title="INTENDED TRIMESTER START (IF UNKNOWN, SKIP THIS QUESTION)" class=""><option value="">Please select...</option>
<option value="tfa_13" id="tfa_13" class="">Fall</option>
<option value="tfa_14" id="tfa_14" class="">Spring</option>
<option value="tfa_15" id="tfa_15" class="">Summer</option></select></div>
</div>
<div class="oneField field-container-D     " id="tfa_16-D">
<label id="tfa_16-L" for="tfa_16" class="label preField ">INTENDED TRIMESTER YEAR (IF UNKNOWN, SKIP THIS QUESTION)</label><br><div class="inputWrapper"><select id="tfa_16" name="tfa_16" title="INTENDED TRIMESTER YEAR (IF UNKNOWN, SKIP THIS QUESTION)" class=""><option value="">Please select...</option>
<option value="tfa_17" id="tfa_17" class="">2019</option>
<option value="tfa_18" id="tfa_18" class="">2020</option>
<option value="tfa_19" id="tfa_19" class="">2021</option></select></div>
</div>
</div>
<div class="oneField field-container-D     " id="tfa_21-D">
<label id="tfa_21-L" for="tfa_21" class="label preField ">COMMENTS</label><br><div class="inputWrapper"><textarea id="tfa_21" name="tfa_21" title="COMMENTS" class=""></textarea></div>
</div>
<input type="hidden" id="tfa_11" name="tfa_11" value="Request More Information Form" class=""><div class="actions" id="tfa_0-A"><input type="submit" class="primaryAction" value="Submit"></div>
<div style="clear:both"></div>
<input type="hidden" value="217735" name="tfa_dbFormId" id="tfa_dbFormId"><input type="hidden" value="" name="tfa_dbResponseId" id="tfa_dbResponseId"><input type="hidden" value="3d0ba9ce828aaf9efdd71d9f08e011fd" name="tfa_dbControl" id="tfa_dbControl"><input type="hidden" value="2" name="tfa_dbVersionId" id="tfa_dbVersionId"><input type="hidden" value="" name="tfa_switchedoff" id="tfa_switchedoff">
</form>
</div></div>
<div class="wFormFooter">
  <p class="supportInfo" >
        <a href="https://itusj.tfaforms.net/forms/help/217735" target="new"
       style="font-size: 0.7em;"  >
      Need assistance with this form?    </a>


      </p>
 </div>
</div>'),
    );

  }
}
