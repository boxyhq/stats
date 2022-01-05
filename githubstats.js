// There are 3 sheets named - Stars, Watchers, Forks

// Column structure for each sheet:
// | Date | repo1 | repo2 | ... |

function recordGithubStats() {
  var repos = ['boxyhq/jackson', 'boxyhq/jackson-demo', 'boxyhq/hermes'];
  var today = new Date().toISOString().slice(0, 10);
  var rows = {
    Stars: [today],
    Watchers: [today],
    Forks: [today],
  };

  var idx = 0;
  repos.forEach(function (repo) {
    var stats = getGithubStats(repo);
    for (var k in rows) {
      rows[k].push(stats[k]);
    }

    idx++;
  });

  for (var k in rows) {
    var sheet = SpreadsheetApp.getActive().getSheetByName(k);
    sheet.appendRow(rows[k]);
  }
}

function getGithubStats(repo) {
  var response = UrlFetchApp.fetch('https://api.github.com/repos/' + repo);
  var stats = JSON.parse(response.getContentText());
  return {
    Stars: stats['stargazers_count'],
    Watchers: stats['subscribers_count'], // Github uses Watchers and Stargazers for the same thing due to an older attribute
    Forks: stats['forks_count'],
  };
}
