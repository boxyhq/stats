// Column structure:
// | Date | repo1 | repo2 | ... |

function recordDockerImagePullCount() {
  var images = ['boxyhq/jackson', 'boxyhq/jackson-demo', 'boxyhq/hermes'];
  var row = [new Date().toISOString().slice(0, 10)];
  
  images.forEach(function (image) {
    var pull_count = getImagePullCount(image);
    row.push(pull_count);
  });
  
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(row);
}

function getImagePullCount(image) {
  var response = UrlFetchApp.fetch("https://hub.docker.com/v2/repositories/" + image);
  var imageStats = JSON.parse(response.getContentText());
  return imageStats['pull_count'];
}
