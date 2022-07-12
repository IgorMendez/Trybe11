import pytest
from src.sorting import sort_by


@pytest.fixture
def jobs():
    return [
        {"min_salary": 700, "max_salary": 1400, "date_posted": "2022-01-01"},
        {"min_salary": 1500, "max_salary": 3000, "date_posted": "2022-02-02"},
        {"min_salary": 2500, "max_salary": 5000, "date_posted": "2022-03-03"},
        {"min_salary": 3500, "max_salary": 7000, "date_posted": "2022-04-04"},
    ]


ordered_by_min = [
    {"min_salary": 700, "max_salary": 1400, "date_posted": "2022-01-01"},
    {"min_salary": 1500, "max_salary": 3000, "date_posted": "2022-02-02"},
    {"min_salary": 2500, "max_salary": 5000, "date_posted": "2022-03-03"},
    {"min_salary": 3500, "max_salary": 7000, "date_posted": "2022-04-04"},
]

ordered_by_max = [
    {"min_salary": 3500, "max_salary": 7000, "date_posted": "2022-04-04"},
    {"min_salary": 2500, "max_salary": 5000, "date_posted": "2022-03-03"},
    {"min_salary": 1500, "max_salary": 3000, "date_posted": "2022-02-02"},
    {"min_salary": 700, "max_salary": 1400, "date_posted": "2022-01-01"},
]

ordered_by_date = [
    {"min_salary": 3500, "max_salary": 7000, "date_posted": "2022-04-04"},
    {"min_salary": 2500, "max_salary": 5000, "date_posted": "2022-03-03"},
    {"min_salary": 1500, "max_salary": 3000, "date_posted": "2022-02-02"},
    {"min_salary": 700, "max_salary": 1400, "date_posted": "2022-01-01"},
]


def test_sort_by_criteria(jobs):
    sort_by(jobs, "max_salary")
    assert jobs == ordered_by_max

    sort_by(jobs, "min_salary")
    assert jobs == ordered_by_min

    sort_by(jobs, "date_posted")
    assert jobs == ordered_by_date

    with pytest.raises(ValueError, match="invalid"):
        jobs_copy = jobs.copy()
        sort_by(jobs_copy, "job_type")

    invalid = ""

    with pytest.raises(
        ValueError, match=f"invalid sorting criteria: {invalid}"
    ):
        jobs_copy = jobs.copy()
        sort_by(jobs_copy, invalid)
