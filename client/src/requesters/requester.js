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
            data: body,
            headers: { "authorization": `Bearer ${token}` }
        });
    },
    post: (url, body) => {
        return $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: body
        });
    },
    putAuthorized: (token, url, body) => {
        return $.ajax({
            url: url,
            type: "PUT",
            data: body,
            headers: { "authorization": `Bearer ${token}` }
        });
    },
    deleteAuthorized: (token, url, body) => {
        return $.ajax({
            url: url,
            type: "DELETE",
            data: body,
            headers: { "authorization": `Bearer ${token}` }
        });
    },
}

export default requester;