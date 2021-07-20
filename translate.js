/* eslint-disable no-undef */
/* exported googleTranslateElementInit */
/* exported trocarIdioma */

var comboGoogleTradutor = null

function googleTranslateElementInit() { // eslint-disable-line no-unused-vars
    new google.translate.TranslateElement({
        pageLanguage: 'en,pt',
        includedLanguages: 'en,pt',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    }, 'google_translate_element')

    comboGoogleTradutor = document.getElementById("google_translate_element").querySelector(".goog-te-combo")
}

function changeEvent(el) {
    if (el.fireEvent) {
        el.fireEvent('onchange')
    } else {
        var evObj = document.createEvent("HTMLEvents")

        evObj.initEvent("change", false, true)
        el.dispatchEvent(evObj)
    }
}

function trocarIdioma(sigla) { // eslint-disable-line no-unused-vars
    if (comboGoogleTradutor) {
        comboGoogleTradutor.value = sigla
        changeEvent(comboGoogleTradutor)
    }
}