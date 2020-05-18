INSERT INTO department (department) VALUES ('Admin');
INSERT INTO department (department) VALUES ('Clinical');
INSERT INTO department (department) VALUES ('Maintenance');
INSERT INTO department (department) VALUES ('Housekeeping');

INSERT INTO roles (title, salary, department_id) VALUES ('Director of Nursing', 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Human Resource', 75000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Rostering Clerk', 45000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ('Clinical Coordinator', 95000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Registered Nurse', 85000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Enrolled Nurse', 150000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ('Electrician', 35000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Plumber', 40000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Garderner', 25000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ('Chef', 65000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Dietician', 60000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Nutritionist', 55000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Huan', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Wang', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Derek', 'Ramsay', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ara', 'Mina', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Xander', 'Dockery', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Fox', 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jonathan', 'Sanglay', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Victor', 'Carlobos', 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jake', 'Roxas', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Manuel', 'Quezon', 4, null);

