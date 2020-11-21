'use strict';
const DOMLinks = (function () {
    return {
        editorInput: document.getElementById('editor-input'),
        fileSizeInput: document.querySelector('.file-size').querySelector('span'),
        fileTypeInput: document.querySelector('.file-type').querySelector('span'),
        charsetInput: document.querySelector('.charset').querySelector('span'),
        fontFamilyInput: document.querySelector('#font-family'),
        fontSizeInput: document.querySelector('#font-size'),
        fontStyleInput: document.querySelector('#font-style'),
        fontPreviewInput: document.querySelector('.font-settings__preview').querySelector('span')
    }
})();

const editor = (function () {
    let file, contents, fileHandle;


    async function createFile() {
        DOMLinks.editorInput.value = '';
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
        const writable = await this.fileHandle.createWritable();
        await writable.write(DOMLinks.editorInput.value);
        await writable.close();
        utilities.closeAllActiveMenus();
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
        DOMLinks.fileSizeInput.textContent = (file.size / 1024).toFixed(2) + 'KBs';
        DOMLinks.fileTypeInput.textContent = file.type.split('/')[1];
        document.title = fileHandle.name + ' - Notepad';
        utilities.closeAllActiveMenus();

    }

    async function saveFile() {
        //        await writable.write(DOMLinks.editorInput.value);
        //        await writable.close();
        //        utilities.closeAllActiveMenus();
        const writable = await fileHandle.createWritable();
        await writable.write(DOMLinks.editorInput.value);
        await writable.close();
        utilities.closeAllActiveMenus();
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
        utilities.closeAllActiveMenus();
    }

    function print() {
        window.print();
    }

    function exit() {
        self.close();
    }
    function toggleFontSettings() {
        if (document.querySelector('.window').style.display === 'block') {
            document.querySelector('.window').style.display = 'none'
        } else {
            document.querySelector('.window').style.display = 'block'
        }
    }
    function toggleStatusBar() {
        console.log(document.querySelector('.status-bar').style.display)
        if (document.querySelector('.status-bar').style.display == 'flex') {
            document.querySelector('.status-bar').style.display = 'none'
            console.log('1121212')
        } else {
            document.querySelector('.status-bar').style.display = 'flex'
        }
    }
    function saveFontSettings() {
        //RESET FONT_SETTINGS
        DOMLinks.editorInput.style.fontStyle = 'normal';
        DOMLinks.editorInput.style.fontWeight = 'normal';

        DOMLinks.editorInput.style.fontFamily = DOMLinks.fontFamilyInput.value;
        DOMLinks.editorInput.style.fontSize = DOMLinks.fontSizeInput.value + 'px';
        if (DOMLinks.fontStyleInput.value === 'bold') {
            DOMLinks.editorInput.style.fontStyle = 'normal';
            DOMLinks.editorInput.style.fontWeight = 'bold';
        } else {
            DOMLinks.editorInput.style.fontStyle = DOMLinks.fontStyleInput.value;
        }

        toggleFontSettings();
    }
    function previewFontSettings() {
        //RESET FONT_SETTINGS
        DOMLinks.fontPreviewInput.style.fontStyle = 'normal';
        DOMLinks.fontPreviewInput.style.fontWeight = 'normal';

        DOMLinks.fontPreviewInput.style.fontFamily = DOMLinks.fontFamilyInput.value;
        DOMLinks.fontPreviewInput.style.fontSize = DOMLinks.fontSizeInput.value + 'px';
        if (DOMLinks.fontStyleInput.value === 'bold') {
            DOMLinks.fontPreviewInput.style.fontStyle = 'normal';
            DOMLinks.fontPreviewInput.style.fontWeight = 'bold';
        } else {
            DOMLinks.fontPreviewInput.style.fontStyle = DOMLinks.fontStyleInput.value;
        }
    }
    return {
        createFile,
        openFile,
        saveFile,
        saveFileAs,
        print,
        toggleStatusBar,
        toggleFontSettings,
        saveFontSettings,
        previewFontSettings,
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

    //File menu settings
    document.querySelectorAll('.menu-dropdown').forEach(dropDown => {
        dropDown.addEventListener('click', (event) => {
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
                case 'Шрифт':
                    editor.toggleFontSettings();
                    break;
                case 'Строка состояния':
                    editor.toggleStatusBar();
                    break;
            }
        })
    })


    //window

    dragElement(document.querySelector('.window'));
    document.querySelector('.window__title').querySelector('span').addEventListener('click', editor.toggleFontSettings)
    document.querySelector('.font-settings__close').addEventListener('click', editor.toggleFontSettings)
    document.querySelector('.font-settings__save').addEventListener('click', editor.saveFontSettings)

    // FONT-SETTINGS LIVE PREVIEW BINDINGS
    DOMLinks.fontFamilyInput.addEventListener('change', editor.previewFontSettings);
    DOMLinks.fontSizeInput.addEventListener('change', editor.previewFontSettings);
    DOMLinks.fontStyleInput.addEventListener('change', editor.previewFontSettings);

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.querySelector('.window__title')) {
            // if present, the header is where you move the DIV from:
            document.querySelector('.window__title').onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


})