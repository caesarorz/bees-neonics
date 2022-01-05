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

    Plotly.newPlot('multi-lineplot', plotRegionNeonic(), renderLayout(), {responsive: true});
    Plotly.newPlot('multi-line-state', plotStateScatters(), renderLayoutStateScatters());
})

  const storeDataAPI = (data) => {
    state.neonics = data.all_neonics[0]
    state.regions = data.all_regions[0]
    state.states = data.all_states[0]
    state.years = data.years[0]
    state.neonics_metrics = data.all_metrics
    state.numcol = data.numcol
    state.priceperlb = data.priceperlb
    state.prodvalue = data.prodvalue
    state.totalprod = data.totalprod
    state.yieldpercol = data.yieldpercol
  }


  const plotRegionNeonic = () => {
    outputs = []
    state.neonics_metrics.forEach(el => {
      if (state.select_region_id === el.region & state.select_region_neonic_id === el.neonic) {
        el.states_metrics.forEach(state_metric => {
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
    state.select_region_id = region_id.value
  }

  const populateFilteredNeonic = () => {
    neonics_region_id = document.getElementById('filter-neonic') 
    populateSelectElement(neonics_region_id, state.neonics)
    state.select_region_neonic_id = neonics_region_id.value

    neonics_state_id = document.getElementById('filter-neonic-state') 
    populateSelectElement(neonics_state_id, state.neonics)
    state.select_neonics_state_id = neonics_state_id.value
  }

  populateFilteredState = () => {
    states_id = document.getElementById('filter-state')
    populateSelectElement(states_id, state.states)
    state.select_state_id = states_id.value
  }

  populateSelectElement = (select_id, state_data) => {
    state_data.forEach(el => {
      var option = document.createElement("OPTION");  
      var textnode = document.createTextNode(el); 
      option.appendChild(textnode);  
      select_id.appendChild(option);  
    })
  }


  document.getElementById('filter-region').addEventListener("change", function(e){
    state.select_region_id = e.target.value
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(), renderLayout(), {responsive: true});
  });

  document.getElementById('filter-neonic').addEventListener("change", function(e){
    state.select_region_neonic_id = e.target.value
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(), renderLayout(), {responsive: true});
  });





  const plotStateScatters = () => {
    var trace1 = {
      x: state.years,
      y: state.totalprod[state.select_state_id],
      xaxis: 'x1',
      yaxis: 'y1',
      type: 'scatter',
      name: 'Production'
    };
    
    var trace2 = {
      x: state.years,
      y: state.numcol[state.select_state_id],
      xaxis: 'x2',
      yaxis: 'y2',
      type: 'scatter',
      name: 'Colonies'
    };
    
    var trace3 = {
      x: state.years,
      y: [],
      xaxis: 'x3',
      yaxis: 'y3',
      type: 'scatter',
      name: `${state.select_neonics_state_id}`
    };

    state.neonics_metrics.forEach(el => {
      if (state.select_neonics_state_id === el.neonic) {
        el.states_metrics.forEach(metric => {
          if (metric.state === state.select_state_id) {
            trace3.y = metric.metrics
          }
        })
      }
    })

    return [trace3, trace2, trace1]
  }

  const renderLayoutStateScatters = () => {
    return {
      title: `Production, number of colonies and ${state.select_neonics_state_id} for ${state.select_state_id}`,
      font: {size: 10},
      width: 800,
      height: 700,
      grid: {
          rows: 3,
          columns: 1,
          pattern: 'independent',
          roworder: 'bottom to top'}
      };
  }





  var data = [{
    type: "pie",
    values: [2, 5, 3, 2.5],
    labels: ["1", "2", "3", "4"],
    texttemplate: "%{label}: %{value} (%{percent})",
    textposition: "inside"
  }];
  
  var layout = { 
    title: 'Responsive to window\'s size!',
    font: {size: 10},
    width: 400,
    height: 300,
  };

  Plotly.newPlot("subplots-state-pie", data, layout)







  var trace1 = {
    type: 'bar',
    x: [1, 2, 3, 4],
    y: [5, 10, 2, 8],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
  };
  
  var data = [ trace1 ];
  
  var layout = { 
    title: 'Responsive to window\'s size!',
    font: {size: 10},
    width: 400,
    height: 300,
  };
  
  var config = {responsive: true}
  
  Plotly.newPlot('subplots-state-bar', data, layout );