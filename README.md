# belly-button-challenge
Module 14 Challenge

## Overview
This project focuses on building an interactive dashboard that reveals how a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) are present in more than 70% of people, while the rest are relatively rare. 

## Project Structure
The dashboard is built using JavaScript, D3.js, and Plotly for interactive data visualization.

## Key Features:
- Metadata Panel: Displays demographic information for the selected sample.
- Bar Chart: Visualizes the top 10 most abundant bacteria cultures in the selected sample.
- Bubble Chart: Visualizes the bacteria cultures with bubble markers, where size and color correspond to the number of bacteria and OTU ID.

## File Breakdown
- index.html: The main HTML file that structures the dashboard.
- static/app.js: The JavaScript file containing the code for building the dashboard (including functions to render charts and metadata).
- samples.json: The dataset used to generate the visualizations.

## How to Run
To run this project locally, follow these steps:
1.  Clone or download the repository to your local machine.
2.  Open index.html in a web browser.
3. Click to the deployment link for seeing the result: https://anhpham229.github.io/belly-button-challenge/

The dashboard should load automatically, allowing you to select different samples from a dropdown list. Upon selection, metadata and interactive visualizations (bubble and bar charts) will be updated accordingly.