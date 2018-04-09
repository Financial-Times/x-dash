# Server-Side Rendering Benchmarks

As of 05/04/2018 based on 10,000 requests with a concurrency of 50 and HTTP keep-alive on. Run on a 2017 Macbook Pro with the following stats:

```
Processor Name: Intel Core i5
Processor Speed: 2.3 GHz
Number of Processors: 1
Total Number of Cores: 2
Memory: 8 GB
```

## Results

Rank | Name     | Version | Requests per second | Time per request (ms)
-----|----------|---------|---------------------|-----------------------
1    | Hyperapp | 1.2.5   | 3234                | 0.309
2    | Inferno  | 5.0.1   | 2772                | 0.361
3    | Rax      | 0.5.4   | 2733                | 0.366
4    | Preact   | 8.2.7   | 2614                | 0.382
5    | VHTML    | 2.1.0   | 2482                | 0.403
6    | Hyperons | 0.1.1   | 2444                | 0.409
7    | Nerv     | 1.2.17  | 2362                | 0.423
8    | React    | 16.3.0  | 2242                | 0.446

## Raw Data

### Hyperapp

```
Document Path:          /hyperapp
Document Length:        4316 bytes

Concurrency Level:      50
Time taken for tests:   3.092 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      44430000 bytes
HTML transferred:       43160000 bytes
Requests per second:    3234.21 [#/sec] (mean)
Time per request:       15.460 [ms] (mean)
Time per request:       0.309 [ms] (mean, across all concurrent requests)
Transfer rate:          14032.82 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       3
Processing:     3   15   3.9     14      65
Waiting:        2   15   3.9     14      65
Total:          3   15   3.9     14      66
```

### Hyperons

```
Document Path:          /hyperons
Document Length:        4150 bytes

Concurrency Level:      50
Time taken for tests:   4.092 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      42770000 bytes
HTML transferred:       41500000 bytes
Requests per second:    2443.62 [#/sec] (mean)
Time per request:       20.461 [ms] (mean)
Time per request:       0.409 [ms] (mean, across all concurrent requests)
Transfer rate:          10206.43 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     1   20   3.6     19      70
Waiting:        1   20   3.6     19      70
Total:          1   20   3.6     19      70
```

### Inferno

```
Document Path:          /inferno
Document Length:        4156 bytes

Concurrency Level:      50
Time taken for tests:   3.608 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      42830000 bytes
HTML transferred:       41560000 bytes
Requests per second:    2771.78 [#/sec] (mean)
Time per request:       18.039 [ms] (mean)
Time per request:       0.361 [ms] (mean, across all concurrent requests)
Transfer rate:          11593.29 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     4   18   3.9     17      67
Waiting:        4   18   3.9     17      67
Total:          4   18   3.9     17      68
```

### Nerv

```
Document Path:          /nerv
Document Length:        4411 bytes

Concurrency Level:      50
Time taken for tests:   4.233 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      45380000 bytes
HTML transferred:       44110000 bytes
Requests per second:    2362.42 [#/sec] (mean)
Time per request:       21.165 [ms] (mean)
Time per request:       0.423 [ms] (mean, across all concurrent requests)
Transfer rate:          10469.38 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     4   21   5.6     19      79
Waiting:        4   21   5.6     19      79
Total:          4   21   5.6     19      79
```

### Preact

```
Document Path:          /preact
Document Length:        4130 bytes

Concurrency Level:      50
Time taken for tests:   3.825 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      42570000 bytes
HTML transferred:       41300000 bytes
Requests per second:    2614.59 [#/sec] (mean)
Time per request:       19.123 [ms] (mean)
Time per request:       0.382 [ms] (mean, across all concurrent requests)
Transfer rate:          10869.43 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     5   19   4.0     18      71
Waiting:        5   19   4.0     18      71
Total:          5   19   4.0     18      72
```

### Rax

```
Document Path:          /rax
Document Length:        4568 bytes

Concurrency Level:      50
Time taken for tests:   3.659 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      46950000 bytes
HTML transferred:       45680000 bytes
Requests per second:    2733.02 [#/sec] (mean)
Time per request:       18.295 [ms] (mean)
Time per request:       0.366 [ms] (mean, across all concurrent requests)
Transfer rate:          12530.80 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       3
Processing:     4   18   4.0     17      68
Waiting:        2   18   4.0     17      68
Total:          4   18   4.0     17      69
```

### React

```
Document Path:          /react
Document Length:        4148 bytes

Concurrency Level:      50
Time taken for tests:   4.459 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      42750000 bytes
HTML transferred:       41480000 bytes
Requests per second:    2242.85 [#/sec] (mean)
Time per request:       22.293 [ms] (mean)
Time per request:       0.446 [ms] (mean, across all concurrent requests)
Transfer rate:          9363.47 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     4   22   4.4     21      75
Waiting:        4   22   4.4     21      75
Total:          4   22   4.5     21      76
```

### VHTML

```
Document Path:          /vhtml
Document Length:        4298 bytes

Concurrency Level:      50
Time taken for tests:   4.028 seconds
Complete requests:      10000
Failed requests:        0
Keep-Alive requests:    10000
Total transferred:      44250000 bytes
HTML transferred:       42980000 bytes
Requests per second:    2482.50 [#/sec] (mean)
Time per request:       20.141 [ms] (mean)
Time per request:       0.403 [ms] (mean, across all concurrent requests)
Transfer rate:          10727.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       2
Processing:     3   20   3.9     19      80
Waiting:        2   20   3.9     19      80
Total:          3   20   3.9     19      80
```
