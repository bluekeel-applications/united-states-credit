const setNewSizeParams = (url, size) => {
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const base = parser.href.split('?')[0];
    let vars = query.split('&');

    switch (size) {
        case 'sm':
            vars[0] = 'fit=250%2C150';
            let newTailS = vars[0] + '&' + vars[1];
            return base + '?' + newTailS;
        case 'lg':
            vars[0] = 'fit=450%2C350';
            let newTailL = vars[0] + '&' + vars[1];
            return base + '?' + newTailL;
        case 'xl':
            vars[0] = 'fit=675%2C525';
            let newTailXL = vars[0] + '&' + vars[1];
            return base + '?' + newTailXL;
        default:
            return url;
    }

};

export const getSrcFromHtml = (htmlString, resize = false, size) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const htmlObject = tempDiv.firstChild;
    const srcTagFull = htmlObject.getAttribute('src');
    if (resize) {
        return setNewSizeParams(srcTagFull, size);
    };
    return srcTagFull;
};

export const trimSnippet = (snippet) => {
    let res = snippet.split('Continue reading');
    return res[0];
};

export const exportToJsonFile = (jsonData, name) => {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileName = `${name}.json`;

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
};