<?php

namespace Drupal\suggestion\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Routing\RedirectDestinationInterface;
use Drupal\Core\Url;
use Drupal\suggestion\SuggestionHelper;
use Drupal\suggestion\SuggestionStorage;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Ngram search form.
 */
class SuggestionSearchForm extends FormBase {
  protected $redirect;

  /**
   * Class constructor.
   *
   * @param \Drupal\Core\Routing\RedirectDestinationInterface $redirect
   *   The redirect destination.
   */
  public function __construct(RedirectDestinationInterface $redirect) {
    $this->redirect = $redirect;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('redirect.destination'));
  }

  /**
   * The suggestion search form.
   *
   * @param array $form
   *   A drupal form array.
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   * @param string $ngram
   *   The search string.
   *
   * @return array
   *   A Drupal form array.
   */
  public function buildForm(array $form, FormStateInterface $form_state, $ngram = '') {
    $ngram = trim($ngram);
    $opts = ['query' => $this->redirect->getAsArray()];
    $rows = [];
    $rpp = SuggestionHelper::getConfig('rpp');
    $header = [
      $this->t('N-Gram'),
      $this->t('Source'),
      $this->t('Atoms'),
      $this->t('Quantity'),
      $this->t('Density'),
      $this->t('Edit'),
    ];
    if ($ngram) {
      $pattern = '%' . db_like($ngram) . '%';
      $page = pager_default_initialize(SuggestionStorage::getCount($pattern), $rpp);
      $suggestions = SuggestionStorage::search($pattern, ($page * $rpp), $rpp);
    }
    else {
      $page = pager_default_initialize(SuggestionStorage::getCount(), $rpp);
      $suggestions = SuggestionStorage::getAllSuggestions(($page * $rpp), $rpp);
    }
    foreach ($suggestions as $obj) {
      $rows[$obj->ngram] = [
        $obj->ngram,
        $obj->src,
        $obj->atoms,
        $obj->qty,
        $obj->density,
        Link::fromTextAndUrl($this->t('Edit'), Url::fromUri("internal:/admin/config/suggestion/edit/$obj->ngram", $opts)),
      ];
    }
    $form['ngram'] = [
      '#type'                    => 'textfield',
      '#autocomplete_route_name' => 'suggestion.autocomplete',
      '#default_value'           => $ngram,
      '#weight'                  => 10,
    ];
    $form['search'] = [
      '#type'   => 'submit',
      '#name'   => 'search',
      '#value'  => $this->t('Search'),
      '#submit' => ['::submitForm'],
      '#weight' => 20,
    ];
    $form['list'] = [
      '#type'    => 'tableselect',
      '#header'  => $header,
      '#options' => $rows,
      '#empty'   => $this->t('Nothing found.'),
      '#weight'  => 60,
    ];
    if (count($rows)) {
      $form['src'] = [
        '#title'    => $this->t('Source'),
        '#type'     => 'select',
        '#options'  => SuggestionStorage::getSrcOptions(),
        '#multiple' => TRUE,
        '#weight'   => 30,
      ];
      $form['update'] = [
        '#type'     => 'submit',
        '#name'     => 'update',
        '#value'    => $this->t('Update'),
        '#submit'   => [
          '::submitUpdateForm',
          '::submitForm',
        ],
        '#validate' => ['::validateUpdateForm'],
        '#weight'   => 40,
      ];
      $form['pager_head'] = [
        '#type'   => 'pager',
        '#weight' => 50,
      ];
      $form['pager_foot'] = [
        '#type'   => 'pager',
        '#weight' => 70,
      ];
    }
    return $form;
  }

  /**
   * The form ID.
   *
   * @return string
   *   The form ID.
   */
  public function getFormId() {
    return 'suggestion_search';
  }

  /**
   * Ngram search submission function.
   *
   * @param array $form
   *   A drupal form array.
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $form_state->setRedirectUrl(Url::fromUri('internal:/admin/config/suggestion/search/' . $form_state->getValue('ngram')));
  }

  /**
   * Ngram update submission function.
   *
   * @param array $form
   *   A drupal form array.
   * @param Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal form state object.
   */
  public function submitUpdateForm(array &$form, FormStateInterface $form_state) {
    $src = SuggestionHelper::optionBits((array) $form_state->getValue('src'));

    foreach ((array) $form_state->getValue('list') as $ngram => $val) {
      if (!$val) {
        continue;
      }
      SuggestionHelper::updateSrc($ngram, $src);

      drupal_set_message($this->t('Updated: &ldquo;@ngram&rdquo;', ['@ngram' => $ngram]));
    }
  }

  /**
   * Validation function for the suggestion edit form.
   *
   * @param array $form
   *   A drupal form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   A Drupal FormStateInterface object.
   */
  public function validateUpdateForm(array &$form, FormStateInterface $form_state) {
    $suxs = FALSE;

    if (!count((array) $form_state->getValue('src'))) {
      $form_state->setErrorByName('src', $this->t('The source must have a value.'));
    }
    elseif (isset($form_state->getValue('src')[0]) && count((array) $form_state->getValue('src')) > 1) {
      $form_state->setErrorByName('src', $this->t('The disabled option cannot be combined with other options.'));
    }
    foreach ((array) $form_state->getValue('list') as $val) {
      if ($val) {
        $suxs = TRUE;
        break;
      }
    }
    if (!$suxs) {
      $form_state->setErrorByName('list', $this->t('You must select an ngram to perform the update to.'));
    }
  }

}
