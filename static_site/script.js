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
    console.log(data)
  })


  thestring = '{"states_metrics": [{"Arizona": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 96.7, 0.0, 48.7, 48.7, 0.0, 266.0, 921.7, 1188.3, 2036.4, 2139.8, 2262.1, 223.1, NaN, NaN]}, {"California": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.3, 608.0, 796.9, 1410.8, 14229.5, 2898.1, 6569.3, 7845.2, 143619.6, NaN, NaN]}, {"Colorado": [NaN, NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1861.5, 5369.9, 3165.9, 2223.3, 4894.1, 7375.4, 16623.2, 20234.1, 12283.8, 9791.5, 8658.2, 0.0, NaN, NaN]}, {"Hawaii": [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]}, {"Idaho": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 99.1, 1186.8, 60.6, 470.2, 2353.4, 4288.3, 1157.6, 3325.7, 4217.4, 6741.1, 0.3, 1.1, NaN]}, {"Montana": [NaN, NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 110.0, 87.4, 17.5, 96.1, 443.8, 621.9, 2595.9, 801.9, 1460.8, 1438.8, 2529.9, 0.0, 0.0, NaN]}, {"Oregon": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 59.2, 244.9, 543.4, 1173.6, 336.7, 1027.1, 1289.4, 451.8, 571.2, 1189.2, 993.3, 65.3, 327.6, NaN]}, {"Utah": [NaN, NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100.3, 76.6, 48.3, 11.9, 150.2, 80.9, 155.4, 141.7, 700.6, 536.7, 892.3, 0.0, 0.0, NaN]}, {"Washington": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 23.6, 3393.6, 387.7, 2433.3, 1424.6, 1633.3, 1046.9, 5530.4, 4485.0, 4413.2, 3319.3, 419.9, 3280.3, NaN]}, {"Wyoming": [NaN, NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 217.8, 182.7, 218.1, 122.2, 391.7, 901.3, 756.3, 802.7, 1174.9, 840.9, 1262.0, 0.0, 0.0, NaN]}, {"New Mexico": [NaN, NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 157.9, 682.3, 222.6, 478.1, 876.2, 661.2, 1111.4, 779.5, 2160.8]}, {"Nevada": [NaN, NaN, NaN, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 7.4, 1.1, 20.5, 1.1, 5.3]}], "years": "[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]", "region": "West", "neonic": "nCLOTHIANIDIN"}'
  console.log(typeof thestring)
  console.log(JSON.parse(thestring))



  
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