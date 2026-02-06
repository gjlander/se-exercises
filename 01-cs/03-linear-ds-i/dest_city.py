# paths = [["London","New York"], ["New York","Lima"], ["Lima","Sao Paulo"]]
# paths = [["B","C"], ["D","B"], ["C","A"]]
paths = [["A","Z"]]

def find_dest(array):
    n = len(array)
    if n == 1:
        return array[0][1]
    for i in range(n):
        for j in range(i + 1, n):
            if array[i][0] == array[j][1]:
                break
        else:
            return array[j][1]

print(find_dest(paths))