state = {}

url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset0.json'

config = {response: true}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)

    storeData(data) // store data locally 

    populateFilteredRegion()
    populateFilteredNeonic()
    populateFilteredState()

    //neonic=document.getElementById('filter-neonic').value
    //document.getElementById('filter-region').value

    //Plotly.newPlot('multi-lineplot', plotRegionNeonic(data.all_metrics, data.years, region, neonic), renderLayout(region, neonic), {responsive: true});
})

  const storeData = (data) => {
    state.neonics = data.all_neonics[0]
    state.regions = data.all_regions[0]
    state.states = data.all_states[0]
    state.years = data.years[0]
    state.neonics_metrics = data.all_metrics

  }

  const plotRegionNeonic = (states_metrics, years, region, neonic) => {
    //console.log(states_metrics)
    //console.log(years)
    outputs = []
    states_metrics.forEach(el => {
      if (el.region === region & el.neonic === neonic) {
        console.log(el.region, el.neonic)
        var trace = {
          x: years[0],
          y: el.metrics,
          type: 'scatter',
          name: el.states_metrics.state
        };
        outputs.push(trace)
      }
    })
    return outputs
  };

  const renderLayout = (region='West', neonic='nAllNeonic') => {

    var layout = {
      //showlegend: false,
      title: `${region} Region for ${neonic}`,
      xaxis: {
        title: 'Years',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Kilograms (Kg)',
        showline: false
      }
    };
    return layout
  }

  const populateFilteredRegion = () => {
    region = document.getElementById('filter-region') // 
    state.regions.forEach(el => {
      var option = document.createElement("OPTION");  // Create a <OPTION> node
      var textnode = document.createTextNode(el); // Create a text node
      option.appendChild(textnode);  // Append the text to <li>
      region.appendChild(option);  // Append <li> to <ul> with id="myList"
    })
  }

  const populateFilteredNeonic = () => {
    neonics_region = document.getElementById('filter-neonic') // filter-neonic
    state.neonics.forEach(el => {
      var option = document.createElement("OPTION");  // Create a <OPTION> node
      var textnode = document.createTextNode(el); // Create a text node
      option.appendChild(textnode);  // Append the text to <li>
      neonics_region.appendChild(option)
    })
    neonics_state = document.getElementById('filter-neonic-state') // filter-neonic-state
    state.neonics.forEach(el => {
      var option = document.createElement("OPTION");  
      var textnode = document.createTextNode(el); 
      option.appendChild(textnode);  
      neonics_state.appendChild(option);  
    })
  }

  populateFilteredState = () => {
    console.log(state.states)
    states_el = document.getElementById('filter-state')
    state.states.forEach(el => {
      var option = document.createElement("OPTION");  
      var textnode = document.createTextNode(el); 
      option.appendChild(textnode);  
      states_el.appendChild(option);  
    })
  }


const regionDynamicPlot = (region='West', neonic='nAllNeonic') => {
  url2 = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset0.json'
  fetch(url2)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    data.all_metrics.forEach(el => {
      if (region === el['region'] & neonic == el['neonic']){
        //Plotly.newPlot('multi-lineplot', plotRegionNeonic(el['states_metrics'], data.years[0]), renderLayout(region, neonic), {responsive: true});
      }
    })
  })
} 


document.getElementById('filter-region').addEventListener("change", function(e){
  neonic=document.getElementById('filter-neonic').value
  regionDynamicPlot(region=e.target.value, neonic=neonic)
});


document.getElementById('filter-neonic').addEventListener("change", function(e){
  region=document.getElementById('filter-region').value
  regionDynamicPlot(region=region, neonic=e.target.value)
});





var trace1 = {
  x: [0, 1, 2],
  y: [10, 11, 12],
  type: 'scatter'
};

var trace2 = {
  x: [2, 3, 4],
  y: [100, 110, 120],
  xaxis: 'x2',
  yaxis: 'y2',
  type: 'scatter'
};

var trace3 = {
  x: [3, 4, 5],
  y: [1000, 1100, 1200],
  xaxis: 'x3',
  yaxis: 'y3',
  type: 'scatter'
};

var data = [trace1, trace2, trace3];

var layout = {
grid: {
    rows: 3,
    columns: 1,
    pattern: 'independent',
    roworder: 'bottom to top'}
};

Plotly.newPlot('multi-line-state', data, layout);


var data = [
  {
      type: "pie",
      values: [2, 5, 3, 2.5],
      labels: ["R", "Python", "Java Script", "Matlab"],
      texttemplate: "%{label}: %{value} (%{percent})",
      textposition: "inside"
  }
];

Plotly.newPlot("subplots-state-pie", data, config)

// subplots-state-pie