-- Initialize database with steel production data
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create steel production data tables
CREATE TABLE IF NOT EXISTS steel_production_data (
    id SERIAL PRIMARY KEY,
    steel_type VARCHAR(50),
    production_volume DECIMAL(10,2),
    production_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plant_location VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS production_efficiency_data (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100),
    metric_value DECIMAL(10,2),
    unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quality_metrics_data (
    id SERIAL PRIMARY KEY,
    quality_parameter VARCHAR(100),
    measured_value DECIMAL(10,4),
    specification_limit DECIMAL(10,4),
    pass_fail BOOLEAN,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample steel production data
INSERT INTO steel_production_data (steel_type, production_volume, plant_location) VALUES
('Crude Steel', 1850.5, 'Plant A - Ohio'),
('Finished Steel', 1420.3, 'Plant A - Ohio'),
('Hot Rolled', 865.2, 'Plant B - Pennsylvania'),
('Cold Rolled', 320.7, 'Plant B - Pennsylvania'),
('Galvanized', 180.4, 'Plant C - Indiana'),
('Stainless', 125.8, 'Plant C - Indiana');

INSERT INTO production_efficiency_data (metric_name, metric_value, unit) VALUES
('Furnace Efficiency', 89.5, '%'),
('Energy Consumption', 485.2, 'kWh/t'),
('Yield Rate', 91.8, '%'),
('Downtime Hours', 1.2, 'hours');

INSERT INTO quality_metrics_data (quality_parameter, measured_value, specification_limit, pass_fail) VALUES
('Defect Rate', 1.8, 2.5, true),
('Tensile Strength', 425.6, 400.0, true),
('Carbon Content', 0.18, 0.25, true),
('Surface Quality', 94.2, 90.0, true);
