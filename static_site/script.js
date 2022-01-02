// fetch('https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json')
//   .then(response => response.json())
//   .then(columns => console.log(columns))
//   .catch(error => console.log(error));




  
df = {"columns": ["numcol", "prod", "neoc"], 
    "index": [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], 
    "data": [
    [3169000.0, 218883000.0, 0.0], [3021000.0, 220349000.0, 0.0], [2868000.0, 230444000.0, 0.0], [2764000.0, 216968000.0, 11207.2], [2640000.0, 210278000.0, 82134.0], 
    [2558000.0, 197908000.0, 101002.5], [2617000.0, 195303000.0, 185898.7], [2621000.0, 219519000.0, 166324.4], [2637000.0, 202387000.0, 140227.8], [2604000.0, 219558000.0, 133949.2], 
    [2542000.0, 185748000.0, 143690.4], [2565000.0, 171265000.0, 168746.2], [2591000.0, 181372000.0, 203264.0], [2539000.0, 182729000.0, 604129.3], [2394000.0, 173969000.0, 725936.4], 
    [2378000.0, 154238000.0, 784637.7], [2428000.0, 147621000.0, 1039977.8], [2326000.0, 162972000.0, 1225943.7], [2472000.0, 145068000.0, 1467880.1], [2666000.0, 175294000.0, 1708859.8], 
    [2466000.0, 147201000.0, 2247466.3], [2509000.0, 140907000.0, 2732574.3], [2607000.0, 148204000.0, 3084539.6], [2709000.0, 176866000.0, 3478478.9], [2630000.0, 155376000.0, 801069.0], 
    [2740000.0, 160357000.0, 438780.4], [2635000.0, 146165000.0, 0.0]]
}


trace1_numcol = []
trace2_prod = []
trace3_neoc = []

df['data'].forEach(el => {
    trace1_numcol.push(el[0])
    trace2_prod.push(el[1])
    trace3_neoc.push(el[2])
});


var trace1 = {
    x: df['index'],
    y: trace1_numcol,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter',
    name: '# colonies'
    };

var trace2 = {
    x: df['index'],
    y: trace2_prod,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    name: 'Production'
    };

var trace3 = {
    x: df['index'],
    y: trace3_neoc,
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter',
    name: 'Neonics (kg)'
    };

var data = [trace1, trace2, trace3];

var layout = {
    //showlegend: false,
    grid: {
        rows: 3,
        columns: 1,
        pattern: 'independent',
        roworder: 'bottom to top'}
    };

var config = {responsive: true}

Plotly.newPlot('line-subplots', data, layout, config);



var data = [{
    values: [16, 15, 12, 6, 5, 4, 42],
    labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
    domain: {column: 0},
    name: 'GHG Emissions',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  },{
    values: [27, 11, 25, 8, 1, 3, 25],
    labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
    text: 'CO2',
    textposition: 'inside',
    domain: {column: 1},
    name: 'CO2 Emissions',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  },{
    values: [27, 11, 25, 8, 1, 3, 25],
    labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
    text: 'CO22',
    textposition: 'inside',
    domain: {column: 2},
    name: 'CO2 Emissions',
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }
];
  
  var layout = {
    title: 'Global Emissions 1990-2011',
    annotations: [
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'GHG',
        x: 0.17,
        y: 0.5
      },
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'CO2',
        x: 0.82,
        y: 0.5
      },
      {
        font: {
          size: 20
        },
        showarrow: false,
        text: 'CO22',
        x: 0.82,
        y: 0.5
      }
    ],
    height: 400,
    width: 1000,
    //showlegend: false,
    grid: {rows: 1, columns: 3}
  };
  
  Plotly.newPlot('piehole-subplot', data, layout, config);
  

url = 'https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset.json'

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)

    // linear plot by region
    Plotly.newPlot('multi-lineplot', plotRegionNeonic(data.states_metrics, JSON.parse(data.years)), renderLayout(), {responsive: true});

    console.log(data)

    populateFilteredRegion(data.all_regions)
    populateFilteredNeonic(data.neonics)
})


  const plotRegionNeonic = (states_metrics, years) => { 
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
