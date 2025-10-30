﻿// Program.cs
using GenericsExercise.Services;
using GenericsExercise.Models;
using GenericsExercise.Utils;

// -------------------------------
// Demos
// -------------------------------

Console.WriteLine("== GenericRepository<T> demo ==");
Console.WriteLine("== Employees ==");
var empRepo = new GenericRepository<Employee>();
empRepo.Add(new Employee { Id = 1, Name = "Ada", Department = "R&D" });
empRepo.Add(new Employee { Id = 2, Name = "Grace", Department = "Ops" });

var e = empRepo.GetById(1);
Console.WriteLine("GetById(1): " + (e is null ? "not found" : e));

empRepo.Update(new Employee { Id = 2, Name = "Grace Hopper", Department = "Ops" });
Console.WriteLine("All employees:");
foreach (var emp in empRepo.GetAll()) Console.WriteLine("  " + emp);

empRepo.Delete(1);
Console.WriteLine("After deleting Id=1, remaining:");
foreach (var emp in empRepo.GetAll()) Console.WriteLine("  " + emp);

Console.WriteLine("== Employees ==");
var blogRepo = new GenericRepository<BlogPost>();
blogRepo.Add(new BlogPost { Id = 1, Title = "Generics in C#", Likes = 10 });
blogRepo.Add(new BlogPost { Id = 2, Title = "Understanding Delegates", Likes = 25 });

var post = blogRepo.GetById(2);
Console.WriteLine("GetById(2): " + (post is null ? "not found" : post));

blogRepo.Update(new BlogPost { Id = 1, Title = "Generics in C# - Updated", Likes = 15 });
Console.WriteLine("All blog posts:");
foreach (var p in blogRepo.GetAll()) Console.WriteLine("  " + p);

blogRepo.Delete(2);
Console.WriteLine("After deleting Id=2, remaining:");
foreach (var p in blogRepo.GetAll()) Console.WriteLine("  " + p);

Console.WriteLine();
Console.WriteLine("== Pair<T1,T2> demo ==");
var p1 = new Pair<int, string>(7, "seven");
var p2 = new Pair<int, string>(7, "seven");
var p3 = new Pair<int, string>(8, "eight");
Console.WriteLine($"p1: {p1}");
Console.WriteLine($"p2: {p2}");
Console.WriteLine($"p3: {p3}");
Console.WriteLine($"p1.Equals(p2): {p1.Equals(p2)}"); // true
Console.WriteLine($"p1.Equals(p3): {p1.Equals(p3)}"); // false
var (num, word) = p1;
Console.WriteLine($"Deconstructed: num={num}, word={word}");

Console.WriteLine();
Console.WriteLine("== Swap<T> demo ==");
int a = 1, b = 2;
Swap(ref a, ref b);
Console.WriteLine($"Swap ints => a={a}, b={b}");

string xs = "hello", ys = "world";
Swap(ref xs, ref ys);
Console.WriteLine($"Swap strings => x={xs}, y={ys}");

Console.WriteLine();
Console.WriteLine("== FindMax<T> demo ==");
var numbers = new[] { 5, 2, 9, 1, 9, 3 };
Console.WriteLine("Max(int): " + FindMax(numbers));

var words = new[] { "apple", "pear", "banana" };
Console.WriteLine("Max(string): " + FindMax(words));

var people = new[]
{
    new Person { Name = "Lin",  Age = 29 },
    new Person { Name = "Mina", Age = 41 },
    new Person { Name = "Zed",  Age = 35 }
};
Console.WriteLine("Max(Person by Age): " + FindMax(people));

// keep console open if you like
// Console.ReadLine();



// -------------------------------
// Generic methods
// -------------------------------
static void Swap<T>(ref T a, ref T b) => (a, b) = (b, a);

static T? FindMax<T>(IEnumerable<T> source) where T : IComparable<T>
{
  using var e = source.GetEnumerator();
  if (!e.MoveNext()) return default;
  var max = e.Current;
  while (e.MoveNext())
    if (e.Current.CompareTo(max) > 0) max = e.Current;
  return max;
}

// -------------------------------
// Demo types for GenericRepository<T>
// -------------------------------
sealed class Employee : IIdentifiable
{
  public int Id { get; set; }
  public string Name { get; set; } = "";
  public string Department { get; set; } = "";

  public override string ToString() => $"{Id}: {Name} ({Department})";
}

sealed class BlogPost : IIdentifiable
{
  public int Id { get; set; }
  public string Title { get; set; } = "";
  public int Likes { get; set; }

  public override string ToString() => $"{Id}: {Title} [Likes: {Likes}]";
}

// For FindMax<T> demo with a custom comparable type
sealed class Person : IComparable<Person>
{
  public string Name { get; init; } = "";
  public int Age { get; init; }

  public int CompareTo(Person? other)
      => other is null ? 1 : Age.CompareTo(other.Age);

  public override string ToString() => $"{Name} ({Age})";
}

