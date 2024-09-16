export const toggleClass = (el, className) => {
    let element = document.querySelector(el)
    element.classList.toggle(className)
}