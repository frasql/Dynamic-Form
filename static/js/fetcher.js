export async function getData(url) {
    let h = new Headers();
    h.append("content-Type", "application/json");

    let options = {
        "method": "GET",
        "mode": "cors",
        "headers": h
    }

    let req = new Request(url, options);

    try {
        let response = await fetch(req);
        return response.json();
    }catch(e) {
        console.log(e)
    }
}


export async function createComponent(url, node_name, name) {
    let h = new Headers();
    h.append("content-Type", "application/json");

    let options = {
        "method": "POST",
        "mode": "cors",
        "headers": h,
        "body": JSON.stringify({
            "node_name": node_name,
            "name": name
        })
    }

    let req = new Request(url, options);

    try {
        let response = await fetch(req);
        return response.json();
    }catch(e) {
        console.log(e)
    }
}
  