---
title: "One-liner to sum up numbers from a CSV file column"
date: "2021-06-07"
description: A step-by-step guide to build a one-liner using cat, awk, xargs, sed, and bc.
type: unix
---

This is the `shopping.csv` CSV file that we're going to be working with throughout this blog post.

```
item,price
rice,2.49
potatos,1.49
pasta,3.79
```

The goal is to create a bash script calculating the sum of the prices, **7.77**.

1. **Display the file**

```bash
$ cat /tmp/shopping.csv
```

Output is exactly what you could expect, the file content itself, with no modifications.
One thing is it allows us to redirect - pipe - this output to another Unix comand in the next step.

```
item,price
rice,2.49
potatos,1.49
pasta,3.79
```

2. **Cut the first line**

There are many ways to achieve it, but we use the `tail +n` syntax.
It takes all the lines until the end of the file starting from the second line.

```bash
$ cat /tmp/shopping.csv | tail +2
```

Output:

```
rice,2.49
potatos,1.49
pasta,3.79
```

3. **Cut the first column**

`awk` splits each line by comma, defined by the option `-F` (file separator), and prints the second column.

```bash
$ cat /tmp/shopping.csv | tail +2 | awk -F , '{print $2}'
```

Output:

```
2.49
1.49
3.79
```

4. **Concatenate the prices**

`xargs` is used to "squash" the lines into a single string, separating them by space.

```bash
$ cat /tmp/shopping.csv | tail +2 | awk -F , '{print $2}' | xargs
```

Output:

```
2.49 1.49 3.79
```

5. **Replace spaces with pluses**

The `sed` expression replaces space `\ ` with `+` globally (`g`).

```bash
$ cat /tmp/shopping.csv | tail +2 | awk -F , '{print $2}' | xargs | sed -e 's/\ /+/g'
```

Output:

```
2.49+1.49+3.79
```

6. **Perform the calculation**

`bc` is a simple calculator, you can use it interactively or by piping an equation into it.

```bash
$ cat /tmp/shopping.csv | tail +2 | awk -F , '{print $2}' | xargs | sed -e 's/\ /+/g' | bc
```

Output:

```
7.77
```
