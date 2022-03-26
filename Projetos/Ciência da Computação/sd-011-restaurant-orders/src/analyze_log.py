def create_list(orders):
    list_elements = []
    for words in orders:
        list_elements.append(words.strip("\n").split(","))
    return list_elements


def maria_foods(result):
    maria_food = []
    obj = []
    for check in result:
        if check[0] == "maria":
            maria_food.append(check[1])

    for food in maria_food:
        if (maria_food.count(food), food) not in obj:
            obj.append(((maria_food.count(food)), food))
    return sorted(obj, reverse=True)[0]


def arnaldo_foods(result):
    count = 0

    for check in result:
        if check[0] == "arnaldo" and check[1] == "hamburguer":
            count += 1
    return count


def joao_no_eat(result):
    check_list = []
    food = ""
    for check in result:
        if check[1] not in check_list:
            check_list.append(check[1])
        if check[0] == "joao" and food != check[1]:
            food = check[1]
    return {el for el in check_list if el != food}


def joao_not_go(result):
    check_list = []
    day = ""
    for check in result:
        if check[2] not in check_list:
            check_list.append(check[2])
        if check[0] == "joao" and day != check[2]:
            day = check[2]
    return {el for el in check_list if el != day}


def analyze_log(path_to_file):
    with open(path_to_file) as orders:
        result = create_list(orders)
        maria_food = maria_foods(result)[1]
        arnaldo_food = arnaldo_foods(result)
        joao_no_eats = joao_no_eat(result)
        day_joao_no_go = joao_not_go(result)

    with open("data/mkt_campaign.txt", mode="w") as file:
        lines = [
            str(line)
            for line in [
                maria_food,
                arnaldo_food,
                joao_no_eats,
                day_joao_no_go,
            ]
        ]

        file.write("\n".join(lines))
        file.close()
