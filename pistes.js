(function () {

    // Tellers voor aantal gedaan
    var tellermenzwart = document.querySelector('#tellermenzwart'),
        tellermenrood = document.querySelector('#tellermenrood'),
        tellereigen = document.querySelector('#tellereigen');

    // Array's voor pistes

    var pistesmenzwart = ["Masse", "Lac Noir", "Dame Blanche", "Rocher Noir", "Léo Lacroix", ],
        pistesmenrood = ["Crêtes", "Fred Covili", "Bd de la tête", "Longet", "Mur rouge", "Pramint", "Teppes", "Becca", "Allamands", "Combes", "Grandes Combes", "Aiglon", "David Douillet Haut", "David Douillet Bas", "Bd Lance", "4 vents", "Alpage"];

    // Html id's naar var's

    var menzwart = document.querySelector('#menuireszwart'),
        menrood = document.querySelector('#menuiresrood'),
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

    // Cachen 

    function store() {
        window.localStorage.myitems = menzwart.innerHTML;
        window.localStorage.myitems = menrood.innerHTML;
    }

    // Values printen

    function getValues() {
        var storedValues = window.localStorage.myitems;
        if (!storedValues) {
            pistesmenrood.sort();
            pistesmenzwart.sort();
            // Zwarte pistes Menuires
            pistesmenzwart.forEach(function (pistesmenzwart) {
                menzwart.innerHTML += '<li class="list-group-item">' + pistesmenzwart + '</li>';
            })
            // Rode pistes Menuires
            pistesmenrood.forEach(function (pistesmenrood) {
                menrood.innerHTML += '<li class="list-group-item">' + pistesmenrood + '</li>';
            })
        } else {
            menzwart.innerHTML = storedValues;
            menrood.innerHTML = storedValues;
        }
    }
    getValues();

    // Reset cache

    reset.addEventListener('click', function () {
        localStorage.clear();
    }, false)

})();
