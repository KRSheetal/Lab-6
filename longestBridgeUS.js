
let usaMapCoordinates = [39.50, -99.0]
let zoomLevel = 2 //1= whole world 20 = city blocks

let map = L.map('usa-map').setView(usaMapCoordinates, zoomLevel)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//L.tileLayer('https://{s}.tile.roadtraffic-technology.com/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.roadtraffic-technology.com/features/feature-the-ten-longest-suspension-bridges-in-the-us/">roadtraffic-technology</a> contributors'
}).addTo(map);

bridges =  [
    {"name": "Verrazano-Narrows Bridge","span":1298.4,"span_text": "1298.4m", "city": "New York","location": [40.6066, -74.0447] },
    {"name": "Golden Gate Bridge","span":1280,"span_text":"1280.2m","city": "San Francisco and Marin","location": [37.8199, -122.4783] },
    {"name": "Mackinac Bridge","span":1158,"span_text": "1158.0m" , "city": "Mackinaw and St Ignace", "location": [45.8174, -84.7278] },
    {"name": "George Washington Bridge","span":1067,"span_text": "1067.0m","city": "New York and New Jersey", "location": [40.8517, -73.9527] },
    {"name": "Tacoma Narrows Bridge","span":853.44,"span_text": "853.44m","city": "Tacoma and Kitsap", "location": [47.2690, -122.5517] }
]

let spanArray = [] //an array to store spans
let bridgesNameArray = [] //an array to store names of the bridge
//prepare an array
bridges.forEach(function (bridgesmap){
    spanArray.push(bridgesmap.span)
    bridgesNameArray.push(bridgesmap.name)
})

// Instead of the default marker, draw a bridge icon at the locations. You'll find a tutorial at Leaflet's website. Example icon: https://www.flaticon.com/free-icon/bridge_183412.
//var iconUrl = "https://www.flaticon.com/free-icon/bridge_183412?k=1663994995607&sign-up=email" //icon's url

//prepare an icon to adjust to map
let bridgeIcon = L.icon({
    iconUrl: 'bridge.png', //the icon png chosen
    iconSize: [25, 25], //icon size on the map
    // iconAnchor:[-12, -12],
    popupAnchor: [-3, -76] //the position of the anchor on the map
})

//var longestBridgeIconUrl = "https://www.flaticon.com/free-icon/golden-gate-bridge_774232" // longest icon's url
// Examine your bridge data array and use JavaScript to figure out which bridge is longest. Draw the marker for this bridge in a different color. You can change the colors of an icon if you register for a Flaticon account.

let longestBridgeIcon = L.icon({
    iconUrl: 'longestBridge.png', //the longest bridge icon
    iconSize: [30, 30], //icon size on the map
    // iconAnchor:[-12, -12],
    popupAnchor: [-3, -76]//the position of the anchor on the map
})

let longestSpan = Math.max(...spanArray)// the longest bridge
 bridges.forEach(function (longestBridgeMap){//the bridge icon to each bridge marker
     //draw a marker for this bridges map
     let markerTextLongest = `${longestBridgeMap.name}<br>${longestBridgeMap.city}<br>${longestBridgeMap.span_text}`//shows when marker is clicked

     if (longestSpan === longestBridgeMap.span) { //if this is the longest, show unique icon
         L.marker(longestBridgeMap.location, {icon: longestBridgeIcon}).bindPopup(markerTextLongest).addTo(map)  //an icon is seen
     } else { //if not the longest show the other icon
         L.marker(longestBridgeMap.location, {icon: bridgeIcon}).bindPopup(markerTextLongest).addTo(map) //an icon is seen
     }
 })

//show the location covered in uniquely
let usaMapCircle = L.circle(usaMapCoordinates, {
    color: 'green', //color of the location
    radius: 3000000, //radius covering
    fillOpacity: 0.25, //makes it opac
})
    .bindPopup('USA map') //labels this map area
    .addTo(map) //add this is map

//Chart canvas
//script for bar chart
let canvas = document.querySelector('#longest-bridge-chart')//prepare canvas for chart
let context = canvas.getContext('2d') //set the look

let bridgeChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: bridgesNameArray, //labels the bars with name
        datasets: [{
            label: 'longest bridges', //label of the bar
            data: spanArray, //draw chart according to span
            backgroundColor: ['blue','cyan','yellow','green','red'] //color of the bars
        }]
    },
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true //shows the chart scale from zero
                }
            }]
        }
    }
})