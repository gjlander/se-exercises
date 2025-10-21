class Pairs:
    def __init__(self):
        self.items = []
        self.options = {'(': ')', '[': ']', '{': '}'}

    def push(self, item):
        """Add an element to the top of the stack."""
        self.items.append(item)

    def pop(self):
        """Remove and return the top element of the stack."""
        if self.is_empty():
            return None  # or raise an exception
        return self.items.pop()

    def peek(self):
        """Return the top element without removing it."""
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        """Check if the stack is empty."""
        return len(self.items) == 0

def check_valid(string):
    pair_stack = Pairs()
    for char in string:
        if not pair_stack.is_empty():
            before = pair_stack.peek()
            if pair_stack.options[before] == char:
                pair_stack.pop()
        else:
            pair_stack.push(char)
    return pair_stack.is_empty()

s = "()[]{}"
# s = "(]"
print(check_valid(s))

