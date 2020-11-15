document.addEventListener('DOMContentLoaded', () => {
    //    document.querySelector('.menu-item').addEventListener('click', (event) => {
    //        event.target.querySelector('')
    //    })
    document.getElementsByTagName('body')[0].addEventListener('click', (event) => {
        let element = event.target;
        if (element.parentElement.parentElement.className === 'menu-dropdown') {
            console.log(element)
            return;
        } else {
            let activeMenuItems = Array.from(document.querySelectorAll('.active-menu-item'));
            activeMenuItems.forEach(menuItem => {
                if (menuItem.textContent === element.textContent) {
                    return;
                }
                menuItem.classList.remove('active-menu-item')
            })
            if (element.className.includes('menu-item')) {
                element.classList.toggle('active-menu-item');
            }
        }

    })
})