$("#refresh").on("click", function() {
  $.get("/api/hardware/status", function(result) {
    $(".well.online").html(JSON.stringify(result.hdReport, undefined, 2))
    $(".well.images").html(JSON.stringify(result.hdImage, undefined, 2))
  })
})
$("#report").on("click", function() {
  var id = $(".mock-online input").val()
  if (!id) return
  $.get("/api/hardware/report/" + id, function(result) {})
})
$("#build").on("click", function() {
  var id = $("#node_id_2").val()
  var code = $("#code").val()
  if (!code || !id) return

  fetch(`/api/hardware/master/${id}/firmware`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: code
  }).then(res => {
    $("#code").value = res
  })
})
$("#deploy").on("click", function() {
  var id = $("#node_id_3").val()
  var code = $("#deploy_data").val()
  if (!code || !id) return
  $.post("/api/project/deploy", { id: id, code: code }, function(result) {
    $(".well.gecode").html(result)
  })
})
// $('#uploadForm').on('submit', function (e) {
// })
