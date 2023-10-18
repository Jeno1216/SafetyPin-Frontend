import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import axios from 'axios';

function Home() {
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [safestPathMapHtml, setSafestPathMapHtml] = useState('');
  const [shortestPathMapHtml, setShortestPathMapHtml] = useState('');
  const [safestPathWeight, setSafestPathWeight] = useState(0);
  const [shortestPathWeight, setShortestPathWeight] = useState(0);

  useEffect(() => {
    const map = L.map('map').setView([10.706512, 122.581742], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const startMarker = L.marker([10.706512, 122.581742], { draggable: true, icon: blueIcon }).addTo(map);
    const endMarker = L.marker([10.706512, 122.582742], { draggable: true, icon: redIcon }).addTo(map);

    setStartMarker(startMarker);
    setEndMarker(endMarker);

    // Add submit button event handler
    const submitButton = L.control({ position: 'topright' });
    submitButton.onAdd = (map) => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      div.innerHTML = '<button class="py-1 px-3 rounded-1 shadow" style="background-color: rgba(228, 230, 232, 0.5); border: 1px solid white; font-size: 14px;" onclick="submitLocations()">Submit</button>';
      return div;
    };
    submitButton.addTo(map);
    
    // Define the submitLocations function
    window.submitLocations = async () => {
      if (startMarker && endMarker) {
        const startLatLng = startMarker.getLatLng();
        const endLatLng = endMarker.getLatLng();

        try {
            const response = await axios.post('http://localhost:8000/find_path', {
                start_lat: startLatLng.lat,
            start_lon: startLatLng.lng,
            end_lat: endLatLng.lat,
            end_lon: endLatLng.lng,
          });

          const {
            safest_path_map_html,
            shortest_path_map_html,
            safest_path_weight,
            shortest_path_weight,
          } = response.data;

          setSafestPathMapHtml(safest_path_map_html);
          setShortestPathMapHtml(shortest_path_map_html);
          setSafestPathWeight(safest_path_weight);
          setShortestPathWeight(shortest_path_weight);
        } catch (error) {
          console.error('Error submitting locations:', error);
        }
      }
    };

    // Cleanup function to remove the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div id="map" style={{ width: '100%', height: '100%', position: 'relative' }}></div>
      <div id="dashboard" className="shadow m-3 col-lg-3 col-md-4 col-sm-6 col-8 position-absolute rounded" style={{ bottom: 0, zIndex: 999, fontSize: '14px', backdropFilter: 'blur(3px)', border: '1px solid rgb(255, 255, 255)' }}>
        <form id="submit_form" className="d-flex flex-column gap-2 p-3">
          <div className="d-flex justify-content-between">
            <label htmlFor="start_lat"> Start Latitude: </label>
            <input style={{ border: '2px solid white', outline: 'none' }} readOnly className="rounded-1" type="text" name="start_lat" id="start_lat" />
          </div>
          <div className="d-flex justify-content-between">
            <label htmlFor="start_lon"> Start Longitude: </label>
            <input style={{ border: '2px solid white', outline: 'none' }} readOnly className="rounded-1" type="text" name="start_lon" id="start_lon" />
          </div>
          <div className="d-flex justify-content-between">
            <label htmlFor="end_lat"> End Latitude: </label>
            <input style={{ border: '2px solid white', outline: 'none' }} readOnly className="rounded-1" type="text" name="end_lat" id="end_lat" />
          </div>
          <div className="d-flex justify-content-between">
            <label htmlFor="end_lon"> End Longitude: </label>
            <input style={{ border: '2px solid white', outline: 'none' }} readOnly className="rounded-1" type="text" name="end_lon" id="end_lon" />
          </div>
        </form>
      </div>
      <div id="result" className="shadow m-3 col-lg-3 col-md-4 col-sm-6 col-8 position-absolute rounded" style={{ top: 0, zIndex: 999, fontSize: '14px', backdropFilter: 'blur(3px)', border: '1px solid rgb(255, 255, 255)' }}>
        <h3 className="mt-3 ml-3">Path Information</h3>
        <div className="ml-3 mb-3">
          <p><strong>Safest Path Weight:</strong> {safestPathWeight}</p>
          <p><strong>Shortest Path Weight:</strong> {shortestPathWeight}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
