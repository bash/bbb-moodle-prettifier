/**
 * (c) 2015 Ruben Schmidmeister
 */

/**
 *
 * @param {string} href
 * @returns {{}}
 */
export function parseUrl (href) {
  let $link = document.createElement('a')

  $link.href = href

  return {
    href: $link.href,
    protocol: $link.protocol,
    host: $link.host,
    hostname: $link.hostname,
    port: $link.port,
    pathname: $link.pathname,
    search: $link.search,
    hash: $link.hash,
    username: $link.username,
    password: $link.password,
    origin: $link.origin,
    searchParams: $link.searchParams,
    toString () {
      return this.href
    }
  }
}
