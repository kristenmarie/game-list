 $('.retrieve-data').click(function () {
 var displayResources = $('.display-data');
 
 $.ajax({
 type: 'GET',
 url: 'js/data.json',
 async: false,
 dataType: 'json',
 success: function(result) {
  var output;
  var items = [];
  $.each(result, function(index, item){ 
    items.push(item);
    console.log('item:', item);
    console.log(items);
    localStorage.setItem("item", JSON.stringify(items));
    output = `<div class="col-lg-3 game">
                <div id="${item.gameId}" class="view view-first">
                  <img src="${item.gameImg}"/>
                  <div class="mask">
                    <h2>${item.gameTitle}</h2> 
                    <p>${item.gameInfo}</p>
                    <a href="#" class="info">♥</a>
                  </div>
                </div>
              </div>`
    displayResources.append(output);
  });
  }
  });
  var test2 = localStorage.getItem("item");
  test2 = JSON.parse(test2);
  console.log('test2 total:', test2);
  console.log('testing2:', test2[0]);
  console.log('testing2:', test2[1]);
  console.log('testing2:', test2[2]);
 });

// function getItem(callback){
//   var itemsObj;
//   $('.info').on('click', function(){
//     itemsObj = {}
//     // $this = $(this);
//     // var itemN = $this.parent().parent().find('h2').text();
//     // console.log(itemN);
//     $this = $(this);
//     itemsObj.gameImg = $this.parent().parent().find('img').attr('src');
//     itemsObj.gameTitle  = $this.parent().parent().find('p').text();
//     itemsObj.gameInfo = $this.parent().parent().find('h2').text();
//     callback(itemsObj);
//     // test3 = test2 = localStorage.getItem("item");
//     // test3 = JSON.parse(test3);
//     // console.log('test3: ', test3);
//     // console.log('clicked');
//     // var result = test3.map(function(o){

//     });

//   //return itemsObj;
// }

// function getItem(callback){
//   var itemsObj;
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
// }

$('#btn-profile-view').on('click', function(){
  if(localStorage.getItem('itemsArray')){
    var savedLocal = localStorage.getItem('itemsArray');
    console.log('here is savedLocal: ', savedLocal);
    savedLocal = JSON.parse(savedLocal);
    var savedLocalMap = savedLocal.map(function(obj){
      var favsResult = $('.favs-display-data');
      $.each(obj, function(index, key, value){
        console.log('hey im value 0:', key,  value);
        favsOutput = `<div class="col-lg-3 game">
                  <div class="view view-first">
                    <img src="${key.value}"/>
                    <div class="mask">
                      <h2>${key.value}</h2> 
                      <p>${key.value}</p>
                      <a href="#" class="info">♥</a>
                    </div>
                  </div>
                </div>`
        favsResult.append(favsOutput);
      });
    });
  }
});

// send a function instead for getItem to call when all is well
// getItem(function (data) {
//    // here you will receive the data
//    console.log('from function:', data);
//    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
//    oldItems.push(data);
//    localStorage.setItem('itemsArray', JSON.stringify(oldItems));

//    if(localStorage.getItem('itemsArray')){
//     console.log('i have it');
//     var savedLocal = localStorage.getItem('itemsArray');
//     console.log('here is savedLocal: ', savedLocal);
//     savedLocal = JSON.parse(savedLocal);
//     var savedLocalMap = savedLocal.map(function(obj){
//       var favsResult = $('.favs-display-data');
//       $.each(obj, function(key, value){
//         console.log(key + ' ' + value);
//         favsOutput = `<div class="col-lg-3 game">
//                   <div class="view view-first">
//                     <img src="${value}"/>
//                     <div class="mask">
//                       <h2>${value}</h2> 
//                       <p>${value}</p>
//                       <a href="#" class="info">♥</a>
//                     </div>
//                   </div>
//                 </div>`
//         favsResult.append(favsOutput);
//       });
//     });
//   }
// });

// $('.info').on('click', function(){
//   itemsObj = {};
//   itemsArray = [];
//   $this = $(this);
//   itemsObj.gameImg =  $this.parent().parent().find('img').attr('src');
//   itemsObj.gameTitle = $this.parent().parent().find('h2').text();
//   itemsObj.gameInfo = $this.parent().parent().find('p').text();
//   // getting previous info
//   var savedInfo = localStorage.getItem("gamesinfo");
//   // since everything is saved as string , we need to use json
//   savedInfo = JSON.parse(savedInfo);
//   // check if its not null
//   savedInfo = savedInfo ? savedInfo : {};
//   // use a unique identifier to save objects , do not push the object into an array every time
//   //savedInfo[itemsObj.gameTitle] = itemsObj;
//   //savedInfo[itemsObj.gameTitle] = itemsObj;
//   savedInfo = itemsArray.push(savedInfo);
//   // stringify data and save it
//   localStorage.setItem("gamesinfo", JSON.stringify(savedInfo));
  
  
  
//   // to retrieve all of games info:
//   var savedGames = JSON.parse(localStorage.getItem("gamesinfo"));
//   console.log(savedGames);
//   //console.log('sendFavs:', sendToFavs(savedGames));
// });



// function sendToFavs(obj){

//   localStorage.setItem('obj', JSON.stringify(obj));
//   var result = '';
//   $.each(obj, function(key, value){
//     result += key + ', ' + value + "\n";
//   });
//   console.log('inside sendToFavs:', obj);
//   console.log('result here: ', result);
//   return result;
// }



