import csv
from functools import lru_cache


@lru_cache
def read(path):
    with open(path, encoding="utf8") as file:
        result = list(csv.DictReader(file))
    return result
