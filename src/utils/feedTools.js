export const getSrcFromHtml = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    let htmlObject = tempDiv.firstChild;
    return htmlObject.getAttribute('src');
};

export const trimSnippet = (snippet) => {
    let res = snippet.split('Continue reading');
    return res[0];
};