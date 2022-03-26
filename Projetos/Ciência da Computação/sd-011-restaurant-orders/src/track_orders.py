class TrackOrders:
    def __init__(self):
        self.orders = []
        self.foods = set()
        self.days = set()

    def __len__(self):
        return len(self.orders)

    def add_new_order(self, costumer, order, day):
        list_order = {"cliente": costumer, "pedido": order, "data": day}
        return self.orders.append(list_order)

    def get_most_ordered_dish_per_costumer(self, costumer):
        list_food = []
        obj = []

        for order in self.orders:
            list_food.append(order["pedido"])
        for food in list_food:
            if (list_food.count(food), food) not in obj:
                obj.append((list_food.count(food), food))
        return sorted(obj, reverse=True)[0][1]

    def get_list_food(self):
        list_clients = []
        for order in self.orders:
            list_clients.append((order["cliente"], order["pedido"]))
        return list_clients

    def get_all_foods(self):
        list_food = []
        for order in self.orders:
            if order["pedido"] not in list_food:
                list_food.append(order["pedido"])
        return list_food

    def get_differrence(self, list_food, obj):
        result = []
        for food in list_food:
            if obj[0] != food:
                result.append(food)
        return set(result)

    def get_never_ordered_per_costumer(self, costumer):
        list_food = self.get_all_foods()
        list_clients = self.get_list_food()
        obj = []

        for food in list_food:
            for el in list_clients:
                if (costumer, food) == el:
                    if food not in obj:
                        obj.append(food)
        result = self.get_differrence(list_food, obj)

        return result

    def get_days_never_visited_per_costumer(self, costumer):
        days_costumer_go_to_restaurant = set()
        days_restaurant_open = set()
        for order in self.orders:
            days_restaurant_open.add(order["data"])
            if order["cliente"] == costumer:
                days_costumer_go_to_restaurant.add(order["data"])
        return days_restaurant_open - days_costumer_go_to_restaurant

    def get_days_visitored(self):
        days_with_visitors = dict()
        for order in self.orders:
            days_with_visitors[order["data"]] = (
                days_with_visitors.get(order["data"], 0) + 1
            )
        return days_with_visitors

    def get_busiest_day(self):
        pass
        days_with_visitors = self.get_days_visitored()
        busiest_day = max(days_with_visitors, key=days_with_visitors.get)
        return busiest_day

    def get_least_busy_day(self):
        pass
        days_with_visitors = self.get_days_visitored()
        least_busy_day = min(days_with_visitors, key=days_with_visitors.get)
        return least_busy_day
