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
        picDiv.style.backgroundSize = "cover";

        let postImg = document.createElement("img");
        postImg.className = "postImg";
        picDiv.appendChild(postImg);
        postImg.style.display = "none";

        let videoPost = document.createElement("video");
        videoPost.className = "videoPost";
        videoPost.style.width = "100%";
        videoPost.style.height = "100%";
        videoPost.style.controls;
        picDiv.appendChild(videoPost);

        let videoSrc = document.createElement("source");
        videoSrc.className = "videoSrc";
        videoPost.appendChild(videoSrc);

        if (posts[i].data.url && posts[i].data.url.includes(".jpg")) {
            // picDiv.innerHTML = "JPEG!";
            picDiv.style.backgroundImage = "url('" + posts[i].data.url + "')"
        } else if (posts[i].data.url.includes(".gif")) {
            let splitUrl = "";
            if (posts[i].data.url.includes("imgur")) {
                splitUrl = posts[i].data.url.split("");
                splitUrl.pop();
                splitUrl = splitUrl.join("");
                postImg.src = splitUrl;
            } else {
                picDiv.style.backgroundImage = "url('" + posts[i].data.url + "')";
            }

            postImg.style.display = "block";
        } else if (posts[i].data.url.includes(".png")) {
            picDiv.style.backgroundImage = "url('" + posts[i].data.url + "')"
        } else if (posts[i].data.url.includes("v.redd")) {
            videoSrc.src = posts[i].data.media.reddit_video.fallback_url;
            videoSrc.type = "video/mp4";
            //add link to video element
        }else {
            picDiv.innerHTML = "NOT JPEG OR GIF!";
        }
        if (!picDiv.style.backgroundImage && !postImg.src && !videoSrc.src) {
            picDiv.style.backgroundImage = "url('assets/redPanda404.jpg')"
        }
        postDiv.appendChild(picDiv);

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