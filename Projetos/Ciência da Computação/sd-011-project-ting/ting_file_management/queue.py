class Queue:
    def __init__(self):
        self.value = list()

    def __len__(self):
        return len(self.value)

    def enqueue(self, value):
        return self.value.append(value)

    def dequeue(self):
        return self.value.pop(0)

    def search(self, index):
        if index < 0 or index >= len(self.value):
            raise IndexError
        return self.value[index]
