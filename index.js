$(document).ready(() => {
    $.ajax({
        url: 'getCSV.php',
        method: 'GET',
        success: (response) => {
            let data = response;
            let lines = data.split("\n");

            for (let i = 1; i<lines.length;i++)
            {
                let line = lines[i].split(":");
                let title = line[0];
                let content = line[1];

                let newDiv = document.createElement("div");
                newDiv.className = "col mb-4";
                $("#cards").append(newDiv);

                let newDiv1 = document.createElement("div");
                newDiv1.className = "card";
                newDiv.appendChild(newDiv1);

                let img = document.createElement("IMG");
                img.className = "card-img-top";
                newDiv1.appendChild(img);

                let newDiv2 = document.createElement("div");
                newDiv2.className = "card-body";
                newDiv.appendChild(newDiv2);

                let newTitle = document.createElement("h5");
                newTitle.innerHTML = title;
                console.log(newTitle.innerHTML);
                newDiv2.appendChild(newTitle);
            }
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
