import Swal from "sweetalert2"

export const showError = (message: string) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "Cool",
  })
}
