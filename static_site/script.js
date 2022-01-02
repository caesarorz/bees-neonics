url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json'

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)

    populateFilteredRegion(data.all_regions)
    populateFilteredNeonic(data.neonics)

    neonic=document.getElementById('filter-neonic').value
    region=document.getElementById('filter-region').value
    console.log(region, neonic)
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


