"use strict";

function getCategories()
{
    return [
        {name: "Adventures",
         id: "1"}, 
        {name: "Arts & Crafts",
         id: "2"}, 
        {name: "Museums",
         id: "3"}, 
        {name: "Wine Tastings",
         id: "4"}, 
        {name: "Other",
         id: "5"}
    ];
}

function getActivities()
{
    return [
        {
             category: "Adventures", 
             id: "A101", 
             name: "Valley Hot Air Balloons", 
             description: "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.", 
             location: "121 S. Main Street",
             price: 265.00 
        },
        {
             category: "Adventures", 
             id: "A102", 
             name: "River Runners: Float Trip", 
             description: "A mellow float trip with lovely scenery, great fishing, just a few riffles, and it finishes back at our base. It is a perfect trip for those wishing to take their time, or those on a limited schedule.", 
             location: "145 FM 103",
             price: 65.00 
         },
         {
             category: "Adventures", 
             id: "A103", 
             name: "River Runners: Ride the Rapids", 
             description: "Experience 3-4 hours of Class II and III whitewater rafting with breathtaking scenery. It is a fun, thrilling, and memorable adventure that everyone from ages 8 and up can enjoy – no experience necessary!", 
             location: "145 FM 103",
             price: 145.00 
         },     
         {
             category: "Arts & Crafts", 
             id: "AC101", 
             name: "Painting with a Twist : Oils", 
             description: "Enjoy 2 hours of creating an oil painting by following along with an experienced artist.  Drinks and snacks are included.", 
             location: "1991 Paint Drive",
             price: 40.00 
         },
         {
             category: "Arts & Crafts", 
             id: "AC102", 
             name: "Painting with a Twist : Watercolor", 
             description: "Enjoy 2 hours of creating a watercolor painting by following along with an experienced artist.  Drinks and snacks are included.", 
             location: "1991 Paint Drive",
             price: 40.00 
         },   
         {
             category: "Museums", 
             id: "M101", 
             name: "Bravings Airship Museum", 
             description: "Enjoy climbing on and in our collection of small airplanes.  You will find bi-planes, experimental planes and small jets.", 
             location: "101 Airfield Drive",
             price: 10.00
         },   
         {
             category: "Museums", 
             id: "M102", 
             name: "Forks and Spoons Museum", 
             description: "Enjoy touring our qwerky Forks and Spoons Museum.  It houses the worlds largest collection of, you guessed it, forks and spoons!", 
             location: "1056 Lost Knives Court",
             price: 3.00
         },  
         {
             category: "Museums", 
             id: "M103", 
             name: "Steenges Computing Museum", 
             description: "Enjoy our the Stengees Computing Museum that illustrates how computing has changed over the last 60 years.", 
             location: "103 Technology Way",
             price: 0.00 
         },  
         {
             category: "Wine Tastings", 
             id: "WT-101", 
             name: "Hastings Winery Tours and Tastings", 
             description: "Hastings Winery is a small, family owned winery in the heart of San Jose, CA. We pride ourselves on producing single vineyard, small-batch, handcrafted premium wines sourced from the finest grapes in our valley.", 
             location: "10987 FM 1187",
             price: 12.00 
         },   
         {
             category: "Wine Tastings", 
             id: "WT-102", 
             name: "Lone Oak Winery", 
             description: "We are a family and friend centered winery that thrives to make each of our guests feel right at home. With a growing wine list of the finest local wines, we offer tours and an incredible experience. We are open for to-go, curbside, and delivery.", 
             location: "121 Burleson Court",
             price: 0.00 
         },   
         {
             category: "Other", 
             id: "OTH101", 
             name: "Fire Department: Ride Along", 
             description: "Spend the day hanging out at one of our local fire stations, visiting with the staff and learning about their jobs.  If they receive a call, you can ride along with them!", 
             location: "10 Redline Drive",
             price: 25.00 
         },   
         {
             category: "Other", 
             id: "OTH102", 
             name: "Homes For Our Neighbors", 
             description: "Yes, you are a visitor!  But what better way to learn about a community than volunteer with the locals to build affordable housing.  Whether it be for an hour or a week, we would love to have you with us!", 
             location: "Call (555) 555-5555",
             price: 0.00 
         }
     ];
}

window.onload = function()
{
    showCategoryList();

    document.getElementById("categoryList").onchange = categoryChanged;
    document.getElementById("activityList").onchange = activityChanged;
    document.getElementById("theForm").onsubmit = purchaseButtonClicked;
    document.getElementById("resetButton").onclick = resetForm;
}

// this function will display the list of categories right from the start
function showCategoryList()
{
    const categoryList = document.getElementById("categoryList");
    const categories = getCategories();

    for (let category of categories)
    {
        const option = new Option(category.name, category.id);
        categoryList.appendChild(option);
    }
}



// all functions below will only load if there are any changes or a category was selected

function categoryChanged()  
{
    const categoryValue = document.getElementById("categoryList").value;

    // if else statement to keep the activity section hidden if there's no selected category
    if (categoryValue != "0") document.getElementById("selectActivity").hidden = false;
    else document.getElementById("selectActivity").hidden = true;

    const categoryList = getCategories();
    const selectedCategory = getSelectedOption(categoryList, categoryValue);

    filterActivities(selectedCategory);
    
    // needed to call this function so that the details section will be hidden when the category suddenly changed
    activityChanged();
}

// gets the whole object/details of the selected category or activity
function getSelectedOption(list, value)
{
    for (let item of list)
    {
        if (item.id == value) return item;
    }
}

// this function will decide the activities that should show on the page based on the selected category
function filterActivities(selectedCategory)
{
    const allActivities = getActivities();
    const activities = [];

    if (selectedCategory != undefined) // this is needed to prevent error when not selecting any category 
    {
        for (let activity of allActivities)
        {
            if (activity.category == selectedCategory.name)
            {
                activities.push(activity);
            }
        }
    }

    showActivityList(activities);
}

// this function is responsible for displaying the list of activities based on the values from filterActivities
function showActivityList(activities)
{
    const activityList = document.getElementById("activityList");

    if (activityList.options.length > 1)
    {
        for (let i = activityList.options.length; i > 0 ; i--)
        {
            activityList.options[i] = null;
        }
    }

    for (let activity of activities)
    {
        const option = new Option (activity.name, activity.id)
        activityList.appendChild(option);
    }
}

// this function will only load when an activity was selected
function activityChanged()
{
    const activityValue = document.getElementById("activityList").value;
    const activityList = getActivities();
    const selectedActivity = getSelectedOption(activityList, activityValue);

    showActivityDetails(selectedActivity);
}

// displays the details of the said activity
function showActivityDetails(selectedActivity)
{
    if (selectedActivity == undefined) 
    {
        document.getElementById("activityDetails").hidden = true;
        hideThis();
    }
    else
    {
        document.getElementById("activityDetails").hidden = false;
        document.getElementById("name").innerText = selectedActivity.name;
        document.getElementById("category").innerText = selectedActivity.category;
        document.getElementById("id").innerText = selectedActivity.id;
        document.getElementById("description").innerText = selectedActivity.description;
        document.getElementById("location").innerText = selectedActivity.location;
        document.getElementById("price").innerText = selectedActivity.price;

        showForm(selectedActivity);
    }
}

// shows the form for purchasing e-tickets depending on the price
function showForm(selectedActivity)
{
    if (selectedActivity.price > 0)
    {
        resetForm();
        document.getElementById("theForm").hidden = false;
        document.getElementById("resetButton").hidden = false;
    }
    else hideThis();   
}

// will only load when the purchase button was clicked
function purchaseButtonClicked(event)
{
    event.preventDefault();
    document.getElementById("purchaseMessage").hidden = false;

    const activityValue = document.getElementById("activityList").value;
    const activityList = getActivities();
    const selectedActivity = getSelectedOption(activityList, activityValue);

    const ticketsQuantity = document.getElementById("ticketsQuantity").value;
    let amount = (+ticketsQuantity * selectedActivity.price).toFixed(2);
    document.getElementById("amount").innerText = amount;
    if (ticketsQuantity == "1")  document.getElementById("totalTickets").innerText = ticketsQuantity + " ticket";
    else  document.getElementById("totalTickets").innerText = ticketsQuantity + " tickets";
    document.getElementById("adventureName").innerText = selectedActivity.name;
    const email = document.getElementById("email").value;
    document.getElementById("emailEntered").innerText = email;
}


function resetForm()
{
    document.getElementById("purchaseMessage").hidden = true;
    document.getElementById("ticketsQuantity").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("email").value = "";
}

function hideThis()
{
    document.getElementById("theForm").hidden = true;
    document.getElementById("resetButton").hidden = true;
    document.getElementById("purchaseMessage").hidden = true;
}


