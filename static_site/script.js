var state = {}
var thedata = {}

url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset0.json'

const config = {response: true}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    thedata = data
    storeDataAPI(data) // store data locally 


    populateFilteredRegion()
    populateFilteredNeonic()
    populateFilteredState()

    Plotly.newPlot('multi-lineplot', plotRegionNeonic(), renderLayout(), {responsive: true});
    Plotly.newPlot('multi-line-state', plotStateScatters(), renderLayoutStateScatters(), {responsive: true});
    Plotly.newPlot('subplots-state-bar', yieldpercolbyStateBar(), renderLayoutBar(), {responsive: true});
    Plotly.newPlot("subplots-state-pie", neonicsbyStatePlotPie(), renderLayoutPie(), {responsive: true})
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


  const getStoreDataAPI = (data) => {
    return data.states
  }

  const plotRegionNeonic = () => {
    const outputs = []

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
      showlegend: true,
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


  const populateFilteredState = () => {
    states_id = document.getElementById('filter-state')
    populateSelectElement(states_id, state.states)
    state.select_state_id = states_id.value
  }


  const populateSelectElement = (select_id, state_data) => {
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
      mode: 'lines+markers+text',
      name: 'Lines, Markers and Text',
      text: ['','','','','','','Production'],
      textposition: 'top right',
      textfont: {
        family: 'sans serif',
        size: 18,
        color: '#1f77b4'
      },
      xaxis: 'x1',
      yaxis: 'y1',
      type: 'scatter',
      name: 'Production'
    };
    
    var trace2 = {
      x: state.years,
      y: state.numcol[state.select_state_id],
      mode: 'lines+markers+text',
      name: 'Lines, Markers and Text',
      text: ['','','','','','','Number of Colonies'],
      textposition: 'top right',
      textfont: {
        family: 'sans serif',
        size: 18,
        color: '#1f77b4'
      },
      xaxis: 'x2',
      yaxis: 'y2',
      type: 'scatter',
      name: 'Colonies'
    };
    
    var trace3 = {
      x: state.years,
      y: [],
      mode: 'lines+markers+text',
      name: 'Lines, Markers and Text',
      text: ['', '', '', '', '', '', '', `${state.select_neonics_state_id}`],
      textposition: 'top right',
      textfont: {
        family: 'sans serif',
        size: 18,
        color: '#1f77b4'
      },
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
      font: {size: 12},
    //   width: 800,
    //   height: 700,
      showlegend: false,
      grid: {
          rows: 3,
          columns: 1,
          pattern: 'independent',
          roworder: 'bottom to top'}
      };
  }


  document.getElementById('filter-state').addEventListener("change", function(e){
    state.select_state_id = e.target.value
    Plotly.newPlot('multi-line-state', plotStateScatters(), renderLayoutStateScatters());
    Plotly.newPlot("subplots-state-pie", neonicsbyStatePlotPie(), renderLayoutPie())
    Plotly.newPlot('subplots-state-bar', yieldpercolbyStateBar(), renderLayoutBar());
  });

  document.getElementById('filter-neonic-state').addEventListener("change", function(e){
    state.select_neonics_state_id = e.target.value
    Plotly.newPlot('multi-line-state', plotStateScatters(), renderLayoutStateScatters());
  });



  neonicsbyStatePlotPie = () => {
    labels = []
    values = []

    state.neonics_metrics.forEach(el => {
      if(el.neonic !== 'Allneonic') {
        el.states_metrics.forEach(state_metric => {
          if(state.select_state_id == state_metric.state) {
            metrics = state_metric.metrics.filter(e => typeof e === 'number').reduce((a, b) => a + b, 0).toFixed(1);
            labels.push(el.neonic)
            values.push(metrics)
          }
        })
      }
    })

    return [{
      type: "pie",
      values: values,
      labels: labels,
      texttemplate: "%{percent}",
      textposition: "inside"
    }];
  }
  



  renderLayoutPie = () => {
    return { 
      title: `Neonics for ${state.select_state_id}`,
      font: {size: 12},
    //   width: 475,
    //   height: 350,
    };
  }







  yieldpercolbyStateBar = () => {
    return [{
      type: 'bar',
      x: state.years,
      y: state.yieldpercol[state.select_state_id],
      marker: {
          color: '#C8A2C8',
          line: {
              width: 2.5
          }
      }
    }]
  }
  
  renderLayoutBar = () => {
    return { 
      title: `Colony yield for ${state.select_state_id}`,
      font: {size: 12},
    //   width: 475,
    //   height: 350,
    }
  }
  




  //

  document.getElementById("pills-profile-tab").addEventListener("click", function() {

    var setHeight, setWidth;
    var height = window.innerHeight;
    var width = window.innerWidth;
  
  if (window.innerWidth <= 768){
    setWidth = width-(width/2)*0.5
    setHeight = setWidth //height-(height/2)*0.009
  } else {
    setHeight = setWidth //(height/2)-(height/2)*0.037;
    setWidth = (width/2)-(width/2)*0.037;
  }
//   console.log(width, height)
//   console.log(setWidth, setHeight)
  
  
    var update = {
      width: setWidth,  
      height: setHeight
    };
    
    // Plotly.relayout('multi-line-state', update);
    // Plotly.relayout('line', update);
  });