var app = angular.module("myApp", []);
app.controller("loginCtrl", function ($scope, $rootScope, $http) {
  var url = "http://localhost:3000/listStudents";
  $http.get(url);
  $rootScope.isLog = false;
  $http.get(url).then(
    function (res) {
      $rootScope.datas = res.data;
      console.log(res.data);
      localStorage.clear();
      $scope.Login = function () {
        console.log($scope.username);
        console.log($scope.password);

        var log = checkLogin($scope.username, $scope.password);
        console.log(log);
        if (log) {
          $rootScope.isLog = true;
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                text: 'Quay lại trang chủ!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 2600,
            });
          window.location.href = "index.html";
        } else {
          $rootScope.isLog = false;
          Swal.fire({
            icon: 'error',
            title: 'Tài khoản hoặc mật khẩu không chính xác!',
            text: 'Nhập lại!'
          })
        }
      };
      function checkLogin(user, pass) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username == user && res.data[i].password == pass) {
            $rootScope.student = res.data[i];
            window.localStorage.setItem(
              "user",
              JSON.stringify($rootScope.student)
            );
            console.log(localStorage);
            return res.data[i];
          }
        }
        return false;
      }
    },
    function (error) {}
  );
});

app.controller("registerCtrl", function ($rootScope, $scope, $http) {
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
    };
    console.log(a);
    $http.post("http://localhost:3000/listStudents", a).then(
      function () {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công',
          text: 'Hãy quay về trang login và đăng nhập'
        })
        window.location.href = "login.html";
      },
      function () {
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại!',
          text: 'Hãy điền đúng thông tin!'
        })
      }
    );
  };
});
app.controller('forgotpasswordCtrl', function($rootScope, $scope, $http) {
  var url = "http://localhost:3000/listStudents";
  $http.get(url);
  $http.get(url).then(function (res) {
      console.log(res.data);
      $rootScope.student = res.data;
  });

  $scope.getPass = function() {
      var ck = true;
      $scope.student.forEach(st => {
          if (st.email == $scope.email || st.username == $scope.username) {
              Swal.fire({
                  icon: 'success',
                  title: 'Lấy lại tài khoản thành công!',
                  text: 'Mật khẩu: ' + st.password,
              });
              ck = false;
              setTimeout(function () {
                window.location.href = 'login.html' // chuyển hướng về trang login
            }, 2000) // đợi 10 giây
              return;
          }
        });
      if (ck) {
          Swal.fire({
              icon: 'error',
              title: 'Lấy lại tài khoản thất bại!',
              text: 'Vui lòng nhập lại thông tin',
          });
      }
  }
});