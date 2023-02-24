app.controller('registerCtrl', function ($rootScope, $scope, $http) {
    $scope.register = function () {
        var a = {
            id: Math.floor,
            username: $scope.studentR.username,
            password: $scope.studentR.password,
            fullName: $scope.studentR.fullName,
            email: $scope.studentR.email,
            gender: $scope.studentR.gender,
            birthday: $scope.studentR.birthday,
            schoolfee: $scope.studentR.schoolfee,
            marks: $scope.studentR.marks,
        }
        console.log(a)
        $http.post('http://localhost:3000/listStudents', a).then(
            function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công',
                    text: 'Hãy quay về trang login và đăng nhập',
                })
                window.location.href = 'login.html'
            },
            function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký thất bại!',
                    text: 'Hãy điền đúng thông tin!',
                })
            }
        )
    }
})
