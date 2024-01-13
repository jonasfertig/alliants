import React from 'react';
import './Analytics.css';
import './App.css';
import Chart from 'chart.js/auto';


const Analytics = () => {

  window.onload = function() {
    const klasse = document.getElementById("klasse");
    const verlauf = document.getElementById("verlauf");
    const faecher = document.getElementById("faecher");
    Chart.defaults.color = "#fff";
    Chart.defaults.borderColor = "#fff";

    new Chart(klasse, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
        datasets: [
          {
            label: "Anzahl",
            data: [14, 9, 13, 2, 7, 5, 10],
            borderColor: ["rgba(0,0,100,1)"],
            backgroundColor: ["rgba(0,0,100,1)"],
            hoverBackgroundColor: "#dadada",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    new Chart(verlauf, {
      color: "#fff",
      borderColor: "#fff",
      type: "line",
      data: {
        labels: ["Test 1", "Test 2", "Klassenarbeit 1", "Test 3"],
        datasets: [
          {
            label: "Notenschnitt",
            data: [2.1, 1.8, 2.5, 2.3],
            borderColor:["rgba(240,240,240,1)"],
            backgroundColor: ["rgba(240,240,240,1)"],
            hoverBackgroundColor: "#dadada",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    new Chart(faecher, {
      type: "doughnut",
      data: {
        labels: ["Deutsch", "English", "Geschichte"],
        datasets: [
          {
            label: "Anzahl",
            data: [3, 5, 8],
            backgroundColor: [
              "rgba(255,0,0, 1)",
              "rgba(0,0,200, 1)",
              "rgba(255,165,0, 1)",
            ],
            hoverBackgroundColor: "#dadada",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  function refreshPage() {
    window.location.reload();
  }
  
  return (
    <div className='main'>
      <label className='header'>Dashboard - Klasse 10a</label>
      <div>
        <button className='refresh-button' onClick={refreshPage}>
          Analyze
        </button>
      </div>
        <div className="dashboard">        
          <div className="content">
            <div className="main-content">
              <div className="stats flex">
                <div class="stats-box sales">
                  <h2 class="heading2">Arbeitsblätter</h2>
                  <canvas className="klasse" id="klasse"></canvas>
                </div>

                <div class="stats-box earning">
                  <h2 class="heading">Notenverlauf</h2>
                  <canvas className='noten' id="verlauf"></canvas>
                </div>
              </div>

              <div className='stats flex'>
                
                  <div className="stats-box earning ">
                    <h2 className="head">Arbeitsblätter</h2>
                    <canvas id="faecher"></canvas>
                  </div>

                  <div className="stats-box">
                    <h2 className="heading2">Bestenliste</h2>
                    <table className="top-selling-products" height="95%" width="100%">
                      <tr>
                        <th>ID</th>
                        <th>Schüler</th>
                        <th>Klasse</th>
                        <th>Notenschnitt</th>
                      </tr>

                      <tr>
                        <td>173</td>
                        <td>
                          <div className="product-name flex">
                            <p>Adem Kokud</p>
                          </div>
                        </td>
                        <td>10a</td>
                        <td>1,1</td>
                      </tr>

                      <tr>
                        <td>256</td>
                        <td>
                          <div className="product-name flex">
                            <p>Jonathan Baumann</p>
                          </div>
                        </td>
                        <td>6c</td>
                        <td>1,3</td>
                      </tr>

                      <tr>
                        <td>721</td>
                        <td>
                          <div className="product-name flex">
                            <p>Jonas Fertig</p>
                          </div>
                        </td>
                        <td>5b</td>
                        <td>1,3</td>
                      </tr>
                    </table>
                  </div>
                
              </div>
              
            </div>
          </div>
        </div>
      <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"
      ></script>
      <script
        nomodule
        src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"
      ></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="js/script.js"></script>
      <div className='padding'>
        test
      </div>
    </div>
  );
};

export default Analytics;