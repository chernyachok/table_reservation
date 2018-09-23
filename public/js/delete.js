$(document).ready(function(){
  $('.delt').click(function(){
      //
      $.ajax({
        type: "DELETE",
        url: '/reservations/delete/'+this.id,
        data: {},

      }).then(function(data){
        alert(data);
        location.href="/reservations"
      })
  })

})
