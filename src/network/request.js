export default class Request {
    constructor() { }
    
    async sendPostRequestAsync(url, body) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(body)
            })
            return await response.json();
        } catch (error) {
            alert(error)
        }
    }

    // uploadImage(url, pathToFile) {
    //     var data = new FormData();
    //     data.append("image", {
    //         uri: pathToFile,
    //         type: "image/*",
    //         name: new String(pathToFile).slice(pathToFile.lastIndexOf("/"))
    //     });
    //     var xhr = new XMLHttpRequest();
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             return this.responseText
    //         }
    //     });

    //     xhr.open("POST", url)
    //     xhr.send(data);
    // }

}