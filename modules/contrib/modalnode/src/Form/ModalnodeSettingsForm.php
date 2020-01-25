<?php

namespace Drupal\modalnode\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ContentEntityExampleSettingsForm.
 * @package Drupal\modalnode\Form
 * @ingroup modalnode
 */
class modalnodeSettingsForm extends ConfigFormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'modalnode_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'modalnode.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // get the current configuration
    $config = $this->config('modalnode.settings');

    $form['modalnode_path'] = array(
      '#type' => 'textfield',
      '#title' => 'Modal content',
      '#description' => $this->t('Path to the content to be shown in the modal dialog'),
      '#default_value' => $config->get('modalnode_path') ?: '',
    );

    $form['modalnode_close_message'] = array(
      '#type' => 'textfield',
      '#title' => 'Close message',
      '#description' => $this->t('Text for the link to close the modal window. E.g. "No thanks." HTML is ok.'),
      '#default_value' => $config->get('modalnode_close_message') ?: 'Close',
    );

    $form['modalnode_timeout'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Timeout'),
      '#description' => $this->t('Number of seconds before the modal dialog is shown'),
      '#default_value' => $config->get('modalnode_timeout') ?: 2,
    );

    //  Text box to list pages the modal should or should not be shown on
    $form['modalnode_pages'] = array(
      '#type' => 'textarea',
      '#title' => $this->t('Pages'),
      '#description' => $this->t("Specify pages by using their paths. Enter one path per line. The '*' character is a wildcard. An example path is %user-wildcard for every user page. %front is the front page.", [
        '%user-wildcard' => '/user/*',
        '%front' => '<front>',
        ]),
      '#default_value' => $config->get('modalnode_pages') ?: '',
    );

    $form['modalnode_path_negate'] = array(
      '#type' => 'radios',
      '#options' => array(
        0 => t('Show for the listed pages'),
        1 => t('Hide for the listed pages'),
      ),
      '#default_value' => $config->get('modalnode_path_negate') ?: 0,
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('modalnode.settings')
      ->set('modalnode_path', $values['modalnode_path'])
      ->set('modalnode_close_message', $values['modalnode_close_message'])
      ->set('modalnode_timeout', $values['modalnode_timeout'])
      ->set('modalnode_pages', $values['modalnode_pages'])
      ->set('modalnode_path_negate', $values['modalnode_path_negate'])
      ->save();
      parent::submitForm($form, $form_state);
  }
}
