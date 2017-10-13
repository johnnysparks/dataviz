require('shelljs/global')

// Generate file
generateFile = () => {
  var lines = cat("merged_dense.csv").split("\n");
  var flowcounts = {};
  lines.forEach((line) => {
    var l = line.split(",");
    var key = l[0], count = l[1];
    if(!key || !count){
      return;
    }
    if(!flowcounts[key]) {
      flowcounts[key] = 0;
    }

    flowcounts[key] += parseInt(count);
  })
  Object.keys(flowcounts).forEach((key) => {
      var count = flowcounts[key];
      `${key},${count}\n`.toEnd("super_merged_dense.csv")
  });
}

randomColor = () => {
  var c = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++){
    color += c[parseInt(Math.random() * c.length)];
  }
  return color;
}

uniqueEvents = () => {
  var lines = cat("super_merged_dense.csv").split("\n");
  var allEvents = {};
  lines.forEach((line) => {
    var l = line.replace(/\"/g, '').split(",");
    var key = l[0], count = l[1];
    var events = key.split("-");
    events.forEach((e) => {
      if(e === '' || e == 'flow'){
        return;
      }
      if(!allEvents[e]){
         allEvents[e] = 0;
      }
      allEvents[e] += 1;
    });
  });

  Object.keys(allEvents).forEach((e) => {
    allEvents[e] = randomColor()
  })
  echo(allEvents);
}


dedupe = () => {
  var lines = cat("data/super_merged_dense.csv").split("\n");
  var allEvents = {};
  lines.sort().forEach((line) => {
    var l = line.replace(/\"/g, '').split(",");
    var key = l[0], count = l[1];
    if(allEvents[key]){
      allEvents[key] += 1;
    } else {
      allEvents[key] = 1;
    }
  });
}
