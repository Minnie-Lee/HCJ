function doGet() {
  var template = HtmlService.createTemplateFromFile('index');

  // QR코드가 가리킬, 배포된 웹앱의 실제 URL
  template.appUrl = ScriptApp.getService().getUrl();

  return template
    .evaluate()
    .setTitle('GYEONGJU SCHOOL TRIP')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
