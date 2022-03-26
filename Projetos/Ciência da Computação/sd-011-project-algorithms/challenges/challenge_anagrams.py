def is_anagram(first_string, second_string):
    new_first_string = list(first_string)
    new_second_string = list(first_string)
    count_one = 0
    count_two = 0

    if not first_string or not second_string:
        return False

    for letter in first_string:
        count_one += new_second_string.count(letter)

    for letter in second_string:
        count_two += new_first_string.count(letter)

    return count_one == count_two
