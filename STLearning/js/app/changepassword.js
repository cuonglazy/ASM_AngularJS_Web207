var app = angular.module("myApp", []);

app.run(function ($rootScope, $http, dataService) {
  dataService.getData().then(function (res) {
    $rootScope.list_user = res.data
    console.log($rootScope.list_user)
  })

  if (localStorage) {
    $rootScope.student = JSON.parse(window.localStorage.getItem("user"));
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
    alert('Đã đăng xuất!')
    window.location.href = 'index.html'
  }
})

app.service('dataService', function ($http) {
  this.getData = function () {
    return $http.get("http://localhost:3000/listStudents")
  }
  this.updateData = function (id, data) {
    return $http.put("http://localhost:3000/listStudents/" + id, data)
  }
});

app.controller("changePasswordCtrl", function ($rootScope, $scope, dataService) {
  $scope.oldpassword = "";
  $scope.studentR = {
    password: "",
    renewpassword: ""
  };

  $scope.change = function () {
    if ($rootScope.student.password === $scope.oldpassword) {
      if ($rootScope.student.password === $scope.studentR.password) {
        Swal.fire({
          icon: "error",
          title: "Mật khẩu mới trùng với mật khẩu cũ!",
        });
      } else if ($scope.studentR.password !== $scope.renewpassword) {
        Swal.fire({
          icon: "error",
          title: "Mật khẩu xác nhận không trùng khớp!",
        });
      } else {
        var arr = {
          username: $rootScope.student.username,
          password: $scope.studentR.password,
          fullName: $rootScope.student.fullName,
          email: $rootScope.student.email,
          gender: $rootScope.student.gender,
          birthday: $rootScope.student.birthday,
          schoolfee: $rootScope.student.schoolfee,
          marks: $rootScope.student.marks,
        };
        dataService
          .updateData($rootScope.student.id, arr)
          .then(function () {
            Swal.fire({
              title: "Đổi mật khẩu thành công",
              text: "Bạn có muốn quay lại trang chủ!",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Có!",
              cancelButtonText: "Không",
            }).then((result) => {
              if (result.isConfirmed) {
                $rootScope.student = JSON.parse(
                  window.localStorage.getItem("user")
                );
                console.log($rootScope.student);
                window.location.href = "index.html";
              } else {
                window.location.href = "login.html";
              }
            });
          })
          .catch(function () {
            Swal.fire({
              icon: "error",
              title: "Đổi mật khẩu thất bại!",
              text: "Vui lòng thử lại sau!",
            });
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Mật khẩu cũ không đúng!",
      });
    }
    $scope.oldpassword = "";
    $scope.studentR.password = "";
    $scope.renewpassword = "";
  };
});