$(function () {
    var myOptions = {
        zoom: 16,
        center: new google.maps.LatLng(20.67644842172207, -101.35654463273977),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $('label').addClass("active");

    map = new google.maps.Map(document.getElementById("mapa"), myOptions);

    var pin = new google.maps.Marker({
        position: new google.maps.LatLng(20.67644842172207, -101.35654463273977),
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    var geocoder = new google.maps.Geocoder();

    map.addListener("click", function(event) {
        geocoder.geocode({ 'latLng': event.latLng }, function(results, status) {
            $("#direccion").val(results[0].formatted_address);
        });
        map.panTo(event.latLng);
        pin.setPosition(event.latLng);
        $('#lat').val(event.latLng.lat());
        $('#long').val(event.latLng.lng());
    });

    pin.addListener("dragend", function(event) {
        geocoder.geocode({ 'latLng': event.latLng }, function(results, status) {
            $("#direccion").val(results[0].formatted_address);
        });
        map.panTo(pin.getPosition());
        $('#lat').val(pin.getPosition().lat());
        $('#long').val(pin.getPosition().lng());

    });
    var search = new google.maps.places.Autocomplete($("#direccion")[0]);
    search.bindTo("bounds", map);

    search.addListener('place_changed', function() {
        var place = search.getPlace();
        map.panTo(place.geometry.location);
        pin.setPosition(place.geometry.location);
        $('#lat').val(place.geometry.location.lat());
        $('#long').val(place.geometry.location.lng());
    });
});    
