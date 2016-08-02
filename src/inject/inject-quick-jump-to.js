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
  
  if (searchForm == null) {
    return
  }

  searchForm.addEventListener('submit', function (event) {
    if (!number.test(searchInput.value)) {
      return
    }

    event.preventDefault()

    window.location = `/course/view.php?id=${searchInput.value}`
  })
}
