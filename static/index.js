var result;

function showResults(data) {
    $('#cards').append('<p>' + data.length + ' Results</p>');
    console.log(data);
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
    // $.ajax({
    //     url: 'getCSV.php',
    //     method: 'GET',
    //     success: (response) => {
    //         let data = response;
    //         let lines = data.split("\n");
    //         lines = lines.slice(1);
    //         console.log(lines);

    //         for (let i = 0; i < lines.length-1; i++) {
    //             if (i % 3 == 0) {
    //                 $('#cards').append('<div class="card-deck"></div>');
    //             }
    //             let line = lines[i].split(":");

    //             let card = '<div class="card mb-4">\
    //                             <img src="..." class="card-img-top" alt="...">\
    //                             <div class="card-body">\
    //                                 <h5 class="card-title">'+ line[0] + '</h5>\
    //                                 <p class="card-text">' + line[1] +'</p>\
    //                             </div>\
    //                         </div>'
    //             $('#cards').children().last().append(card);
    //         }

    //         // for (let i = 1; i<lines.length;i++)
    //         // {
    //         //     let line = lines[i].split(":");
    //         //     let title = line[0];
    //         //     let content = line[1];

    //         //     let newDiv = document.createElement("div");
    //         //     newDiv.className = "col mb-4";
    //         //     $("#cards").append(newDiv);

    //         //     let newDiv2 = document.createElement("div");
    //         //     newDiv2.className = "card-body";
    //         //     newDiv.appendChild(newDiv2);

    //         //     let newTitle = document.createElement("h5");
    //         //     newTitle.innerHTML = title;
    //         //     console.log(newTitle.innerHTML);
    //         //     newDiv2.appendChild(newTitle);
    //         // }
    //     }
    // });
    $(document).on('click', '#price', (event) => {
        if ($('#price').attr('value') == 'Low to High') {
            $('#price').attr('value', 'High to Low').removeClass('btn-success').addClass('btn-danger');
        }
        else {
            $('#price').attr('value', 'Low to High').removeClass('btn-danger').addClass('btn-success');
        }
    });
});