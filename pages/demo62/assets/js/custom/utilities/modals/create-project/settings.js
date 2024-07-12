"use strict";

// Class definition
var KTModalCreateProjectSettings = (function () {
  // Variables
  var nextButton;
  var previousButton;
  var validator;
  var form;
  var stepper;

  var initForm = function () {
    var myDropzone = new Dropzone("#kt_modal_create_project_settings_logo", {
      url: "https://keenthemes.com/scripts/void.php",
      paramName: "file", // The name that will be used to transfer the file
      maxFiles: 10,
      maxFilesize: 200, // MB
      addRemoveLinks: true,
      accept: function (file, done) {
        if (file.name == "justinbieber.jpg") {
          done("Naha, you don't.");
        } else {
          done();
        }
      },
    });

    var releaseDate = $(form.querySelector('[name="settings_release_date"]'));
    releaseDate.flatpickr({
      enableTime: true,
      dateFormat: "d, M Y, H:i",
    });

    $(form.querySelector('[name="settings_customer"]')).on(
      "change",
      function () {
        validator.revalidateField("settings_customer");
      }
    );
  };

  var initValidation = function () {
    validator = FormValidation.formValidation(form, {
      fields: {
        settings_name: {
          validators: {
            notEmpty: {
              message: "Project name is required",
            },
          },
        },
        settings_customer: {
          validators: {
            notEmpty: {
              message: "Customer is required",
            },
          },
        },
        settings_description: {
          validators: {
            notEmpty: {
              message: "Description is required",
            },
          },
        },
        settings_release_date: {
          validators: {
            notEmpty: {
              message: "Release date is required",
            },
          },
        },
        "settings_notifications[]": {
          validators: {
            notEmpty: {
              message: "Notifications are required",
            },
          },
        },
      },

      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: ".fv-row",
          eleInvalidClass: "",
          eleValidClass: "",
        }),
      },
    });
  };

  var handleForm = function () {
    nextButton.addEventListener("click", function (e) {
      e.preventDefault();

      nextButton.disabled = true;

      if (validator) {
        validator.validate().then(function (status) {
          console.log("validated!");

          if (status == "Valid") {
            nextButton.setAttribute("data-kt-indicator", "on");
            setTimeout(function () {
              nextButton.removeAttribute("data-kt-indicator");

              // Enable button
              nextButton.disabled = false;

              // Go to next step
              stepper.goNext();
            }, 1500);
          } else {
            // Enable button
            nextButton.disabled = false;

            Swal.fire({
              text: "ขออภัยค่ะ! ระบบเครือข่ายผิดพลาด, กรุณาทำรายยการใหม่อีกครั้งค่ะ",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "ตกลง รับทราบค่ะ",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        });
      }
    });

    previousButton.addEventListener("click", function () {
      // Go to previous step
      stepper.goPrevious();
    });
  };

  return {
    // Public functions
    init: function () {
      form = KTModalCreateProject.getForm();
      stepper = KTModalCreateProject.getStepperObj();
      nextButton = KTModalCreateProject.getStepper().querySelector(
        '[data-kt-element="settings-next"]'
      );
      previousButton = KTModalCreateProject.getStepper().querySelector(
        '[data-kt-element="settings-previous"]'
      );

      initForm();
      initValidation();
      handleForm();
    },
  };
})();

// Webpack support
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  window.KTModalCreateProjectSettings = module.exports =
    KTModalCreateProjectSettings;
}
