
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
    let innerText = document.createTextNode(title1 + " : " + title2 + "not pass");
    div.appendChild(innerText);
    document.body.appendChild(div);
}