var app = angular.module('myApp', [])
app.run(function ($rootScope, $http, dataService) {
    dataService.getData().then(function (res) {
        $rootScope.list_user = res.data
        console.log($rootScope.list_user)
    })

    if (localStorage) {
        $rootScope.student = JSON.parse(window.localStorage.getItem('user'))
        console.log($rootScope.student)
    } else {
        $rootScope.student = null
    }

    $http.get('db/Subjects.js').then(function (response) {
        $rootScope.subjects = response.data
    })

    $rootScope.logoff = function () {
        $rootScope.student = null
        window.localStorage.clear()
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = 'index.html'
    }
})

app.service("dataService", function ($http) {
    this.getData = function () {
      return $http.get("http://localhost:3000/listStudents");
    };
    this.updateData = function (id, data) {
      return $http.put("http://localhost:3000/listStudents/" + id, data);
    };
  });
  app.controller("updateAccountCtrl", function ($rootScope, $scope, dataService) {
    $scope.update = function () {
        var id = $rootScope.student.id
        console.log(id)
        var data = {
            username: $rootScope.student.username,
            password: $rootScope.student.password,
            fullName: $scope.student.fullName,
            email: $scope.student.email,
            gender: $scope.student.gender,
            birthday: $scope.student.birthday,
            schoolfee: $scope.student.school,
            marks: $scope.student.marks,
            phoneNumber: $scope.student.phoneNumber,
        }
        dataService.updateData(id, data).then(function () {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin cá nhân thành công!',
            });
            window.localStorage.removeItem("user");
            window.localStorage.setItem("user", JSON.stringify(data));
            if (localStorage) {
                $rootScope.student = JSON.parse(window.localStorage.getItem("user"));
                console.log($rootScope.student);
            }
            window.location.href = "User.html";
        }).catch(function () {
            alert('Cập nhật thất bại!');
        });
    }
})
