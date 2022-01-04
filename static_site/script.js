state = {}

url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset0.json'

config = {response: true}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)

    storeDataAPI(data) // store data locally 

    populateFilteredRegion()
    populateFilteredNeonic()
    populateFilteredState()

    //plotRegionNeonic()
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(), renderLayout(), {responsive: true});
})

  const storeDataAPI = (data) => {
    state.neonics = data.all_neonics[0]
    state.regions = data.all_regions[0]
    state.states = data.all_states[0]
    state.years = data.years[0]
    state.neonics_metrics = data.all_metrics

  }


  const plotRegionNeonic = () => {
    outputs = []
    state.neonics_metrics.forEach(el => {
      if (state.select_region_id === el.region & state.select_region_neonic_id === el.neonic) {
        el.states_metrics.forEach(state_metric => {
          console.log(state_metric.metrics, state_metric.state)
          var trace = {
            x: state.years,
            y: state_metric.metrics,
            type: 'scatter',
            name: state_metric.state
          };
          outputs.push(trace)
        })
      }
    })
    return outputs
  };

  const renderLayout = () => {
    var layout = {
      //showlegend: false,
      title: `${state.select_region_id} Region for ${state.select_region_neonic_id}`,
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
    region_id = document.getElementById('filter-region')
    populateSelectElement(region_id, state.regions)
    state.select_region_id = document.getElementById('filter-region').value
  }

  const populateFilteredNeonic = () => {
    neonics_region_id = document.getElementById('filter-neonic') 
    populateSelectElement(neonics_region_id, state.neonics)
    state.select_region_neonic_id = document.getElementById('filter-neonic').value

    neonics_state_id = document.getElementById('filter-neonic-state') 
    populateSelectElement(neonics_state_id, state.neonics)
    state.select_neonics_state_id= document.getElementById('filter-neonic-state').value
  }

  populateFilteredState = () => {
    states_id = document.getElementById('filter-state')
    populateSelectElement(states_id, state.states)
  }

  populateSelectElement = (select_id, state_data) => {
    state_data.forEach(el => {
      var option = document.createElement("OPTION");  
      var textnode = document.createTextNode(el); 
      option.appendChild(textnode);  
      select_id.appendChild(option);  
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