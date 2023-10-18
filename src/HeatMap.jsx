import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

function HeatMap() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [district, setDistrict] = useState('');
    const [category, setCategory] = useState('');
    const [mapHtml, setMapHtml] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const map = L.map('map').setView([10.706512, 122.581742], 12);
         
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Move zoom control to upper right corner
        map.zoomControl.remove();
        L.control.zoom({ position: 'topright' }).addTo(map);

    
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            day: day,
            month: month,
            year: year,
            district: district,
            category: category
        };

        console.log(data)
        
        try {
            const response = await axios.post('http://localhost:8000/heatmap', data);
            console.log(response.data);
            setMapHtml(response.data.html);
            setSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
        }
        
    };
    


    return (
        <>
        <div className='position-relative'>

        <div className=' w-100 m-0 vh-100'>
        {!submitted && (
          <div id="map" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}></div>
        )}
        <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
      </div>




        <div className="d-lg-flex shadow d-md-flex py-4 px-3 d-sm-flex d-none flex-column gap-2 col-3 col-md-4 col-sm-5 col-12" style={{ borderRadius: '0 10px 10px 0', backgroundColor: 'white', position: 'absolute', top: '10px', left: '0', zIndex: 999, fontSize: '14px'}}>
            <div className='border text-start'>
                <h4>Iloilo City Crime Visualization</h4>
                <p>
                Please use the dropdowns below to select your preferences and visualize credible crime data in heatmaps for Iloilo City. This data is sourced from the local police, ensuring reliability and accuracy. Your selections will help generate visual representations of crime patterns, providing valuable insights into the city's safety and security.

                </p>
            </div>
        <form onSubmit={handleSubmit} className=' text-start d-flex flex-column'>
            <hr />
        <div className='px-3 gap-2 d-flex'>
                <label className='w-50 '>
                    Day:
                </label>
                <select className='w-50' value={day} onChange={e => setDay(e.target.value)}>
                    <option value="">All Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </div>

            <hr />

            <div className='px-3 gap-2 d-flex'>
                <label className='w-50 '>
                    Month:
                </label>
                <select className='w-50' value={month} onChange={e => setMonth(e.target.value)}>
                    <option value="">All Months</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
            </div>

            <hr />
            
            <div className='px-3 gap-2 d-flex'>
            <label className='w-50 '>
                    Year:
                </label>
                <select className='w-50' value={year} onChange={e => setYear(e.target.value)}>
                    <option value="">All Year</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>

            <hr />

            <div className='px-3 gap-2 d-flex'>
            <label className='w-50 '>
                    District: 
                </label>
                <select className='w-50' value={district} onChange={e => setDistrict(e.target.value)}>
                    <option value="">All Districts</option>
                    <option value="Arevalo">Arevalo</option>
                    <option value="Mandurriao">Mandurriao</option>
                    <option value="Jaro">Jaro</option>
                    <option value="Molo">Molo</option>
                    <option value="City Proper">City Proper</option>
                    <option value="Lapaz">Lapaz</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <hr />

            <div className='px-3  gap-2 d-flex'>
            <label className='w-50 '>
                    Category:
                </label>

                <select className='w-50'  value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Crimes Against Personal Liberty And Security">Crimes Against Personal Liberty And Security</option>
                    <option value="Crimes Against Persons">Crimes Against Persons</option>
                    <option value="Crimes Against Property">Crimes Against Property</option>
                    <option value="Final Provisions">Final Provisions</option>
                    <option value="Crimes Against Honor">Crimes Against Honor</option>
                    <option value="Crimes Committed By Public Officers">Crimes Committed By Public Officers</option>
                    <option value="Quasi-Offenses">Quasi-Offenses</option>
                    <option value="Crimes Against National Security & The Law Of The Nations">Crimes Against National Security & The Law Of The Nations</option>
                    <option value="Crimes Against Public Order">Crimes Against Public Order</option>
                    <option value="Crimes Against The Civil Status Of Persons">Crimes Against The Civil Status Of Persons</option>
                    <option value="Crimes Against Popular Representation">Crimes Against Popular Representation</option>
                    <option value="Crimes Against Public Interest">Crimes Against Public Interest</option>
                    <option value="Presedential Decree">Presedential Decree</option>
                    <option value="Crimes Against The Fundamental Laws Of The State">Crimes Against The Fundamental Laws Of The State</option>
                    <option value="Crimes Against Chastity">Crimes Against Chastity</option>
                    <option value="Crimes Against Public Morals">Crimes Against Public Morals</option>
                </select>
            </div>

            <hr />

            <div className='px-3 d-flex justify-content-end'>
            <input style={{fontSize: '14px'}} className='btn btn-primary px-3 py-1' type="submit" value="Submit" />
            </div>
        </form>

       

      </div>
      </div>

        </>
        
    );
}

export default HeatMap;
