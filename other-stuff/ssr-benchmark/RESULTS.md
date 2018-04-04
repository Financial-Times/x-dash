# Server-Side Rendering Benchmarks

As of 02/04/2018 based on 10,000 requests with a concurrency of 50. Run on a 2017 Macbook Pro with the following stats:

```
Processor Name: Intel Core i5
Processor Speed: 2.3 GHz
Number of Processors: 1
Total Number of Cores: 2
Memory: 8 GB
```

## Results

Rank | Name | Version | Requests per second | Time per request (ms)
---|---|---|---|---
1 | Hyperapp | 1.2.5 | 2598 | 0.385
2 | VHTML | 2.1.0 | 2101 | 0.476
3 | Rax | 0.5.4 | 1914 | 0.522
4 | Preact | 8.2.7 | 1818 | 0.550
5 | Inferno | 5.0.1 | 1814 | 0.551
6 | React | 16.3.0 | 952 | 1.050

## Raw Data

### Hyperapp

```
Document Path:          /hyperapp
Document Length:        4316 bytes

Concurrency Level:      50
Time taken for tests:   3.849 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      44380000 bytes
HTML transferred:       43160000 bytes
Requests per second:    2597.90 [#/sec] (mean)
Time per request:       19.246 [ms] (mean)
Time per request:       0.385 [ms] (mean, across all concurrent requests)
Transfer rate:          11259.25 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       3
Processing:     1   19   4.8     18      62
Waiting:        1   19   4.7     18      62
Total:          3   19   4.8     18      63
```

### Inferno

```
Document Path:          /inferno
Document Length:        4156 bytes

Concurrency Level:      50
Time taken for tests:   5.512 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      42780000 bytes
HTML transferred:       41560000 bytes
Requests per second:    1814.33 [#/sec] (mean)
Time per request:       27.558 [ms] (mean)
Time per request:       0.551 [ms] (mean, across all concurrent requests)
Transfer rate:          7579.79 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0      23
Processing:     5   27   4.1     26      65
Waiting:        5   27   4.1     26      65
Total:          7   27   4.1     26      65
```

### Preact

```
Document Path:          /preact
Document Length:        4130 bytes

Concurrency Level:      50
Time taken for tests:   5.500 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      42520000 bytes
HTML transferred:       41300000 bytes
Requests per second:    1818.07 [#/sec] (mean)
Time per request:       27.502 [ms] (mean)
Time per request:       0.550 [ms] (mean, across all concurrent requests)
Transfer rate:          7549.27 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0      22
Processing:     4   27   4.0     26      61
Waiting:        4   27   4.0     26      61
Total:          6   27   4.0     26      61
```

### Rax

```
Document Path:          /rax
Document Length:        4568 bytes

Concurrency Level:      50
Time taken for tests:   5.225 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      46900000 bytes
HTML transferred:       45680000 bytes
Requests per second:    1913.88 [#/sec] (mean)
Time per request:       26.125 [ms] (mean)
Time per request:       0.522 [ms] (mean, across all concurrent requests)
Transfer rate:          8765.71 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.5      0      27
Processing:     2   26   3.9     25      58
Waiting:        2   26   3.9     25      58
Total:          4   26   3.9     25      58
```

### React

```
Document Path:          /react
Document Length:        4166 bytes

Concurrency Level:      50
Time taken for tests:   10.503 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      42880000 bytes
HTML transferred:       41660000 bytes
Requests per second:    952.11 [#/sec] (mean)
Time per request:       52.515 [ms] (mean)
Time per request:       1.050 [ms] (mean, across all concurrent requests)
Transfer rate:          3986.97 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.3      0     125
Processing:     1   52  21.8     48     185
Waiting:        1   52  21.7     48     185
Total:          3   52  21.7     48     185
```

### VHTML

```
Document Path:          /vhtml
Document Length:        4298 bytes

Concurrency Level:      50
Time taken for tests:   4.760 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      44200000 bytes
HTML transferred:       42980000 bytes
Requests per second:    2100.85 [#/sec] (mean)
Time per request:       23.800 [ms] (mean)
Time per request:       0.476 [ms] (mean, across all concurrent requests)
Transfer rate:          9068.14 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.3      0      29
Processing:     2   24   5.1     22      70
Waiting:        2   24   5.1     22      70
Total:          4   24   5.1     22      70
```
