$('#users-category').on('click', (ev) => {
    let usersIcon = $('.fa-users');
    let booksIcon = $('.fa-book');
    let eventsIcon = $('.fa-calendar');

    if (usersIcon.hasClass('selected')) {
        usersIcon.removeClass('selected');
    } else {
        booksIcon.removeClass('selected');
        eventsIcon.removeClass('selected');
        usersIcon.addClass('selected');
    }
});

$('#books-category').on('click', (ev) => {
    let usersIcon = $('.fa-users');
    let booksIcon = $('.fa-book');
    let eventsIcon = $('.fa-calendar');

    if (booksIcon.hasClass('selected')) {
        booksIcon.removeClass('selected');
    } else {
        usersIcon.removeClass('selected');
        eventsIcon.removeClass('selected');
        booksIcon.addClass('selected');
    }
});

$('#events-category').on('click', (ev) => {
    let usersIcon = $('.fa-users');
    let booksIcon = $('.fa-book');
    let eventsIcon = $('.fa-calendar');

    if (eventsIcon.hasClass('selected')) {
        eventsIcon.removeClass('selected');
    } else {
        usersIcon.removeClass('selected');
        booksIcon.removeClass('selected');
        eventsIcon.addClass('selected');
    }
});

$('#search-input-field').keypress((event) => {
    if (event.key === 'Enter') {
        showResults();
    }

});

$('#btn-search').click(() => {
    showResults();
})

function showResults() {
    $('.arrow-object').attr("src", "img/arrow-object-white.svg");
    let resultsSection = $('#results');
    resultsSection.removeClass('d-none');
    let usersIcon = $('.fa-users');
    let booksIcon = $('.fa-book');
    let eventsIcon = $('.fa-calendar');

    let usersResults = $('#search-results-users');
    usersResults.addClass('d-none');
    let booksResults = $('#search-results-books');
    booksResults.addClass('d-none');
    let eventsResults = $('#search-results-events');
    eventsResults.addClass('d-none');

    if (usersIcon.hasClass('selected')) {
        usersResults.removeClass('d-none');
    } else if (booksIcon.hasClass('selected')) {
        booksResults.removeClass('d-none');
    } else if (eventsIcon.hasClass('selected')) {
        eventsResults.removeClass('d-none');
    } else {
        booksResults.removeClass('d-none');                
    }
}