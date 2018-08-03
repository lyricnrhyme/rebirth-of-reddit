console.log("reddit");

let headerDiv = document.createElement("div");
headerDiv.id = "headerDiv";
document.body.appendChild(headerDiv);

let navBar = document.createElement("div");
navBar.id = "navBar";
document.body.appendChild(navBar);

let feedDiv = document.createElement("div");
feedDiv.id = "feedDiv";
// feedDiv.innerHTML = "hello?"
document.body.appendChild(feedDiv);

let popRed = new XMLHttpRequest();
popRed.addEventListener("load", function(req) {
    // console.log(req.currentTarget.response);
    // console.log(JSON.parse(req.currentTarget.response).data)
    console.log(JSON.parse(req.currentTarget.response).data.children);
    let posts = JSON.parse(req.currentTarget.response).data.children;
    for (let i=0; i<posts.length; i++) {
        let postDiv = document.createElement("div");
        postDiv.className = "postDiv";
        feedDiv.appendChild(postDiv);

        let picDiv = document.createElement("div");
        picDiv.className = "picDiv";
        // picDiv.style.backgroundSize = "cover";
        postDiv.appendChild(picDiv);

        let postImg = document.createElement("img");
        postImg.className = "postImg";
        if (posts[i].data.url && posts[i].data.url.includes(".jpg")) {
            // picDiv.innerHTML = "JPEG!";
            postImg.src = posts[i].data.url
        } else if (posts[i].data.url && posts[i].data.url.includes(".gif")) {
            picDiv.style.backgroundImage = "url('" + posts[i].data.url + "')";
            picDiv.innerHTML = "GIFFF";
            // console.log("this is a gif", posts[i].data.url)
        } else {
            picDiv.innerHTML = "NOT JPEG OR GIF!";
            postImg.src = "assets/redPanda404.jpg"
        }
        // if (!postImg.src) {
        //     //add replacement image
        //     postImg.src = "assets/redPanda404.jpg"
        // }
        picDiv.appendChild(postImg);
        


        let length = 50;
        let titleDiv = document.createElement("div");
        titleDiv.className = "titleDiv";
        titleDiv.innerHTML = posts[i].data.title.substring(0, length) + "...";
        postDiv.appendChild(titleDiv);

        let subTitleDiv = document.createElement("div");
        subTitleDiv.className = "subTitleDiv";
        subTitleDiv.innerHTML = "By " + posts[i].data.author;
        postDiv.appendChild(subTitleDiv);
        
        let captionDiv = document.createElement("div");
        captionDiv.className = "captionDiv";
        postDiv.appendChild(captionDiv);
    }
});
popRed.open("GET", "https://www.reddit.com/r/popular.json");
popRed.send();