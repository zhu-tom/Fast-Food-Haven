

<?php
  $data = file_get_contents("mcdonalds_coupon.csv");
?>

<!DOCTYPE html>
<html>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">Fast Food Haven</a>
    </nav>

  <div id = "cards" class = "col mb-4">
  </div>

  <div style="display:none">
      <textarea id="alldata"><?php echo $data ?></textarea>
  </div>

</body>
</html>

<script>
   let data = $("#alldata").val();

   let lines = data.split("\n");
   for(let i = 1; i<lines.length;i++)
   {
     let line = lines[i].split(":");
     let title = line[0];
     let content = line[1];

     let newDiv = document.createElement("div");
     newDiv.className = "col mb-4";
     $("#cards").append(newDiv);

     let newDiv2 = document.createElement("div");
     newDiv2.className = "card-body";
     newDiv.appendChild(newDiv2);

     let newTitle = document.createElement("h5");
     newTitle.innerHTML = title;
     console.log(newTitle.innerHTML);
     newDiv2.appendChild(newTitle);

   }
</script>

<!-- <div class="col mb-4">
  <div>
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
</div>
<div class="col mb-4">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
</div>
<div class="col mb-4">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
    </div>
  </div>
</div>
<div class="col mb-4">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
</div> -->
