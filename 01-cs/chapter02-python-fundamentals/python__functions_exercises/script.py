# 1. Sum of List Elements
def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total 

nums = [1, 2, 3, 4, 5]
print("sum of nums:", sum_list(nums))
# 2. Sum of List Elements
def repeat_greeting(name, times):
    for i in range(times):
        print(f"Hello, {name}")

repeat_greeting("Jeff", 4)


# 3. Factorial Calculation
def factorial(n):
    total = 1
    for num in range(1, n + 1):
        total *= num
    return total

print("factorial:", factorial(9))


# 4. Fibonacci Sequence Generator
def fibonacci(n):
    fib_list = [0, 1]

    while len(fib_list) < n:
            fib_list.append(fib_list[-1] + fib_list[-2])
    return fib_list

print("fibonacci:", fibonacci(3)) 

# 5. Maximum of Two Numbers
def max_of_two(a, b):
    if a >= b:
        return a
    else:
        return b

print("max_of_two:", max_of_two(3, 5))
# 6. Print a Pattern with Nested Loops

def print_triangle(rows):
    for i in range(rows):
        print('*' * (i + 1))

print_triangle(3)