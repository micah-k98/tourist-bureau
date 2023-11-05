"use strict";

function getHikingTrails()
{
   return [
      {
         id: "H101", 
         name: "Birding Loop", 
         description: "The Birding Loop takes you through cedar forests, open plains, and beautiful spring time creeks.  Along the way, you might see some of out 225 annually recorded bird species, including the beautiful Painted Bunting, the adorable Tufted Titmouse, or even a high-flying Red-Tailed Hawk. The terrain is generally flat and the trail is well marked.",
         scenicImage: "birding_loop_1.png",
         trailMapImage: "birding_loop_2.png",
         length: "2.3 miles", 
         difficulty: 2 
      },
      {
          id: "H102", 
          name: "Deep Blue Pool Trail", 
          description: "This gem features an amazing natural pool surrounded by overhanging cliffs.  A 1-mile trail leads down to the pool from the parking lot. The trail is moderately steep, requiring solid footwork but the destination is worth the walk!",
          scenicImage: "deep_blue_1.png",
          trailMapImage: "deep_blue_2.png",
          length: "2 miles", 
          difficulty: 2 
       },
       {
          id: "H103", 
          name: "Overlook Trail", 
          description: "The Overlook Trail offers a sweeping view of the valley on this quick, but steep, trail. Keep a close eye on small children and do not get too close to exposed edges.",
          scenicImage: "overlook_trail_1.png",
          trailMapImage: "overlook_trail_2.png",
          length: ".7 miles", 
          difficulty: 2 
       },
  ];
}

window.onload = function()
{
   trailList();
   document.getElementById("trailList").onchange = trailNameChanged;
}

// will load the list of trails right away when the page loads
function trailList()
{
   const selectTrail = document.getElementById("trailList");
   const trailInfo = getHikingTrails();

   for (let item of trailInfo)
   {
      const option = new Option(item.name, item.id);
      selectTrail.appendChild(option);
   }
}


// all functions below will only load when there's a selected trail

function trailNameChanged()
{
   const trailValue = document.getElementById("trailList").value;
   const trailInfo = getHikingTrails();
   const selectedTrail = getSelectedOption(trailInfo, trailValue);

   isUndefined(selectedTrail);   
}

// verifies if there's a trail selected or not
function isUndefined(selectedTrail)
{
   if (selectedTrail == undefined)
   {
      document.getElementById("trailDetails").hidden = true;
      document.getElementById("trailPhotos").hidden = true;
   }
   else 
   {
      showTrailDetails(selectedTrail);
      showImages(selectedTrail);
   }
}

function showTrailDetails(selectedTrail)
{
   document.getElementById("trailDetails").hidden = false;
   document.getElementById("name").innerText = selectedTrail.name;
   document.getElementById("description").innerText = selectedTrail.description;
   document.getElementById("length").innerText = selectedTrail.length;
   document.getElementById("difficulty").innerText = selectedTrail.difficulty;
}

function showImages(selectedTrail)
{
   document.getElementById("trailPhotos").hidden = false;
   document.getElementById("trailImage").src = "images/" + selectedTrail.scenicImage;
   document.getElementById("trailImage").alt = selectedTrail.name;
   document.getElementById("trailMap").src = "images/" + selectedTrail.trailMapImage;
   document.getElementById("trailMap").alt = selectedTrail.name;

}
