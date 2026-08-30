// Imports
const { Octokit } = require('octokit');

const octokit = new Octokit();

// Filters in utilizing github API
const durationOptions = ['day', 'week', 'month', 'year'];
const filters = {
    duration : 'week',
    limit : 10,
}

function setFilters(args = {})
{   
    console.log('Setting Filters...')
    const tempObj = {};

    // Parse CLI flags and values for filters
    for (let idx = 0; idx < args.length; ++idx)
    {    
        if (args[idx].slice(0,2) === "--")
        {   
            const flag = args[idx].trim().slice(2).toLowerCase();
            const flagVal = args[idx+1];

            // Check if flag is within program specifications
            if (!(flag in filters))
            {
                console.log(`Unidentified filter on ${flag}.`);
                console.log(`\nProper Usage:`);
                console.log(`--duration <day/week/month/year> | default: week `);
                console.log(`--limit <val> | default: 10`);

                process.exit(1); //  Stops the program
            }

            // Check if flag value is undefined
            if (flagVal === undefined)
            {
                console.log(`Missing Value on ${flag}.`);
                console.log(`\nProper Usage:`);
                console.log(`--duration <day/week/month/year> | default: week `);
                console.log(`--limit <val> | default: 10`);
            }

            
            
            tempObj[flag] = flagVal.trim();
        }
    }

    const finalObj = {
        ...filters,
        ...tempObj
    };

    // Normalize Fields
    finalObj.duration = finalObj.duration.toLowerCase();

    // Check values if within program specifications
    if (!(durationOptions.includes(finalObj.duration)))
    {
        console.log(`Improper value on filter: \'--duration\'.`);
        console.log(`\nProper Usage:`);
        console.log(`--duration <day/week/month/year> | default: week `);
        console.log(`--limit <val> | default: 10`);

        process.exit(1);
    }

    // Check if value is numerical
    if (isNaN(finalObj.limit) || finalObj.limit[0] === '-' || (finalObj.limit.length >= 3 && finalObj.limit != '100'))
    {
        console.log(`Improper value on filter: \'--limit\'.`);
        console.log(`\nProper Usage:`);
        console.log(`--duration <day/week/month/year> | default: week `);
        console.log(`--limit <val> | default: 10`);

        process.exit(1);
    }

    return finalObj;
}

function formatDuration(duration)
{   
    const currentDate = new Date();

    switch (duration)
    {   
        case 'day':
            currentDate.setDate(currentDate.getDate() - 1);
            break;
        case 'week':
            currentDate.setDate(currentDate.getDate() - 7);
            break;
        case 'month':
            currentDate.setMonth(currentDate.getMonth() - 1);
            break;
        case 'year':
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            break;
    }

    const finalDate = currentDate.toISOString().split('T')[0]; // Only get the date: YYYY-MM-DD

    return finalDate;
}

async function getRepositories(filterObj)
{   
    console.log("Gathering data...")
    try {
        const duration = formatDuration(filterObj.duration);
        const limit = filterObj.limit;

        // Make GET request using Github module
        const data = await octokit.request(`GET /search/repositories?q=created:>${duration}&per_page=${limit}&sort=stars&order=desc`, {
            headers: {
                'X-GitHub-Api-Version': '2026-03-10'
            }
        });

        return data.data;
    } catch (err) {
        console.log(`Error. Could not fetch ---\n${err}`);
    } 
}

function displayRepos(repositories) // Format Results Neatly
{
    console.log('\n===================RESULTS===================\n')
    repositories.forEach((repo, index) => {
        console.log(`#${index+1}: ${repo.name}`);
        console.log(`Description: ${repo.description}`);
        console.log(`Owner: ${repo.owner.login}`);
        console.log(`Stars: ${repo.stargazers_count}`);
        console.log(`Watchers: ${repo.watchers_count}`);
        console.log(`URL: ${repo.html_url}\n`);
    });
    console.log('===================RESULTS===================')
}

module.exports = {
    setFilters,
    getRepositories,
    displayRepos
}