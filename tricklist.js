(function () {

    // Tellers voor aantal gedaan
    var tellermenzwart = document.querySelector('#tellermenzwart'),
        tellermenrood = document.querySelector('#tellermenrood'),
        tellereigen = document.querySelector('#tellereigen'),
        tellergrabs = document.querySelector('#tellergrabs'),
        tellerflips = document.querySelector('#tellerflips');

    // Array's voor pistes

    var pistesmenzwart = ["FS 180", "BS 180", "Switch FS 180 (cab)", "Switch BS 180", "Hardway FS 180", "Hardway BS 180", "Hardway Switch FS 180", "Hardway Switch BS 180", "FS 360", "BS 360", "Switch FS 360 (cab)", "Switch BS 360"],
        pistesmenrood = ["Boardslide", "Lipslide", "50-50", "Bluntslide", "Noseblunt"],
        trickgrabs = ["Indy", "Mute", "Melon", "Stalefish", "Nosegrab", "Tailgrab"],
        trickflips = ["Wildcat", "Tamedog", "Frontflip", "Backflip"];

    // Html id's naar var's

    var menzwart = document.querySelector('#menuireszwart'),
        menrood = document.querySelector('#menuiresrood'),
        grabs = document.querySelector('#grabs'),
        flips = document.querySelector('#flips'),
        form = document.querySelector('form'),
        item = document.querySelector('#item'),
        eigen = document.querySelector('#eigenaanvulling'),
        reset = document.querySelector('#reset');

    // Deel eigen aanvulling

    form.addEventListener('submit', function (b) {
        b.preventDefault();
        eigen.innerHTML += '<li class="list-group-item">' + item.value + '</li>';
        store();
        item.value = "";
        tellereigen.innerHTML = '( ' + $('#eigenaanvulling .checked2').length + ' / ' + $("#eigenaanvulling li").length + ' )';
    }, false)

    eigen.addEventListener('click', function (b) {
        var r = b.target;
        if (r.classList.contains('checked2')) {
            r.parentNode.removeChild(r);
        } else {
            r.classList.add('checked2');
        }
        store();
        tellereigen.innerHTML = '( ' + $('#eigenaanvulling .checked2').length + ' / ' + $("#eigenaanvulling li").length + ' )';
    }, false)

    // Zwarte pistes checken 

    menzwart.addEventListener('click', function (e) {
        var t = e.target;
        if (t.classList.contains('checked')) {
            t.classList.remove('checked');
        } else {
            t.classList.add('checked');
        }
        store();
        tellermenzwart.innerHTML = '( ' + $('#menuireszwart .checked').length + ' / ' + $("#menuireszwart li").length + ' )';
    }, false)

    // Rode pistes checken 

    menrood.addEventListener('click', function (f) {
        var x = f.target;
        if (x.classList.contains('checked')) {
            x.classList.remove('checked');
        } else {
            x.classList.add('checked');
        }
        store();
        tellermenrood.innerHTML = '( ' + $('#menuiresrood .checked').length + ' / ' + $("#menuiresrood li").length + ' )';
    }, false)

    // Grabs checken 

    grabs.addEventListener('click', function (g) {
        var y = g.target;
        if (y.classList.contains('checked')) {
            y.classList.remove('checked');
        } else {
            y.classList.add('checked');
        }
        store();
        tellergrabs.innerHTML = '( ' + $('#grabs .checked').length + ' / ' + $("#grabs li").length + ' )';
    }, false)

    // Flips checken

    flips.addEventListener('click', function (g) {
        var y = g.target;
        if (y.classList.contains('checked')) {
            y.classList.remove('checked');
        } else {
            y.classList.add('checked');
        }
        store();
        tellerflips.innerHTML = '( ' + $('#flips .checked').length + ' / ' + $("#flips li").length + ' )';
    }, false)

    // Cachen 
    function store() {
        window.localStorage.storspins = menzwart.innerHTML;
        window.localStorage.storgrinds = menrood.innerHTML;
        window.localStorage.storgrabs = grabs.innerHTML;
        window.localStorage.storflips = flips.innerHTML;
    }

    // Values printen zwart
    function menzwartValues() {
        var storedValues = window.localStorage.storspins;
        if (!storedValues) {
            // Zwarte pistes Menuires
            pistesmenzwart.forEach(function (pistesmenzwart) {
                menzwart.innerHTML += '<li class="list-group-item">' + pistesmenzwart + '</li>';
            })
        } else {
            menzwart.innerHTML = storedValues;
        }
    }
    menzwartValues();

    // Values printen rood
    function menroodValues() {
        var storedValues = window.localStorage.storgrinds;
        if (!storedValues) {
            // Zwarte pistes Menuires
            pistesmenrood.forEach(function (pistesmenrood) {
                menrood.innerHTML += '<li class="list-group-item">' + pistesmenrood + '</li>';
            })
        } else {
            menrood.innerHTML = storedValues;
        }
    }
    menroodValues();

    // Values printen grabs
    function grabsValues() {
        var storedValues = window.localStorage.storgrabs;
        if (!storedValues) {
            // Zwarte pistes Menuires
            trickgrabs.forEach(function (trickgrabs) {
                grabs.innerHTML += '<li class="list-group-item">' + trickgrabs + '</li>';
            })
        } else {
            grabs.innerHTML = storedValues;
        }
    }
    grabsValues();

    // Values printen flips
    function flipsValues() {
        var storedValues = window.localStorage.storflips;
        if (!storedValues) {
            // Zwarte pistes Menuires
            trickflips.forEach(function (trickflips) {
                flips.innerHTML += '<li class="list-group-item">' + trickflips + '</li>';
            })
        } else {
            flips.innerHTML = storedValues;
        }
    }
    flipsValues();

    // Tellers al van in het begin showen
    tellereigen.innerHTML = '( ' + $('#eigenaanvulling .checked2').length + ' / ' + $("#eigenaanvulling li").length + ' )';
    tellermenzwart.innerHTML = '( ' + $('#menuireszwart .checked').length + ' / ' + $("#menuireszwart li").length + ' )';
    tellermenrood.innerHTML = '( ' + $('#menuiresrood .checked').length + ' / ' + $("#menuiresrood li").length + ' )';
    tellergrabs.innerHTML = '( ' + $('#grabs .checked').length + ' / ' + $("#grabs li").length + ' )';
    tellerflips.innerHTML = '( ' + $('#flips .checked').length + ' / ' + $("#flips li").length + ' )';

    // Reset cache

    reset.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    }, false)

})();

function watchForHover() {
    var hasHoverClass = false;
    var container = document.body;
    var lastTouchTime = 0;

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();
