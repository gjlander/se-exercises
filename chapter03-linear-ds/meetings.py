def bubble_sort_nested(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j][0] > arr[j + 1][0]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


# intervals = [[0,30],[15,20], [5,10]]
intervals = [[7,10],[2,4]]
# bubble_sort_nested(intervals)
# print(intervals)
def check_meetings(array):
    bubble_sort_nested(array)
    for i in range(1, len(array)):
        if array[i][0] < array[i - 1][1]:
            return False
    return True

print(check_meetings(intervals))