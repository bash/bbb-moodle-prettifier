/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLDocument} document
 */
export function injectQuickJumpTo (document) {
  let $menu, $item, $form, $id, $button

  $menu = document.querySelector('#menu ul')

  if (!$menu) {
    return
  }

  $item = $menu.appendChild(document.createElement('li'))
  $item.id = 'quick-jump-to'

  $form = $item.appendChild(document.createElement('form'))
  $form.action = '/course/view.php'

  $id = $form.appendChild(document.createElement('input'))
  $id.type = 'text'
  $id.name = 'id'
  $id.setAttribute('placeholder', 'Kurs - ID')

  $button = $form.appendChild(document.createElement('button'))
  $button.type = 'submit'
  $button.innerText = 'Go'

  $form.addEventListener('submit', function (event) {
    if ($id.value.trim() === '') {
      event.preventDefault()
    }
  })
}
