[![Maintainability](https://api.codeclimate.com/v1/badges/aa3681a6a4d0b14c6d50/maintainability)](https://codeclimate.com/github/se0ga/project-lvl2-s321/maintainability)
[![Issue Count](https://codeclimate.com/github/se0ga/project-lvl2-s321/badges/issue_count.svg)](https://codeclimate.com/github/se0ga/project-lvl2-s321)
[![Test Coverage](https://api.codeclimate.com/v1/badges/aa3681a6a4d0b14c6d50/test_coverage)](https://codeclimate.com/github/se0ga/project-lvl2-s321/test_coverage)
[![Build Status](https://travis-ci.com/se0ga/project-lvl2-s321.svg?branch=master)](https://travis-ci.com/se0ga/project-lvl2-s321)

# Project Generator Differences on node.js
## Getting Started
### Install
```bash
$ npm i -g se0ga_gendif
```

### Launch
1. Help.
```bash
$ gendif -h
```
<details><summary>How it works</summary>
https://asciinema.org/a/YNMVOpqJ37qZcI9koDwJ2c7Rd
</details>

2. compare json.
```bash
$ gendif <firstConfig> <secondConfig>
```
<details><summary>How it works</summary>
https://asciinema.org/a/5utAh7uGHpUy6r7Fw99vzL1Lc
</details>

3. compare yml.
```bash
$ gendif <firstConfig> <secondConfig>
```
<details><summary>How it works</summary>
https://asciinema.org/a/dK7KR0UktrcuefUrnPVXvrf9U
</details>

4. compare ini.
```bash
$ gendif <firstConfig> <secondConfig>
```
<details><summary>How it works</summary>
https://asciinema.org/a/o4YItCOwEhIeiMqyqERmB5C7w
</details>

5. compare nested json, yml, ini.
```bash
$ gendif <firstConfig> <secondConfig>
```
<details><summary>How it works</summary>
https://asciinema.org/a/WElKGCJ7Em3u5AaZ0ta9V6tOL
</details>

6. compare nested json, yml, ini with --format plain.
```bash
$ gendif <firstConfig> <secondConfig> --format plain
```
<details><summary>How it works</summary>
https://asciinema.org/a/PCEUBFQ5xCkjBaJEjzczLRFKi
</details>

6. compare nested json, yml, ini with --format json.
```bash
$ gendif <firstConfig> <secondConfig> --format json
```
<details><summary>How it works</summary>
https://asciinema.org/a/68rBGxzggoruk2psunMMWk4MG
</details>