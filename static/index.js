var original, sortedState, perRow = 3;
var nearest;

function refreshTimes(data) {
    let currDate = new Date();
    for (let i = 0; i < data.length; i++) {
        let expTime = new Date(data[i].expires.datetime);
        let days = Math.floor((expTime-currDate)/1000/60/60/24);
        let hours = Math.floor((expTime-currDate)/1000/60/60%24);
        data[i].expires.timeTo = {days: days, hours: hours};
    }
    return data;
}

function showResults(data) {
    $('#cards').text('');
    $('#cards').append('<div class="row"><div class="col-2"><p>' + data.length + ' Results</p></div><div class="col-8"></div><div class="col-2"><div class="btn-group" id="magnification" style="float:right;" role="group"><button type="button" value="-1" class="btn btn-secondary btn-sm">-</button><button value="1" type="button" class="btn btn-secondary btn-sm">+</button></div></div></div>');
    let currDate = new Date();
    for (let i = 0; i < data.length; i++) {
        if (i % perRow == 0) {
            $('#cards').append('<div class="card-deck"></div>');
        }
        let expTime = new Date(data[i].expires.datetime);
        let days = Math.floor((expTime-currDate)/1000/60/60/24);
        let hours = Math.floor((expTime-currDate)/1000/60/60%24);
        data[i].expires.timeTo = {days: days, hours: hours};

        let card = '<div class="card mb-4">\
                        <a href="' + data[i].url + '"><img src="' + data[i].image + '" class="card-img-top" alt="No Image Found"></a>\
                        <div class="card-body" style="padding-top:1rem; padding-right:1rem;">\
                            <div style="padding-left:1em; padding-right:0.75em;" class="row justify-content-between">\
                                <a href="' + data[i].url + '"><h5 class="card-title">'+ data[i].title + '</h5></a>\
                                <button class="btn btn-primary btn-sm location" style="float:right;"><a'+ (nearest[data[i].restaurant] != null ? ' href="https://www.google.com/maps/place/?q=place_id:' + nearest[data[i].restaurant].destid + '"' : '') + '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/></svg>'+(nearest[data[i].restaurant] != null ? nearest[data[i].restaurant].rows[0].elements[0].distance.text : 'Closed')+'</a></button>\
                            </div>\
                            <p class="card-text">' + data[i].description +'</p>\
                        </div>\
                        <div class="card-footer">\
                            <small class="text-muted">Expires: ' + data[i].expires.display + ' (' + (days != 1 && days != 0 ? days + ' days' : days != 0 ? days + ' day' : '') + (hours != 1 && hours != 0 ? ' ' + hours + ' hours' : hours != 0 ? ' ' + hours + ' hour' : '') + ')</small>\
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

function getLocation(d1) {
    if (navigator.geolocation) {
        var options = {timeout:60000};
        navigator.geolocation.getCurrentPosition((position)=> {
            data = {lat: position.coords.latitude, lon: position.coords.longitude, restaurant: 'McDonalds'};
            console.log(data);
            $.ajax({
                url: '/getNearest',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                beforeSend: () => {
                    $('#spinner').css('display', 'block');
                    $('#cards').css('display', 'none');
                },
                success: (response) => {
                    nearest = {"A & W": response.AW, "McDonalds": response.McDonalds, "Harvey's": response.Harveys, "KFC": response.KFC};
                    console.log(nearest);
                    d1.resolve();
                }
            });
        }, (err) => {
            if (err.code == 1) {
                alert('Access denied');
            }
            else if (err.code == 2) {
                alert('Position unavailable');
            }
        }, options);
    }
    else {
        alert("Browser does not support geolocation");
    }
}

function sortPrices(data, key) {
    if (key === 'Low to High') {
        let arrPrice = [];
        let arrLocal = [];
        for(res of data)
        {
            if((res.description).includes("$"))
            {
                let i = (res.description).indexOf("$");
                let price = parseFloat((res.description)[i+1]+(res.description)[i+2]+(res.description)[i+3]+(res.description)[i+4]);
                arrPrice.push(price);
            }
            else
            {
                arrPrice.push(0);
            }
        }
        var myMapping =new Map();
        for(let a =0; a<data.length;a++)
        {
            myMapping.set(arrPrice[a],data[a]);
        }

        arrPrice.sort((a,b) => a-b);

        for(let i =0; i<data.length;i++)
        {
            arrLocal.push(myMapping.get(arrPrice[i]));
        }
        return arrLocal;
    }
    else if (key === "High to Low") {
        let arrPrice = [];
        let arrLocal = [];
        for(res of data)
        {
            if((res.description).includes("$"))
            {
                let i = (res.description).indexOf("$");
                let price = parseFloat((res.description)[i+1]+(res.description)[i+2]+(res.description)[i+3]+(res.description)[i+4]);
                arrPrice.push(price);
            }
            else
            {
                arrPrice.push(0);
            }
        }
        var myMapping =new Map();
        for(let a =0; a<data.length;a++)
        {
            myMapping.set(arrPrice[a],data[a]);
        }

        arrPrice.sort((a,b) => b-a);

        for(let i =0; i<data.length;i++)
        {
            arrLocal.push(myMapping.get(arrPrice[i]));
        }
        return arrLocal;
    }
    else {
        data.sort((a, b) => {
            a = (a.expires.timeTo.days + (a.expires.timeTo.hours/24));
            b = (b.expires.timeTo.days + (b.expires.timeTo.hours/24));

            return a-b;
        });
        return data;
    }
}

function applyFilters(data) {
    copy = [];
    for (res of data) {
        if (res.restaurant == $('#restaurant').val() || $('#restaurant').val() == 'All') {
            copy.push(res);
        }
    }
    sortedState = sortPrices(copy, $('#ordering').val());
    return sortedState;
}

$(document).ready(() => {
    var d1 = $.Deferred();
    getLocation(d1);
    $.when(d1).done(() => {
        $.ajax({
            url: '/getDeals',
            method: 'POST',
            contentType: 'application/json',
            beforeSend: () => {
                $('#spinner').css('display', 'block');
                $('#cards').css('display', 'none');
            },
            success: (response) => {
                original = response;
                console.log(response);
                refreshTimes(original);
                sortedState = sortPrices(JSON.parse(JSON.stringify(original)), 'Low to High');
                showResults(sortedState);
    
            },
            complete: () => {
                $('#spinner').css('display', 'none');
                $('#cards').css('display', 'block');
            }
        });
    });
    
    $('#applyFilters').on('click', () => {
        showResults(applyFilters(original));
    });
    $(document).on('click', '#magnification > button', (event) => {
        perRow = perRow + parseInt($(event.target).val());
        if (perRow < 1) {
            perRow = 1;
        }
        else if (perRow > 6) {
            perRow = 6;
        }
        showResults(sortedState);
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
        for (res of original) {
            if ((res.title + res.description).toLowerCase().includes(searchVal)) {
                matches.push(res);
            }
        }
        showResults(applyFilters(matches));
    });
});
