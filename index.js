console.log("qeddqd");
var delay = 300;

var initDot = document.getElementById("loading");
console.log(initDot, "initDot");
var loading = setInterval(function () {
  if (initDot.innerHTML.length == 5) {
    initDot.innerHTML = "";
  } else {
    initDot.innerHTML += ".";
  }
}, 100); // Dot Speed

var $loadingMessage = $("#loadingH1");

setTimeout(function () {
  clearInterval(loading);
  $loadingMessage.hide();
}, delay);

var initProgram = setTimeout(function () {
  var greeting = "UNIDENTIFIED ORGANIC LIFEFORM DETECTED ";
  var message = "RUNNING RESUME... ";
  var $identityDiv = $("#identity-results");
  var $name = "NAME: MAHDI DARABI ";
  var $alias = "KNOWN ALIAS: @mahdidarabi ";
  var $occupation = "OCCUPATION: DEVOPS ENGINEER / SRE | BACKEND DEVELOPER ";
  var $devops = "DEVOPS/SRE: ";
  var $devops1 = "KUBERNETES (K8S) | DOCKER ";
  var $devops2 = "SYSTEM MONITORING ";
  var $devops3 = "CONTINUOUS INTEGRATION AND CONTINUOUS DELIVERY (CI/CD) ";
  var $back = "BACKEND: ";
  var $back1 = "NODEJS (NESTJS) | GO ";
  var $back2 = "POSTGRESQL | REDIS ";
  var $back3 = "MICROSERVICES | DOMAIN-DRIVEN DESIGN (DDD) ";
  var $back4 = "APACHE KAFKA ";

  function initIdentityResults(i) {
    $("#message").addClass("sign cursor").text(message.substring(0, i));
    if (i < message.length) {
      setTimeout(function () {
        initIdentityResults(i + 1);
      }, 35);
    } else {
      $("#message").removeClass("cursor");
      var loadingResume = function () {
        $("#loadingMessage2").show();
        var dotAlpha = document.getElementById("alpha-loading");
        var loadingAlpha = setInterval(function () {
          if (dotAlpha.innerHTML.length == 6) {
            dotAlpha.innerHTML = "";
          } else {
            dotAlpha.innerHTML += ".";
            setTimeout(function () {
              clearInterval(loadingAlpha);
              $("#loadingMessage2").hide();
            }, 2000);
          }
        }, 350); // Dot Speed
      };
      loadingResume();
      function initName(i) {
        $("#name").addClass("sign cursor").text($name.substring(0, i));
        if (i < $name.length) {
          setTimeout(function () {
            initName(i + 1);
          }, 35);
        } else {
          $("#name").removeClass("cursor");
          setTimeout(function () {
            initAlias(0);
          }, delay);
        }
      }
      setTimeout(function () {
        initName(0);
      }, 2500);
    }
    function initAlias(i) {
      $("#alias").addClass("sign cursor").text($alias.substring(0, i));
      if (i < $alias.length) {
        setTimeout(function () {
          initAlias(i + 1);
        }, 35);
      } else {
        $("#alias").removeClass("cursor");
        setTimeout(function () {
          initOccupation(0);
        }, delay);
      }
    }
    function initOccupation(i) {
      $("#occupation")
        .addClass("sign cursor")
        .text($occupation.substring(0, i));
      if (i < $occupation.length) {
        setTimeout(function () {
          initOccupation(i + 1);
        }, 35);
      } else {
        $("#occupation").removeClass("cursor");
        setTimeout(function () {
          initDevops(0);
        }, delay);
      }
    }

    function initDevops(i) {
      $("#devops-span").addClass("fa fa-wrench");
      $("#devops").addClass("cursor").text($devops.substring(0, i));
      if (i < $devops.length) {
        setTimeout(function () {
          initDevops(i + 1);
        }, 35);
      } else {
        $("#devops").removeClass("cursor");
        setTimeout(function () {
          initDevops1(0);
        }, delay);
      }
    }
    function initDevops1(i) {
      $("#devops1").addClass("sign cursor").text($devops1.substring(0, i));
      if (i < $devops1.length) {
        setTimeout(function () {
          initDevops1(i + 1);
        }, 35);
      } else {
        $("#devops1").removeClass("cursor");
        setTimeout(function () {
          initDevops2(0);
        }, delay);
      }
    }
    function initDevops2(i) {
      $("#devops2").addClass("sign cursor").text($devops2.substring(0, i));
      if (i < $devops2.length) {
        setTimeout(function () {
          initDevops2(i + 1);
        }, 35);
      } else {
        $("#devops2").removeClass("cursor");
        setTimeout(function () {
          initDevops3(0);
        }, delay);
      }
    }
    function initDevops3(i) {
      $("#devops3").addClass("sign cursor").text($devops3.substring(0, i));
      if (i < $devops3.length) {
        setTimeout(function () {
          initDevops3(i + 1);
        }, 35);
      } else {
        $("#devops3").removeClass("cursor");
        setTimeout(function () {
          initBack(0);
        }, delay);
      }
    }

    function initBack(i) {
      $("#back").addClass("fa fa-wrench");
      $("#back").addClass("cursor").text($back.substring(0, i));
      if (i < $back.length) {
        setTimeout(function () {
          initBack(i + 1);
        }, 35);
      } else {
        $("#back").removeClass("cursor");
        setTimeout(function () {
          initBack1(0);
        }, delay);
      }
    }
    function initBack1(i) {
      $("#back1").addClass("sign cursor").text($back1.substring(0, i));
      if (i < $back1.length) {
        setTimeout(function () {
          initBack1(i + 1);
        }, 35);
      } else {
        $("#back1").removeClass("cursor");
        setTimeout(function () {
          initBack2(0);
        }, delay);
      }
    }
    function initBack2(i) {
      $("#back2").addClass("sign cursor").text($back2.substring(0, i));
      if (i < $back2.length) {
        setTimeout(function () {
          initBack2(i + 1);
        }, 35);
      } else {
        $("#back2").removeClass("cursor");
        setTimeout(function () {
          initBack3(0);
        }, delay);
      }
    }
    function initBack3(i) {
      $("#back3").addClass("sign cursor").text($back3.substring(0, i));
      if (i < $back3.length) {
        setTimeout(function () {
          initBack3(i + 1);
        }, 35);
      } else {
        $("#back3").removeClass("cursor");
        setTimeout(function () {
          initBack4(0);
        }, delay);
      }
    }
    function initBack4(i) {
      $("#back4").addClass("sign cursor").text($back4.substring(0, i));
      if (i < $back4.length) {
        setTimeout(function () {
          initBack4(i + 1);
        }, 35);
      } else {
        $("#back4").removeClass("cursor");
      }
    }
  }

  function initProgramAlpha(i) {
    $("#greeting").addClass("cursor").text(greeting.substring(0, i));
    if (i < greeting.length) {
      setTimeout(function () {
        initProgramAlpha(i + 1);
      }, 35);
    } else {
      $("#greeting").removeClass("cursor");
      initIdentityResults(0);
    }
  }
  initProgramAlpha(0);
}, delay);

initProgram();
