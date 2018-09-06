module.exports = {
	files: {
		allow: [
			'components/x-eventpromo/.bowerrc',
			'makefile',
			'private/logos/Logo.pxm',
			'private/scripts/gh-pages',
			'tools/x-docs/.bowerrc',
			'tools/x-docs/LICENSE',
			'tools/x-docs/public-prod/x-dash',
			'tools/x-docs/static/storybook'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'0e89d872-5711-457b-80b1-4ca0d8afea46', // __tests__/__snapshots__/snapshots.test.js.snap:600|639|1138|1177|1671|1710|2199|2238|2737|2776|3270|3309|3808|3847|4351|4390|4894|4933, components/x-teaser/stories/video.js:11
			'a27ce49b-85b8-445b-b883-db6e2f533194', // __tests__/__snapshots__/snapshots.test.js.snap:638|1176|1709|2237|2775|3308|3846|4389|4932, components/x-teaser/stories/video.js:28
			'kyEyQEagBC5mBEFlIYvdg', // components/x-eventpromo/package-lock.json:3801, package-lock.json:613, tools/x-docs/package-lock.json:20068
			'3ygRkFHvodkyITyRuPkuc', // components/x-eventpromo/package-lock.json:3893, tools/x-docs/package-lock.json:21695
			'\\+icEBfc0U7qJCisqrTsKTjw4fNFy2pW9OqStD84g', // components/x-eventpromo/package-lock.json:4029, package-lock.json:1657, packages/x-rollup/package-lock.json:1244, tools/x-docs/package-lock.json:23111, tools/x-workbench/package-lock.json:16708
			'YEwgwAXU9cI67NIda0kJk', // components/x-eventpromo/package-lock.json:4084, package-lock.json:2134, tools/x-docs/package-lock.json:24306
			'PaQqUC9SRmAiSA9CCCYd4', // components/x-eventpromo/package-lock.json:4263, package-lock.json:3031, tools/x-docs/package-lock.json:26266, tools/x-workbench/package-lock.json:18519
			'\\+Nb/6l093lx4OQ0foGWNRoc19mWy7BzL\\+UAK2iVg', // components/x-eventpromo/package-lock.json:4403, package-lock.json:4037, packages/x-rollup/package-lock.json:1633, tools/x-docs/package-lock.json:27079, tools/x-workbench/package-lock.json:19139
			'P1tKYHVSZ6uFo26mtnve4HQFE3koh1UWVkp8YUC\\+', // components/x-eventpromo/package-lock.json:4477
			'3g8lYefrRRzvGeSowdJKAKyks8oUpLEd', // components/x-eventpromo/package-lock.json:4524, tools/x-docs/package-lock.json:27951
			'/ad/2oNbKtW9Hgovl5O1FvFWKkKblNXoN/Oou6\\+9', // components/x-eventpromo/package-lock.json:4588, package-lock.json:4333, tools/x-docs/package-lock.json:28606, tools/x-workbench/package-lock.json:19786
			'0F2r9T6k4ydGYhecl7YUBxBVxhL5oisPsNxAPe2g', // components/x-eventpromo/package-lock.json:4660|4660, tools/x-docs/package-lock.json:28921|28921
			'wnvdQcjq9TZjevvXzSUo7bfmw91saqMjzGS2xq91', // components/x-eventpromo/package-lock.json:4750|4750, package-lock.json:4828|4828, tools/x-docs/package-lock.json:31313|31313, tools/x-workbench/package-lock.json:22075|22075
			'6BctqTVQiBP3YUJ9C6DQOXJmkYR9X9fCLtCOJc5w', // components/x-eventpromo/package-lock.json:4851|4851, package-lock.json:5168|5168, tools/x-docs/package-lock.json:31442|31442, tools/x-workbench/package-lock.json:15219|15219|15847|15847|19570|19570
			'Gd2UZBJDkXlY7GbJxfsE8', // components/x-eventpromo/package-lock.json:4860, package-lock.json:5201, tools/x-docs/package-lock.json:31500, tools/x-workbench/package-lock.json:23159
			'/fxS2pBo2jbfcFRVuFZ/oFC\\+vZz0MNNk0h80iMn5', // components/x-eventpromo/package-lock.json:4921, package-lock.json:5779, tools/x-docs/package-lock.json:32405, tools/x-workbench/package-lock.json:23564
			'/0sO6neh2jqRDVHOQ4o/LMea0tgCkbMgea5ip/e\\+', // components/x-eventpromo/package-lock.json:4937, package-lock.json:5795, tools/x-docs/package-lock.json:32419, tools/x-workbench/package-lock.json:23580
			'\\+M/ETfHxQUK0oXg8ctgVnl9t3rosNVsZ1jG61nDA', // components/x-eventpromo/package-lock.json:4947, package-lock.json:5805, tools/x-docs/package-lock.json:32428, tools/x-workbench/package-lock.json:23590
			'LbqTKRAQ5kw8A90rA6fr4riOUpTZvQZA', // components/x-eventpromo/package-lock.json:5104, package-lock.json:6290, tools/x-docs/package-lock.json:33600, tools/x-workbench/package-lock.json:24382
			'JmbhsDo7fcAJq4s9h27Ew', // components/x-eventpromo/package-lock.json:5110, package-lock.json:6296, tools/x-docs/package-lock.json:33623, tools/x-workbench/package-lock.json:24388
			'7b55beac-38e7-11e8-9529-6286f384b7ce', // components/x-teaser/readme.md:33
			'a25832ea-0053-11e8-9650-9c0ad2d7c5b5', // components/x-teaser/stories/article.js:28, components/x-teaser/stories/package-item.js:22, components/x-teaser/stories/top-story.js:28
			'1005ca96-364b-11e8-8b98-2f31af407cc8', // components/x-teaser/stories/opinion.js:28
			'7e97f5b6-578d-11e8-b8b2-d6ceb45fa9d0', // components/x-teaser/stories/package.js:28
			'rgX94YeTcTMv/LFJUSByRpc\\+i4GgVnnhLxvMu/2Y', // package-lock.json:141, packages/x-rollup/package-lock.json:36, tools/x-workbench/package-lock.json:12848
			'E7AdgFBVeAPVMNcKGsHMA', // package-lock.json:272|753|962|5280|5635, packages/x-rollup/package-lock.json:1200, tools/x-docs/package-lock.json:22603|28301, tools/x-workbench/package-lock.json:16315
			'/\\+\\+YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw', // package-lock.json:365|3144|5373, tools/x-docs/package-lock.json:23566|24062|25750|26443|28379, tools/x-workbench/package-lock.json:13137|18702
			'wOcfdRHaZ7VWtqCztfHri', // package-lock.json:365|3144|5373, tools/x-docs/package-lock.json:23566|24062|25750|26443|28379, tools/x-workbench/package-lock.json:13137|18702
			'2eis5WqQGV7peooDyLmNEPUrps9\\+SXX5c9pL3xEB', // package-lock.json:450|1053|1552|5458|5702, tools/x-docs/package-lock.json:21282|22672|23652|24147|28485|32164, tools/x-workbench/package-lock.json:13222|14902|16385|23473
			'fNEiL2\\+AZt6AlAw/29Cr0UDe4sRAHCpEHh54WMz\\+', // package-lock.json:640, tools/x-docs/package-lock.json:20119, tools/x-workbench/package-lock.json:13483
			'/4qLSKoHGY/xvkZdVBGlKM/HuxxS3\\+sC66HhTNR7', // package-lock.json:817
			'3MYsjlwGTi0tjQ9ANXZu4', // package-lock.json:945, packages/x-rollup/package-lock.json:743, tools/x-docs/package-lock.json:21197, tools/x-workbench/package-lock.json:14811
			'/6raKHmDTCicQfTkqwN5fioMFV4j8BsfMU4R2DK/', // package-lock.json:1115
			't5Zpu0LstAn4PVg8rVLKF', // package-lock.json:1309, tools/x-docs/package-lock.json:34341, tools/x-workbench/package-lock.json:24666
			'wPMUt6FnH2yzG95SA6mzjQOEKUU3aLaDEmzs1ti\\+', // package-lock.json:1370, tools/x-docs/package-lock.json:20208, tools/x-workbench/package-lock.json:15713
			'eTVLrBSt7fjbDygz805pMnstIs2VTBNkRm0qxZd\\+', // package-lock.json:1418, tools/x-workbench/package-lock.json:15990
			'uzFUeufx5RHjGTACCargg', // package-lock.json:1431
			'hyrR/OifpVUndji3tmwGgD8qpw7iQu3RSbCrBpsQ', // package-lock.json:1466
			'OX8XqP7/1a9cqkxYw2yXss15f26NKWBpDXQd0/uK', // package-lock.json:1479, tools/x-docs/package-lock.json:22416|22995|23033|24278|28277|32207|32243|32263, tools/x-workbench/package-lock.json:24722
			'/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g', // package-lock.json:1715|3795|5765, packages/x-rollup/package-lock.json:972|1704|1885|2854, tools/x-docs/package-lock.json:29769|29926|29952|29978|30004|30637|31589, tools/x-workbench/package-lock.json:15584|18290|20295|22795|24071|24558
			'BOUkdmRmA9riiIPVvo5x86m5elviOk0Q', // package-lock.json:1808
			'FHyH341ZrbnMUpe\\+5Bocte9xkmFMzPMjRaZMcXww', // package-lock.json:1814
			'SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB', // package-lock.json:1830, tools/x-docs/package-lock.json:24382|25728, tools/x-workbench/package-lock.json:16884
			'gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB', // package-lock.json:1830, tools/x-docs/package-lock.json:24382|25728, tools/x-workbench/package-lock.json:16884
			'\\+A9DVCndXfkeFUd3byderg\\+EbDkfnevfCwynWaNA', // package-lock.json:1836
			'A9DVCndXfkeFUd3byderg', // package-lock.json:1836
			'SRUReLS5Q8a7GxtRdxEBVZpm98rJM7Sb', // package-lock.json:1836
			'FIUCJz1RbuS0FKTdaAafAByGS0CPvU3R0MeHxgtl', // package-lock.json:1866|1866, tools/x-docs/package-lock.json:23256|23256
			'/6WlbVge9bhM74OpNPQPMGUToDtz\\+KXa1PneJxOA', // package-lock.json:1957|4215, tools/x-docs/package-lock.json:23377|27816, tools/x-workbench/package-lock.json:17081|19530
			'wcS5vuPglyXdsQa3XB4wH', // package-lock.json:2063, packages/x-rollup/package-lock.json:1310, tools/x-docs/package-lock.json:23808, tools/x-workbench/package-lock.json:17180
			'iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX', // package-lock.json:2092
			'UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ', // package-lock.json:2734|2734, tools/x-docs/package-lock.json:25505|25505, tools/x-workbench/package-lock.json:17952|17952
			'FuZJMVWyNaIDr4RGmaSYw', // package-lock.json:2970
			'YdcWFniJhzI42\\+AzS\\+gNwmUzOSFcRCQYwySuBBBy', // package-lock.json:2999
			'/Oa3GESWLz7t1U62fk63aHuDJJEteXoDeTCcPmUT', // package-lock.json:3005
			'phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns', // package-lock.json:3058, packages/x-rollup/package-lock.json:1461, tools/x-docs/package-lock.json:26317, tools/x-workbench/package-lock.json:18595
			'rEaBd8SUNAWgkvyPKXYMb', // package-lock.json:3173, packages/x-rollup/package-lock.json:1507, tools/x-docs/package-lock.json:26468, tools/x-workbench/package-lock.json:18743
			'qgDYXFSR5WvEfuS5dMj6oTMEbrrSaM0CrFk2Yiq/', // package-lock.json:3286
			'eLAMkPG9FU0v5L02lIkcj', // package-lock.json:3404
			'I9dsgkeyjVEEZj9wrGrqlH\\+8OlNob9Iptyl\\+6L5\\+', // package-lock.json:3489
			'uPKBEAw7YrEMcXueMKZXn', // package-lock.json:3573
			'vTZfdNwwy4WwYogLh29DQ', // package-lock.json:3609
			'/8at7EQVjPGWCi3d5\\+6aCi7Gxy/XMWdOdbH1qtO/', // package-lock.json:3624
			'\\+Mlpvm1CJcsMESRjzUhzkz568exMV1hTB76nAKbA', // package-lock.json:3652
			'TSfVAu49jYC4BvQ4Sms9SZgdqGBgroqfDhJdTyKQ', // package-lock.json:4305|4305, tools/x-docs/package-lock.json:27942|27942, tools/x-workbench/package-lock.json:19678|19678
			'\\+Z/4UeDaLuSW\\+39JPeFgs4gCGqsrJHVZX0fUrx//', // package-lock.json:4725
			'/whI9pQD35YrARNnhxeiRktSOhSukRLFNlzg6Br/', // package-lock.json:4773, packages/x-rollup/package-lock.json:3425, tools/x-docs/package-lock.json:30256, tools/x-workbench/package-lock.json:21947
			'\\+AE0VCqECtf\\+QHAKgOL37tTaNCnuX1nAAQ4ZhyP\\+', // package-lock.json:4800, tools/x-docs/package-lock.json:30287, tools/x-workbench/package-lock.json:21997
			'oJiy8WBxgRzlKatYqtCjphTgDSCEiWFg', // package-lock.json:4859, tools/x-docs/package-lock.json:30516, tools/x-workbench/package-lock.json:22253
			'MHiRkO8uHoR5ntAA8Uq3P1vvMTX/BeQiRVSpDGLd', // package-lock.json:5004
			'TTlYpa\\+OL\\+vMMNG24xSlQGEJ3B/RzEfUlLct7b5G', // package-lock.json:5152, tools/x-docs/package-lock.json:31399, tools/x-workbench/package-lock.json:23095
			'wPrplCpVMFuwzXbkecJrb6IYo1iFb0S9v37754mg', // package-lock.json:5152, tools/x-docs/package-lock.json:31399, tools/x-workbench/package-lock.json:23095
			'mbKkMdQKsjX4BAL4bRYTj21edOf8cN7XHdYUJEe\\+', // package-lock.json:5727, tools/x-docs/package-lock.json:32186, tools/x-workbench/package-lock.json:23492
			'Zn99hVEYcMvKPct1IqNe7', // package-lock.json:5727, tools/x-docs/package-lock.json:32186, tools/x-workbench/package-lock.json:23492
			'MjqsvNwyz1s0k81Goz/9vRBe9SZdB09Bdw\\+/zYyO', // package-lock.json:5742, tools/x-docs/package-lock.json:32357, tools/x-workbench/package-lock.json:23536
			'NrQHlS/V/qgv763EYudVwEcMQNxd2lh\\+0VrUByXN', // package-lock.json:5811, tools/x-docs/package-lock.json:32442, tools/x-workbench/package-lock.json:23596
			'ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow', // package-lock.json:5940|5940, packages/x-rollup/package-lock.json:868|868|1890|1890|2859|2859, tools/x-docs/package-lock.json:32722|32722, tools/x-workbench/package-lock.json:15347|15347|20301|20301|22435|22435
			'T1vDcLdYsLQkM188PVVhQmzKIuThNkKg', // package-lock.json:5961
			'2kTGf\\+3tykCfrWVREgyTR0bmVO0afE6i7zVXi/m\\+', // package-lock.json:5975
			'bZZ8ujV89Aulxdcdv32yH', // package-lock.json:5975
			'/4vDM54WJsJio3XNn6K2sCG\\+CQ8G5Wz6bZhRZoAe', // package-lock.json:6074, tools/x-docs/package-lock.json:33012
			'YTdrdZheS8TFwvkbLWf/G5KNJDCh6pKL5OZctEW4', // package-lock.json:6253, tools/x-docs/package-lock.json:33494, tools/x-workbench/package-lock.json:24251
			'cwESVXlO3url9YWlFW/TA9cshCEhtu7IKJ/p5soJ', // package-lock.json:6268, tools/x-docs/package-lock.json:33567, tools/x-workbench/package-lock.json:24349
			'eEQ97k66aiEVpNnapVj90', // package-lock.json:6379, tools/x-docs/package-lock.json:34291, tools/x-workbench/package-lock.json:24582
			'FKxhYLytBQiUKjkYteN71fAUA3g6KpNXoho1isLiLSB3N1G4F35Q5vUxWfKFhBwi5IWF27VE6WxhrnnC', // package-lock.json:6385
			'2e8H3Od7mQK4o6j6SzHD4', // package-lock.json:6411, tools/x-docs/package-lock.json:34315, tools/x-workbench/package-lock.json:24603
			'/sFaDxgd6fxm1ewUaM0jZ444Fc5vC5ROYurg/4Pw', // package-lock.json:6506
			'ivSoxqBGYOqQVruxD35\\+EyCFDYNEFL/Uo6FcOnz\\+', // package-lock.json:6524
			'\\+RSG9DL7uEwRUZXZn3SS34DiDPfzP0VOiEwtUWlE', // package-lock.json:6544, tools/x-docs/package-lock.json:21997
			'\\+ibcyTppq/Cj0Xfqmc4\\+kh/RUvTIQWKUVir7ESFQ', // packages/x-logo/package-lock.json:49
			'm3hH17zgkgADUSi2RR1Vht6wOZ0jyHP8rjiQra9f', // packages/x-rollup/package-lock.json:15|15
			'GjJ71miod9tNsy6xT2ckm', // packages/x-rollup/package-lock.json:20
			'/Zh2D08Mx65pZ/4g5bsmNiZUuChDiQfTUQ7qJr4/', // packages/x-rollup/package-lock.json:780, tools/x-docs/package-lock.json:21412, tools/x-workbench/package-lock.json:14927
			'\\+I1AA596t9w1sQJ8jkiSr5\\+ZKi0WKrYGUn6d1Fx\\+', // packages/x-rollup/package-lock.json:785, tools/x-docs/package-lock.json:21444, tools/x-workbench/package-lock.json:14939
			'I1AA596t9w1sQJ8jkiSr5', // packages/x-rollup/package-lock.json:785, tools/x-docs/package-lock.json:21444, tools/x-workbench/package-lock.json:14939
			'7uo4mQgSWK9lmGKpuXhW1HYfOOF3le\\+coG/h0Op/', // packages/x-rollup/package-lock.json:840, tools/x-docs/package-lock.json:21733, tools/x-workbench/package-lock.json:15293
			'4CoL/A3hf90V3VIEjeuhSvlGFEHKzOz\\+Wfc2IVZc', // packages/x-rollup/package-lock.json:878, tools/x-docs/package-lock.json:21896, tools/x-workbench/package-lock.json:15522
			'4gEjHJFT9e\\+2W/77h/DS5SGUgwDaOwprX8L/gl5\\+', // packages/x-rollup/package-lock.json:964
			'\\+C10TsW4PURY/ic\\+eaysnSkwB4kA/mBlCyy/IKDJ', // packages/x-rollup/package-lock.json:1226, tools/x-docs/package-lock.json:22884, tools/x-workbench/package-lock.json:16576
			'Qkcp7P2ygktpMPh2mCQZaf3jhN6D3Z/qVZHSdWvQ', // packages/x-rollup/package-lock.json:1696
			'\\+c\\+\\+7IPULZtIkmAfBm5B3h\\+yxb/D2cZGlgKHCH3w', // packages/x-rollup/package-lock.json:1757
			'/y\\+yDJwBjoLQe1GSJbbaYQLTI7QHNZI2\\+rpmCDbe', // packages/x-rollup/package-lock.json:1836
			'soOk1h6J3VMTZtVeVpv15', // packages/x-rollup/package-lock.json:1875, tools/x-docs/package-lock.json:29759|29916|29942|29968|29994|31579, tools/x-workbench/package-lock.json:20284
			'D5za2wXSMtAf94tDUZHF3F5KZcTXISUNqgEQRiDw', // packages/x-rollup/package-lock.json:2832|2832
			'GSUYOJ9CrQ6D9yrsRW6iA', // packages/x-rollup/package-lock.json:2895, tools/x-docs/package-lock.json:29985, tools/x-workbench/package-lock.json:21353
			'McHPg0n1pIke\\+A/4VcaS2en\\+pTNjy4xF\\+Uuq86u/', // packages/x-rollup/package-lock.json:3420
			'AicPrAC7Qu1JxPCZ9ZgCZlY35QgFnNqc', // packages/x-rollup/package-lock.json:3599, tools/x-docs/package-lock.json:31340, tools/x-workbench/package-lock.json:23054
			'368nO21AN9QljsaIhb9ZiZtZARoVH5f3CsFbawdLdayCgKRPup7CggujvySMxx0I91NOyxdVENohprLQ', // packages/x-rollup/package-lock.json:3812, tools/x-docs/package-lock.json:33642, tools/x-workbench/package-lock.json:24422
			'\\+n7k30F4TVdHvCLn48peTJFRvCpxs3UuFPqgeELg', // packages/x-rollup/package-lock.json:3822
			'1e6c6202-398e-11e8-907c-8c199a03988a', // readme.md:2
			'/KEXLi2T2x2D6J6UBwmsgZNf0lLtHL/7N68KeLN\\+', // tools/x-docs/package-lock.json:10
			'J2VKcAmvDpJ83o2KEj3ft', // tools/x-docs/package-lock.json:10
			'/RUAX4VtmGzNTGLSfmiPxQ3XwUSe/1YN4lW9GRa\\+', // tools/x-docs/package-lock.json:19772
			'nvFUXkxCAO6UBJHPrDxWEa2KDMil86355fjo8jbZ', // tools/x-docs/package-lock.json:19792|19792
			'a2Z7UmwnAzZ23bTHV6on141S8vvSC7MEJGG85R5/', // tools/x-docs/package-lock.json:19800
			'ts5T58OAqqXaOcCvaI7UF', // tools/x-docs/package-lock.json:19862
			'XxNTUzKnz1ctK3ZIcI2XUPlD96wbHP2nGqkPKpvk', // tools/x-docs/package-lock.json:19967|19967
			'1hWSHTIlG/8wtYD\\+PPX5AOBtKWngpDFjrsrHgZpe', // tools/x-docs/package-lock.json:20019
			'nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw', // tools/x-docs/package-lock.json:20076, tools/x-workbench/package-lock.json:13434
			'deghhYnuqUbLvTkQm75lM', // tools/x-docs/package-lock.json:20866, tools/x-workbench/package-lock.json:14398
			'ZOpAI1/bN0Y3J1ZAK9gRsFkHy9gGgJoDRUjtUCla', // tools/x-docs/package-lock.json:21063
			'v5FzeqrP7hTG5aTb4aPreSbZJlhwPon9VKMuEVgV', // tools/x-docs/package-lock.json:21234|21234
			'/hhIC9OoO\\+KLpu9IJTS9j4DRVJ3aDDF9cMSoa2lw', // tools/x-docs/package-lock.json:21314, tools/x-workbench/package-lock.json:14921
			'1gOb75OYYxYMeASMztPF5', // tools/x-docs/package-lock.json:21324
			'QIZrnhueC1W0gYlDEeaPr', // tools/x-docs/package-lock.json:21389
			'KiH8pWhLFxkawcXhm6FpM', // tools/x-docs/package-lock.json:21397
			'TNPjfTr432qx7yOjQyaXm3dSR0MH9vXp7eT1BFSl', // tools/x-docs/package-lock.json:21482|21482, tools/x-workbench/package-lock.json:14995|14995
			'BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0', // tools/x-docs/package-lock.json:21543, tools/x-workbench/package-lock.json:15101
			'LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A', // tools/x-docs/package-lock.json:21543, tools/x-workbench/package-lock.json:15101
			'uLQeZdtbDo8mfUgYXCHSM1wgrVxXm6bSyrUuErEb', // tools/x-docs/package-lock.json:21612|21612
			'T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH', // tools/x-docs/package-lock.json:21887, tools/x-workbench/package-lock.json:15512
			'WclKAEzWH47lCdplFocUM', // tools/x-docs/package-lock.json:21959, tools/x-workbench/package-lock.json:15592
			'7yhQBmtN\\+uYZmfRjjVjKa0dZdWuabzpSKGtyQZN\\+', // tools/x-docs/package-lock.json:21977
			'/6zDY2gtAE\\+uZLSdkkovhnGpmCThsvKBFakq4EdY', // tools/x-docs/package-lock.json:22045
			'\\+if6uywV0nDGoiydJRy4yk7h9od5Og0kxx4zUXmw', // tools/x-docs/package-lock.json:22186, tools/x-workbench/package-lock.json:15755
			'wguW2MYXdIqvHBYCF2DNJ', // tools/x-docs/package-lock.json:22217, tools/x-workbench/package-lock.json:15797
			'NUqtwOAps4mk2Zob89MWXMHjHWg9milF', // tools/x-docs/package-lock.json:22227, tools/x-workbench/package-lock.json:15809
			'g5h82fGaIRWMWddtKBHi7', // tools/x-docs/package-lock.json:22309, tools/x-workbench/package-lock.json:15965
			'cCZTSNsMiZNvUeq0CqurF', // tools/x-docs/package-lock.json:22356, tools/x-workbench/package-lock.json:16003
			'0W171WccAjQGGTKLhw4m2nnl0zPHUlTO', // tools/x-docs/package-lock.json:22379
			'VUUdpppYuU1F9MWwRi1Y8', // tools/x-docs/package-lock.json:22571, tools/x-workbench/package-lock.json:16300
			'71FrxMl3E6lpKH7Ge3OXA', // tools/x-docs/package-lock.json:22852, tools/x-workbench/package-lock.json:16545
			'/qvi9P3OqgswKSDftbu8\\+IoI/QDTAm2fFnQ9SZSQ', // tools/x-docs/package-lock.json:22932, tools/x-workbench/package-lock.json:16636
			'/L22nqrSY5DKlo3X6\\+vclJm8Bb5djXJBmEX6fS3\\+', // tools/x-docs/package-lock.json:22974, tools/x-workbench/package-lock.json:16672
			'vclJm8Bb5djXJBmEX6fS3', // tools/x-docs/package-lock.json:22974, tools/x-workbench/package-lock.json:16672
			'snxFsPU9X0XgccOumKraa3juDMwTUyi7', // tools/x-docs/package-lock.json:23119
			'KvCISP7OUsHn85hT9nUkxxA9BEWxFn\\+Oj9o8ZNLm', // tools/x-docs/package-lock.json:23247, tools/x-workbench/package-lock.json:16942
			'ouLWV0hRw4hnaLtXzzwhdC79ewxKbY2PRvm05mPc', // tools/x-docs/package-lock.json:23352|23352
			'ZH7loueKBoDb7yG9esn1U', // tools/x-docs/package-lock.json:23813, tools/x-workbench/package-lock.json:17186
			'2YgwLCcI/fPFZkL5PSixOt6ZNKm\\+w\\+Hfp/Bciwow', // tools/x-docs/package-lock.json:24398
			'Rstbh9varMPBu9gaxjvCA', // tools/x-docs/package-lock.json:25133
			'CnUggbWAlRb6DAbt7Aac8', // tools/x-docs/package-lock.json:25347
			'usu85fcSRu3wY8X\\+vnsEhIxNP5VbVIDiXnLqyKIG', // tools/x-docs/package-lock.json:25413
			'RmzGrpjQuLemGKSb77Qukiaei58Bogrl', // tools/x-docs/package-lock.json:25497
			'JAzQV4WpoY5WHcG0S0HHY', // tools/x-docs/package-lock.json:25662, tools/x-workbench/package-lock.json:18048
			'rYj24lkinxf69blJbnsvtqqNU\\+L3SL50vzZhXOnw', // tools/x-docs/package-lock.json:25795
			'X8hoaEfs1zSZQDMZprCj8', // tools/x-docs/package-lock.json:25892, tools/x-workbench/package-lock.json:18176
			'/E3JzDEazVH\\+VGlZi6R94ZqImq\\+A3D1mCEtrFIfg', // tools/x-docs/package-lock.json:25901, tools/x-workbench/package-lock.json:18186
			'YFNXVzz0zHFVJnhjIjn7Nak8GbL4nzT2q0RA5div', // tools/x-docs/package-lock.json:25942|25942
			'1YeAoZqq9z9U17vWQ9hMmqbVaROuSK8feL3wTCJg', // tools/x-docs/package-lock.json:25952|25952
			'/4iy1xZ81/9SIJiq1NGFUMGs6ParyjBZr6jW2Ufj', // tools/x-docs/package-lock.json:26042
			'rqcy4pJo55FTTLWt\\+bU8ukscqHeE/e9KWvsOW2b/', // tools/x-docs/package-lock.json:26047
			'oTZqweIP51xaGPI4uPa56', // tools/x-docs/package-lock.json:26198, tools/x-workbench/package-lock.json:14969|22213
			'DbXOxGpXn3eMvNW4x4irjqXm4wHKscC\\+TfxSJ0yw', // tools/x-docs/package-lock.json:26208, tools/x-workbench/package-lock.json:18443
			'jVMFbYir2bp6bAj8efFNxWqHX0dIss6fJQ\\+/\\+qeQ', // tools/x-docs/package-lock.json:26276, tools/x-workbench/package-lock.json:22384
			'Cbt33SmUnSol\\+pnXFvLxSHNq2CemUXNdaXV6Flg7', // tools/x-docs/package-lock.json:26367
			'Spzvcdr0wAHB2B1j0UDPU', // tools/x-docs/package-lock.json:26372
			'uA1FvQXsAnYIl1T3B2X5E', // tools/x-docs/package-lock.json:26428
			'Df2Y9akRFxbdU13aZJL2e', // tools/x-docs/package-lock.json:26499, tools/x-workbench/package-lock.json:18782
			'/kb\\+4HiNSejAPhSaN1VukdNTTi/r4/e\\+yykqjlG/', // tools/x-docs/package-lock.json:26746
			'z0FNlV4NGgjQN1fdtHYXf5kmgludM65fG/JlXzU6', // tools/x-docs/package-lock.json:26751
			'qBuCmrm5byPNuiiddAHvQ', // tools/x-docs/package-lock.json:26751
			'5dGqmbD6hUUK29OxhbF7y', // tools/x-docs/package-lock.json:26932
			'MAvG4OhjdPe6YQaLWx7NV', // tools/x-docs/package-lock.json:26962|33060
			'hqMTTlvJvsDWngAT3f7bI', // tools/x-docs/package-lock.json:27165, tools/x-workbench/package-lock.json:19169
			'/cjMqdnKTUWTBSKchJlxXXuUSxCCl8rJlf4g6yww', // tools/x-docs/package-lock.json:27218
			'DZ05rVD1y9G1KnvOa7YRs', // tools/x-docs/package-lock.json:27243
			'sAqqVW3YtEVoFQ7J0blT8', // tools/x-docs/package-lock.json:27704, tools/x-workbench/package-lock.json:19376
			'NomkjYEn6cN9rImXMz1st', // tools/x-docs/package-lock.json:27854
			'3wanS6Ce1MWjCzH6NnhPJ', // tools/x-docs/package-lock.json:28187
			'GgzS0B96gbaFtiNXNKeQ1', // tools/x-docs/package-lock.json:28742
			'cnS2a5F2x\\+w5ppvTqObojTP7WiFG\\+kVZs9Inw\\+qQ', // tools/x-docs/package-lock.json:28855
			'\\+l/gS8H\\+kKYjrEndd5Pm1MfBtsEKA038HkkdbAl/', // tools/x-docs/package-lock.json:28872, tools/x-workbench/package-lock.json:20008
			'dKpacfTNxsx6pLEpEomM7gah6VeHSYV3', // tools/x-docs/package-lock.json:28940
			'lQe48YPsMJAig\\+yngZ87Lus\\+NF\\+3mtu7DVOBu6b/', // tools/x-docs/package-lock.json:28995, tools/x-workbench/package-lock.json:20088
			'\\+hO3X6KRG6w7uYO/HL9fHalSySTdyn63C3WNvTM/', // tools/x-docs/package-lock.json:29031
			'32BBeABfUi8V60SQ5yR6G', // tools/x-docs/package-lock.json:29175, tools/x-workbench/package-lock.json:20227
			'y4CXP3thSxqf7c0qmOF\\+9UeOTrifiVTIM\\+u7NWlq', // tools/x-docs/package-lock.json:29204, tools/x-workbench/package-lock.json:20250
			'RP1uyt5mAoZIyIHLZQTNy', // tools/x-docs/package-lock.json:29486
			'WZCpMXPUfnx29YELCUAro', // tools/x-docs/package-lock.json:29551
			'WfoCyjrOLKIrL3VoU9Tvg', // tools/x-docs/package-lock.json:29742
			'5erio2h9jp5CHGwcybmxmVqHmnCBZeewlfJ0pex\\+', // tools/x-docs/package-lock.json:30313, tools/x-workbench/package-lock.json:22007
			'8ebhBxrqftHWnyTFweJ5Q', // tools/x-docs/package-lock.json:30346
			'eRzhrN1WSINYCDCbrz796z37LOe3m5tmW7RQf6oBntukAG1nmovJvhnwHHRMAfeoItc1m2Hk02WER2aQ', // tools/x-docs/package-lock.json:30386, tools/x-workbench/package-lock.json:14975|17057
			'eTPo5t/4bgaMNZxyjWx6N2a6AuE0mq51KWvpc7nU', // tools/x-docs/package-lock.json:30410, tools/x-workbench/package-lock.json:22103
			'lqD4eHKVuB65RyO/hGbEST53E2/GPbcIPcFYyeW/', // tools/x-docs/package-lock.json:30527
			'rJWaSJBvKBN2Z0T7v/aLaigpZsdsoWFyqYz8G7Ti', // tools/x-docs/package-lock.json:30712
			'QXE40c18C3RrGkoUhUwpI', // tools/x-docs/package-lock.json:30840
			'Abs7qjsah6khA5o8HBE2wa0VipE5vniYINdkNyxV', // tools/x-docs/package-lock.json:30907|30907
			'\\+eBKOnH2VYvk8qbwsCG/TAJdmTL7f1PROUcSO8qt', // tools/x-docs/package-lock.json:31022
			'/WUaSEPaYhQ8HFgMVjpvLTCaCfHEpptNQPJf5uDG', // tools/x-docs/package-lock.json:31032
			'7Kw0BCB47njAwAf1CF20w', // tools/x-docs/package-lock.json:31107
			'jQrELxbqVd69MyyvTEA4s', // tools/x-docs/package-lock.json:31127, tools/x-workbench/package-lock.json:24843
			'\\+2kHUhnDUh6CGilFKB1H3f\\+DLzvqIHUyNYKWS/jZ', // tools/x-docs/package-lock.json:31142
			'2kHUhnDUh6CGilFKB1H3f', // tools/x-docs/package-lock.json:31142
			'pkDjY1D8GaN7spsxvCSx8dkPqOZCEZyfxcmJG2IA', // tools/x-docs/package-lock.json:31450|31450, tools/x-workbench/package-lock.json:23116|23116
			'ufk2dFT3QeP9HyZ/xTuMtW27KnFy815CYitJMqQm', // tools/x-docs/package-lock.json:31459
			'RZVvCWm9BHOYloaE6LLiE/ibpjv1CmI8F8k0B0Cp', // tools/x-docs/package-lock.json:31464
			'RZVvCWm9BHOYloaE6LLiE', // tools/x-docs/package-lock.json:31464
			'/xRJmkPFDd0IltoTl/QJ6hAr5Y\\+3ZVeBQRLuWZKe', // tools/x-docs/package-lock.json:31777
			'\\+PjyTTMMeNQC4DZw5AwfvelsUrA6B67NKMqXDbzQ', // tools/x-docs/package-lock.json:31923
			'QahvxwQZXKygOQ256myeN', // tools/x-docs/package-lock.json:31923
			'cBBzwBcNDWoFxt2XEFIpQ', // tools/x-docs/package-lock.json:32004, tools/x-workbench/package-lock.json:23318
			'ftGxQQxqDg94z5XTuEQMY', // tools/x-docs/package-lock.json:32062, tools/x-workbench/package-lock.json:18589
			'Gz9j5MEpTz2UFuXiKPJocb7gnsLHwiS05ige5BEA', // tools/x-docs/package-lock.json:32300|32300
			'/QQ9HtLLyWJNbPlwGLelOVOEijUbTTJeLLI59jLw', // tools/x-docs/package-lock.json:32307
			'zhSCtt8v2NDrRlPQpCNtw', // tools/x-docs/package-lock.json:32542, tools/x-workbench/package-lock.json:23641
			'E8udKFHjIplnRQflkXP1A1Ie3HoEv04W', // tools/x-docs/package-lock.json:32603
			'/nE3ysXra9EEhOKv4\\+cMS95YkexWY8128J2VL8rk', // tools/x-docs/package-lock.json:32754
			'ebG55zZmxLE0etfWRbWok', // tools/x-docs/package-lock.json:32811
			'MGCiQR6qWBDcyi5kxL9J7', // tools/x-docs/package-lock.json:32879, tools/x-workbench/package-lock.json:23881
			'lx9B5iv7msuFYE3dytT\\+KE5tap\\+rNYw\\+K4jVkb9R', // tools/x-docs/package-lock.json:32936
			'pbBSM17jtunHplhBe6RRJdZx3Pn2Jph24O32mOVg', // tools/x-docs/package-lock.json:32936
			'9serjQBIztjRz6FkJez9D/hleyAXTBGLwwZUw9lA', // tools/x-docs/package-lock.json:32992
			'9serjQBIztjRz6FkJez9D', // tools/x-docs/package-lock.json:32992
			'\\+HTvxfHNKFa/HGCVyJpDiioUYaBhfiT6rgk\\+l4mg', // tools/x-docs/package-lock.json:33103
			'\\+DimvA4YCy\\+/nvJd61nWQQ2liO/nF/RjkTpiOGi\\+', // tools/x-docs/package-lock.json:33108
			'8nDsYI8uTmAlc0nNkRMOw', // tools/x-docs/package-lock.json:33108
			'\\+abVK4f0aAm8Ik8N08c5nAYVmuSxfvpA9rCcNyX/', // tools/x-docs/package-lock.json:33325
			'\\+tUZgSval5CA7tr0pHBwybF7OnEa1dOFqg6BfYH/', // tools/x-docs/package-lock.json:33343
			'05QfJDPI7PE1BIUtAxeSV', // tools/x-docs/package-lock.json:33343
			'XxoNOBvq1WXRKXxgnSYbtCF76TJrRoe5', // tools/x-docs/package-lock.json:33348
			'\\+mlTg/s9R5Lwg87f9bM/3sQB99w\\+N9D/qnM9ar3\\+', // tools/x-docs/package-lock.json:33366
			'7iAgiMkLhSbaZxUqmrprw', // tools/x-docs/package-lock.json:33457, tools/x-workbench/package-lock.json:24221
			'\\+KuAW36YKo0vClhQzLLveoj8FwPJNu65xLb7Mrt\\+', // tools/x-docs/package-lock.json:33545, tools/x-workbench/package-lock.json:24330
			'ejdrifsIydN1XDH7EuR2hn8ZrkRKUYF7tUcBjBy/', // tools/x-docs/package-lock.json:33605
			'\\+1db5a/L7sVJZVDPUC1Br8f0SKRr1KjLpD1U/IAw', // tools/x-docs/package-lock.json:34390
			'\\+udGBeTbFnERA\\+lF541DDpMawzo4z6W/QrzNM18D', // tools/x-docs/package-lock.json:34441
			'5UptYl8amjWe1hBRqZ8JL', // tools/x-workbench/package-lock.json:12509
			'42WgG8iFPOE0nrl7lrSFD', // tools/x-workbench/package-lock.json:12547
			'7kyNiPbYfX6ODUcPEaUNdXlZgLfDk1alJWGeJrDw', // tools/x-workbench/package-lock.json:12617|12617
			'MY614qCn7cE1t2cGaMG\\+T\\+kPWV9YiI7DumWlwFVk', // tools/x-workbench/package-lock.json:12643
			'GD4OYJ8GsayVhIg306sfgcKDk9j8YfuSKIAWvdB/', // tools/x-workbench/package-lock.json:12690
			'YdqMFMDe5jOP1AUE3j9g01x0eW7bVjRawSpl\\+\\+Ew', // tools/x-workbench/package-lock.json:12788
			'vA8bQfCmzBTtJsPkITFgD', // tools/x-workbench/package-lock.json:12800
			'wQKbhUe6L93kknekGlTRY0kvYcpuSi0aa9rVrMr/', // tools/x-workbench/package-lock.json:13411
			'D68W1M3ibCcbg0ysh3ww4', // tools/x-workbench/package-lock.json:13798
			'flIBfrqAdHWn\\+4l2cS/4jZEyl\\+m5EaBHVzTb0aOF', // tools/x-workbench/package-lock.json:13863
			'KyWsJo5\\+kPzUZZaMRSSItoYc0pxFX7gEO7ZC1/gN', // tools/x-workbench/package-lock.json:13872
			'2Ewq5pL7V68oHg1hKXkBIE0Z4/FjSoHz6vosZLOe', // tools/x-workbench/package-lock.json:13904
			'\\+6CvF5/Ttsth3LMg4/BhyvVZ82GImeKMXGdVRQGK', // tools/x-workbench/package-lock.json:13934
			'/w9158DWieUxU6/VvnYVy59geeFEkVgLZYBE8EBP', // tools/x-workbench/package-lock.json:13943
			'TgZj6ay8zDw74AS3yiIfoQ8vRSNJisYO', // tools/x-workbench/package-lock.json:13958
			'/Xu9q1tYlpsLIsa3EeLXXk0VwlxqTcFRfg9EhMW\\+', // tools/x-workbench/package-lock.json:15228
			'XLFgaHSdLTGr4O8Be6A8r3MOphEiI8Gc1n0ecf3g', // tools/x-workbench/package-lock.json:15575|15575
			'zmC33E8FFSq3AbflTvqvPvBo621H36Afsxlui91d', // tools/x-workbench/package-lock.json:15864|15864
			'WON75iAViSUJLiU3PKbpA', // tools/x-workbench/package-lock.json:16034
			'LqfJFBEYaDITx7S7cR7mJ', // tools/x-workbench/package-lock.json:16447
			'fO3Di4tBKJpYTFHAxTU00BcfWMY9w24r', // tools/x-workbench/package-lock.json:16612
			'vmryBdqKRO8Ei9LJ4yyEk', // tools/x-workbench/package-lock.json:16752
			'N8F2m0hhZiMoWtcfepExzNKZumFU3ksdQbInGWCg', // tools/x-workbench/package-lock.json:16927|16927
			'TGR4HU7HUsGg6GCOPJnFk06RhWgEWFLAGWiT6rcD', // tools/x-workbench/package-lock.json:17170|17170
			'l6aeT5Ze3RefXiKUtabFNgv1vMp9L2ku', // tools/x-workbench/package-lock.json:17257
			'/jGz\\+A6FBxPDUPkm1tNfF6bhTYPA7i7aF4lZJVr\\+', // tools/x-workbench/package-lock.json:17872
			'ZxRKUmDDT8PMpnfQQdr1L', // tools/x-workbench/package-lock.json:18100
			'7yFBNvY1UwXqvtILeE6n0ITwBXxp34M0', // tools/x-workbench/package-lock.json:18296
			'3Yu9vg0T\\+sun\\+Q9EoqggifeyABKfvFROqPwwwpv\\+', // tools/x-workbench/package-lock.json:19307
			'otD1J10j/tC\\+VNoGK9keCuByhKovAvdn74dmxJl9', // tools/x-workbench/package-lock.json:19502
			'7p/K2f6dI\\+dM8yjRQEGrTQs5hTQixUAdOGpMEA3\\+', // tools/x-workbench/package-lock.json:21986
			'ruPMNRkN3MHP1cWJc9OWr', // tools/x-workbench/package-lock.json:22042
			'2ZQfRpsaLVt38LAPbxe50LLszlmGtRerA14JzzRw', // tools/x-workbench/package-lock.json:22265|22265
			'd2FbKvYe4XAQx5gjHBoWG\\+ADqC3fGZzjb7i9vxd/', // tools/x-workbench/package-lock.json:22298
			'd2FbKvYe4XAQx5gjHBoWG', // tools/x-workbench/package-lock.json:22298
			'/42BIOD0zSKTHAWV4\\+gDy3yGm283z2072rA2gdtw', // tools/x-workbench/package-lock.json:22553
			'aIcbWb0fKFhEMB\\+RadoOYawlr1JoMMfrQ1oRgPUG', // tools/x-workbench/package-lock.json:22607
			'fBASbA6LnOU9dOU2eW7aQ8xmYBSXUIWr', // tools/x-workbench/package-lock.json:22617
			'MXQenEhdkPAABuE2Astq4zEPdMqUQxcg', // tools/x-workbench/package-lock.json:22635
			'\\+kZwrPxPCPcFqyx83kkr\\+5Lz5gs6djuvE5By\\+gce', // tools/x-workbench/package-lock.json:22689
			'Xf0nWe6RseziFMu\\+Ap9biiUbmplq6S9/p\\+7w7YXP', // tools/x-workbench/package-lock.json:23036
			'EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD', // tools/x-workbench/package-lock.json:23251
			'/x/dU1qVKtWUAAZeOHsR9c2Ddi4XerFy3mc1alf\\+', // tools/x-workbench/package-lock.json:23611
			'Zwc44pEWNqpKl1Loupp1WhFg7SlYmHZRUfdAacgw', // tools/x-workbench/package-lock.json:24049|24049
			'6kNUNyc\\+aeNKEhtTu/Mn\\+OfpsNBGuTxU8S2DUcis', // tools/x-workbench/package-lock.json:24410
			'nkzPzee4o0EdvCuPmxT98', // tools/x-workbench/package-lock.json:24457
			'\\+3tHbM87WnSWnENBUvA2pxJPLhQUg5LKwUQHq3r\\+' // tools/x-workbench/package-lock.json:24672
		]
	}
};
