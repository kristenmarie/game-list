 $('.retrieve-data').click(function () {
 var displayResources = $('.display-data');
 
 $.ajax({
 type: 'GET',
 url: 'js/data.json',
 async: false,
 dataType: 'json',
 success: function(result) {
 var output;
  console.log(output);
  var items = [];
  $.each(result, function(index, item){ 
    items.push(item);
    console.log('item:', item);
    console.log(items);
    localStorage.setItem("item", JSON.stringify(items));
    output = `<div class="view view-first">
                  <img src="${item.gameImg}"/>
                  <div class="mask">
                    <h2>${item.gameTitle}</h2> 
                    <p>${item.gameInfo}</p>
                    <a href="#" class="info">♥</a>
                  </div>
                </div>`
    displayResources.append(output);
  });
  }
  });
 });



