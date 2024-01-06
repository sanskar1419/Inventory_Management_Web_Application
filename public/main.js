function deleteProduct(id) {
  const result = confirm("Are you sure you want to delete this post?");

  if (result) {
    fetch("/delete-product/" + id, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          location.reload();
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    window.alert("Process request has been reverted");
  }
}
