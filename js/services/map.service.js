
//temp
var nums = 1
var markArr = []

export const mapService = {
    initMap,
    addMarker,
    panTo,
    removeMarker
}


// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener('click', (ev) => {
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                var marker = mapService.addMarker({ lat, lng })
                markArr.push(marker)
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: `mark${nums++}`
    })
    return marker
}


function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAjLJQCyka1xBkUgb4kLF8_S6c1BJajXww'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function removeMarker() {
    // console.log(markArr)
    // console.log(markArr[0].title)
    markArr[markArr.length -1].setMap(null)
    markArr.pop()

}
