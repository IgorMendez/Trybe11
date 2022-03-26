SELECT UCASE(CONCAT(e.first_name, ' ', e.last_name)) AS 'Nome completo',
jh.start_date AS 'Data de início',
salary AS 'Salário'
FROM hr.employees AS e
INNER JOIN hr.job_history AS jh
ON jh.employee_id = e.employee_id
WHERE MONTH(start_date) IN (01, 02, 03)
ORDER BY `Nome completo`, hire_date;
