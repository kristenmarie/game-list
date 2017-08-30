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

 /*<div class="view view-first">
               <img src="img/deathstranding.jpg"/>
               <div class="mask">
               <h2>Death Stranding</h2>
               <p>Death Stranding is an upcoming action video game developed by Kojima Productions and published by Sony Interactive Entertainment for PlayStation 4. It is the first game by game director Hideo Kojima and his company following the 2015 disbandment of Kojima Productions as a subsidiary of Konami and subsequent reformation as an independent studio.</p>
                   i<a href="#" class="info">♥</a>
               </div>
             </div>*/



