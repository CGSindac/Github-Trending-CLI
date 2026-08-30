# Github-Trending-CLI
A CLI that retrieves trending repositories from GitHub using their API. 

## Pre-requisites
1. Node JS (I used version 24.17.0)

## Installation
1. Clone the Repository 
```bash
git clone https://github.com/CGSindac/Github-Trending-CLI
```
2. Install the dependencies
```bash
npm install
```

## Usage
```
node main.js --duration week --limit 10
```

**Flags** 

Every *Flag* is preceeded with two hyphens **( -- )**

|Flag|Description|
|:---|:----------:|
|*Duration*|Values can be the following: **Day**, **Week**, **Month**, **Year**. This signifies how old you want the data to be at most (<u>Example</u>: --Duration day, displays all the top repositories created starting yesterday) | 
|*limit*|Values must be numerical (*i.e* 1 / 2 / 50). Maximum of 100 as per GitHub API documentation. This alters how many results the program displays. |

## Creator's Notes
Completed this in 4 hrs using [GitHub's API Documentation](https://docs.github.com/en/rest/search/search?apiVersion=2026-03-10#search-repositories) and NodeJS

Did this to practice understanding and reading Web APIs and Javascript.

Fun little project!

\- Calix
