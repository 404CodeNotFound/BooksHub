import $ from 'jquery';

const requester = {
    getAuthorized: (token, url) => {
        return $.ajax({
            url: url,
            type: "GET",
            headers: { "authorization": `Bearer ${token}` }
        });
    },
    get: (url) => {
        return $.ajax({
            url: url,
            type: "GET"
        });
    },
    postAuthorized: (token, url, body) => {
        return $.ajax({
            url: url,
            type: "POST",
            body: body,
            headers: { "authorization": `Bearer ${token}` }
        });
    },
    post: (url, body) => {
        return $.ajax({
            url: url,
            type: "POST",
            body: body
        });
    }
}

export default requester;