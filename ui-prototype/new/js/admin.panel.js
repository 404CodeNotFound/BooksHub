$('#books-link').click(() => {
    setNotVisible();
    let books = $('#books');
    books.removeClass('d-none');
    $('#books-link').addClass('active');
});

$('#users-link').click(() => {
    setNotVisible();
    let users = $('#users');
    users.removeClass('d-none');
    $('#users-link').addClass('active');
});

$('#authors-link').click(() => {
    setNotVisible();
    let authors = $('#authors');
    authors.removeClass('d-none');
    $('#authors-link').addClass('active');
});

$('#events-link').click(() => {
    setNotVisible();
    let events = $('#events');
    events.removeClass('d-none');
    $('#events-link').addClass('active');
});

function setNotVisible() {
    let users = $('#users');
    users.addClass('d-none');
    let books = $('#books');
    books.addClass('d-none');
    let events = $('#events');
    events.addClass('d-none');
    let authors = $('#authors');
    authors.addClass('d-none');

    let usersLink = $('#users-link');
    usersLink.removeClass('active');
    let booksLink = $('#books-link');
    booksLink.removeClass('active');
    let eventsLink = $('#events-link');
    eventsLink.removeClass('active');
    let authorsLink = $('#authors-link');
    authorsLink.removeClass('active');
}