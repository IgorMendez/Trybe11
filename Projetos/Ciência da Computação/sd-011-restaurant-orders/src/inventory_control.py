class InventoryControl:
    INGREDIENTS = {
        "hamburguer": ["pao", "carne", "queijo"],
        "pizza": ["massa", "queijo", "molho"],
        "misto-quente": ["pao", "queijo", "presunto"],
        "coxinha": ["massa", "frango"],
    }
    MINIMUM_INVENTORY = {
        "pao": 50,
        "carne": 50,
        "queijo": 100,
        "molho": 50,
        "presunto": 50,
        "massa": 50,
        "frango": 50,
    }

    def __init__(self):
        pass
        self.quantities_to_buy = {
            "pao": 0,
            "carne": 0,
            "queijo": 0,
            "molho": 0,
            "presunto": 0,
            "massa": 0,
            "frango": 0,
        }
        self.remaining_quantities = {
            "pao": 50,
            "carne": 50,
            "queijo": 100,
            "molho": 50,
            "presunto": 50,
            "massa": 50,
            "frango": 50,
        }
        self.orders = []

    def create(self, costumer, order, day):
        self.orders.append({"costumer": costumer, "order": order, "day": day})
        for ingredient in self.INGREDIENTS[order]:
            self.quantities_to_buy[ingredient] += 1
            self.remaining_quantities[ingredient] -= 1

    def add_new_order(self, costumer, order, day):
        pass
        is_quantity_valid = set()
        for ingredient in self.INGREDIENTS[order]:
            is_quantity_valid.add(self.remaining_quantities[ingredient] > 0)
        if all(is_quantity_valid):
            self.create(costumer, order, day)
        else:
            return False

    def get_quantities_to_buy(self):
        pass
        return self.quantities_to_buy

    def get_available_dishes(self):
        available_dishes = set()
        for dish in self.INGREDIENTS:
            is_quantity_valid = set()
            for ingredient in self.INGREDIENTS[dish]:
                is_quantity_valid.add(
                    self.remaining_quantities[ingredient] > 0
                )
            if all(is_quantity_valid):
                available_dishes.add(dish)
        return available_dishes
