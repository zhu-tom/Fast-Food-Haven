var result;

function showResults(data) {
    $('#cards').text('');
    $('#cards').append('<p>' + data.length + ' Results</p>');
    let perRow = 3;
    for (let i = 0; i < data.length; i++) {
        if (i % perRow == 0) {
            $('#cards').append('<div class="card-deck"></div>');
        }
        let card = '<div class="card mb-4">\
                        <a href="' + data[i].url + '"><img src="' + data[i].image + '" class="card-img-top" alt="No Image Found"></a>\
                        <div class="card-body">\
                            <h5 class="card-title">'+ data[i].title + '</h5>\
                            <p class="card-text">' + data[i].description +'</p>\
                        </div>\
                    </div>'
        $('#cards').children().last().append(card);
    }
    let emptyCard = '<div class="card mb-4">\
                        <div class="card-body">\
                        </div>\
                    </div>'
    if (data.length % perRow != 0) {
        for (let i = 1; i<=perRow-data.length%perRow; i++) {
            $('#cards').children().last().append(emptyCard)
        }
    }
}

$(document).ready(() => {
    data = {restaurants: ['KFC', 'McDonalds','Harveys']};
    $.ajax({
        url: '/getDeals',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: () => {
            $('#spinner').css('display', 'block');
            $('#cards').css('display', 'none');
        },
        success: (response) => {
            result = response;
            showResults(result);
            
        },
        complete: () => {
            $('#spinner').css('display', 'none');
            $('#cards').css('display', 'block');
        }
    });
    $(document).on('click', '#price', () => {
        if ($('#price').attr('value') == 'Low to High') {
            $('#price').attr('value', 'High to Low').removeClass('btn-success').addClass('btn-danger');
        }
        else {
            $('#price').attr('value', 'Low to High').removeClass('btn-danger').addClass('btn-success');
        }
    });
    $(document).on('click', '#filter', () => {
        if ($('#filter').hasClass('active')) {
            $('#filter').removeClass('active');
        }
        else {
            $('#filter').addClass('active');
        }
    });
    $(document).on('keyup', '#search', (event) => {
        let matches = [];
        let searchVal = $(event.target).val().toLowerCase();
        for (res of result) {
            if ((res.title + res.description).toLowerCase().includes(searchVal)) {
                matches.push(res);
            }
        }
        showResults(matches)
    });
});