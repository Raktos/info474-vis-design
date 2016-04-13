"use strict";

$(document).ready(function() {
    // load the data and build the graphs when finished
    getData(buildGraphs);

    // gets the raw data from the server and calls the callback when finished
    function getData(callback) {
        $.get('./data/antibiotics_data.csv')
            .done(function(data) {
                callback(data);
            })
            .error(function(err) {
                console.log(err);
            });
    }

    // builds the graphs
    function buildGraphs(data) {
        // format the data as a js object
        var formattedData = formatData(data);

        // build the three graphs
        buildGramBoxplot(formattedData, 'vis1-plotly');
        buildBacteriaBoxplot(formattedData, 'vis2-plotly');
        buildBarGraph(formattedData, 'vis3-plotly');
    }

    // build a grouped boxplot
    function buildGramBoxplot(data, div) {
        // reformat the data for group box plots
        // groups are by positive gram, negative gram, and the combined totals
        // x holds 'tags' for each item in positive, negative, and total to tell
        // plotly which drug each data point belongs to
        var drugs = ['Neomycin', 'Penicilin', 'Streptomycin'];
        var formattedData = {positive: [], negative: [], total: []};
        var x = {positive: [], negative: [], total: []};

        // does the actual sorting from the basic js object
        for (var i = 0; i < drugs.length; i++) {
            for (var j = 0; j < data[drugs[i]].length; j++) {
                formattedData[data['GramStaining'][j]].push(data[drugs[i]][j]);
                x[data['GramStaining'][j]].push(drugs[i]);

                formattedData['total'].push(data[drugs[i]][j]);
                x['total'].push(drugs[i]);
            }
        }

        // construct traces
        var positive = {
            x: x['positive'],
            y: formattedData['positive'],
            name: 'Gram Positive',
            type: 'box',
            marker: {color: 'green'}
        };

        var negative = {
            x: x['negative'],
            y: formattedData['negative'],
            name: 'Gram Negative',
            type: 'box',
            marker: {color: 'red'}
        };

        var total = {
            x: x['total'],
            y: formattedData['total'],
            name: 'Combined',
            type: 'box',
            marker: {color: 'blue'}
        };

        // construct layout
        var layout = {
            title: 'Drug Concentrations to Stop Growth in Vitro',
            titlefont: {
                size: 20
            },
            yaxis: {
                type: 'log',
                autorange: true,
                title: 'Concentration Required to Prevent Growth',
                titlefont: {
                    size: 18
                }
            },
            xaxis: {
                title: 'Drug',
                titlefont: {
                    size: 18
                }
            },
            staticPlot: true,
            height: $(window).height() * 0.75,
            boxmode: 'group'
        };

        // plot
        var traces = [positive, negative, total];

        Plotly.newPlot(div, traces, layout);
    }

    // build the bacteria resistance boxplot
    function buildBacteriaBoxplot(data, div) {
        var i;
        var traces = [];
        var drugs = ['Neomycin', 'Penicilin', 'Streptomycin'];

        // not going to group data this time, just a seperate trace for each bacteria
        // this sorts the data out by bacteria and puts them in a traces array
        for (i = 0; i < data['Bacteria'].length; i++) {
            var bacteria = {};
            bacteria.name = data['Bacteria'][i];
            bacteria.type = 'box';
            bacteria.y = [];
            bacteria.marker = {color: 'ff7f0e'};

            for (var j = 0; j < drugs.length; j++) {
                bacteria.y.push(data[drugs[j]][i]);
            }

            traces.push(bacteria);
        }

        // construct layout
        var layout = {
            title: 'Bacteria Resistance to Drugs',
            margin: {b: 200},
            titlefont: {
                size: 20
            },
            yaxis: {
                type: 'log',
                autorange: true,
                title: 'Concentration Required to Prevent Growth',
                titlefont: {
                    size: 18
                }
            },
            xaxis: {
                title: 'Bacteria',
                titlefont: {
                    size: 18
                }
            },
            staticPlot: true,
            height: $(window).height() * 0.75,
            showlegend: false
        };

        // sort the traces into order by median value
        traces = traces.sort(sortTracesByMedian);

        // set the display order to the order in the array
        for (i = 1; i < traces.length; i++) {
            traces[i].x = i;
        }

        // plot
        Plotly.newPlot(div, traces, layout);
    }

    // build bar bacterial resistance bar graphs 
    function buildBarGraph(data, div) {
        var drugs = ['Neomycin', 'Penicilin', 'Streptomycin'];
        var traces = [];
        
        // This one uses basically the raw js object
        // group are by drug (each drug column) and are 'tagged' by bacteria (the Bacteria column, same order)
        for (var i = 0; i < drugs.length; i++) {
            var trace = {
                y: data[drugs[i]],
                x: data['Bacteria'],
                type: 'bar',
                name: drugs[i]
            };

            traces.push(trace);
        }

        // construct layout
        var layout = {
            title: 'Bacteria Resistance to Drugs',
            margin: {b: 200},
            titlefont: {
                size: 20
            },
            yaxis: {
                type: 'log',
                autorange: true,
                title: 'Concentration Required to Prevent Growth',
                titlefont: {
                    size: 18
                }
            },
            xaxis: {
                title: 'Bacteria',
                titlefont: {
                    size: 18
                }
            },
            staticPlot: true,
            height: $(window).height() * 0.75,
            showlegend: true,
            boxmode: 'group'
        };

        Plotly.newPlot(div, traces, layout);
    }

    // format the raw csv into the raw js object
    function formatData(data) {
        var formattedData = {};

        data = data.split('\n');
        var keys = data[0].split(',');

        for (var i = 0; i < keys.length; i++) {
            formattedData[keys[i].trim()] = [];
            for (var j = 1; j < data.length; j++) {
                formattedData[keys[i].trim()].push(data[j].split(',')[i].trim());
            }
        }

        return formattedData;
    }

    // helper to sort traces by median value
    function sortTracesByMedian(a,b) {
        var aMid = a.y.length / 2;
        if (a.y.length % 2 != 0) {
            aMid += 0.5
        }

        var bMid = b.y.length / 2;
        if (b.y.length % 2 != 0) {
            bMid += 0.5
        }

        var aMed = a['y'].sort()[aMid];
        var bMed = b['y'].sort()[bMid];

        return parseFloat(aMed) > parseFloat(bMed) ? 0 : 1;
    }
});