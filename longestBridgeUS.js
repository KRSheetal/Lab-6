
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
// var iconBridge = "https://www.flaticon.com/free-icon/bridge_183412?k=1663994995607&sign-up=email"
// // var iconMarker = new map.Marker(iconBridge, {icon:iconBridge})
// const icons= {icon: "bridge.png"}

let spanArray = []
let bridgesNameArray = []
bridges.forEach(function (bridgesmap){
    //draw a marker for this bridges map
    let markerText = `${bridgesmap.name}<br>${bridgesmap.city}<br>${bridgesmap.span_text}`
    L.marker(bridgesmap.location).bindPopup(markerText).addTo(map)
    spanArray.push(bridgesmap.span)
    bridgesNameArray.push(bridgesmap.name)
})
// let longestSpan = Math.max(...spanArray)
//
// let longestColor = L.span(longestSpan, {
//     color: 'red'
// })
//     .bindPopup('USA map')
//     .addTo(map)

//TODO Part 2a (Optional for extra credit +3 points)
//
// Instead of the default marker, draw a bridge icon at the locations. You'll find a tutorial at Leaflet's website. Example icon: https://www.flaticon.com/free-icon/bridge_183412.
// Examine your bridge data array and use JavaScript to figure out which bridge is longest. Draw the marker for this bridge in a different color. You can change the colors of an icon if you register for a Flaticon account.

let usaMapCircle = L.circle(usaMapCoordinates, {
    color: 'green',
    radius: 3000000,
    fillOpacity: 0.25,
})
    .bindPopup('USA map')
    .addTo(map)

//Chart canvas
let canvas = document.querySelector('#longest-bridge-chart')
let context = canvas.getContext('2d')

let bridgeChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: bridgesNameArray,
        datasets: [{
            label: 'longest span',
            data: spanArray,
            backgroundColor: ['blue','cyan','yellow','green']
        }]
    },
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true
                }
            }]
        }
    }
})