import React, { useState, useRef } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import style from './UploadAndChart.module.scss';
import classNames from 'classnames/bind';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';


const cx = classNames.bind(style);

const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',').map(val => val.trim());
    const item = {};
    headers.forEach((header, index) => {
      item[header] = isNaN(values[index]) ? values[index] : Number(values[index]);
    });
    return item;
  });
};

const processDataForChart = (data, selectedItems, xAxisKey) => {
  if (!data || data.length === 0 || !selectedItems || selectedItems.length === 0 || !xAxisKey) {
    console.log('No data to process for chart');
    if (!data) {
      console.log('data is null');
    }
    if (!selectedItems) {
      console.log('selectedItems is null');
    }
    if (!xAxisKey) {
      console.log('xAxisKey is null');
    }
    
    return null;
  }
  console.log('data', data);
  console.log('xAxisKey:', xAxisKey);

  const labels = data.map(item => item[xAxisKey]);  
  const datasets = selectedItems.map(item => {
    return {
      label: item.charAt(0).toUpperCase() + item.slice(1),
      data: data.map(d => d[item]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1
    };
  });

  return {
    labels,
    datasets
  };
};

const UploadAndChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [selectedItems, setSelectedItems] = useState([]);
  const [xAxisKey, setXAxisKey] = useState('');
  const [dataKeys, setDataKeys] = useState([]);

  const chartRef = useRef(null);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleItemSelection = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedItems(value);
  
    if (chartData) {
      const updatedChartData = processDataForChart(chartData.originalData, value, xAxisKey);
      setChartData({ ...updatedChartData, originalData: chartData.originalData });
    }
  };
  
  const handleXAxisChange = (event) => {
    const value = event.target.value;
    setXAxisKey(value);
  
    if (chartData) {
      const updatedChartData = processDataForChart(chartData.originalData, selectedItems, value);
      setChartData({ ...updatedChartData, originalData: chartData.originalData });
    }
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        let uploadedData;
        if (file.name.endsWith('.csv' || '.xlsx')) {
          uploadedData = parseCSV(e.target.result);
        } else {
          uploadedData = JSON.parse(e.target.result);
        }
        console.log('uploadedData', uploadedData);
        
        if (uploadedData.length > 0) {
          const newKeys = uploadedData.length > 0 && typeof uploadedData[0] === 'object'
          ? Object.keys(uploadedData[0])
          : "NaN"; // Trả về NaN nếu không có dữ liệu

          const chartData = processDataForChart(uploadedData, newKeys, newKeys[0]);
          console.log(chartData);
          console.log(newKeys);
          
          setChartData({ ...chartData, originalData: uploadedData });
          setDataKeys(newKeys);
          setSelectedItems(newKeys);
          setXAxisKey(newKeys[0]);
        } else {
          setChartData(null);
          setDataKeys([]);
          setSelectedItems([]);
        }
      } catch (error) {
        console.error('Error processing file:', error);
        setChartData(null);
        setDataKeys([]);
        setSelectedItems([]);
      }
    };
    
    reader.readAsText(file);
  };

  const renderChart = () => {
    console.log();
    
    if (!chartData) {
      return <p>No data to display. Please upload a valid JSON or CSV file and select the appropriate options.</p>;
    }

    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} ref={chartRef} />;
      case 'line':
        return <Line data={chartData} ref={chartRef} />;
      case 'pie':
        return <Pie data={chartData} ref={chartRef} />;
      case 'doughnut':
        return <Doughnut data={chartData} ref={chartRef} />;
      default:
        return <Bar data={chartData} ref={chartRef} />;
    }
  };

  const handleExportClick = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current.canvas).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
      });
    }
  };

  const handleExportGifClick = () => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas;
      gifshot.createGIF(
        {
          images: [chartCanvas.toDataURL()],
          gifWidth: chartCanvas.width,
          gifHeight: chartCanvas.height,
        },
        (obj) => {
          if (!obj.error) {
            const link = document.createElement('a');
            link.href = obj.image;
            link.download = 'chart.gif';
            link.click();
          }
        }
      );
    }
  };

  return (
    <div className={cx('container')}>
        <h1 className={cx('title')}>Display Chart</h1>
        <div className={cx('uploadContainer')}>
        <label>Upload Your Data</label>
        <input className={cx('inputFile')} type="file" accept=".json,.csv" onChange={handleFileUpload} />
        </div>

        {chartData ? (
            <>
              <div className={cx('selectContainer')}>
              <div className="container">
                  <div className="row" style={{width:'100%'}}>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3" >
                      <div className="row" style={{width:'100%'}}>
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 mb-3">
                          <label>Select Chart Type</label>
                          <select className={cx('select')} onChange={handleChartTypeChange} value={chartType}>
                            <option value="bar">Bar</option>
                            <option value="line">Line</option>
                            <option value="pie">Pie</option>
                            <option value="doughnut">Doughnut</option>
                          </select>
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-7 mb-3">
                          <label>Select X-Axis</label>
                          <select className={cx('select')} onChange={handleXAxisChange} value={xAxisKey}>
                            {dataKeys.map(key => (
                              <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-3">
                      <label>Select Items to Display</label>
                      <select className={cx('select')} multiple={true} onChange={handleItemSelection} value={selectedItems}>
                        {dataKeys.map(key => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>


            </>
        ):(
            <p>No data to display. Please upload a valid JSON or CSV file and select the appropriate options.</p>
        )}
        
        <div className={cx('chartContainer')}>
            <h2>Chart</h2>
            {chartData ?(
              <>
                {renderChart()}
                <div style={{display:'flex', justifyContent:'center', gap: '20px'}}>
                      <button onClick={handleExportClick} className={cx('exportButton')}>
                        Export Chart as Image
                      </button>
                      <button onClick={handleExportGifClick} className={cx('exportButton')}>
                        Export Chart as GIF
                      </button>
                  </div>
              </>
            ) : (
              <div className={cx('empty-chart-box', 'd-flex', 'justify-content-center', 'align-items-center')}>
              <div className={cx('text-center')}>
                <h3>No Data Available</h3>
                <p>Your chart will appear here when data is loaded.</p>
              </div>
            </div>
            )}
        </div>
    </div>
  );
};

export default UploadAndChart;
