// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const resultMetadata = metadata.filter(obj => obj.id == sample)[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");
   
    // Use `.html("") to clear any existing metadata
    panel.html("");
   
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(resultMetadata).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    
    // Select Demographic Info pannel head
    const metadataPanel = document.getElementsByClassName("card-header")[0];

    // Apply color change to purple
    metadataPanel.style.backgroundColor = "#925796"; 
    metadataPanel.style.color = "white";  
    document.querySelector("h1").style.color = "#925796"; 
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const resultSamples = samples.filter(obj => obj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = resultSamples.otu_ids;
    const otu_labels = resultSamples.otu_labels;
    const sample_values = resultSamples.sample_values;

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Electric"
      }
    };
    
    // Data Array
    let bubleData = [trace1];
    
    // Layout object
    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Don't forget to slice and reverse the input data appropriately

    // Slice and reverse the first 10 objects for Bar Chart
    let firstTenOtuValues = sample_values.slice(0, 10).reverse();
    let firstTenOtuIds = otu_ids.slice(0, 10).reverse();
    let firstTenOtuLabels = otu_labels.slice(0, 10).reverse();

     // Build a Bar Chart
    let trace2 = {
      x: firstTenOtuValues,
      y: firstTenOtuIds.map(id => `OTU ${id}`),
      text: firstTenOtuLabels,
      name: "OTU",
      type: "bar",
      orientation: "h",
      marker: {
        color: "#925796" // Color for the bars
      }
    };
    
    // Data Array
    let barData = [trace2];
    
    // Layout object
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach(sample => {
      dropdownMenu.append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    const firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
