const { setFilters, getRepositories, displayRepos } = require('./trending.js')

async function main() 
{
    // Get Args
   const args = process.argv;
    if (args.length < 3)
    {
        console.log("Incorrect Usage");
        process.exit(1);
    }

    const filters = setFilters(args);

    // Get and display results
    repos = await getRepositories(filters);
    displayRepos(repos.items);
}

main();
