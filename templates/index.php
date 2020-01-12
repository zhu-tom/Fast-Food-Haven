



<!DOCTYPE html>
<html>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="/static/index.js"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">


<style>

  .card{
    border-color: black;
    background-color: #565656;
    color: #EFEFEF;
    transition: 0.5s ease;
  }

  .card:hover{
    transform: translateY(-15px);
    box-shadow: 10px 10px 5px #888888;
    transition: 0.5s ease;
  }

  .text-muted{
    color: #EFEFEF !important;
  }

  a, a:hover, a:visited, a:link, a:active {
    text-decoration: none;    
    color: #EFEFEF;
  }
  body{
    background-color: #D7CEC7;
  }

</style>



</head>
<body>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-dark bg-dark" style='margin-bottom:10px;'>
        <a style='margin-left: 44%;'class="navbar-brand" href="#">Fast Food Haven</a>
    </nav>

    <div class='container'>
        <div class='form-row'>
            <div class='col'>
                <div class="input-group">
                    <input type="text" id='search' class="form-control" placeholder="Search...">
                    <div class="input-group-append">
                        <input id='filter' type='button' class='btn btn-block btn-outline-secondary active' data-toggle="collapse" href="#filters" role="button" aria-expanded="true" aria-controls="filters" value='Filters'>
                    </div>
                </div>
            </div>
            <div class="collapse container show" id="filters">
                <div class="form-row mt-4 form-group">
                    <div class='col-1 form-inline'>
                        <label for='restaurant' class='form-label mr-2'>Restaurant</label>
                    </div>
                    <div class='col-2'>
                        <select id='restaurant' class='custom-select'>
                            <option value='All' selected>All</option>
                            <option value='A & W'>A & W</option>
                            <option value="Harvey's">Harvey's</option>
                            <option value='KFC'>KFC</option>
                            <option value='McDonalds'>McDonald's</option>
                        </select>
                    </div>
                    <div class='col-1 form-inline justify-content-end'>
                        <label for='price' class='form-label mr-0'>Order</label>
                    </div>
                    <div class='col-2'>
                        <select id='ordering' class='custom-select'>
                            <option value='Low to High' selected>Low to High</option>
                            <option value="High to Low">High to Low</option>
                            <option value='Expiring Soon'>Earliest Expiry</option>
                        </select>
                    </div>
                    <div class='col'>
                        <input type='button' style='float:right;' class='btn btn-light' id='applyFilters' value='Apply'>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
    </div>
    <div class='container'>
    <div class="d-flex justify-content-center">
            <div id='spinner' class="spinner-border" style='display:none' role="status">
                <span class="sr-only">Loading...</span>
            </div>
    </div>
    <div id = "cards">

    </div>
</body>
</html>
