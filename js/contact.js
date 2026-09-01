/* contact.js — the support address, assembled in the browser.
 *
 * WHY. Address harvesters fetch pages and grep the source for `mailto:` and for
 * anything containing an @. Both used to be in the delivered HTML of five pages,
 * twice each — once in the href and once as the visible text. So the address is
 * no longer written down anywhere a fetch can read it: this file builds it from
 * pieces at load time, and the @ and the `mailto:` scheme are assembled from
 * character codes rather than typed.
 *
 * View-source therefore shows no address. DevTools does, and that is correct —
 * it shows the page after scripting, which is exactly where the address belongs.
 *
 * TO CHANGE THE ADDRESS, edit PARTS below and nothing else. It is the one place
 * it exists in the whole site.
 *
 * Without JavaScript the page still reads: every marked element carries a
 * human-readable fallback like `support [at] everbestgames [punkt] de`, which
 * stays put if this file never runs. A picture of the address would have hidden
 * it from harvesters too, and from screen readers and copy-paste with it.
 */
(function () {
  'use strict';

  // The one place the address is defined. Kept in pieces on purpose: a complete
  // string here would simply move the problem into this file.
  var PARTS = { user: ['sup', 'port'], host: ['everbest', 'games'], tld: ['de'] };

  var AT = String.fromCharCode(64);            // @
  var DOT = String.fromCharCode(46);           // .
  var SCHEME = ['mail', 'to'].join('') + String.fromCharCode(58);   // mailto:

  var address = PARTS.user.join('') + AT + PARTS.host.join('') + DOT + PARTS.tld.join('');

  function reveal() {
    var nodes = document.querySelectorAll('[data-contact]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var a = document.createElement('a');
      a.href = SCHEME + address;
      a.textContent = address;
      // Replace the fallback text rather than appending to it, or the page shows
      // the address twice — once obfuscated, once not.
      el.textContent = '';
      el.appendChild(a);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal);
  else reveal();
}());
