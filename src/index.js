import PopupWidget from './PopupWidget'

export default {
    install (Vue) {
        Vue.component('PopupWidget', PopupWidget)
    }
}

// this line is what makes it possible for the user of the 
// component to be able to use it in a local component if he needs to
export { PopupWidget }