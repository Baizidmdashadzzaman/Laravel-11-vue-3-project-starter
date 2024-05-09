import { ref } from 'vue';

export const isOpen1 = ref(false);
export const isOpen2 = ref(false);
export const isOpen3 = ref(false);
export const isOpen4 = ref(false);

export const dpOpen1 = ref(false);
export const dpOpen2 = ref(false);
export const dpOpen3 = ref(false);
export const dpOpen4 = ref(false);


export const toggleDropdown = (target) => {
    if(target == 'dpOpen1'){ dpOpen1.value = !dpOpen1.value; setuplanguage(); }else{ dpOpen1.value = false; }
    if(target == 'dpOpen2'){ dpOpen2.value = !dpOpen2.value;}else{ dpOpen2.value = false; }
    if(target == 'dpOpen3'){ dpOpen3.value = !dpOpen3.value;}else{ dpOpen3.value = false; }
    if(target == 'dpOpen4'){ dpOpen4.value = !dpOpen4.value;}else{ dpOpen4.value = false; }
};

export const toggleMenu = (target) => {
    if(target == 'isOpen1'){ isOpen1.value = !isOpen1.value;}else{ isOpen1.value = false; }
    if(target == 'isOpen2'){ isOpen2.value = !isOpen2.value;}else{ isOpen2.value = false; }
    if(target == 'isOpen3'){ isOpen3.value = !isOpen3.value;}else{ isOpen3.value = false; }
    if(target == 'isOpen4'){ isOpen4.value = !isOpen4.value;}else{ isOpen4.value = false; }
};

export const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
}

export const setuplanguage = () => {
   var addScript = document.createElement('script');
   addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
   document.body.appendChild(addScript);
   window.googleTranslateElementInit = googleTranslateElementInit;
}

export function openCloseMobileMenu() {
    var element = document.getElementById("mainhtml");
    element.classList.toggle("layout-menu-expanded");
}

export function layoutColopsed() {
    var element3 = document.getElementById("mainhtml");
    element3.classList.toggle("layout-menu-collapsed");
}

export function toggolSearch() {
    var element2 = document.getElementById("searchdiv");
    element2.classList.toggle("d-none");
}


import store from '../../../../store/index';
export const activemenu = store.getters["setting/activemenu"];
export function changeActive(data) {
    store.dispatch('setting/activemenuchange',data);
}
