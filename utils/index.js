/**
 * Get cookie from request.
 *
 * @param  {Object} req
 * @param  {String} key
 * @return {String|undefined}
 */
export function cookieFromRequest(req, key) {
  if (!req?.headers.cookie) return

  const cookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`))

  if (cookie) {
    return decodeURIComponent(cookie.replace(key + '=', ''))
  }
}

/**
 * https://router.vuejs.org/en/advanced/scroll-behavior.html
 */
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  let position = {}

  if (to.matched.length < 2) {
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    position = { x: 0, y: 0 }
  }
  if (to.hash) {
    position = { selector: to.hash }
  }

  return position
}

export const reference = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return 'KLA-' + text
}

export const addClass = (classname, element) => {
  const cn = element.className
  // test for existance
  if (cn.includes(classname)) {
    return
  }
  // add a space if the element already has class
  if (cn !== '') {
    classname = ' ' + classname
  }
  element.className = cn + classname
}

export const removeClass = (classname, element) => {
  let cn = element.className
  const rxp = new RegExp('\\s?\\b' + classname + '\\b', 'g')
  cn = cn.replace(rxp, '')
  element.className = cn
}

export const hasClass = (classname, element) => {
  // test for existance
  return element && element.className.includes(classname)
}

export const clickedOutside = (elem, event) => {
  return event && elem && !elem.contains(event.target)
}
