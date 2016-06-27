/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {HTMLDocument} document
 */
export function injectQuickJumpTo (document) {
  const searchForm = document.querySelector('#search')
  const searchInput = document.querySelector('#coursesearchbox')
  const number = /^[0-9]+$/

  searchForm.addEventListener('submit', function (event) {
    if (!number.test(searchInput.value)) {
      return
    }

    event.preventDefault();
    window.location = `/course/view.php?id=${searchInput.value}`
  })

  const nav = document.querySelector('.navbar ul.nav')

  const listItem = document.createElement('li')
  const link = document.createElement('a')

  link.setAttribute('href', '/my')
  link.innerText = 'Mein Moodle'
  link.title = 'Mein Moodle'

  listItem.appendChild(link)
  nav.insertBefore(listItem, nav.firstElementChild)
}
