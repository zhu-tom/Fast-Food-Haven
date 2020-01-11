$(document).ready(() => {
    $(document).on('click', '#price', (event) => {
        if ($('#price').attr('value') == 'Low to High') {
            $('#price').attr('value', 'High to Low').removeClass('btn-success').addClass('btn-danger');
        }
        else {
            $('#price').attr('value', 'Low to High').removeClass('btn-danger').addClass('btn-success');
        }
    });
});