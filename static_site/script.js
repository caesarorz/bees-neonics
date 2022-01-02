// fetch('https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json')
//   .then(response => response.json())
//   .then(columns => console.log(columns))
//   .catch(error => console.log(error));
  

url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json'

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)

    // linear plot by region
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(data.states_metrics, JSON.parse(data.years)), renderLayout(), {responsive: true});

    populateFilteredRegion(data.all_regions)
    populateFilteredNeonic(data.neonics)
})


  const plotRegionNeonic = (states_metrics, years) => {
    console.log(states_metrics)
    console.log(years)
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

  const renderLayout = (title) => {
    var layout = {
      //showlegend: false,
      title: 'Global Emissions 1990-2011',
      xaxis: {
        title: 'GDP per Capita',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Percent',
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

const regionDynamicPlot = (region) => {
  url2 = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset1.json'
  fetch(url2)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    data.all_metrics.forEach(el => {
      if (region === el['region']){
        Plotly.newPlot('multi-lineplot', plotRegionNeonic(el['states_metrics'], data.years[0]), renderLayout(), {responsive: true});
      }
    })
  })
} 

const neonicDynamicPlot = (neonic) => {
  url2 = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset1.json'
  fetch(url2)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    console.log(data)
  })
} 

document.getElementById('filter-region').addEventListener("change", function(e){
  regionDynamicPlot(e.target.value)
});


document.getElementById('filter-neonic').addEventListener("change", function(e){
  neonicDynamicPlot(e.target.value)
});


//regionDinamicPlot()
