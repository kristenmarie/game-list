
$('.info').on('click', function(){
  itemsObj = {};
  $this = $(this);
  itemsObj.gameImg = $this.parent().parent().find('img').attr('src');
  itemsObj.gameTitle  = $this.parent().parent().find('h2').text();
  itemsObj.gameInfo = $this.parent().parent().find('p').text();
  // call the callback function parameter and send itemsObj as argument, callback function then received the argument as you wanted it to be. Then execute stuff from there.
  //callback(itemsObj);
  var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
  oldItems.push(itemsObj);
  localStorage.setItem('itemsArray', JSON.stringify(oldItems));
});

$('#btn-profile-view').on('click', function(){
  if(localStorage.getItem('itemsArray')){
    var favsResult;
    var savedLocal = localStorage.getItem('itemsArray');
    savedLocal = JSON.parse(savedLocal);
    console.log('here is savedLocal: ', savedLocal);
    console.log('savedLocal', savedLocal[0]);
    var savedLocalMap = savedLocal.map(function(obj){
      favsResult = $('.favs-display-data');
      favsOutput = `<div class="col-lg-3 game">
                  <div class="view view-first">
                    <img src="${obj.gameImg}"/>
                    <div class="mask">
                      <h2>${obj.gameTitle}</h2> 
                      <p>${obj.gameInfo}</p>
                      <a href="#" class="info">♥</a>
                    </div>
                  </div>
                </div>`
      var result = favsResult.append(favsOutput);
      // if($(favsResult).children().length % 3 === 0){
      //   favsResult.append(`<div class="row">${favsOutput}</div>`);
      // }
    });
  }
});



