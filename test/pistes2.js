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
        menzwartbp = document.querySelector('#menuireszwartbp'),
        menzwartag = document.querySelector('#menuireszwartag'),
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

    // Zwarte pistes checken (buiten piste + afgereden)

    menzwartbp.addEventListener('click', function (e) {
        var t = e.target;
        if (t.classList.contains('checked3')) {
            t.classList.remove('checked3');
        } else {
            t.classList.add('checked3');
        }
        store();
    }, false)
    menzwartag.addEventListener('click', function (e) {
        var t = e.target;
        if (t.classList.contains('checked3')) {
            t.classList.remove('checked3');
        } else {
            t.classList.add('checked3');
        }
        store();
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
        window.localStorage.stormenzwart = menzwart.innerHTML;
        window.localStorage.stormenzwartbp = menzwartbp.innerHTML;
        window.localStorage.stormenzwartag = menzwartag.innerHTML;
        window.localStorage.stormenrood = menrood.innerHTML;
    }

    // Values printen zwart
    function menzwartValues() {
        var storedValues = window.localStorage.stormenzwart;
        var storedValues2 = window.localStorage.stormenzwartbp;
        var storedValues3 = window.localStorage.stormenzwartag;
        if (!storedValues) {
            pistesmenzwart.sort();
            // Zwarte pistes Menuires
            pistesmenzwart.forEach(function (pistesmenzwart) {
                menzwart.innerHTML += '<li class="list-group-item">' + pistesmenzwart + '</li>';
                menzwartbp.innerHTML += '<li class="list-group-item bpag">""</lu>';
                menzwartag.innerHTML += '<li class="list-group-item bpag">""</lu>';
            })
        } else {
            menzwart.innerHTML = storedValues;
            menzwartbp.innerHTML = storedValues2;
            menzwartag.innerHTML = storedValues3;
        }
    }
    menzwartValues();

    // Values printen rood
    function menroodValues() {
        var storedValues = window.localStorage.stormenrood;
        if (!storedValues) {
            pistesmenrood.sort();
            // Zwarte pistes Menuires
            pistesmenrood.forEach(function (pistesmenrood) {
                menrood.innerHTML += '<li class="list-group-item">' + pistesmenrood + '</li>';
            })
        } else {
            menrood.innerHTML = storedValues;
        }
    }
    menroodValues();

    // Tellers al van in het begin showen
    tellereigen.innerHTML = '( ' + $('#eigenaanvulling .checked2').length + ' / ' + $("#eigenaanvulling li").length + ' )';
    tellermenzwart.innerHTML = '( ' + $('#menuireszwart .checked').length + ' / ' + $("#menuireszwart li").length + ' )';
    tellermenrood.innerHTML = '( ' + $('#menuiresrood .checked').length + ' / ' + $("#menuiresrood li").length + ' )';

    // Reset cache

    reset.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    }, false)

})();
