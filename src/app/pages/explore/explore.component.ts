import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { ViewChild,ElementRef } from '@angular/core';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})

export class ExploreComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  position:any;
  mapProperties:any;
  latlong:any;
  input:any;

  constructor() { }

  ngOnInit() {
     this.getLocation();
 }
  place(position) {
    const latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
   
    const mapProperties = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
      const map = new google.maps.Map(document.getElementById('map'), mapProperties);
      var marker = new google.maps.Marker({
        position: latlong,
        title:"Hello World!"
    });
    marker.setMap(map);
    
            // Create the search box and link it to the UI element.
            const input = document.getElementById('pac-input');
            if(input instanceof HTMLInputElement) {
              var searchBox = new google.maps.places.SearchBox(input);
            }
            
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
    
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();
    
              if (places.length == 0) {
                return;
              }
    
              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(map);
              });
              markers = [];
    
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
    
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
    
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.place);
    } else { 
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}
