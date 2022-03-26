from src.jobs import read


def get_unique_job_types(path):
    data = read(path)
    unique_jobs = set()
    for job in data:
        unique_jobs.add(job["job_type"])
    return list(unique_jobs)


def filter_by_job_type(jobs, job_type):
    filter_job = [job for job in jobs if job["job_type"] == job_type]
    return filter_job


def get_unique_industries(path):
    file_content = read(path)
    indu = []

    for i in file_content:
        if indu.__contains__(i["industry"]) is False and i["industry"] != '':
            indu.append(i["industry"])

    return indu


def filter_by_industry(jobs, industry):
    filtered_by_industry = [r for r in jobs if r["industry"] == industry]
    return filtered_by_industry


def get_max_salary(path):
    salaries = read(path)
    max_salary = set()

    for salary in salaries:
        if salary['max_salary'] != 'invalid' and salary['max_salary'] != '':
            max_salary.add(int(salary['max_salary']))
    return max(max_salary)
    pass


def get_min_salary(path):
    salaries = read(path)
    min_salaries = set()

    for salary in salaries:
        if salary['min_salary'] != 'invalid' and salary['min_salary'] != '':
            min_salaries.add(int(salary['min_salary']))
    return min(min_salaries)
    pass


def matches_salary_range(job, salary):
    if "max_salary" not in job or "min_salary" not in job:
        raise ValueError("No row match found")
    elif (
        not isinstance(job["min_salary"], int)
        or not isinstance(job["max_salary"], int)
        or not isinstance(salary, int)
    ):
        raise ValueError("Non-numeric values found")
    elif job["max_salary"] < job["min_salary"]:
        raise ValueError("Max salary must be bigger than Min salary")
    elif job["max_salary"] >= salary >= job["min_salary"]:
        return True
    else:
        return False
    pass


def filter_by_salary_range(jobs, salary):
    jobs_by_salary_rage = []
    for jo in jobs:
        try:
            if matches_salary_range(jo, salary):
                jobs_by_salary_rage.append(jo)
        except ValueError:
            pass
    return jobs_by_salary_rage
