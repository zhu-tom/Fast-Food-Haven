$(document).ready(() => {
    $.ajax({
        url: 'getCSV.php',
        method: 'GET',
        success: (response) => {
            let data = response;
            let lines = data.split("\n");
            lines = lines.slice(1);
            console.log(lines);

            for (let i = 0; i < lines.length-1; i++) {
                if (i % 3 == 0) {
                    $('#cards').append('<div class="card-deck"></div>');
                }
                let line = lines[i].split(":");

                let card = '<div class="card mb-4">\
                                <img src="..." class="card-img-top" alt="...">\
                                <div class="card-body">\
                                    <h5 class="card-title">'+ line[0] + '</h5>\
                                    <p class="card-text">' + line[1] +'</p>\
                                </div>\
                            </div>'
                $('#cards').children().last().append(card);
            }

            // for (let i = 1; i<lines.length;i++)
            // {
            //     let line = lines[i].split(":");
            //     let title = line[0];
            //     let content = line[1];

            //     let newDiv = document.createElement("div");
            //     newDiv.className = "col mb-4";
            //     $("#cards").append(newDiv);

            //     let newDiv2 = document.createElement("div");
            //     newDiv2.className = "card-body";
            //     newDiv.appendChild(newDiv2);

            //     let newTitle = document.createElement("h5");
            //     newTitle.innerHTML = title;
            //     console.log(newTitle.innerHTML);
            //     newDiv2.appendChild(newTitle);
            // }
        }
    });
    $(document).on('click', '#price', (event) => {
        if ($('#price').attr('value') == 'Low to High') {
            $('#price').attr('value', 'High to Low').removeClass('btn-success').addClass('btn-danger');
        }
        else {
            $('#price').attr('value', 'Low to High').removeClass('btn-danger').addClass('btn-success');
        }
    });
});
