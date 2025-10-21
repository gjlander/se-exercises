class Queue:
    def __init__(self, queue=[]):
        self.queue = queue

    def enqueue(self, element):
        """Insert an element at the rear of the queue."""
        self.queue.append(element)

    def dequeue(self):
        """Remove and return the element at the front of the queue."""
        if self.isEmpty():
            return "Queue is empty"
        return self.queue.pop(0)

    def peek(self):
        """Return the front element without removing it."""
        if self.isEmpty():
            return "Queue is empty"
        return self.queue[0]

    def isEmpty(self):
        """Check if the queue is empty."""
        return len(self.queue) == 0

    def size(self):
        """Return the number of elements in the queue."""
        return len(self.queue)


# tickets = [2, 3, 2]
# k = 2

tickets = [5, 1, 1, 1]
k = 0


def check_time(array, pos):
    queue = Queue(array)
    seconds = 0
    pos_t = queue.queue[pos]
    while True:
        first = queue.dequeue()
        seconds += 1
        if first > 1:
            first -= 1
            queue.enqueue(first)
        if pos > 0:
            pos -= 1
        else:
            pos_t -= 1
            if pos_t < 1:
                break
            pos = queue.size() - 1

        print(queue.queue, "seconds:", seconds)
    return seconds


print(check_time(tickets, k))
