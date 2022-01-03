url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json'

config = {response: true}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    console.log(data.all_states)

    populateFilteredRegion(data.all_regions)
    populateFilteredNeonic(data.neonics)
    //populateFilteredState()

    neonic=document.getElementById('filter-neonic').value
    region=document.getElementById('filter-region').value
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(data.states_metrics, JSON.parse(data.years)), renderLayout(region, neonic), {responsive: true});
})


  const plotRegionNeonic = (states_metrics, years) => {
    // console.log(states_metrics)
    // console.log(years)
    outputs = []
    states_metrics.forEach(el => {
      var trace = {
        x: years,
        y: el.metrics,
        type: 'scatter',
        name: el.state
      };
      outputs.push(trace)
    })
    return outputs
  };

  const renderLayout = (region='West', neonic='nAllNeonic') => {
    console.log(region, neonic)
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

  const populateFilteredRegion = (allregions) => {
    region = document.getElementById('filter-region') // 
    allregions.forEach(el => {
      var option = document.createElement("OPTION");  // Create a <OPTION> node
      var textnode = document.createTextNode(el); // Create a text node
      option.appendChild(textnode);  // Append the text to <li>
      region.appendChild(option);  // Append <li> to <ul> with id="myList"
    })
  }

  const populateFilteredNeonic = (allneonics) => {
    neonics = document.getElementById('filter-neonic') // filter-neonic
    allneonics.forEach(el => {
      var option = document.createElement("OPTION");  // Create a <OPTION> node
      var textnode = document.createTextNode(el); // Create a text node
      option.appendChild(textnode);  // Append the text to <li>
      neonics.appendChild(option);  // Append <li> to <ul> with id="myList"
    })

    neonics = document.getElementById('filter-neonic-state') // filter-neonic-state
    allneonics.forEach(el => {
      var option = document.createElement("OPTION");  // Create a <OPTION> node
      var textnode = document.createTextNode(el); // Create a text node
      option.appendChild(textnode);  // Append the text to <li>
      neonics.appendChild(option);  // Append <li> to <ul> with id="myList"
    })

  }

const regionDynamicPlot = (region='West', neonic='nAllNeonic') => {
  url2 = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset1.json'
  fetch(url2)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    data.all_metrics.forEach(el => {
      if (region === el['region'] & neonic == el['neonic']){
        Plotly.newPlot('multi-lineplot', plotRegionNeonic(el['states_metrics'], data.years[0]), renderLayout(region, neonic), {responsive: true});
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