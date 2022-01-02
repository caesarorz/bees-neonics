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
  

// {'region': f'{region}', 'neonic': f'{neo}', 'states_metrics': [], 'years': f'{years}'}
fetch('https://raw.githubusercontent.com/caesarorz/bees-neonics/main/data/dataset1.json')
  .then((response) => {
    console.log(response)
    return response.json();
  })
  .then(data => {
    data = JSON.parse(data)
    console.log(data)
    states_metrics = data.states_metrics
    states = data.states
    years = data.years

    plotRegionNeonic(states_metrics, states, years)
  })


  const plotRegionNeonic = (states_metrics, states, years) => { 
    states_metrics.forEach(el => {
      state, metrics = el
      console.log(state, metrics)
    })
    console.log(years)
  };

  
  const data_ = (Ana1, Ana2, Ana3) => { 
    comingData = [Ana1, Ana2, Ana3]
    outputs = []
    comingData.forEach(el => {
      var trace = {
        x: xAxis,
        y: el,
        type: 'scatter',
        name: 'Ana 2'
      };
      outputs.push(trace)

    })
    return outputs;
  };

  xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  Ana1 =  [0, 2, 3, 5, 20, 35, 78, 100, 110, 130, 135, 140, 145]
  Ana2 = [0, 2, 3, 5, 55, 101, 150, 210, 300, 330, 335, 340, 345]
  Ana3 = [0, 2, 3, 5, 8, 70, 150, 210, 340, 430, 435, 440, 445]



  Plotly.newPlot('multi-lineplot', data_(Ana1, Ana2, Ana3));