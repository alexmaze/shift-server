$('#refresh').on('click', function () {
  $.get('/api/hardware/status', function (result) {
    $('.well.online').html(JSON.stringify(result.hdReport, undefined, 2))
    $('.well.images').html(JSON.stringify(result.hdImage, undefined, 2))
  })
})
$('#report').on('click', function () {
  var id = $('.mock-online input').val()
  if (!id) return
  $.get('/api/hardware/report/' + id, function (result) {})
})
$('#build').on('click', function () {
  var id = $('#node_id_2').val()
  var code = $('#code').val()
  if (!code || !id) return
  $.post('/api/hardware/build', { id: id, code: code }, function (result) {
    console.log(result)
    window.alert(JSON.stringify(result))
  })
})
// $('#uploadForm').on('submit', function (e) {
// })
