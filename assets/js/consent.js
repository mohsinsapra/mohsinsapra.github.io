// Cookie consent banner + Google Consent Mode v2 updates
(function () {
    var KEY = 'cookie-consent';

    function applyGrant() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', { analytics_storage: 'granted' });
        }
    }

    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { }
    if (stored === 'granted') { applyGrant(); return; }
    if (stored === 'denied') { return; }

    var bar = document.createElement('div');
    bar.className = 'consent-bar';
    bar.innerHTML =
        '<p>This site uses cookies for anonymous analytics — to see which guides help people most. No ads, no tracking across sites.</p>' +
        '<div class="consent-bar__actions">' +
        '<button type="button" class="consent-accept">Accept</button>' +
        '<button type="button" class="consent-decline">Decline</button>' +
        '</div>';
    document.body.appendChild(bar);

    function close(choice) {
        try { localStorage.setItem(KEY, choice); } catch (e) { }
        if (choice === 'granted') applyGrant();
        bar.remove();
    }
    bar.querySelector('.consent-accept').addEventListener('click', function () { close('granted'); });
    bar.querySelector('.consent-decline').addEventListener('click', function () { close('denied'); });
})();
