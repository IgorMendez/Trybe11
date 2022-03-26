def find_duplicate(nums):
    if check_nums(nums):
        return False
    if not nums:
        return False

    numb = sorted(nums)
    for i in range(1, len(numb)):
        if type(numb[i]) != int:
            return False
        if numb[i - 1] == numb[i]:
            return numb[i]
    return False


def check_nums(nums):

    if type(nums) is str:
        return False

    for numbe in nums:
        if type(numbe) is not int:
            return False
        if numbe < 0:
            return False
