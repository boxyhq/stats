// Column structure:
// | Date | lib1 | lib2 | ... |

function recordNPMDownloads() {
  var libs = ['@boxyhq/saml20', '@boxyhq/saml-jackson'];
  var yest = yesterday();
  var row = [yest];

  libs.forEach(function (lib) {
    var count = getNPMDownload(yest, lib);
    row.push(count);
  });

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(row);
}

function yesterday() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getNPMDownload(date, lib) {
  var response = UrlFetchApp.fetch('https://api.npmjs.org/downloads/point/' + date + '/' + lib);
  var stats = JSON.parse(response.getContentText());
  return stats['downloads'];
}

function backFillDownloads(package, from, to) {
  var response = UrlFetchApp.fetch(
    'https://api.npmjs.org/downloads/range/' + from + ':' + to + '/' + package
  );
  var stats = JSON.parse(response.getContentText());

  stats.downloads.forEach(function (day) {
    console.log(day.day, ',', day.downloads);
  });
}
