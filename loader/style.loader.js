function loader(source) {
    let style = `
        let style = doument.creatElement("style");
        style.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(style)
    `
    return style;
}
module.exports = loader;