var app = angular.module('myApp', [])

app.controller('forgotpasswordCtrl', function ($rootScope, $scope, $http) {
    var url = 'http://localhost:3000/listStudents'
    $http.get(url)
    $http.get(url).then(function (res) {
        console.log(res.data)
        $rootScope.student = res.data
    })

    $scope.getPass = function () {
        var ck = true
        $scope.student.forEach((st) => {
            if (st.email == $scope.email || st.username == $scope.username) {
                Swal.fire({
                    icon: 'success',
                    title: 'Lấy lại tài khoản thành công!',
                    text: 'Mật khẩu: ' + st.password,
                })
                ck = false
                setTimeout(function () {
                    window.location.href = 'login.html' // chuyển hướng về trang login
                }, 10000) // đợi 10 giây
                return
            }
        })
        if (ck) {
            Swal.fire({
                icon: 'error',
                title: 'Lấy lại tài khoản thất bại!',
                text: 'Vui lòng nhập lại thông tin',
            })
        }
    }
})
