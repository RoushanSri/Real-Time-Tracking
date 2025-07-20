const socket = io()

if(navigator.geolocation){
    navigator.geolocation.watchPosition((pos)=>{
        const {latitude, longitude} = pos.coords
        socket.emit("send-location", {latitude, longitude})
    },(error)=>{
        console.log(error);
    },{
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout:5000
    }
)
}

const map = L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "OpenStreetMap"
}).addTo(map)

const markers = {}

socket.on("recieve-location",({id, latitude, longitude})=>{
    map.setView([latitude, longitude, 26]);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
})

socket.on("user-disconnect",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})