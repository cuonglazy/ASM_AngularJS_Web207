var app = angular.module('myApp', ['ngRoute'])
function thoigian(x) {
    thoiluong = x
    //đem nguoic
    demnguoc()
}
function demnguoc() {
    thoiluong--
    sophut = Math.floor(thoiluong / 60)
    sogiay = thoiluong % 60
    document.getElementById('sophut').innerHTML = sophut
    document.getElementById('sogiay').innerHTML = sogiay
    //đem nguoc
    setTimeout(demnguoc, 1000)
}


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'subjects.html',
            controller: 'subjectsCtrl',
        })
        .when('/quiz/:id/:name', {
            templateUrl: 'quiz-app.html',
            controller: 'quizCtrl',
        })
})
app.run(function ($rootScope, $http) {
    if (localStorage) {
        $rootScope.student = JSON.parse(window.localStorage.getItem('user'))
        console.log($rootScope.student)
    } else {
        $rootScope.student = null
    }
    $http.get('db/Subject.js').then(function (response) {
        $rootScope.subjects = response.data
    })
})

app.controller('quizCtrl', function ($scope, $http, $routeParams, quizFactory) {
    $http.get('db/Quizs/' + $routeParams.id + '.js').then(function (res) {
        quizFactory.questions = res.data
    })
})

// đọc file subject
app.controller('subjectsCtrl', function ($scope, $http) {
    $scope.list_subject = []
    $http.get('db/Subjects.js').then(function (res) {
        $scope.list_subject = res.data
    })
})

app.directive('quiz', function (quizFactory, $routeParams) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'quiz-template.html',
        link: function (scope, elem, attrs) {
            scope.start = function () {
                quizFactory.getQuestions().then(function () {
                    scope.subjectName = $routeParams.name
                    scope.id = 1
                    scope.quizOver = false //Chưa hoàn thành
                    scope.inProgess = true
                    scope.getQuestion()
                })
            }
            scope.reset = function () {
                scope.inProgess = false
                scope.score = 0
            }
            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id)
                if (quiz) {
                    scope.question = quiz.Text
                    scope.options = quiz.Answers
                    scope.answer = quiz.AnswerId
                    scope.answerMode = true
                } else {
                    scope.quizOver = true // hoàn thành
                }
            }
            scope.checkAnswer = function () {
                if (!$('input[name = answer]:checked').length) return
                var ans = $('input[name = answer]:checked').val()
                if (ans == scope.answer) {
                    // alert('Đúng')
                    scope.score++
                    // in ra bạn đã làm đúng
                    scope.correctAns = true
                } else {
                    // alert('sai')
                    scope.correctAns = false
                }
                // Ẩn và hiện nút next
                scope.answerMode = false
            }
            scope.nextQuestion = function () {
                scope.id++
                scope.getQuestion()
            }
            scope.reset()
        },
    }
})
app.factory('quizFactory', function ($http, $routeParams) {
    return {
        getQuestions: function () {
            return $http
                .get('db/Quizs/' + $routeParams.id + '.js')
                .then(function (res) {
                    // đọc xem có bao nhiêu quesstion
                    questions = res.data
                })
        },
        // id: lấy phần tử thứu bao nhiêu trong mảng
        getQuestion: function (id) {
            var randomItem =
                questions[Math.floor(Math.random() * questions.length)]
            var count = questions.length
            if (count > 10) {
                count = 10
            }
            if (id < count) {
                // lấy question thứ id
                return randomItem
            } else {
                return false
            }
        },
    }
})

