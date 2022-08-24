
export let renderTitle = function (title1: string) {
    let div = document.createElement("div");
    div.setAttribute("class", "aqua");
    let innerText = document.createTextNode(title1 + " start");
    div.appendChild(innerText);
    document.body.appendChild(div);

}

export let renderEnd = function () {
    let div = document.createElement("div");
    div.setAttribute("class", "blueviolet");
    let innerText = document.createTextNode("所有测试已经完成");
    div.appendChild(innerText);
    document.body.appendChild(div);
}

export let renderPass = function (title1: string, title2: string) {
    let div = document.createElement("div");
    div.setAttribute("class", "green");
    let innerText = document.createTextNode(title1 + " : " + title2 + " pass");
    div.appendChild(innerText);
    document.body.appendChild(div);
}

export let renderError = function (title1: string, title2: string) {
    let div = document.createElement("div");
    div.setAttribute("class", "red");
    let innerText = document.createTextNode(title1 + " : " + title2 + " not pass");
    div.appendChild(innerText);
    document.body.appendChild(div);
}