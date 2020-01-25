<?php

namespace Drupal\suggestion\Form;

use Drupal\Component\Utility\Crypt;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\suggestion\SuggestionHelper;
use Drupal\suggestion\SuggestionStorage;

/**
 * Suggestion configuration form.
 */
class SuggestionAdminForm extends FormBase {

  /**
   * The suggestion configuration form.
   *
   * @param array $form
   *   A drupal form array.
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   *
   * @return array
   *   A Drupal form array.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $cfg = SuggestionHelper::getConfig();

    $form['entry_style'] = [
      '#title'         => $this->t('Entry Choices'),
      '#description'   => $this->t('Simple supports one autocomplete suggestion box, Advanced supports unlimited instances of autocomplete'),
      '#type'          => 'radios',
      '#options'       => ['simple' => $this->t('Simple'), 'advanced' => $this->t('Advanced')],
      'advanced'       => ['#description' => $this->t('Advanced supports unlimited instances of autocomplete.')],
      'simple'         => ['#description' => $this->t('Simple supports one autocomplete suggestion box.')],
      '#default_value' => ($cfg->entry_style == 'advanced') ? 'advanced' : 'simple',
      '#weight'        => 0,
    ];
    $form['autocomplete'] = [
      '#title'         => $this->t('Form ID, field name K/V pairs'),
      '#description'   => $this->t('A list of colon delimited form_id and field name pairs. One pre line, (search_form:keys).'),
      '#type'          => 'textarea',
      '#default_value' => $this->getAutocomplete(),
      '#states'        => ['visible' => ['input[name="entry_style"]' => ['value' => 'advanced']]],
      '#weight'        => 10,
    ];
    $form['simple'] = [
      '#type'         => 'container',
      '#tree'         => FALSE,
      '#states'       => ['visible' => ['input[name="entry_style"]' => ['value' => 'simple']]],
      '#weight'       => 20,
    ];
    $form['simple']['form_key'] = [
      '#title'         => $this->t('Form ID'),
      '#type'          => 'textfield',
      '#default_value' => $cfg->form_key,
    ];
    $form['simple']['field_name'] = [
      '#title'         => $this->t('Field Name'),
      '#type'          => 'textfield',
      '#default_value' => $cfg->field_name,
    ];
    $form['min'] = [
      '#title'         => $this->t('Minimum Characters in a Suggestion'),
      '#type'          => 'select',
      '#options'       => array_combine(range(3, 10), range(3, 10)),
      '#default_value' => $cfg->min,
      '#required'      => TRUE,
      '#weight'        => 30,
    ];
    $form['max'] = [
      '#title'         => $this->t('Maximum Characters in a Suggestion'),
      '#type'          => 'select',
      '#options'       => array_combine(range(20, 60), range(20, 60)),
      '#default_value' => $cfg->max,
      '#required'      => TRUE,
      '#weight'        => 40,
    ];
    $form['atoms_min'] = [
      '#title'         => $this->t('Minimum Words in a Suggestion'),
      '#type'          => 'select',
      '#options'       => array_combine(range(1, 10), range(1, 10)),
      '#default_value' => $cfg->atoms_min,
      '#required'      => TRUE,
      '#weight'        => 50,
    ];
    $form['atoms_max'] = [
      '#title'         => $this->t('Maximum Words in a Suggestion'),
      '#type'          => 'select',
      '#options'       => array_combine(range(1, 10), range(1, 10)),
      '#default_value' => $cfg->atoms_max,
      '#required'      => TRUE,
      '#weight'        => 60,
    ];
    $form['limit'] = [
      '#title'         => $this->t('Maximum Suggestions Returned'),
      '#type'          => 'select',
      '#options'       => array_combine(range(10, 100), range(10, 100)),
      '#default_value' => $cfg->limit,
      '#required'      => TRUE,
      '#weight'        => 70,
    ];
    $form['types'] = [
      '#title'         => $this->t('Content Types'),
      '#type'          => 'checkboxes',
      '#options'       => $this->getContentTypes(),
      '#default_value' => $cfg->types,
      '#required'      => TRUE,
      '#weight'        => 80,
    ];
    $form['keywords'] = [
      '#title'         => $this->t('Priority Suggestions'),
      '#description'   => $this->t('Suggestions entered here take priority.'),
      '#type'          => 'textarea',
      '#default_value' => $this->getKeywords(),
      '#rows'          => 10,
      '#required'      => FALSE,
      '#weight'        => 90,
    ];
    $form['stopwords'] = [
      '#title'         => $this->t('Stopwords'),
      '#description'   => $this->t('Stopwords are not indexed.'),
      '#type'          => 'textarea',
      '#default_value' => $this->getStopwords(),
      '#rows'          => 10,
      '#required'      => FALSE,
      '#weight'        => 100,
    ];
    $form['submit'] = [
      '#type'   => 'submit',
      '#value'  => $this->t('Submit'),
      '#weight' => 110,
    ];
    return $form;
  }

  /**
   * The form ID.
   *
   * @return string
   *   The form ID.
   */
  public function getFormId() {
    return 'suggestion_admin';
  }

  /**
   * Submit function for the suggestion configuration form.
   *
   * @param array $form
   *   A drupal form array.
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $current = SuggestionHelper::getConfig();

    // Set synced to false if any indexing fields change.
    if ($current->atoms_max != $form_state->getValue('atoms_max')) {
      $this->setSynced(FALSE);
    }
    elseif ($current->atoms_min != $form_state->getValue('atoms_min')) {
      $this->setSynced(FALSE);
    }
    elseif ($current->limit != $form_state->getValue('limit')) {
      $this->setSynced(FALSE);
    }
    elseif ($current->max != $form_state->getValue('max')) {
      $this->setSynced(FALSE);
    }
    elseif ($current->min != $form_state->getValue('min')) {
      $this->setSynced(FALSE);
    }
    elseif ($current->types != $form_state->getValue('types')) {
      $this->setSynced(FALSE);
    }
    // Set config fields.
    SuggestionHelper::setConfig('atoms_max', $form_state->getValue('atoms_max'));
    SuggestionHelper::setConfig('atoms_min', $form_state->getValue('atoms_min'));
    SuggestionHelper::setConfig('entry_style', $form_state->getValue('entry_style'));
    SuggestionHelper::setConfig('limit', $form_state->getValue('limit'));
    SuggestionHelper::setConfig('max', $form_state->getValue('max'));
    SuggestionHelper::setConfig('min', $form_state->getValue('min'));
    SuggestionHelper::setConfig('field_name', trim($form_state->getValue('field_name')));
    SuggestionHelper::setConfig('form_key', trim($form_state->getValue('form_key')));
    SuggestionHelper::setConfig('types', $form_state->getValue('types'));

    // Form ID to field name hash.
    $this->setAutocomplete($form_state);

    // Priority suggestions.
    $this->setKeywords($form_state);

    // Stopwords.
    $this->setStopwords($form_state);
  }

  /**
   * Validation function for the suggestion edit form.
   *
   * @param array $form
   *   A drupal form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal FormStateInterface object.
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    if ($form_state->getValue('entry_style') == 'simple') {
      if (!preg_match('/^[a-z_0-9]+$/', trim($form_state->getValue('field_name')))) {
        $form_state->setErrorByName('field_name', $this->t('Illegal character(s) in field name.'));
      }
      if (!preg_match('/^[a-z_0-9]+$/', trim($form_state->getValue('form_key')))) {
        $form_state->setErrorByName('form_key', $this->t('Illegal character(s) in form ID.'));
      }
    }
    elseif (!preg_match('/\W*([a-z_0-9]+)\W+([a-z_0-9]+)\W*/s', $form_state->getValue('autocomplete'))) {
      $form_state->setErrorByName('autocomplete', $this->t('Auto-complete must be in the form "form_id:field_name", (one per line).'));
    }
  }

  /**
   * Build an autocomplete form ID to field name hash.
   *
   * @return string
   *   A colon delimited list of form_id to field name.
   */
  protected function getAutocomplete() {
    $txt = '';

    foreach ((array) SuggestionHelper::getConfig('autocomplete') as $key => $val) {
      $txt .= "$key:$val\n";
    }
    return $txt;
  }

  /**
   * Build a content type to label hash.
   *
   * @return array
   *   A content type to label hash.
   */
  protected function getContentTypes() {
    $types = SuggestionStorage::getContentTypes();

    foreach ($types as &$type) {
      $type = ucwords($type);
    }
    return !empty($types) ? $types : [];
  }

  /**
   * Build a list of priority suggestions.
   *
   * @return string
   *   A newline delimited string of priority ngrams.
   */
  protected function getKeywords() {
    $keywords = SuggestionStorage::getKeywords();

    return !empty($keywords) ? implode("\n", $keywords) : '';
  }

  /**
   * Build a list of stopwords.
   *
   * @return string
   *   A newline delimited string of stopwords.
   */
  protected function getStopwords() {
    $stopwords = SuggestionHelper::getStops('stopwords');

    return $stopwords ? implode("\n", array_keys($stopwords)) : '';
  }

  /**
   * Build an autocomplete form ID to field name hash.
   *
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  protected function setAutocomplete(FormStateInterface $form_state) {
    $hash = [];

    if ($form_state->getValue('entry_style') == 'simple') {
      $hash[trim($form_state->getValue('form_key'))] = trim($form_state->getValue('field_name'));
    }
    else {
      foreach (preg_split('/\s*[\n\r]+\s*/s', trim($form_state->getValue('autocomplete'))) as $line) {
        if (preg_match('/^\W*([a-z_0-9]+)\W+([a-z_0-9]+)\W*$/', $line, $m)) {
          $hash[$m[1]] = $m[2];
        }
      }
      ksort($hash);
    }
    SuggestionHelper::setConfig('autocomplete', $hash);
  }

  /**
   * Process all the priority suggestions submitted.
   *
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  protected function setKeywords(FormStateInterface $form_state) {
    foreach (preg_split('/\s*[\n\r]+\s*/s', trim($form_state->getValue('keywords'))) as $txt) {
      SuggestionHelper::insert($txt, SuggestionStorage::PRIORITY_BIT);
    }
  }

  /**
   * Process all the stopwords submitted.
   *
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  protected function setStopwords(FormStateInterface $form_state) {
    $stopwords = [];

    foreach (preg_split('/\s*[\n\r]+\s*/s', trim($form_state->getValue('stopwords'))) as $txt) {
      $stopwords += array_flip(preg_split('/\s+/', SuggestionHelper::tokenize($txt, 2)));
    }
    $stopwords = array_fill_keys(array_keys($stopwords), 1);

    ksort($stopwords);

    $hash = Crypt::hashBase64(implode("\n", array_keys($stopwords)));

    if ($hash != SuggestionHelper::getStops('hash')) {
      SuggestionHelper::setStops('hash', $hash);
      SuggestionHelper::setStops('stopwords', $stopwords);
      SuggestionHelper::setConfig('synced', FALSE);
    }
  }

  /**
   * Set the synced value.
   *
   * @param bool $synced
   *   The synced value.
   *
   * @return object
   *   A configuration object.
   */
  protected function setSynced($synced) {
    return SuggestionHelper::setConfig('synced', (bool) $synced);
  }

}
