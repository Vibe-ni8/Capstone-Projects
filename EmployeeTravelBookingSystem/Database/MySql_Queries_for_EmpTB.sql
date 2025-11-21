create database darkwolf;
use darkwolf;

-- ===========================
-- 1. SERVICE LINE
-- ===========================
CREATE TABLE service_line (
    sl_id VARCHAR(10) PRIMARY KEY,
    sl_name VARCHAR(50) NOT NULL UNIQUE
);

-- ===========================
-- 2. DEPARTMENT
-- ===========================
CREATE TABLE department (
    dept_id VARCHAR(10) PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    sl_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (sl_id) REFERENCES service_line(sl_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ===========================
-- 3. ROLES
-- ===========================
CREATE TABLE role (
    role_id VARCHAR(10) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- ===========================
-- 4. Location
-- ===========================
CREATE TABLE location (
    loc_id VARCHAR(10) PRIMARY KEY,
    loc_short_name VARCHAR(30) NOT NULL UNIQUE,
    loc_area VARCHAR(30) NOT NULL,
    loc_dist VARCHAR(30) NOT NULL,
    loc_state VARCHAR(30) NOT NULL,
    loc_country VARCHAR(30) NOT NULL
);

-- ===========================
-- 5. EMPLOYEE
-- ===========================
CREATE TABLE employee (
    emp_id VARCHAR(10) PRIMARY KEY,
    emp_name VARCHAR(50) NOT NULL,
    emp_email VARCHAR(50) NOT NULL UNIQUE,
    emp_password VARCHAR(100) NOT NULL,
    role_id VARCHAR(10) NOT NULL,
    dept_id VARCHAR(10) NOT NULL,
    reset_token VARCHAR(10),
    token_generated_date datetime,
    phone VARCHAR(15),
    loc_id VARCHAR(10) not null,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
	FOREIGN KEY (loc_id) REFERENCES location(loc_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ===========================
-- 6. EMPLOYEE DETAILS
-- ===========================
CREATE TABLE emp_details (
    emp_id VARCHAR(10) NOT NULL,
    reporting_mgr_id VARCHAR(10),
    home_mgr_id VARCHAR(10),
    wrk_mgr_id VARCHAR(10),
    PRIMARY KEY (emp_id),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (reporting_mgr_id) REFERENCES employee(emp_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY (home_mgr_id) REFERENCES employee(emp_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (wrk_mgr_id) REFERENCES employee(emp_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ===========================
-- 7. Role Department Link
-- ===========================
CREATE TABLE role_dept (
    role_id VARCHAR(10) NOT NULL,
    dept_id VARCHAR(10) NOT NULL,
    Primary KEY (role_id, dept_id),
    foreign key (role_id) references role(role_id)
		ON UPDATE CASCADE
		ON DELETE cascade,
	foreign key (dept_id) references department(dept_id)
		ON UPDATE CASCADE
		ON DELETE cascade
);

-- ===========================
-- 8. REPORTING SETUP
-- ===========================
create table reporting_setup (
	role_id varchar(10) not null,
    report_to_role_id varchar(10) not null,
    Primary KEY (role_id, report_to_role_id),
    foreign key (role_id) references role(role_id)
		ON UPDATE CASCADE
		ON DELETE cascade,
	foreign key (report_to_role_id) references role(role_id)
		ON UPDATE CASCADE
		ON DELETE cascade
);


-- =========================== DATA ENTRY ================================

INSERT INTO service_line (sl_id, sl_name) VALUES
('SERLIID01', 'Executive Leadership'),
('SERLIID02', 'Corporate Leadership'),
('SERLIID03', 'Delivery & Strategy'),
('SERLIID04', 'Delivery Operations'),
('SERLIID05', 'Delivery Management'),
('SERLIID06', 'Project Delivery'),
('SERLIID07', 'Digital Transformation'),
('SERLIID08', 'Digital Engineering'),
('SERLIID09', 'Enterprise Architecture'),
('SERLIID10', 'Quality Assurance & Testing'),
('SERLIID11', 'Cloud & Infrastructure Services'),
('SERLIID12', 'Experience Design (XD)'),
('SERLIID13', 'Business Consulting'),
('SERLIID14', 'Data & Analytics'),
('SERLIID15', 'Talent Development'),
('SERLIID16', 'People & Culture'),
('SERLIID17', 'Corporate Finance'),
('SERLIID18', 'IT Operations'),
('SERLIID19', 'IT Infrastructure'),
('SERLIID20', 'Corporate Services'),
('SERLIID21', 'Security & Compliance');


INSERT INTO department (dept_id, dept_name, sl_id) VALUES
('DPTID01', 'CEO Office', 'SERLIID01'),
('DPTID02', 'COO Office', 'SERLIID01'),
('DPTID03', 'Technology Office', 'SERLIID01'),
('DPTID04', 'IT Strategy Office', 'SERLIID01'),
('DPTID05', 'Finance Office', 'SERLIID01'),
('DPTID06', 'HR Office', 'SERLIID01'),
('DPTID07', 'Product Strategy', 'SERLIID01'),
('DPTID08', 'Corporate Marketing', 'SERLIID01'),
('DPTID09', 'Business Unit Leadership', 'SERLIID02'),
('DPTID10', 'Delivery Management / Technology Practice', 'SERLIID03'),
('DPTID11', 'Delivery Operations / Technology Practice', 'SERLIID03'),
('DPTID12', 'Delivery Management', 'SERLIID04'),
('DPTID13', 'Program Office', 'SERLIID05'),
('DPTID14', 'Project Management Office', 'SERLIID06'),
('DPTID15', 'Agile Office', 'SERLIID07'),
('DPTID16', 'Engineering Manager Office', 'SERLIID08'),
('DPTID17', '.NET Tech Core', 'SERLIID08'),
('DPTID18', 'Java Tech', 'SERLIID08'),
('DPTID19', 'DevOps', 'SERLIID08'),
('DPTID20', 'Technology Practice', 'SERLIID08'),
('DPTID21', 'UI', 'SERLIID08'),
('DPTID22', 'Mobile', 'SERLIID08'),
('DPTID23', 'Architecture Office', 'SERLIID09'),
('DPTID24', 'Quality Engineering', 'SERLIID10'),
('DPTID25', 'Python', 'SERLIID08'),
('DPTID26', 'React', 'SERLIID08'),
('DPTID27', 'Angular', 'SERLIID08'),
('DPTID28', 'DevOps / Cloud Engineering', 'SERLIID11'),
('DPTID29', 'Design Studio / Creative Team', 'SERLIID12'),
('DPTID30', 'Business Analysis Office', 'SERLIID13'),
('DPTID31', 'Data Engineering', 'SERLIID14'),
('DPTID32', 'Campus Program', 'SERLIID15'),
('DPTID33', 'Human Resources', 'SERLIID16'),
('DPTID34', 'Talent Acquisition', 'SERLIID16'),
('DPTID35', 'Finance & Accounting', 'SERLIID17'),
('DPTID36', 'IT Infrastructure', 'SERLIID18'),
('DPTID37', 'Network Ops', 'SERLIID19'),
('DPTID38', 'Admin & Facilities', 'SERLIID20'),
('DPTID39', 'IT Security / Physical Security', 'SERLIID21');


INSERT INTO role (role_id, role_name) VALUES
('RLID01', 'Chief Executive Officer'),
('RLID02', 'Chief Operating Officer'),
('RLID03', 'Chief Technology Officer'),
('RLID04', 'Chief Information Officer'),
('RLID05', 'Chief Financial Officer'),
('RLID06', 'Chief Human Resource Officer'),
('RLID07', 'Chief Product Officer'),
('RLID08', 'Chief Marketing Officer'),
('RLID09', 'Senior Vice President'),
('RLID10', 'Vice President'),
('RLID11', 'Associate Vice President'),
('RLID12', 'Director / Senior Director'),
('RLID13', 'Associate Director'),
('RLID14', 'General Manager'),
('RLID15', 'Delivery Head / Delivery Manager'),
('RLID16', 'Program Manager'),
('RLID17', 'Project Manager'),
('RLID18', 'Scrum Master / Agile Coach'),
('RLID19', 'Technical Manager / Engineering Manager'),
('RLID20', 'Technical Lead'),
('RLID21', 'Module Lead'),
('RLID22', 'Senior Software Engineer'),
('RLID23', 'Solution Architect / Technical Architect'),
('RLID24', 'QA Lead / Senior QA Engineer'),
('RLID25', 'Software Engineer / Developer'),
('RLID26', 'QA Engineer / Tester'),
('RLID27', 'DevOps Engineer'),
('RLID28', 'UI/UX Designer'),
('RLID29', 'Business Analyst'),
('RLID30', 'Data Engineer / Data Analyst'),
('RLID31', 'Associate Software Engineer'),
('RLID32', 'Trainee / Intern'),
('RLID33', 'HR Manager'),
('RLID34', 'Talent Acquisition'),
('RLID35', 'Finance Manager'),
('RLID36', 'IT Support Engineer / Sysadmin'),
('RLID37', 'Network Engineer'),
('RLID38', 'Admin & Facilities Manager'),
('RLID39', 'Security Officer'),
('RLID40', 'HR Executive'),
('RLID41', 'Recruiter'),
('RLID42', 'Accounts Officer');

INSERT INTO location (loc_id, loc_short_name, loc_area, loc_dist, loc_state, loc_country) VALUES
-- Chennai (already added earlier)
('LOCID01', 'CHE SEZ', 'Velachery', 'Chennai', 'Tamilnadu', 'India'),
('LOCID02', 'CHE PCS', 'Navalur', 'Chennai', 'Tamilnadu', 'India'),
('LOCID03', 'CHE OMR', 'Sholinganallur', 'Chennai', 'Tamilnadu', 'India'),
('LOCID04', 'CHE TIDEL', 'Taramani', 'Chennai', 'Tamilnadu', 'India'),
('LOCID05', 'CHE GUINDY', 'Guindy', 'Chennai', 'Tamilnadu', 'India'),
('LOCID06', 'CHE ANNA', 'Anna Nagar', 'Chennai', 'Tamilnadu', 'India'),
('LOCID07', 'CHE MOUNT', 'Mount Road', 'Chennai', 'Tamilnadu', 'India'),
('LOCID08', 'CHE EKKAT', 'Ekkatuthangal', 'Chennai', 'Tamilnadu', 'India'),
('LOCID09', 'CHE PERUNG', 'Perungudi', 'Chennai', 'Tamilnadu', 'India'),
('LOCID10', 'CHE THORAIP', 'Thoraipakkam', 'Chennai', 'Tamilnadu', 'India'),

-- Other Tamil Nadu districts
('LOCID11', 'CBE ITP', 'Saravanampatti', 'Coimbatore', 'Tamilnadu', 'India'),
('LOCID12', 'MDU TBI', 'Kochadai', 'Madurai', 'Tamilnadu', 'India'),

-- Karnataka
('LOCID21', 'BLR EC', 'Electronic City', 'Bangalore', 'Karnataka', 'India'),
('LOCID22', 'BLR WTC', 'Whitefield', 'Bangalore', 'Karnataka', 'India'),

-- Telangana
('LOCID31', 'HYD HITEC', 'HITEC City', 'Hyderabad', 'Telangana', 'India'),
('LOCID32', 'HYD GACH', 'Gachibowli', 'Hyderabad', 'Telangana', 'India'),

-- Maharashtra
('LOCID41', 'PUN HINJ', 'Hinjewadi', 'Pune', 'Maharashtra', 'India'),
('LOCID42', 'MUM BKC', 'Bandra Kurla Complex', 'Mumbai', 'Maharashtra', 'India'),

-- Delhi NCR
('LOCID51', 'GUR CYB', 'Cyber City', 'Gurgaon', 'Haryana', 'India'),
('LOCID52', 'NOI SEC62', 'Sector 62', 'Noida', 'Uttar Pradesh', 'India'),

-- International
('LOCID61', 'NYC HQ', 'Manhattan', 'New York', 'New York', 'USA'),
('LOCID62', 'LDN CAN', 'Canary Wharf', 'London', 'England', 'UK'),
('LOCID63', 'SGP CBD', 'Raffles Place', 'Singapore', 'Singapore', 'Singapore'),
('LOCID64', 'SYD CBD', 'Darling Harbour', 'Sydney', 'New South Wales', 'Australia'),
('LOCID65', 'DXB INT', 'Business Bay', 'Dubai', 'Dubai', 'UAE');

INSERT INTO employee (
    emp_id, emp_name, emp_email, 
    emp_password, 
    role_id, dept_id, reset_token, token_generated_date, phone, loc_id
)
VALUES (
    'EMPID01', 'Vickey R', 'vigneshmalliga02@gmail.com',
    'AQAAAAIAAYagAAAAED1jYxOm5eyJzmcwbicmMjk3WAfgnMbiH8OM4fFkFW0gMUcraTh0Tg6xz3p2eXCbug==',
    'RLID01', 'DPTID01', null, null, '8940773113', 'LOCID02'
);

INSERT INTO emp_details (
    emp_id, reporting_mgr_id, home_mgr_id, wrk_mgr_id
)
VALUES ('EMPID01', null, null, null);

INSERT INTO role_dept (role_id, dept_id) VALUES
('RLID01', 'DPTID01'),
('RLID02', 'DPTID02'),
('RLID03', 'DPTID03'),
('RLID04', 'DPTID04'),
('RLID05', 'DPTID05'),
('RLID06', 'DPTID06'),
('RLID07', 'DPTID07'),
('RLID08', 'DPTID08'),
('RLID09', 'DPTID09'),
('RLID10', 'DPTID09'),
('RLID11', 'DPTID09'),
('RLID12', 'DPTID10'),
('RLID13', 'DPTID11'),
('RLID14', 'DPTID12'),
('RLID15', 'DPTID12'),
('RLID16', 'DPTID13'),
('RLID17', 'DPTID14'),
('RLID18', 'DPTID15'),
('RLID19', 'DPTID16'),
('RLID20', 'DPTID17'),
('RLID22', 'DPTID17'),
('RLID25', 'DPTID17'),
('RLID31', 'DPTID17'),
('RLID20', 'DPTID18'),
('RLID22', 'DPTID18'),
('RLID25', 'DPTID18'),
('RLID31', 'DPTID18'),
('RLID20', 'DPTID19'),
('RLID25', 'DPTID19'),
('RLID31', 'DPTID19'),
('RLID21', 'DPTID20'),
('RLID22', 'DPTID21'),
('RLID22', 'DPTID22'),
('RLID23', 'DPTID23'),
('RLID24', 'DPTID24'),
('RLID26', 'DPTID24'),
('RLID25', 'DPTID25'),
('RLID31', 'DPTID25'),
('RLID25', 'DPTID26'),
('RLID31', 'DPTID26'),
('RLID25', 'DPTID27'),
('RLID31', 'DPTID27'),
('RLID27', 'DPTID28'),
('RLID28', 'DPTID29'),
('RLID29', 'DPTID30'),
('RLID30', 'DPTID31'),
('RLID32', 'DPTID32'),
('RLID33', 'DPTID33'),
('RLID40', 'DPTID33'),
('RLID34', 'DPTID34'),
('RLID41', 'DPTID34'),
('RLID35', 'DPTID35'),
('RLID42', 'DPTID35'),
('RLID36', 'DPTID36'),
('RLID37', 'DPTID37'),
('RLID38', 'DPTID38'),
('RLID39', 'DPTID39');

INSERT INTO reporting_setup (role_id, report_to_role_id) VALUES
('RLID02', 'RLID01'),
('RLID03', 'RLID01'),
('RLID04', 'RLID01'),
('RLID05', 'RLID01'),
('RLID06', 'RLID01'),
('RLID07', 'RLID01'),
('RLID08', 'RLID01'),
('RLID09', 'RLID01'),
('RLID10', 'RLID01'),
('RLID38', 'RLID02'),
('RLID23', 'RLID03'),
('RLID36', 'RLID04'),
('RLID37', 'RLID04'),
('RLID39', 'RLID04'),
('RLID35', 'RLID05'),
('RLID33', 'RLID06'),
('RLID34', 'RLID06'),
('RLID10', 'RLID09'),
('RLID11', 'RLID10'),
('RLID12', 'RLID10'),
('RLID14', 'RLID10'),
('RLID12', 'RLID11'),
('RLID13', 'RLID12'),
('RLID14', 'RLID12'),
('RLID15', 'RLID12'),
('RLID16', 'RLID12'),
('RLID19', 'RLID12'),
('RLID15', 'RLID14'),
('RLID16', 'RLID15'),
('RLID17', 'RLID15'),
('RLID17', 'RLID16'),
('RLID19', 'RLID16'),
('RLID18', 'RLID17'),
('RLID20', 'RLID17'),
('RLID21', 'RLID17'),
('RLID24', 'RLID17'),
('RLID28', 'RLID17'),
('RLID29', 'RLID17'),
('RLID20', 'RLID19'),
('RLID27', 'RLID19'),
('RLID21', 'RLID20'),
('RLID22', 'RLID20'),
('RLID25', 'RLID20'),
('RLID26', 'RLID20'),
('RLID30', 'RLID20'),
('RLID31', 'RLID20'),
('RLID32', 'RLID20'),
('RLID31', 'RLID22'),
('RLID32', 'RLID22'),
('RLID26', 'RLID24'),
('RLID31', 'RLID25'),
('RLID32', 'RLID25'),
('RLID40', 'RLID33'),
('RLID41', 'RLID34'),
('RLID42', 'RLID35');


