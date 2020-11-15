const DOMLinks = (function () {
    return {
        editorInput: document.getElementById('editor-input'),
        fileSizeInput: document.querySelector('.file-size').querySelector('span'),
        fileTypeInput: document.querySelector('.file-type').querySelector('span'),
        charsetInput: document.querySelector('.charset').querySelector('span'),
    }
})();

const editor = (function () {
    let file, contents, fileHandle, writable;

    function createFile() {

    }
    async function openFile() {

        // Prompt user to select text file and assign file to fileHandle variable

        const [data] = await window.showOpenFilePicker();
        fileHandle = data;

        // Assign file values to editor's variables

        file = await fileHandle.getFile();
        contents = await file.text();

        // Set ready text into textarea

        DOMLinks.editorInput.value = contents;
        DOMLinks.fileSizeInput.textContent= (file.size / 1024).toFixed(2) + 'KBs';
        DOMLinks.fileTypeInput.textContent = file.type.split('/')[1];
        
        utilities.closeAllActiveMenus();

    }

    async function saveFile() {
        console.log(fileHandle);
        writable = await fileHandle.createWritable();
        console.log(writable);
    }

    async function saveFileAs() {
        const options = {
            types: [
                {
                    description: 'Text Files',
                    accept: {
                        'text/plain': ['.txt', '.text'],
                        'text/html': ['.html', '.htm']
                    }
                }
            ]
        }
        fileHandle = await window.showSaveFilePicker(options);
        
        const writable = await fileHandle.createWritable();
        await writable.write(DOMLinks.editorInput.value);
        await writable.close();
    }

    function print() {

    }

    function exit() {

    }
    return {
        createFile,
        openFile,
        saveFile,
        saveFileAs,
        saveFileAs,
        print,
        exit
    }
})();

const utilities = (function () {
    const closeAllActiveMenus = (currentMenuItem) => {
        let activeMenuItems = Array.from(document.querySelectorAll('.active-menu-item'));
        activeMenuItems.forEach(menuItem => {
            if (currentMenuItem !== undefined && menuItem.textContent === currentMenuItem.textContent) {
                return;
            }
            menuItem.classList.remove('active-menu-item')
        })
    }
    return {
        closeAllActiveMenus,
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    //    document.querySelector('.menu-item').addEventListener('click', (event) => {
    //        event.target.querySelector('')
    //    })
    document.getElementsByTagName('body')[0].addEventListener('click', (event) => {
        let element = event.target;
        if (element.parentElement.parentElement.className === 'menu-dropdown') {
            return;
        } else {
            //            let activeMenuItems = Array.from(document.querySelectorAll('.active-menu-item'));
            //            activeMenuItems.forEach(menuItem => {
            //                if (menuItem.textContent === element.textContent) {
            //                    return;
            //                }
            //                menuItem.classList.remove('active-menu-item')
            //            })

            utilities.closeAllActiveMenus(element);

            if (element.className.includes('menu-item')) {
                element.classList.toggle('active-menu-item');
            }
        }

    })
    document.querySelector('.menu-dropdown').addEventListener('click', (event) => {
        let element = event.target;
        switch (element.textContent) {
            case 'Создать':
                editor.createFile();
                break;
            case 'Открыть':
                editor.openFile();
                break;
            case 'Сохранить':
                editor.saveFile();
                break;
            case 'Сохранить как...':
                editor.saveFileAs();
                break;
            case 'Параметры страницы':
                editor.pageSettings();
                break;
            case 'Печать':
                editor.print();
                break;
            case 'Выход':
                editor.exit();
                break;
        }
    })
})