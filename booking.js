         var booking_id;
         var b_id=document.getElementById('B_Id');
         var table = document.getElementById('bookingTable');
                
                for(var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                        
                        booking_id=this.cells[0].innerHTML;
                        console.log(booking_id);   
                         b_id.innerHTML=booking_id;                      
                    };
                }
         
          
          function openPopup() {
            document.getElementById("popup").style.display = "block";
            document.getElementById("TAB2").style.display = "none";

          }

          function closePopup() {
            document.getElementById("popup").style.display = "none";
            document.getElementById("TAB2").style.display = "block";

          }