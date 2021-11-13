require(["/library_path/zip-fs.min.js"], zip => {
    const { fs, configure } = zip;
    // ...
});

zip.configure({
    useWebWorkers: false
});

var dropArea = document.querySelector(".container");

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
})

dropArea.addEventListener("dragleave", (event) => {
    event.preventDefault();
    dropArea.classList.remove("active");
})

// dropArea.addEventListener("drop", (event) => {
//     event.preventDefault();
// })

dropArea.addEventListener("drop", async event => {
    const target = getFileElement(event.target);
    stopEvent(event);
    if (target) {
        const targetNode = getFileNode(target);
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
            const item = event.dataTransfer.items[0];
            const file = event.dataTransfer.files[0];
            if (item && file && !item.type.includes("zip") && !file.name.endsWith(".zip") && item.webkitGetAsEntry !== undefined) {
                const fileEntry = await item.webkitGetAsEntry();
                const entry = await model.addFileSystemEntry(fileEntry, targetNode);
                if (fileEntry.isDirectory) {
                    selectDirectory(target);
                    expandTree(targetNode);
                }
                refreshTree();
                refreshListing();
                if (fileEntry.isDirectory) {
                    selectDirectory(findFileElement(entry.id));
                }
            } else {
                const file = item.getAsFile();
                try {
                    await model.importZip(file, targetNode);
                } catch (error) {
                    alert(error);
                }
                selectDirectory(target);
                expandTree(targetNode);
                refreshTree();
                refreshListing();
            }
        } else {
            const srcNode = getFileNode(selectedDrag);
            if (targetNode != srcNode && targetNode != srcNode.parent && !targetNode.isDescendantOf(srcNode)) {
                model.move(srcNode, targetNode);
                targetNode.expanded = target.open = true;
                refreshTree();
                refreshListing();
            } else {
                hoveredElement.classList.remove("drag-over");
            }
        }
    }
}, false); 