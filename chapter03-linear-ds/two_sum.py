nums = [32, 11, 15, 2, 7]
target = 9

# nums = [3,2,4]
# target = 6

# nums = [3,3]
# target = 6

def find_target(array, targ):
    n = len(array)
    checks = 0
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            checks += 1
            if array[i] + array[j] == targ:
                print("find_target checks:", checks)
                return [i, j]


def better_find(array, targ):
    n = len(array)
    
    checks = 0
    for i in range(n):
        for j in range(i + 1, n):
            checks += 1
            # print(f"i:{i}, j:{j}")
            if array[i] + array[j] == targ:
                print("better_find checks:", checks)
                return [i, j]
            

print(find_target(nums, target))
print(better_find(nums, target))
